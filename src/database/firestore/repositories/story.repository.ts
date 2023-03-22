import { ResourceType, Story } from "../../../schema";
import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";

interface IStoryFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class StoryFirestoreRepository extends CommonFirestoreRepository<Story> {
  public constructor(params: IStoryFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.STORY,
    };

    super(superParams);
  }
}
