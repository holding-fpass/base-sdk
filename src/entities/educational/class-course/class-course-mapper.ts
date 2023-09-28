import { ResourceType } from "schema";
import { IClassCourseClient, ClassCourseClient } from "./class-course-entity";

export class ClassCourseClientMapper {
  public static toApplication(HTTPClassCourse: IClassCourseClient.IHTTPClassCourse): ClassCourseClient {
    return new ClassCourseClient({
      resourceId: HTTPClassCourse.resourceId,
      resourceType: ResourceType.CLASS_COURSE,
      courseId: HTTPClassCourse.courseId,
      classId: HTTPClassCourse.classId,
      finishedAt: HTTPClassCourse.finishedAt ? new Date(HTTPClassCourse.finishedAt) : HTTPClassCourse.finishedAt as null,
      whitelabel: HTTPClassCourse.whitelabel,
      createdAt: new Date(HTTPClassCourse.createdAt),
      updatedAt: new Date(HTTPClassCourse.updatedAt),
      deletedAt: HTTPClassCourse.deletedAt ? new Date(HTTPClassCourse.deletedAt) : HTTPClassCourse.deletedAt as null,
    })
  }

  public static toHTTP(userClass: ClassCourseClient): IClassCourseClient.IHTTPClassCourse {
    return {
      resourceId: userClass.resourceId,
      resourceType: userClass.resourceType,
      courseId: userClass.courseId,
      classId: userClass.classId,
      finishedAt: userClass.finishedAt ? userClass.finishedAt.toISOString() : null,
      whitelabel: userClass.whitelabel,
      createdAt: userClass.createdAt.toISOString(),
      updatedAt: userClass.updatedAt.toISOString(),
      deletedAt: userClass.deletedAt ? userClass.deletedAt.toISOString() : null,
    }
  }
}