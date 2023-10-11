import { IReactionClient } from 'entities/system/reaction';
import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace ICommunityPostCommentMetricsClient {
  export interface IHTTPCommunityPostCommentMetrics {
    resourceId: string;
    resourceType: ResourceType.REACTION_METRICS;
    whitelabel: Whitelabel;
    communityId: string;
    postId: string;
    commentId: string;
    reactionsCount: Record<IReactionClient.EEmoji | 'total', number>;
    createdAt: string;
    updatedAt: string;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.REACTION_METRICS;
    whitelabel: Whitelabel;
    communityId: string;
    postId: string;
    commentId: string;
    reactionsCount: Record<IReactionClient.EEmoji | 'total', number>;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId?: ICommunityPostCommentMetricsClient.IProps['resourceId'];
    resourceType?: ICommunityPostCommentMetricsClient.IProps['resourceType'];
    communityId: ICommunityPostCommentMetricsClient.IProps['communityId'];
    postId: ICommunityPostCommentMetricsClient.IProps['postId'];
    commentId: ICommunityPostCommentMetricsClient.IProps['commentId'];
    reactionsCount?: ICommunityPostCommentMetricsClient.IProps['reactionsCount'];
    whitelabel: ICommunityPostCommentMetricsClient.IProps['whitelabel'];
    createdAt?: ICommunityPostCommentMetricsClient.IProps['createdAt'];
    updatedAt?: ICommunityPostCommentMetricsClient.IProps['updatedAt'];
  }
}

export class CommunityPostCommentMetricsClient {
  private props: ICommunityPostCommentMetricsClient.IProps;

  public constructor(props: ICommunityPostCommentMetricsClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.REACTION_METRICS,
      reactionsCount: props.reactionsCount || {
        [IReactionClient.EEmoji.HEART]: 0,
        [IReactionClient.EEmoji.THUMBS_UP]: 0,
        [IReactionClient.EEmoji.CLAP]: 0,
        [IReactionClient.EEmoji.STAR_STRUCK]: 0,
        [IReactionClient.EEmoji.SAD_BUT_RELIEVED_FACE]: 0,
        total: 0,
      },
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }

  public get resourceId(): ICommunityPostCommentMetricsClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): ICommunityPostCommentMetricsClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get whitelabel(): ICommunityPostCommentMetricsClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get communityId(): ICommunityPostCommentMetricsClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get postId(): ICommunityPostCommentMetricsClient.IProps['postId'] {
    return this.props.postId;
  }

  public get commentId(): ICommunityPostCommentMetricsClient.IProps['commentId'] {
    return this.props.commentId;
  }

  public get reactionsCount(): ICommunityPostCommentMetricsClient.IProps['reactionsCount'] {
    return this.props.reactionsCount;
  }

  public get createdAt(): ICommunityPostCommentMetricsClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): ICommunityPostCommentMetricsClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}
