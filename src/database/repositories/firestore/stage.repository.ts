import { ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IStageFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class StageFirestoreRepository extends CommonFirestoreRepository {
  public constructor(params: IStageFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.STAGE,
    };

    super(superParams);
  }
}
