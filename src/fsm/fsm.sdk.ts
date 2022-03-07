import {
  DocumentReference,
  FieldValue,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Publisher } from "messageBroker";
import { BaseEvent, ResourceType } from "schema";
import { BypassStateAction } from "./bypass.action";

export interface StateEntity<Status> {
  resourceId: string;
  resourceType: ResourceType;
  status: Status;
  statusTo?: Status;
}

export interface StateActionHistory<Status> {
  statusFrom: Status;
  statusTo: Status;
  timestamp: FieldValue;
  success: boolean;
  reason?: string;
}

export interface StateActionReturn<Status> {
  result: boolean;
  next?: Status;
}
export interface StateAction<Entity, Status> extends Function {
  (
    to: Status,
    instance: StateEntity<Status> & Entity,
    docRef: DocumentReference
  ): Promise<StateActionReturn<Status>>;
}

export abstract class StateMachine<Entity, Status> {
  public sync: boolean = false;
  public publisher?: Publisher;
  public instance?: StateEntity<Status> & Entity;
  public docRef?: DocumentReference;
  public actions!: Map<Status, StateAction<Entity, Status>>;
  public actionRequired: boolean = false;
  public transitionMap: Map<Status, Status[]> | undefined;

  async setInstance(
    collectionPath: string,
    resourceId: string
  ): Promise<StateEntity<Status> & Entity> {
    this.docRef = getFirestore().doc(`${collectionPath}/${resourceId}`);
    return await this.loadInstance();
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

  async loadInstance(): Promise<StateEntity<Status> & Entity> {
    this.instance = (
      await this.docRef!.withConverter(firestoreConverter).get()
    ).data() as unknown as StateEntity<Status> & Entity;
    return this.instance;
  }

  canGo(to: Status): boolean {
    // Document Referent
    if (!this.docRef) throw new Error("Instance not set.");
    // Instance
    if (!this.instance) throw new Error("Instance not loaded.");
    // Status to
    if (!this.instance?.statusTo)
      throw new Error("Instance value not found [statusTo]");
    // Status
    if (this.instance?.status === to)
      throw new Error(`Instance cannot go to same status [to: ${to}].`);
    // Action
    if (!this.actions.get(to)) {
      // Action Required
      if (this.actionRequired) {
        throw new Error(
          `Instance has a required action and was not found for transition [to: ${to}].`
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
      throw new Error(
        `Instance has no possible transition [from: ${this.instance.status} - to: ${to}].`
      );
    }
    // Continue
    return true;
  }

  async go(to: Status): Promise<boolean> {
    // Execute
    let error: Error | undefined = undefined;
    try {
      this.canGo(to);
      const response = await this.actions.get(to)!(
        to,
        this.instance!,
        this.docRef!
      );
      if (!response) return false;
      // After
      await this.updateStatus(to, this.instance!, response.result);
      // Next
      if (!response.next) return response.result;
      if (this.sync) {
        return await this.go(response.next);
      } else {
        this.goAsync(response.next);
      }
      return response.result;
    } catch (err) {
      error = err as Error;
      // After
      return await this.updateStatus(to, this.instance!, false, error);
    }
  }

  async goAsync(to: Status): Promise<boolean> {
    await this.docRef?.update({
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

  async updateStatus(
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
      const writeResult = await this.docRef?.update({
        status: to,
        statusTo: FieldValue.delete(),
        statusAt: FieldValue.serverTimestamp(),
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
      };
    }
    // Persist
    await this.docRef?.collection("_status").add(statusHistory);
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
