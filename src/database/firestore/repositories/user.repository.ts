import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";
import { FirestoreSDK } from "../FirestoreSDK";
import { IUserRepository } from "../../repositories/userRepository.interface";
import {
  ResourceType,
  SystemTag,
  TagType,
  User,
  UserPermission,
} from "../../../schema";

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

  public findByTags(
    type: TagType,
    tags: string[] | SystemTag
  ): NodeJS.ReadableStream {
    let snapshot = this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter);
    //
    if (type === TagType.SYSTEM) {
      switch (tags) {
        case SystemTag.USER_AUTHENTICATED:
          snapshot.where("permission", "==", UserPermission.STUDENT);
          break;
        case SystemTag.USER_MACHINE:
          snapshot.where("permission", "==", UserPermission.MACHINE);
          break;
        case SystemTag.USER_ALL:
          snapshot.where("permission", "in", [
            UserPermission.MACHINE,
            UserPermission.STUDENT,
          ]);
          break;
      }
    } else {
      snapshot.where("tags_idx", "array-contains-any", tags);
    }
    // Return
    return snapshot.stream();
  }
}
