import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";
import { FirestoreSDK } from "../FirestoreSDK";
import { IUserRepository } from "../../repositories/userRepository.interface";
import { ResourceType, SystemTag, User, UserPermission } from "../../../schema";

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

  public async findByTags(
    type: string,
    tags: string[] | SystemTag
  ): Promise<User[] | undefined> {
    let snapshot: any = this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter);

    if (type === "systemTag") {
      switch (tags) {
        case SystemTag.USER_AUTHENTICATED:
          snapshot = await snapshot
            .where("permission", "==", UserPermission.STUDENT)
            .get();
          break;
        case SystemTag.USER_MACHINE:
          snapshot = await snapshot
            .where("permission", "==", UserPermission.MACHINE)
            .get();
          break;
        case SystemTag.USER_ALL:
          snapshot = await snapshot
            .where("permission", "in", [
              UserPermission.MACHINE,
              UserPermission.STUDENT,
            ])
            .get();
          break;
      }
    } else {
      snapshot = await snapshot
        .where("tags_idx", "array-contains-any", tags)
        .get();
    }

    return this.snapshotGetAll(snapshot);
  }
}
