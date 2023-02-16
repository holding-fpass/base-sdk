import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "firebase-admin";

import * as CommonEntityType from "../../../schema/commom.schema";
import * as FirestoreHooks from "../hooks";
import { FirestoreSDK } from "../FirestoreSDK";
import {
  ICommonRepository,
  ICommonRepositoryFindAllParams,
} from "../../repositories/commonRepository.interface";
import { Resource, ResourceType, Whitelabel } from "../../../schema";

export interface ICommonFirestoreRepositoryConstructorParams {
  entity: ResourceType;
  whitelabel: Whitelabel;
  baseEntity?: string;
  baseEntityResourceId?: string;
}

export class CommonFirestoreRepository<T = unknown>
  implements ICommonRepository<T>
{
  protected readonly entity: ResourceType;
  protected readonly firestore: firestore.Firestore;
  protected whitelabel: Whitelabel;
  protected readonly baseCollectionPath: string;

  public constructor(params: ICommonFirestoreRepositoryConstructorParams) {
    this.entity = params.entity;
    this.whitelabel = params.whitelabel;
    if (params.baseEntity && params.baseEntityResourceId) {
      this.baseCollectionPath = `management/${this.whitelabel}/${params.baseEntity}/${params.baseEntityResourceId}/${this.entity}`;
    } else {
      this.baseCollectionPath = `management/${this.whitelabel}/${this.entity}`;
    }
    this.firestore = FirestoreHooks.useFirestore();
  }

  public async findAll(params: ICommonRepositoryFindAllParams): Promise<T[]> {
    throw new Error("Method not implemented");
  }

  public async findById(id: string): Promise<T | undefined> {
    const document = await this.firestore
      .collection(this.baseCollectionPath)
      .doc(id)
      .withConverter(FirestoreSDK.withConverter)
      .get();

    return document.data() as T | undefined;
  }

  public async create(id: string, params: T): Promise<T> {
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(id)
      .create(params as any);

    return this.findById(id) as Promise<T>;
  }

  public async update(id: string, entityData: Partial<T>): Promise<T> {
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(id)
      .update(entityData);

    return this.findById(id) as Promise<T>;
  }

  public async arrayPush(
    docId: string,
    arrayFieldName: string,
    arrayValues: any[],
    indexKey: string
  ): Promise<T> {
    // Added new value
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(docId)
      .set(
        {
          [arrayFieldName]: FieldValue.arrayUnion(...arrayValues),
        },
        {
          merge: true,
        }
      );
    // Get data
    const instance = (await this.findById(docId)) as Record<string, any>;
    let instanceArrayValues: Record<string, unknown>[] =
      instance[arrayFieldName];
    // Add index values
    this.firestore
      .collection(this.baseCollectionPath)
      .doc(docId)
      .update({
        [`${arrayFieldName}_idx`]: instanceArrayValues.map(
          (value) => value[indexKey]
        ),
      });
    // Return
    return this.findById(docId) as Promise<T>;
  }

  public async arraySet(
    docId: string,
    arrayFieldName: string,
    arrayValues: any[],
    indexKey: string
  ): Promise<T> {
    // Added new value
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(docId)
      .update({
        [arrayFieldName]: arrayValues,
        [`${arrayFieldName}_idx`]: arrayValues.map((value) => value[indexKey]),
      });
    // Return
    return this.findById(docId) as Promise<T>;
  }

  public async arrayRemove(
    docId: string,
    arrayFieldName: string,
    arrayValues: any[],
    indexKey: string
  ): Promise<T> {
    // Added new value
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(docId)
      .set(
        {
          [arrayFieldName]: FieldValue.arrayRemove(...arrayValues),
        },
        {
          merge: true,
        }
      );
    // Get data
    const instance = (await this.findById(docId)) as Record<string, any>;
    let instanceArrayValues: Record<string, unknown>[] =
      instance[arrayFieldName];
    // Add index values
    this.firestore
      .collection(this.baseCollectionPath)
      .doc(docId)
      .update({
        [`${arrayFieldName}_idx`]: instanceArrayValues.map(
          (value) => value[indexKey]
        ),
      });
    // Return
    return this.findById(docId) as Promise<T>;
  }

  /**
   * Soft delete
   * It updates deletedAt field with a timestamp value
   * @param id
   */
  public async delete(id: string): Promise<void> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).update({
      status: CommonEntityType.CommonEntityStatus.DELETED,
      deletedAt: Timestamp.now(),
    });
  }

  /**
   * Hard delete [DANGER]
   * It removes the document from database with no restore option after this
   * @param id
   */
  public async hardDelete(id: string): Promise<void> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).delete();
  }

  protected snapshotGetFirst(snapshot: FirebaseFirestore.QuerySnapshot) {
    if (snapshot.size === 0) return;
    const document = snapshot.docs[0];
    return document.data() as unknown as T;
  }

  protected snapshotGetAll(snapshot: FirebaseFirestore.QuerySnapshot) {
    if (snapshot.size === 0) return;
    return snapshot.docs.map((document) => document.data()) as unknown as T[];
  }
}
