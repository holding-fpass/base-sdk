import {
  DocumentReference,
  FieldValue,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export interface StateEntity<Status> {
  resourceId: string;
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
  next: Status;
}
export interface StateAction<Entity, Status> extends Function {
  (
    to: Status,
    instance: StateEntity<Status> & Entity,
    docRef: DocumentReference
  ): Promise<StateActionReturn<Status>>;
}

export abstract class StateMachine<Entity, Status> {
  public instance?: StateEntity<Status> & Entity;
  public docRef?: DocumentReference;
  public actions!: Map<Status, StateAction<Entity, Status>>;

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

  async loadInstance(): Promise<StateEntity<Status> & Entity> {
    this.instance = (
      await this.docRef!.withConverter(firestoreConverter).get()
    ).data() as unknown as StateEntity<Status> & Entity;
    return this.instance;
  }

  canGoCheck(to: Status): boolean {
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
    if (!this.actions.get(to))
      throw new Error(
        `Instance has no action found for transition [to: ${to}].`
      );
    // Continue
    return true;
  }

  async go(to: Status): Promise<boolean> {
    // Execute
    let result: boolean = false;
    let next: Status | undefined = undefined;
    let error: Error | undefined = undefined;
    try {
      this.canGoCheck(to);
      const { result, next } = await this.actions.get(to)!(
        to,
        this.instance!,
        this.docRef!
      );
    } catch (err) {
      error = err as Error;
    } finally {
      // After
      await this.goAfter(to, this.instance!, result, error);
      // Next
      if (next) this.go(next);
      return result;
    }
  }

  async goAfter(
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
