import { Subscription } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface ISubscriptionRepository extends ICommonRepository<Subscription> {
  findSubscriptionByPlanId(planId: string): Promise<Subscription | undefined>;
}