import { v4 as uuid } from "uuid";
import { FSMError } from "../error";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import { Document } from "../data";
import { Publisher } from "../messageBroker";
import {
  BaseEvent,
  InteractionType,
  ResourceType,
  SlimEvent,
  ThreadType,
  Whitelabel,
} from "../schema";
import { BypassStateAction } from "./bypass.action";
import { ThreadFirestoreRepository } from "../database/firestore/repositories";
import { ThreadInteractionFirestoreRepository } from "../database/firestore/repositories/thread.interaction.repository";

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
  errorStack?: any;
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
  public sync: boolean = true;
  public publisher?: Publisher;
  // Instance
  public document?: Document<Entity>;
  public instance?: Entity & StateEntity<Status>;
  // Actions
  public actions!: Map<Status, StateAction<Entity, Status>>;
  public actionRequired: boolean = true;
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

  clearActions() {
    this.actions.clear();
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
      await this.updateStatus(
        to,
        this.instance!,
        response.result,
        undefined,
        response?.next
      );
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
    error?: Error,
    next?: Status
  ): Promise<boolean> {
    // Prepare
    let statusHistory: Partial<StateActionHistory<Status>> = {
      statusFrom: instance.status,
      statusTo: to,
    };
    // Success
    if (result) {
      const fieldValueDelete = FieldValue.delete();
      const writeResult = await this.document?.update({
        status: to,
        statusAt: FieldValue.serverTimestamp(),
        statusTo: next ?? fieldValueDelete,
        statusToError: fieldValueDelete,
      });
      statusHistory = {
        ...statusHistory,
        timestamp: writeResult?.writeTime,
        success: result,
      };
      // Fail
    } else {
      await this.document?.update({
        statusToError: error?.message,
      });
      statusHistory = {
        ...statusHistory,
        timestamp: FieldValue.serverTimestamp(),
        success: result,
        reason: error?.message,
        errorData:
          error?.name == FSMError.name
            ? (error as FSMError).data ?? "No Data"
            : "No Data",
        errorStack: error?.stack ?? "No Stack",
      };
    }
    // Persist
    await (await this.document?.getDocRef())!
      .collection("_status")
      .add(statusHistory);
    // Return
    return result;
  }

  public async threadPublish(
    thread: {
      whitelabel: string;
      threadId: string;
      threadType: ResourceType;
    },
    event: BaseEvent
  ): Promise<SlimEvent> {
    // Prepare Thread
    const threadId = `${thread.threadId}-${thread.threadType}`;
    const threadFirestoreRepository = new ThreadFirestoreRepository({
      whitelabel: thread.whitelabel as Whitelabel,
      baseEntityResourceId: thread.threadId,
    });
    let threadInstance = await threadFirestoreRepository.findById(threadId);
    if (!threadInstance)
      threadInstance = await threadFirestoreRepository.create(threadId, {
        resourceId: thread.threadId,
        resourceType: thread.threadType,
        timestamp: Timestamp.now(),
        type: thread.threadType as unknown as ThreadType,
      });
    // Create Thread Interaction
    event.eventId = event?.eventId ?? uuid();
    const threadInteractionFirestoreRepository =
      new ThreadInteractionFirestoreRepository({
        whitelabel: thread.whitelabel as Whitelabel,
        baseEntityResourceId: threadId,
      });
    // Persist
    const threadInteraction = await threadInteractionFirestoreRepository.create(
      event.eventId,
      {
        ...event,
        resourceId: event.resourceId as string,
        resourceType: event.resourceType as unknown as ResourceType,
        type: event.eventType as unknown as InteractionType,
        productId: event.resourceId as string,
        productType: event.resourceType as unknown as ResourceType,
        parentType: event.parentType as unknown as ResourceType,
        timestamp: Timestamp.now(),
        whitelabel: event.whitelabel as unknown as Whitelabel,
      }
    );
    // Return
    return {
      id: event.eventId,
      date: threadInteraction.timestamp as string,
    };
  }
}
