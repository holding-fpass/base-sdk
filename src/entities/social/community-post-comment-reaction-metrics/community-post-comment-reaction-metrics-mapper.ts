import { CommunityPostCommentMetricsClient, ICommunityPostCommentMetricsClient } from "./community-post-comment-reaction-metrics-entity";


export class CommunityPostCommentMetricsClientMapper {
  public static toApplication(reactionMetrics: ICommunityPostCommentMetricsClient.IHTTPCommunityPostCommentMetrics): CommunityPostCommentMetricsClient {
    return new CommunityPostCommentMetricsClient({
      resourceId: reactionMetrics.resourceId,
      resourceType: reactionMetrics.resourceType,
      communityId: reactionMetrics.communityId,
      reactionsCount:reactionMetrics.reactionsCount,
      postId: reactionMetrics.postId,
      whitelabel: reactionMetrics.whitelabel,
      createdAt: new Date(reactionMetrics.createdAt),
      updatedAt: new Date(reactionMetrics.updatedAt),
    });
  }

  public static toHTTP(reactionMetrics: CommunityPostCommentMetricsClient): ICommunityPostCommentMetricsClient.IHTTPCommunityPostCommentMetrics {
    return {
      resourceId: reactionMetrics.resourceId,
      resourceType: reactionMetrics.resourceType,
      communityId: reactionMetrics.communityId,
      reactionsCount: reactionMetrics.reactionsCount,
      postId: reactionMetrics.postId,
      whitelabel: reactionMetrics.whitelabel,
      createdAt: reactionMetrics.createdAt.toISOString(),
      updatedAt: reactionMetrics.updatedAt.toISOString(),
    }
  }
}