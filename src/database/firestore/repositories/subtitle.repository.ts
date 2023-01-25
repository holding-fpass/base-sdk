import { ResourceType, Subtitle } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface ISubtitleFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class SubtitleFirestoreRepository extends CommonFirestoreRepository<Subtitle> {
  public constructor(params: ISubtitleFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.SUBTITLE,
    };

    super(superParams);
  }
}
