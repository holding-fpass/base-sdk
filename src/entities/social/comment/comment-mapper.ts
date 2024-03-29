import { CommentClient, ICommentClient } from "./comment-entity";

export class CommentClientHTTPMapper {
  public static toApplication(comment: ICommentClient.IHTTPComment): CommentClient {
    return new CommentClient({
      resourceId: comment.resourceId,
      resourceType: comment.resourceType,
      whitelabel: comment.whitelabel,
      userId: comment.userId,
      communityId: comment.communityId,
      text: comment.text,
      postId: comment.postId,
      fileUrl: comment.fileUrl,
      isReply: comment.isReply,
      isGraded: comment.isGraded,
      parentCommentId: comment.parentCommentId,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    });
  }

  public static toHTTP(comment: CommentClient): ICommentClient.IHTTPComment {
    return {
      resourceId: comment.resourceId,
      resourceType: comment.resourceType,
      whitelabel: comment.whitelabel,
      userId: comment.userId,
      communityId: comment.communityId,
      fileUrl: comment.fileUrl,
      text: comment.text,
      postId: comment.postId,
      isReply: comment.isReply,
      isGraded: comment.isGraded,
      parentCommentId: comment.parentCommentId,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    }
  }
}