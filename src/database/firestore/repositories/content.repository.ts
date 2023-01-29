import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";
import { Content, ResourceType } from "../../../schema";
import {
  IContentRepository,
  IContentRepositoryFindByCourseParams,
} from "database/repositories/contentRepository.interface";

import { FirestoreSDK } from "../FirestoreSDK";

interface IContentFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class ContentFirestoreRepository
  extends CommonFirestoreRepository<Content>
  implements IContentRepository
{
  public constructor(params: IContentFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.CONTENT,
    };

    super(superParams);
  }

  public async findByCourse(
    params: IContentRepositoryFindByCourseParams
  ): Promise<Content[] | undefined> {
    const { courseId } = params;

    const snapshot = await this.firestore
      .collection(`management/${this.whitelabel}/${this.entity}`)
      .withConverter(FirestoreSDK.withConverter)
      .where("parentId", "==", courseId)
      .get();

    return this.snapshotGetAll(snapshot);
  }
}
