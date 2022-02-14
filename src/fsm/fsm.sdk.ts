import { DocumentReference, getFirestore } from "firebase-admin/firestore";

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
  ): Promise<Required<StateMachine<Entity, Status>>> {
    this.docRef = getFirestore().collection(collectionPath).doc(resourceId);
    this.instance =
      (await this.docRef.get()) as unknown as StateEntity<Status> & Entity;
    return this as Required<StateMachine<Entity, Status>>;
  }

  canGoCheck(to: Status): boolean {
    // Instance
    if (!this.instance) throw new Error("No instance initialized.");
    // Document Referent
    if (!this.docRef) throw new Error("No document initialized.");
    // Status
    if (this.instance?.status === to) throw new Error("Same status.");
    // Action
    if (!this.actions.get(to)) throw new Error("No action found.");
    // Status to
    if (!this.instance.statusTo) throw new Error("No instance statusTo found");
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
