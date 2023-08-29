import { IUserClass, UserClassClient } from "./user-class-entity";

export class UserClassClientMapper {
  public static toApplication(HTTPUserClass: IUserClass.IHTTPUserClass): UserClassClient {
    return new UserClassClient({
      resourceId: HTTPUserClass.resourceId,
      resourceType: HTTPUserClass.resourceType,
      name: HTTPUserClass.name,
      code: HTTPUserClass.code,
      channelId: HTTPUserClass.channelId,
      userId: HTTPUserClass.userId,
      interval: HTTPUserClass.interval,
      intervalNumber: HTTPUserClass.intervalNumber,
      year: HTTPUserClass.year,
      startDate: new Date(HTTPUserClass.startDate),
      endDate: new Date(HTTPUserClass.endDate),
      whitelabel: HTTPUserClass.whitelabel,
      createdAt: new Date(HTTPUserClass.createdAt),
      updatedAt: new Date(HTTPUserClass.updatedAt),
      deletedAt: HTTPUserClass.deletedAt ? new Date(HTTPUserClass.deletedAt) : HTTPUserClass.deletedAt as null,
    })
  }

  public static toHTTP(userClass: UserClassClient): IUserClass.IHTTPUserClass {
    return {
      resourceId: userClass.resourceId,
      resourceType: userClass.resourceType,
      name: userClass.name,
      code: userClass.code,
      channelId: userClass.channelId,
      userId: userClass.userId,
      interval: userClass.interval,
      intervalNumber: userClass.intervalNumber,
      year: userClass.year,
      startDate: userClass.startDate.toISOString(),
      endDate: userClass.endDate.toISOString(),
      whitelabel: userClass.whitelabel,
      createdAt: userClass.createdAt.toISOString(),
      updatedAt: userClass.updatedAt.toISOString(),
      deletedAt: userClass.deletedAt ? userClass.deletedAt.toISOString() : userClass.deletedAt,
    }
  }
}