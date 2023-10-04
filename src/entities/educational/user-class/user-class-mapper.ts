import { IUserClassClient, UserClassClient } from "./user-class-entity";

export class UserClassClientMapper {
  public static toApplication(HTTPUserClass: IUserClassClient.IHTTPUserClass): UserClassClient {
    return new UserClassClient({
      resourceId: HTTPUserClass.resourceId,
      resourceType: HTTPUserClass.resourceType,
      name: HTTPUserClass.name,
      channelId: HTTPUserClass.channelId,
      userId: HTTPUserClass.userId,
      classId: HTTPUserClass.classId,
      startDate: new Date(HTTPUserClass.startDate),
      endDate: new Date(HTTPUserClass.endDate),
      whitelabel: HTTPUserClass.whitelabel,
      createdAt: new Date(HTTPUserClass.createdAt),
      updatedAt: new Date(HTTPUserClass.updatedAt),
    })
  }

  public static toHTTP(userClass: UserClassClient): IUserClassClient.IHTTPUserClass {
    return {
      resourceId: userClass.resourceId,
      resourceType: userClass.resourceType,
      name: userClass.name,
      channelId: userClass.channelId,
      userId: userClass.userId,
      classId: userClass.classId,
      startDate: userClass.startDate.toISOString(),
      endDate: userClass.endDate.toISOString(),
      whitelabel: userClass.whitelabel,
      createdAt: userClass.createdAt.toISOString(),
      updatedAt: userClass.updatedAt.toISOString(),
    }
  }
}