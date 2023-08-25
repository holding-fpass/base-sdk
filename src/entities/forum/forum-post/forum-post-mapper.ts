import { ForumPostClient, IForumPostClient } from "./forum-post-entity";

export class ForumPostClientMapper {
  public static toApplication(forumPost: IForumPostClient.IHTTPForumPost): ForumPostClient {
    return new ForumPostClient({
      resourceId: forumPost.resourceId,
      resourceType: forumPost.resourceType,
      whitelabel: forumPost.whitelabel,
      type: forumPost.type,
      forumId: forumPost.forumId,
      imageUrl: forumPost.imageUrl,
      ownerId: forumPost.ownerId,
      title: forumPost.title,
      description: forumPost.description,
      createdAt: new Date(forumPost.createdAt),
      updatedAt: new Date(forumPost.updatedAt),
      deletedAt: forumPost.deletedAt ? new Date(forumPost.deletedAt) : null,
    });
  }

  public static toHTTP(forumPost: ForumPostClient): IForumPostClient.IHTTPForumPost {
    return {
      resourceId: forumPost.resourceId,
      resourceType: forumPost.resourceType,
      whitelabel: forumPost.whitelabel,
      type: forumPost.type,
      forumId: forumPost.forumId,
      imageUrl: forumPost.imageUrl,
      ownerId: forumPost.ownerId,
      title: forumPost.title,
      description: forumPost.description,
      createdAt: forumPost.createdAt.toISOString(),
      updatedAt: forumPost.updatedAt.toISOString(),
      deletedAt: forumPost.deletedAt ? forumPost.deletedAt.toISOString() : null,
    }
  }
}