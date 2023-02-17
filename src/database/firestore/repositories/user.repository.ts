import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";
import { FirestoreResourceDataConverter, FirestoreSDK } from "../FirestoreSDK";
import { IUserRepository } from "../../repositories/userRepository.interface";
import { ResourceType, SystemTag, User, UserPermission } from "../../../schema";
import { QuerySnapshot } from "firebase-admin/firestore";

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

  public findByTags(tags: string[] | SystemTag): Promise<QuerySnapshot<User>> {
    const firestoreResourceDataConverter =
      new FirestoreResourceDataConverter<User>();
    switch (tags) {
      case SystemTag.USER_AUTHENTICATED:
        return this.firestore
          .collection(this.baseCollectionPath)
          .withConverter<User>(firestoreResourceDataConverter)
          .where("permission", "==", UserPermission.STUDENT)
          .get();
      case SystemTag.USER_MACHINE:
        return this.firestore
          .collection(this.baseCollectionPath)
          .withConverter(firestoreResourceDataConverter)
          .where("permission", "==", UserPermission.MACHINE)
          .get();
      case SystemTag.USER_ALL:
        return this.firestore
          .collection(this.baseCollectionPath)
          .withConverter(firestoreResourceDataConverter)
          .where("permission", "in", [
            UserPermission.MACHINE,
            UserPermission.STUDENT,
          ])
          .get();
      default:
        return this.firestore
          .collection(this.baseCollectionPath)
          .withConverter(firestoreResourceDataConverter)
          .where("tags_idx", "array-contains-any", tags)
          .get();
    }
  }
}
