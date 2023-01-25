import { FormResponse, ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IFormResponseFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class FormResponseFirestoreRepository extends CommonFirestoreRepository<FormResponse> {
  public constructor(params: IFormResponseFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.FORM_RESPONSE,
    };

    super(superParams);
  }
}
