import { Interaction, ResourceType } from "../../../schema";
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

export class ThreadInteractionFirestoreRepository extends CommonFirestoreRepository<Interaction> {
  public constructor(
    params: ICommonFirestoreRepositoryWithSubRepositoryConstructorParams
  ) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      baseEntity: ResourceType.THREAD,
      baseEntityResourceId: params.baseEntityResourceId,
      entity: (ResourceType.INTERACTION + `s`) as ResourceType,
    };
    super(superParams);
  }
}
