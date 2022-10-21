import { ResourceType, User } from '../../../schema';
import { IUserRepository } from '../../repositories/userRepository.interface';
import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';

interface IUserFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {
}

export class UserFirestoreRepository extends CommonFirestoreRepository<User> implements IUserRepository {
  public constructor(params: IUserFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.USER,
    };

    super(superParams);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const snapshot = await this.firestore.collection(this.baseCollectionPath).where('email', '==', email).get();

    if (snapshot.size === 0) {
      return undefined;
    }

    const document = snapshot.docs[0];

    return document.data() as User;
  }
}
