import { IClassClient, ClassClient } from "./class-entity";

export class ClassClientMapper {
  public static toApplication(HTTPClass: IClassClient.IHTTPClass): ClassClient {
    return new ClassClient({
      resourceId: HTTPClass.resourceId,
      resourceType: HTTPClass.resourceType,
      name: HTTPClass.name,
      code: HTTPClass.code,
      channelId: HTTPClass.channelId,
      users: HTTPClass.users,
      interval: HTTPClass.interval,
      intervalNumber: HTTPClass.intervalNumber,
      year: HTTPClass.year,
      startDate: new Date(HTTPClass.startDate),
      endDate: new Date(HTTPClass.endDate),
      whitelabel: HTTPClass.whitelabel,
      createdAt: new Date(HTTPClass.createdAt),
      updatedAt: new Date(HTTPClass.updatedAt),
      deletedAt: HTTPClass.deletedAt ? new Date(HTTPClass.deletedAt) : HTTPClass.deletedAt as null,
    })
  }

  public static toHTTP(userClass: ClassClient): IClassClient.IHTTPClass {
    return {
      resourceId: userClass.resourceId,
      resourceType: userClass.resourceType,
      name: userClass.name,
      code: userClass.code,
      channelId: userClass.channelId,
      users: userClass.users,
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