import { ResourceType, Page } from "../../../schema";
import { FirestoreSDK } from "../FirestoreSDK";
import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";

interface IPageFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class PageFirestoreRepository extends CommonFirestoreRepository<Page> {
  public constructor(params: IPageFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.PAGE,
    };
    super(superParams);
  }

  public async findByUrl(params: { url: string }): Promise<Page | undefined> {
    const { url } = params;
    const snapshot = await this.firestore
      .collection(this.baseCollectionPath)
      .withConverter(FirestoreSDK.withConverter)
      .where("url", "==", url)
      .get();
    return this.snapshotGetFirst(snapshot);
  }
}
