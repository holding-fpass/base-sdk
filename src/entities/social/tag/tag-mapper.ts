import { TagClient, ITagClient } from "./tag-entity";

export class TagClientMapper {
  public static toApplication(tag: ITagClient.IHTTPTag): TagClient {
    return new TagClient({
      resourceId: tag.resourceId,
      resourceType: tag.resourceType,
      name: tag.name,
      communityId: tag.communityId,
      userId: tag.userId,
      whitelabel: tag.whitelabel,
      createdAt: new Date(tag.createdAt),
      updatedAt: new Date(tag.updatedAt),
    });
  }

  public static toHTTP(tag: TagClient): ITagClient.IHTTPTag {
    return {
      resourceId: tag.resourceId,
      resourceType: tag.resourceType,
      name: tag.name,
      communityId: tag.communityId,
      userId: tag.userId,
      whitelabel: tag.whitelabel,
      createdAt: tag.createdAt.toISOString(),
      updatedAt: tag.updatedAt.toISOString(),
    }
  }
}