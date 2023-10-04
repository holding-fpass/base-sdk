import { ResourceType } from "schema";
import { IClassCourseClient, ClassCourseClient } from "./class-course-entity";

export class ClassCourseClientMapper {
  public static toApplication(HTTPClassCourse: IClassCourseClient.IHTTPClassCourse): ClassCourseClient {
    return new ClassCourseClient({
      resourceId: HTTPClassCourse.resourceId,
      resourceType: ResourceType.CLASS_COURSE,
      name: HTTPClassCourse.name,
      courseId: HTTPClassCourse.courseId,
      classId: HTTPClassCourse.classId,
      finishedAt: HTTPClassCourse.finishedAt ? new Date(HTTPClassCourse.finishedAt) : HTTPClassCourse.finishedAt as null,
      whitelabel: HTTPClassCourse.whitelabel,
      createdAt: new Date(HTTPClassCourse.createdAt),
      updatedAt: new Date(HTTPClassCourse.updatedAt),
    })
  }

  public static toHTTP(classCourse: ClassCourseClient): IClassCourseClient.IHTTPClassCourse {
    return {
      resourceId: classCourse.resourceId,
      resourceType: classCourse.resourceType,
      name: classCourse.name,
      courseId: classCourse.courseId,
      classId: classCourse.classId,
      finishedAt: classCourse.finishedAt ? classCourse.finishedAt.toISOString() : null,
      whitelabel: classCourse.whitelabel,
      createdAt: classCourse.createdAt.toISOString(),
      updatedAt: classCourse.updatedAt.toISOString(),
    }
  }
}