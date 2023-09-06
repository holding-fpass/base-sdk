import { IUserClassClient, UserClassClient } from "./user-class-entity";

export class UserClassClientMapper {
  public static toApplication(HTTPUserClass: IUserClassClient.IHTTPUserClass): UserClassClient {
    return new UserClassClient({
      resourceId: HTTPUserClass.resourceId,
      resourceType: HTTPUserClass.resourceType,
      name: HTTPUserClass.name,
      channelId: HTTPUserClass.channelId,
      classId: HTTPUserClass.classId,
      startDate: new Date(HTTPUserClass.startDate),
      endDate: new Date(HTTPUserClass.endDate),
      whitelabel: HTTPUserClass.whitelabel,
      createdAt: new Date(HTTPUserClass.createdAt),
      updatedAt: new Date(HTTPUserClass.updatedAt),
      deletedAt: HTTPUserClass.deletedAt ? new Date(HTTPUserClass.deletedAt) : HTTPUserClass.deletedAt as null,
    })
  }

  public static toHTTP(userClass: UserClassClient): IUserClassClient.IHTTPUserClass {
    return {
      resourceId: userClass.resourceId,
      resourceType: userClass.resourceType,
      name: userClass.name,
      channelId: userClass.channelId,
      classId: userClass.classId,
      startDate: userClass.startDate.toISOString(),
      endDate: userClass.endDate.toISOString(),
      whitelabel: userClass.whitelabel,
      createdAt: userClass.createdAt.toISOString(),
      updatedAt: userClass.updatedAt.toISOString(),
      deletedAt: userClass.deletedAt ? userClass.deletedAt.toISOString() : userClass.deletedAt,
    }
  }
}