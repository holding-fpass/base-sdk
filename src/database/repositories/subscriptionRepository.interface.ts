import { Subscription } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface ISubscriptionRepositoryFindSubscriptionByPlanIdAndUserId {
  userId: string;
  planId: string;
}

export interface ISubscriptionRepository extends ICommonRepository<Subscription> {}