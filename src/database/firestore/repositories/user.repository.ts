import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";
import { FirestoreSDK } from "../FirestoreSDK";
import { IUserRepository } from "../../repositories/userRepository.interface";
import { ResourceType, User } from "../../../schema";

interface IUserFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class UserFirestoreRepository
  extends CommonFirestoreRepository<User>
  implements IUserRepository
{
  public constructor(params: IUserFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.USER,
    };

    super(superParams);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where("email", "==", email)
      .get();

    if (snapshot.size === 0) {
      return undefined;
    }

    const document = snapshot.docs[0];

    return document.data() as unknown as User;
  }

  public async findByExternalId(externalId: string): Promise<User | undefined> {
    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where("externalId", "==", externalId)
      .get();
    if (snapshot.size === 0) return undefined;
    return snapshot.docs[0].data() as unknown as User;
  }
}
