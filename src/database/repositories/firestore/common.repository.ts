import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { ResourceType, Whitelabel } from '../../../schema';
import * as CommonEntityType from '../../../schema/commom.schema';
import * as FirestoreHooks from '../../firestore/hooks';
import { ICommonRepository, ICommonRepositoryFindAllParams } from '../types/ICommonRepository';

export interface ICommonFirestoreRepositoryConstructorParams {
  entity: ResourceType;
  whitelabel: Whitelabel;
}

export class CommonFirestoreRepository implements ICommonRepository {
  protected readonly entity: ResourceType;
  protected readonly firestore: firestore.Firestore;
  protected whitelabel: Whitelabel;
  protected readonly baseCollectionPath: string;

  public constructor(params: ICommonFirestoreRepositoryConstructorParams) {
    this.entity = params.entity;
    this.whitelabel = params.whitelabel;
    this.baseCollectionPath = `management/${this.whitelabel}/${this.entity}`;
    this.firestore = FirestoreHooks.useFirestore();
  }

  public async findAll<T = unknown>(params: ICommonRepositoryFindAllParams): Promise<T[]> {
    throw new Error('Method not implemented');
  }

  public async findById<T = unknown>(id: string): Promise<T> {
    const document = await this.firestore.collection(this.baseCollectionPath).doc(id).get();

    return document.data() as T;
  }

  public async create<T = unknown>(id: string, params: T): Promise<T> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).create(params);

    return this.findById(id);
  }

  public async update<T = unknown>(id: string, entityData: T): Promise<T> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).update(entityData);

    return this.findById(id);
  }

  public async delete(id: string): Promise<void> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).update({
      status: CommonEntityType.CommonEntityStatus.DELETED,
      deletedAt: Timestamp.now(),
    });
  }
}