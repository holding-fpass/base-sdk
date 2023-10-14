import { ReactionClient, IReactionClient } from "./reaction-entity";

export class ReactionClientMapper {
  public static toApplication(reaction: IReactionClient.IHTTPReaction): ReactionClient {
    return new ReactionClient({
      resourceId: reaction.resourceId,
      resourceType: reaction.resourceType,
      userId: reaction.userId,
      emoji: reaction.emoji,
      commentId: reaction.commentId,
      communityId: reaction.communityId,
      contentId: reaction.contentId,
      courseId: reaction.courseId,
      postId: reaction.postId,
      whitelabel: reaction.whitelabel,
      createdAt: new Date(reaction.createdAt),
      updatedAt: new Date(reaction.updatedAt),
    });
  }

  public static toHTTP(reaction: ReactionClient): IReactionClient.IHTTPReaction {
    return {
      resourceId: reaction.resourceId,
      resourceType: reaction.resourceType,
      userId: reaction.userId,
      emoji: reaction.emoji.name,
      commentId: reaction.commentId,
      communityId: reaction.communityId,
      contentId: reaction.contentId,
      courseId: reaction.courseId,
      postId: reaction.postId,
      whitelabel: reaction.whitelabel,
      createdAt: reaction.createdAt.toISOString(),
      updatedAt: reaction.updatedAt.toISOString(),
    }
  }
}