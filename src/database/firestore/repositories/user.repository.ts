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
    return this.snapshotGetFirst(snapshot);
  }

  public async findByExternalId(externalId: string): Promise<User | undefined> {
    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where("externalId", "==", externalId)
      .get();
    return this.snapshotGetFirst(snapshot);
  }
}
