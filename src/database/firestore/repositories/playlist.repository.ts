import { Playlist, ResourceType } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IPlaylistFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class PlaylistFirestoreRepository extends CommonFirestoreRepository<Playlist> {
  public constructor(params: IPlaylistFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.PLAYLIST,
    };

    super(superParams);
  }
}
