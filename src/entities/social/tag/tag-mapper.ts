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
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt,
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
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      deletedAt: tag.deletedAt,
    }
  }
}