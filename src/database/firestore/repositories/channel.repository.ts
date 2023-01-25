import { Channel, ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IChannelFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class ChannelFirestoreRepository extends CommonFirestoreRepository<Channel> {
  public constructor(params: IChannelFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.CHANNEL,
    };

    super(superParams);
  }
}
