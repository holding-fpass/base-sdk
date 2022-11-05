import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';
import { FirestoreSDK } from '../FirestoreSDK';
import { IInstanceRepository, IInstanceRepositoryFindByNameParams } from '../../repositories/instanceRepository.interface';
import { Instance, ResourceType, Whitelabel } from '../../../schema';

interface IInstanceFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class InstanceFirestoreRepository extends CommonFirestoreRepository<Instance> implements IInstanceRepository {
  public constructor(params: IInstanceFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.INSTANCE,
    };

    super(superParams);
  }

  public async findByName(params: IInstanceRepositoryFindByNameParams): Promise<Instance | undefined> {
    const { name, application } = params;

    const snapshot = await this.firestore.collection(`management/${Whitelabel.DEFAULT}/${this.entity}`)
      .withConverter(FirestoreSDK.withConverter)
      .where('name', '==', name)
      .where('application', '==', application)
      .get();

    if (snapshot.size === 0) {
      return undefined;
    }

    const document = snapshot.docs[0];

    return document.data() as unknown as Instance;
  }
}
