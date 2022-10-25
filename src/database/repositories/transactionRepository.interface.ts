import { Transaction } from '../../schema';
import { ICommonRepository } from './commonRepository.interface';

export interface ITransactionRepositoryFindForSubscriptionSplitParams {
  startDate: Date;
  endDate: Date;
}

export interface ITransactionRepository extends ICommonRepository<Transaction> {
  findForSubscriptionSplit(params: ITransactionRepositoryFindForSubscriptionSplitParams): Promise<Transaction[]>;
}