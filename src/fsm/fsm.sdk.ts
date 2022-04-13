import { FSMError } from "../error";
import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Document } from "../data";
import { Publisher } from "../messageBroker";
import { BaseEvent, ResourceType } from "../schema";
import { BypassStateAction } from "./bypass.action";

export interface StateEntity<Status = any> {
  resourceId: string;
  resourceType: ResourceType;
  status: Status;
  statusTo?: Status;
}

export interface StateActionHistory<Status> {
  statusFrom: Status;
  statusTo: Status;
  timestamp: FieldValue | string;
  success: boolean;
  reason?: string;
  errorData?: any;
}

export interface StateActionReturn<Status> {
  result: boolean;
  next?: Status;
}
export interface StateAction<Entity, Status> extends Function {
  (
    fsm: StateMachine<Entity, Status>,
    instance: Entity & StateEntity<Status>,
    document: Document<Entity>
  ): Promise<StateActionReturn<Status>>;
}

export abstract class StateMachine<Entity, Status> {
  //
  public sync: boolean = false;
  public publisher?: Publisher;
  // Instance
  public document?: Document<Entity>;
  public instance?: Entity & StateEntity<Status>;
  // Actions
  public actions!: Map<Status, StateAction<Entity, Status>>;
  public actionRequired: boolean = false;
  public transitionMap: Map<Status, Status[]> | undefined;

  async setDocument(document: Document<Entity>) {
    this.document = document;
    return await this.loadDocument();
  }

  async loadDocument() {
    this.instance = (await this.document?.getData()) as unknown as Entity &
      StateEntity<Status>;
    return this.instance;
  }

  addActions(actions: Map<Status, StateAction<Entity, Status>>) {
    actions.forEach((action, key) => {
      this.actions.set(key, action);
    });
    return this;
  }

  addTransitionMap(transtitionMap: Map<Status, Status[]>) {
    this.transitionMap = transtitionMap;
  }

  canGo(to: Status): boolean {
    // Document Referent
    if (!this.document) throw new FSMError("Document not set.");
    // Instance
    if (!this.instance) throw new FSMError("Instance not loaded.");
    // Status to
    if (!this.instance?.statusTo)
      throw new FSMError("Instance value not found [statusTo]");
    // Status
    if (this.instance?.status === to)
      throw new FSMError(`Instance cannot go to same status [to: ${to}].`, 0, {
        statusTo: to,
      });
    // Action
    if (!this.actions.has(to)) {
      // Action Required
      if (this.actionRequired) {
        throw new FSMError(
          `Instance has a required action and was not found for transition [to: ${to}].`,
          0,
          {
            statusTo: to,
          }
        );
      }
      // Add Bypass Action
      this.addActions(
        new Map<Status, StateAction<Entity, Status>>([[to, BypassStateAction]])
      );
    }
    // Possible transition
    if (
      this.transitionMap &&
      !this.transitionMap
        .get(this.instance.status)
        ?.find((status) => status === to)
    ) {
      throw new FSMError(
        `Instance has no possible transition [from: ${this.instance.status} - to: ${to}].`,
        0,
        {
          statusFrom: this.instance.status,
          statusTo: to,
        }
      );
    }
    // Continue
    return true;
  }

  async go(to: Status): Promise<boolean> {
    // Execute
    try {
      this.canGo(to);
      const response = await this.actions.get(to)!(
        this,
        this.instance!,
        this.document!
      );
      if (!response) return false;
      // After
      await this.updateStatus(to, this.instance!, response.result);
      await this.loadDocument();
      // Next
      if (!response.next) return response.result;
      if (this.sync) {
        return await this.go(response.next);
      } else {
        this.goAsync(response.next);
      }
      return response.result;
    } catch (err) {
      // After
      return await this.updateStatus(to, this.instance!, false, err as Error);
    }
  }

  private async goAsync(to: Status): Promise<boolean> {
    await this.document?.update({
      statusTo: to,
    });
    return Publisher.publish(
      new BaseEvent({
        eventType: `${this.instance?.resourceType}.updated`,
        resourceId: this.instance?.resourceId,
        resourceType: this.instance?.resourceType,
      })
    );
  }

  private async updateStatus(
    to: Status,
    instance: StateEntity<Status> & Entity,
    result: boolean,
    error?: Error
  ): Promise<boolean> {
    // Prepare
    let statusHistory: Partial<StateActionHistory<Status>> = {
      statusFrom: instance.status,
      statusTo: to,
    };
    // Success
    if (result) {
      const writeResult = await this.document?.update({
        status: to,
        statusAt: FieldValue.serverTimestamp(),
        statusTo: FieldValue.delete(),
      });
      statusHistory = {
        ...statusHistory,
        timestamp: writeResult?.writeTime,
        success: result,
      };
      // Fail
    } else {
      statusHistory = {
        ...statusHistory,
        timestamp: FieldValue.serverTimestamp(),
        success: result,
        reason: error?.message,
        errorData:
          error?.name == FSMError.name ? (error as FSMError).data : undefined,
      };
    }
    // Persist
    await (await this.document?.getDocRef())!
      .collection("_status")
      .add(statusHistory);
    // Return
    return result;
  }
}

const firestoreConverter = {
  toFirestore(entity: any) {
    return entity;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data()!;
    return {
      ...data,
      updatedAt: data?.updatedAt?.toDate(),
      deletedAt: data?.deletedAt?.toDate(),
      statusAt: data?.statusAt?.toDate(),
      timestamp: data?.timestamp?.toDate(),
    };
  },
};
