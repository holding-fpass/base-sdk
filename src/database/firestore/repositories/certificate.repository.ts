import {
  ICertificateRepository,
  ICertificateRepositoryFindByCourseParams,
} from "../../repositories/certificateRepository.interface";
import { Certificate, ResourceType } from "../../../schema";
import { FirestoreSDK } from "../FirestoreSDK";
import {
  CommonFirestoreRepository,
  ICommonFirestoreRepositoryConstructorParams,
} from "./common.repository";

interface ICertificateFirestoreRepositoryConstructorParams
  extends Omit<ICommonFirestoreRepositoryConstructorParams, "entity"> {}

export class CertificateFirestoreRepository
  extends CommonFirestoreRepository<Certificate>
  implements ICertificateRepository
{
  public constructor(params: ICertificateFirestoreRepositoryConstructorParams) {
    const superParams: ICommonFirestoreRepositoryConstructorParams = {
      whitelabel: params.whitelabel,
      entity: ResourceType.CERTIFICATE,
    };

    super(superParams);
  }

  public async findByCourse(
    params: ICertificateRepositoryFindByCourseParams
  ): Promise<Certificate | undefined> {
    // Prepare
    const { productId, userId } = params;
    // Query
    const snapshot = await this.firestore
      .collection(`management/${this.whitelabel}/${this.entity}`)
      .withConverter(FirestoreSDK.withConverter)
      .where("product.resourceId", "==", productId)
      .where("user.resourceId", "==", userId)
      .get();
    if (snapshot.size === 0) return;
    // Result
    return snapshot.docs[0].data() as unknown as Certificate;
  }
}
