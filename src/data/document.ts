import {
  FieldValue,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Resource, ResourceStatus, ResourceType, Whitelabel } from "schema";
import { v4 as uuid } from "uuid";

export interface DocumentOptions {
  whitelabel: Whitelabel;
  resourceType: ResourceType;
  resourceId?: string;
}

export class Document<T> {
  private readonly basepath = "managment";
  private whitelabel: Whitelabel;
  private resourceId: string | undefined;
  private resourceType: ResourceType;

  constructor(options: DocumentOptions) {
    this.whitelabel = options.whitelabel;
    this.resourceType = options.resourceType;
    this.resourceId = options?.resourceId;
  }

  async getDocRef() {
    return getFirestore().doc(
      `${this.basepath}/${this.whitelabel}/${this.resourceType}/${this?.resourceId}`
    );
  }

  async getData() {
    return (
      await (await this.getDocRef()).withConverter(firestoreConverter).get()
    ).data() as unknown as T;
  }

  async create(data: Partial<T & Resource>) {
    return (await this.getDocRef()).create({
      ...data,
      resourceId: data?.resourceId ?? uuid(),
      timestamp: FieldValue.serverTimestamp,
      createdAt: FieldValue.serverTimestamp,
      updatedAt: FieldValue.serverTimestamp,
      status: ResourceStatus.CREATED,
      statusAt: FieldValue.serverTimestamp,
    });
  }

  async update(data: Partial<T & Resource>) {
    return (await this.getDocRef()).update(data);
  }

  async touch() {
    return (await this.getDocRef()).update({
      updateAt: FieldValue.serverTimestamp,
    });
  }

  async delete() {
    return (await this.getDocRef()).update({
      deletedAt: FieldValue.serverTimestamp,
    });
  }

  async setBy<T>(options: { field: string; value: string }) {
    const result = await this.findBy<T & Resource>(options);
    if (result.length !== 1) throw new Error("Non unique search option passed");
    this.resourceId = result.shift()!.resourceId;
  }

  async findBy<T>(options: { field: string; value: string }) {
    return getFirestore()
      .collection(`${this.basepath}/${this.whitelabel}/${this.resourceType}`)
      .where(options.field, "==", options.value)
      .withConverter(firestoreConverter)
      .get() as unknown as T[];
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
      timestamp: data?.timestamp?.toDate(),
      createdAt: data?.timestamp?.toDate(),
      updatedAt: data?.updatedAt?.toDate(),
      deletedAt: data?.deletedAt?.toDate(),
      statusAt: data?.statusAt?.toDate(),
    };
  },
};
