import { Certificate, ResourceType } from "../../../schema";
import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";

interface ICertificateFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class CertificateFirestoreRepository extends CommonFirestoreRepository<Certificate> {
  public constructor(params: ICertificateFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.CERTIFICATE,
    };

    super(superParams);
  }
}
