import { ResourceType, Subscription } from '../../../schema';
import { ISubscriptionRepository } from '../../repositories/subscriptionRepository.interface';
import { FirestoreSDK } from '../FirestoreSDK';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface ISubscriptionFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class SubscriptionFirestoreRepository extends CommonFirestoreRepository<Subscription> implements ISubscriptionRepository {
  public constructor(params: ISubscriptionFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.SUBSCRIPTION,
    };

    super(superParams);
  }

  public async findSubscriptionByPlanId(planId: string): Promise<Subscription | undefined> {
    const snapshot = await this.firestore.collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where('plan.resourceId', '==', planId)
      .get();

    if (snapshot.size === 0) {
      return;
    }

    const document = snapshot.docs[0];

    return document.data() as unknown as Subscription;
  }
}
