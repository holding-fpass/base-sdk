import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { Notification, NotificationType, ResourceType } from "../../../schema";
import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";

interface ICommonFirestoreRepositoryWithSubRepositoryConstructorParams
  extends Omit<
    ICommonFirestoreRepositoryConstructorParams,
    "entity" | "baseEntity"
  > {
  baseEntityResourceId: string;
}

export class UserNotificationFirestoreRepository extends CommonFirestoreRepository<Notification> {
  public constructor(
    params: ICommonFirestoreRepositoryWithSubRepositoryConstructorParams
  ) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      baseEntity: ResourceType.USER,
      baseEntityResourceId: params.baseEntityResourceId,
      entity: ResourceType.NOTIFICATION,
    };
    super(superParams);
  }

  public async setReadedAt(id: string): Promise<Notification | undefined> {
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(id)
      .update({
        readedAt: Timestamp.now(),
      } as Pick<Notification, "readedAt">);
    return this.findById(id) as Promise<Notification>;
  }

  public async unsetReadedAt(id: string): Promise<Notification | undefined> {
    await this.firestore
      .collection(this.baseCollectionPath)
      .doc(id)
      .update({
        readedAt: FieldValue.delete(),
      } as Pick<Notification, "readedAt">);
    return this.findById(id) as Promise<Notification>;
  }

  public async findApplicable(
    type: NotificationType
  ): Promise<Notification[] | undefined> {
    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .where("type", "==", type)
      .where("expiresAt", ">", Timestamp.now())
      .where("readedAt", "==", "")
      .get();
    return this.snapshotGetAll(snapshot);
  }
}
