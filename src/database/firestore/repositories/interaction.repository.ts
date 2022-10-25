import { Interaction, InteractionType, ResourceType } from '../../../schema';
import {
  IInteractionRepository,
  IInteractionRepositoryFindByContentView,
} from '../../repositories/interactionRepository.interface';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IInteractionFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {
}

export class InteractionFirestoreRepository extends CommonFirestoreRepository<Interaction>
  implements IInteractionRepository {
  public constructor(params: IInteractionFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.INTERACTION,
    };

    super(superParams);
  }

  public async findForSubscriptionSplit(params: IInteractionRepositoryFindByContentView): Promise<Interaction[]> {
    const { startDate, endDate } = params;

    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .where('timestamp', '>', startDate)
      .where('timestamp', '<', endDate)
      .where('productType', '==', ResourceType.CONTENT)
      .where('type', '==', InteractionType.VIEW)
      .get();

    return snapshot.docs.map((document) => document.data()) as unknown as Interaction[];
  }
}
