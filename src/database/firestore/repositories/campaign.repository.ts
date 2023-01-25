import { Campaign, ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface ICampaignFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class CampaignFirestoreRepository extends CommonFirestoreRepository<Campaign> {
  public constructor(params: ICampaignFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.CAMPAIGN,
    };

    super(superParams);
  }
}
