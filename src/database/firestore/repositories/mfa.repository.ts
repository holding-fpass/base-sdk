import { CommonFirestoreRepository, ICommonFirestoreRepositoryConstructorParams } from './common.repository';
import { FirestoreSDK } from '../FirestoreSDK';
import { IMFARepository, IMFARepositoryFindByCodeParams } from '../../repositories/mfaRepository.interface';
import { Mfa, ResourceType } from '../../../schema';

interface IMFAFirestoreRepositoryConstructorParams extends Omit<ICommonFirestoreRepositoryConstructorParams, 'entity'> {}

export class MFAFirestoreRepository extends CommonFirestoreRepository<Mfa> implements IMFARepository {
  public constructor(params: IMFAFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.MFA,
    };

    super(superParams);
  }

  public async findByCode(params: IMFARepositoryFindByCodeParams): Promise<Mfa | undefined> {
    const { code, machineId } = params;

    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where('machineId', '==', machineId)
      .where('code', '==', code)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return undefined;
    }

    const document = snapshot.docs[0];

    return document.data() as unknown as Mfa;
  }
}
