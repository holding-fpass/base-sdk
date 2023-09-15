import { CommunityClient, ICommunityClient } from "./community-entity";

export class CommunityClientMapper {
  public static toApplication(community: ICommunityClient.IHTTPCommunity): CommunityClient {
    return new CommunityClient({
      resourceId: community.resourceId,
      resourceType: community.resourceType,
      channelId: community.channelId,
      courseId: community.courseId,
      members: community.members,
      type: community.type,
      moderators: community.moderators,
      isPrivate: community.isPrivate,
      name: community.name,
      description: community.description,
      whitelabel: community.whitelabel,
      ownerId: community.ownerId,
      createdAt: new Date(community.createdAt),
      updatedAt: new Date(community.updatedAt),
      deletedAt: community.deletedAt ? new Date(community.deletedAt) : null,
    });
  }

  public static toHTTP(community: CommunityClient): ICommunityClient.IHTTPCommunity {
    return {
      resourceId: community.resourceId,
      resourceType: community.resourceType,
      channelId: community.channelId,
      courseId: community.courseId,
      members: community.members,
      type: community.type,
      moderators: community.moderators,
      isPrivate: community.isPrivate,
      name: community.name,
      description: community.description,
      whitelabel: community.whitelabel,
      ownerId: community.ownerId,
      createdAt: community.createdAt.toISOString(),
      updatedAt: community.updatedAt.toISOString(),
      deletedAt: community.deletedAt ? community.deletedAt.toISOString() : null,
    }
  }
}