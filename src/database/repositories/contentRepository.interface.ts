import { Content } from "../../schema";
import { ICommonRepository } from "./commonRepository.interface";

export interface IContentRepositoryFindByCourseParams {
  courseId: string;
}

export interface IContentRepository extends ICommonRepository<Content> {
  findByCourse(
    params: IContentRepositoryFindByCourseParams
  ): Promise<Content[] | undefined>;
}
