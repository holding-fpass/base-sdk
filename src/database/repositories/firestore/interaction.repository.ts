import { ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IInteractionFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class InteractionFirestoreRepository extends CommonFirestoreRepository {
  public constructor(params: IInteractionFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.INTERACTION,
    };

    super(superParams);
  }
}
