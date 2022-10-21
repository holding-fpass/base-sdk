import { ResourceType, Transaction } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface ITransactionFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class TransactionFirestoreRepository extends CommonFirestoreRepository<Transaction> {
  public constructor(params: ITransactionFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.TRANSACTION,
    };

    super(superParams);
  }
}
