import { App } from "firebase-admin/app";
import {
  FieldValue,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { v4 as uuid } from "uuid";
import { Resource, ResourceStatus, ResourceType, Whitelabel } from "../schema";

export interface DocumentOptions {
  whitelabel: Whitelabel;
  resourceType: ResourceType;
  resourceId?: string;
}

export class Document<T> {
  public static app: App;
  private readonly basepath = "management";
  private whitelabel: Whitelabel;
  private resourceId: string | undefined;
  private resourceType: ResourceType;

  constructor(options: DocumentOptions) {
    this.whitelabel = options.whitelabel;
    this.resourceType = options.resourceType;
    this.resourceId = options?.resourceId;
  }

  async getDocRef() {
    return getFirestore(Document.app).doc(
      `${this.basepath}/${this.whitelabel}/${this.resourceType}/${this?.resourceId}`
    );
  }

  async getData() {
    const docRef = await this.getDocRef();
    const data = (await docRef.withConverter(firestoreConverter).get()).data();
    return data as unknown as T;
  }

  async exists(): Promise<boolean> {
    return (await (await this.getDocRef()).get()).exists;
  }

  async create(data: any) {
    const nowDate = new Date();
    return (await this.getDocRef()).create({
      ...data,
      resourceId: data?.resourceId ?? uuid(),
      timestamp: nowDate,
      createdAt: nowDate,
      updatedAt: nowDate,
      status: ResourceStatus.CREATED,
      statusAt: nowDate,
    });
  }

  async update(data: any) {
    const nowDate = new Date();
    let statusData = {};
    if (data?.status) {
      statusData = {
        status: data?.status,
        statusAt: nowDate,
      };
    }
    return (await this.getDocRef()).update({
      ...data,
      ...statusData,
      updatedAt: nowDate,
    });
  }

  async delete() {
    const nowDate = new Date();
    return (await this.getDocRef()).update({
      deletedAt: nowDate,
    });
  }

  async setBy<T>(options: { field: string; value: string }) {
    const result = await this.findBy<T & Resource>(options);
    if (result.length !== 1) throw new Error("Non unique search option passed");
    this.resourceId = result.shift()!.resourceId;
  }

  async findBy<T>(options: { field: string; value: string }) {
    return getFirestore(Document.app)
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
