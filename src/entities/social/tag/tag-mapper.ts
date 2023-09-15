import { TagClient, ITagClient } from "./tag-entity";

export class TagClientMapper {
  public static toApplication(forumTag: ITagClient.IHTTPTag): TagClient {
    return new TagClient({
      resourceId: forumTag.resourceId,
      resourceType: forumTag.resourceType,
      name: forumTag.name,
      forumId: forumTag.forumId,
      userId: forumTag.userId,
      whitelabel: forumTag.whitelabel,
      createdAt: forumTag.createdAt,
      updatedAt: forumTag.updatedAt,
      deletedAt: forumTag.deletedAt,
    });
  }

  public static toHTTP(forumTag: TagClient): ITagClient.IHTTPTag {
    return {
      resourceId: forumTag.resourceId,
      resourceType: forumTag.resourceType,
      name: forumTag.name,
      forumId: forumTag.forumId,
      userId: forumTag.userId,
      whitelabel: forumTag.whitelabel,
      createdAt: forumTag.createdAt,
      updatedAt: forumTag.updatedAt,
      deletedAt: forumTag.deletedAt,
    }
  }
}