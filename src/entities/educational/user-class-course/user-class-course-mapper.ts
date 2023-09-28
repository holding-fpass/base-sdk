import { UserClassCourseClient, IUserClassCourseClient } from "./user-class-course-entity";

export class UserClassCourseClientMapper {
  public static toApplication(HTTPUserClassCourse: IUserClassCourseClient.IHTTPUserClassCourse): UserClassCourseClient {
    return new UserClassCourseClient({
      resourceId: HTTPUserClassCourse.resourceId,
      resourceType: HTTPUserClassCourse.resourceType,
      courseId: HTTPUserClassCourse.courseId,
      skipped: HTTPUserClassCourse.skipped,
      classId: HTTPUserClassCourse.classId,
      userId: HTTPUserClassCourse.userId,
      finishedAt: HTTPUserClassCourse.finishedAt ? new Date(HTTPUserClassCourse.finishedAt) : null,
      whitelabel: HTTPUserClassCourse.whitelabel,
      createdAt: new Date(HTTPUserClassCourse.createdAt),
      updatedAt: new Date(HTTPUserClassCourse.updatedAt),
      deletedAt: HTTPUserClassCourse.deletedAt ? new Date(HTTPUserClassCourse.deletedAt) : HTTPUserClassCourse.deletedAt as null,
    })
  }

  public static toHTTP(userClassCourse: UserClassCourseClient): IUserClassCourseClient.IHTTPUserClassCourse {
    return {
      resourceId: userClassCourse.resourceId,
      resourceType: userClassCourse.resourceType,
      courseId: userClassCourse.courseId,
      skipped: userClassCourse.skipped,
      classId: userClassCourse.classId,
      userId: userClassCourse.userId,
      finishedAt: userClassCourse.finishedAt ? userClassCourse.finishedAt.toISOString() : null,
      whitelabel: userClassCourse.whitelabel,
      createdAt: userClassCourse.createdAt.toISOString(),
      updatedAt: userClassCourse.updatedAt.toISOString(),
      deletedAt: userClassCourse.deletedAt ? userClassCourse.deletedAt.toISOString() : userClassCourse.deletedAt,
    }
  }
}