import { PostClient, IPostClient } from './post-entity';

export class PostClientMapper {
  public static toApplication(post: IPostClient.IHTTPPost): PostClient {
    return new PostClient({
      resourceId: post.resourceId,
      resourceType: post.resourceType,
      communityId: post.communityId,
      type: post.type,
      value: post.value,
      imageUrl: post.imageUrl,
      url: post.url,
      title: post.title,
      description: post.description,
      ownerId: post.ownerId,
      pinned: post.pinned,
      tags: post.tags,
      whitelabel: post.whitelabel,
      allowed: post.allowed,
      expiresAt: post.expiresAt ? new Date(post.expiresAt) : null,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }

  public static toHTTP(post: PostClient): IPostClient.IHTTPPost {
    return {
      resourceId: post.resourceId,
      resourceType: post.resourceType,
      communityId: post.communityId,
      type: post.type,
      value: post.value,
      imageUrl: post.imageUrl,
      url: post.url,
      title: post.title,
      description: post.description,
      ownerId: post.ownerId,
      pinned: post.pinned,
      tags: post.tags,
      whitelabel: post.whitelabel,
      allowed: post.allowed,
      expiresAt: post.expiresAt ? post.expiresAt.toISOString() : null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }
}
