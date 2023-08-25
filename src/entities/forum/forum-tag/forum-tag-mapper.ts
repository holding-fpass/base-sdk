import { ForumTagClient, IForumTagClient } from "./forum-tag-entity";

export class ForumTagClientMapper {
  public static toApplication(forumTag: IForumTagClient.IHTTPForumTag): ForumTagClient {
    return new ForumTagClient({
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

  public static toHTTP(forumTag: ForumTagClient): IForumTagClient.IHTTPForumTag {
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