import {
  DocumentReference,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export interface StateEntity<Status> {
  resourceId: string;
  status: Status;
  statusTo?: Status;
}

export interface StateAction<Entity, Status> extends Function {
  (
    to: Status,
    instance: StateEntity<Status> & Entity,
    docRef: DocumentReference
  ): Promise<boolean>;
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
    this.instance = (
      await this.docRef.withConverter(firestoreConverter).get()
    ).data() as unknown as StateEntity<Status> & Entity;
    return this.instance;
  }

  canGoCheck(to: Status): boolean {
    // Instance
    if (!this.instance) throw new Error("No instance initialized.");
    // Document Referent
    if (!this.docRef) throw new Error("No document initialized.");
    // Status to
    if (!this.instance?.statusTo) throw new Error("[statusTo] not found");
    // Status
    if (this.instance?.status === to)
      throw new Error(`Cannot go to same status [to: ${to}].`);
    // Action
    if (!this.actions.get(to)) throw new Error(`No action found [to: ${to}].`);
    // Continue
    return true;
  }

  async go(to: Status): Promise<boolean> {
    // Validate
    this.canGoCheck(to);
    // Execute
    return await this.actions.get(to)!(to, this.instance!, this.docRef!);
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
      timestamp: data?.timestamp?.toDate(),
    };
  },
};
