import { CommunityPostReactionMetricsClient, ICommunityPostReactionMetricsClient } from "./community-post-reaction-metrics-entity";


export class CommunityPostReactionMetricsClientMapper {
  public static toApplication(reactionMetrics: ICommunityPostReactionMetricsClient.IHTTPCommunityPostReactionMetrics): CommunityPostReactionMetricsClient {
    return new CommunityPostReactionMetricsClient({
      resourceId: reactionMetrics.resourceId,
      resourceType: reactionMetrics.resourceType,
      communityId: reactionMetrics.communityId,
      commentsCount: reactionMetrics.commentsCount,
      reactionsCount:reactionMetrics.reactionsCount,
      postId: reactionMetrics.postId,
      whitelabel: reactionMetrics.whitelabel,
      createdAt: new Date(reactionMetrics.createdAt),
      updatedAt: new Date(reactionMetrics.updatedAt),
    });
  }

  public static toHTTP(reactionMetrics: CommunityPostReactionMetricsClient): ICommunityPostReactionMetricsClient.IHTTPCommunityPostReactionMetrics {
    return {
      resourceId: reactionMetrics.resourceId,
      resourceType: reactionMetrics.resourceType,
      communityId: reactionMetrics.communityId,
      commentsCount: reactionMetrics.commentsCount,
      reactionsCount: reactionMetrics.reactionsCount,
      postId: reactionMetrics.postId,
      whitelabel: reactionMetrics.whitelabel,
      createdAt: reactionMetrics.createdAt.toISOString(),
      updatedAt: reactionMetrics.updatedAt.toISOString(),
    }
  }
}