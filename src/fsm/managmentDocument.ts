import {
  FieldValue,
  getFirestore,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { Whitelabel } from "schema";

export interface ManagmentDocumentOptions {
  whitelabel: Whitelabel;
  resourceId: string;
}

export class ManagmentDocument<T> {
  private readonly basepath = "managment";
  private whitelabel: Whitelabel;
  private entity: string;
  private resourceId: string;

  constructor(options: ManagmentDocumentOptions, entity: new () => T) {
    this.whitelabel = options.whitelabel;
    this.entity = entity.name.toLowerCase();
    this.resourceId = options.resourceId;
  }

  async getDocumentRef() {
    return getFirestore().doc(
      `${this.basepath}/${this.whitelabel}/${this.entity}/${this.resourceId}`
    );
  }

  async getDocumentData<T>() {
    return (
      await (await this.getDocumentRef())
        .withConverter(firestoreConverter)
        .get()
    ).data() as unknown as T;
  }

  async create(data: Partial<T>) {
    return (await this.getDocumentRef()).create(data);
  }

  async update(data: Partial<T>) {
    return (await this.getDocumentRef()).update(data);
  }

  async touch() {
    return (await this.getDocumentRef()).update({
      updateAt: FieldValue.serverTimestamp,
    });
  }

  async delete() {
    return (await this.getDocumentRef()).update({
      deletedAt: FieldValue.serverTimestamp,
    });
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
