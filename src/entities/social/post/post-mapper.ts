import { PostClient, IPostClient } from "./post-entity";

export class PostClientMapper {
  public static toApplication(post: IPostClient.IHTTPPost): PostClient {
    return new PostClient({
      resourceId: post.resourceId,
      resourceType: post.resourceType,
      whitelabel: post.whitelabel,
      type: post.type,
      communityId: post.communityId,
      imageUrl: post.imageUrl,
      ownerId: post.ownerId,
      title: post.title,
      description: post.description,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }

  public static toHTTP(post: PostClient): IPostClient.IHTTPPost {
    return {
      resourceId: post.resourceId,
      resourceType: post.resourceType,
      whitelabel: post.whitelabel,
      type: post.type,
      communityId: post.communityId,
      imageUrl: post.imageUrl,
      ownerId: post.ownerId,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }
  }
}