import { ResourceType, Thread } from '../../../schema';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IThreadFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class ThreadFirestoreRepository extends CommonFirestoreRepository<Thread> {
  public constructor(params: IThreadFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.THREAD,
    };

    super(superParams);
  }
}
