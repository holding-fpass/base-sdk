import { ForumCommentClient, IForumCommentClient } from "./forum-comment-entity";

export class ForumCommentClientMapper {
  public static toApplication(forumComment: IForumCommentClient.IHTTPForumComment): ForumCommentClient {
    return new ForumCommentClient({
      resourceId: forumComment.resourceId,
      resourceType: forumComment.resourceType,
      whitelabel: forumComment.whitelabel,
      userId: forumComment.userId,
      text: forumComment.text,
      postId: forumComment.postId,
      isReply: forumComment.isReply,
      isGraded: forumComment.isGraded,
      isApproved: forumComment.isApproved,
      parentCommentId: forumComment.parentCommentId,
      createdAt: new Date(forumComment.createdAt),
      updatedAt: new Date(forumComment.updatedAt),
      deletedAt: forumComment.deletedAt ? new Date(forumComment.deletedAt) : null,
    });
  }

  public static toHTTP(forumComment: ForumCommentClient): IForumCommentClient.IHTTPForumComment {
    return {
      resourceId: forumComment.resourceId,
      resourceType: forumComment.resourceType,
      whitelabel: forumComment.whitelabel,
      userId: forumComment.userId,
      text: forumComment.text,
      postId: forumComment.postId,
      isReply: forumComment.isReply,
      isGraded: forumComment.isGraded,
      isApproved: forumComment.isApproved,
      parentCommentId: forumComment.parentCommentId,
      createdAt: forumComment.createdAt.toISOString(),
      updatedAt: forumComment.updatedAt.toISOString(),
      deletedAt: forumComment.deletedAt ? forumComment.deletedAt.toISOString() : null,
    }
  }
}