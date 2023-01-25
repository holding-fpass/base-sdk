import { ResourceType, Subscription } from '../../../schema';
import { ISubscriptionRepository } from '../../repositories/subscriptionRepository.interface';
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
}
