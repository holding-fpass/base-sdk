import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';
import { ResourceType, Whitelabel } from '../../../schema';
import * as CommonEntityType from '../../../schema/commom.schema';
import * as FirestoreHooks from '../hooks';
import { ICommonRepository, ICommonRepositoryFindAllParams } from '../../repositories/ICommonRepository';

export interface ICommonFirestoreRepositoryConstructorParams {
  entity: ResourceType;
  whitelabel: Whitelabel;
}

export class CommonFirestoreRepository<T = unknown> implements ICommonRepository<T> {
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

  public async findAll(params: ICommonRepositoryFindAllParams): Promise<T[]> {
    throw new Error('Method not implemented');
  }

  public async findById(id: string): Promise<T | undefined> {
    const document = await this.firestore.collection(this.baseCollectionPath).doc(id).get();

    return document.data() as T | undefined;
  }

  public async create(id: string, params: T): Promise<T> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).create(params);

    return this.findById(id) as Promise<T>;
  }

  public async update(id: string, entityData: Partial<T>): Promise<T> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).update(entityData);

    return this.findById(id) as Promise<T>;
  }

  public async delete(id: string): Promise<void> {
    await this.firestore.collection(this.baseCollectionPath).doc(id).update({
      status: CommonEntityType.CommonEntityStatus.DELETED,
      deletedAt: Timestamp.now(),
    });
  }
}