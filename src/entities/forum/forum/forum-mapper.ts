import { ForumClient, IForumClient } from "./forum-entity";

export class ForumClientMapper {
  public static toApplication(forum: IForumClient.IHTTPForum): ForumClient {
    return new ForumClient({
      resourceId: forum.resourceId,
      resourceType: forum.resourceType,
      channelId: forum.channelId,
      courseId: forum.courseId,
      members: forum.members,
      type: forum.type,
      moderators: forum.moderators,
      isPrivate: forum.isPrivate,
      name: forum.name,
      whitelabel: forum.whitelabel,
      ownerId: forum.ownerId,
      createdAt: new Date(forum.createdAt),
      updatedAt: new Date(forum.updatedAt),
      deletedAt: forum.deletedAt ? new Date(forum.deletedAt) : null,
    });
  }

  public static toHTTP(forum: ForumClient): IForumClient.IHTTPForum {
    return {
      resourceId: forum.resourceId,
      resourceType: forum.resourceType,
      channelId: forum.channelId,
      courseId: forum.courseId,
      members: forum.members,
      type: forum.type,
      moderators: forum.moderators,
      isPrivate: forum.isPrivate,
      name: forum.name,
      whitelabel: forum.whitelabel,
      ownerId: forum.ownerId,
      createdAt: forum.createdAt.toISOString(),
      updatedAt: forum.updatedAt.toISOString(),
      deletedAt: forum.deletedAt ? forum.deletedAt.toISOString() : null,
    }
  }
}