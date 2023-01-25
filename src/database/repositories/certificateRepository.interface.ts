import { Certificate } from "../../schema";
import { ICommonRepository } from "./commonRepository.interface";

export interface ICertificateRepositoryFindByCourseParams {
  productId: string;
  userId: string;
}

export interface ICertificateRepository extends ICommonRepository<Certificate> {
  findByCourse(
    params: ICertificateRepositoryFindByCourseParams
  ): Promise<Certificate | undefined>;
}
