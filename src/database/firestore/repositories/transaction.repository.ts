import { ProductType, ResourceType, Transaction, TransactionStatus, TransactionType } from '../../../schema';
import {
  ITransactionRepository,
  ITransactionRepositoryFindForSubscriptionSplitParams,
} from '../../repositories/transactionRepository.interface';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface ITransactionFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {
}

export class TransactionFirestoreRepository extends CommonFirestoreRepository<Transaction>
  implements ITransactionRepository {
  public constructor(params: ITransactionFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.TRANSACTION,
    };

    super(superParams);
  }

  public async findForSubscriptionSplit(params: ITransactionRepositoryFindForSubscriptionSplitParams): Promise<Transaction[]> {
    const { startDate, endDate } = params;

    const snapshot = await this.firestore.collection(this.baseCollectionPath)
      .where('timestamp', '>', startDate)
      .where('timestamp', '<', endDate)
      .where('product.productType', 'in', [ProductType.PLATAFORM_SUBSCRIPTION, ProductType.CHANNEL_SUBSCRIPTION])
      .where('status', '==', TransactionStatus.PAID)
      .where('type', '==', TransactionType.PURCHASE)
      .get();

    return snapshot.docs.map((document) => document.data()) as unknown as Transaction[];
  }
}
