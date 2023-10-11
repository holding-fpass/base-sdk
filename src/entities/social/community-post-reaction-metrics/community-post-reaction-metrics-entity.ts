import { IReactionClient } from 'entities/system/reaction';
import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace ICommunityPostReactionMetricsClient {
  export interface IHTTPCommunityPostReactionMetrics {
    resourceId: string;
    resourceType: ResourceType.REACTION_METRICS;
    whitelabel: Whitelabel;
    communityId: string;
    postId: string;
    reactionsCount: Record<IReactionClient.EEmoji | 'total', number>;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.REACTION_METRICS;
    whitelabel: Whitelabel;
    communityId: string;
    postId: string;
    reactionsCount: Record<IReactionClient.EEmoji | 'total', number>;
    commentsCount: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId?: ICommunityPostReactionMetricsClient.IProps['resourceId'];
    resourceType?: ICommunityPostReactionMetricsClient.IProps['resourceType'];
    communityId: ICommunityPostReactionMetricsClient.IProps['communityId'];
    postId: ICommunityPostReactionMetricsClient.IProps['postId'];
    reactionsCount?: ICommunityPostReactionMetricsClient.IProps['reactionsCount'];
    commentsCount?: ICommunityPostReactionMetricsClient.IProps['commentsCount'];
    whitelabel: ICommunityPostReactionMetricsClient.IProps['whitelabel'];
    createdAt?: ICommunityPostReactionMetricsClient.IProps['createdAt'];
    updatedAt?: ICommunityPostReactionMetricsClient.IProps['updatedAt'];
  }
}

export class CommunityPostReactionMetricsClient {
  private props: ICommunityPostReactionMetricsClient.IProps;

  public constructor(props: ICommunityPostReactionMetricsClient.IConstructor) {
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
      commentsCount: props.commentsCount || 0,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }

  public get resourceId(): ICommunityPostReactionMetricsClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): ICommunityPostReactionMetricsClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get whitelabel(): ICommunityPostReactionMetricsClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get communityId(): ICommunityPostReactionMetricsClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get postId(): ICommunityPostReactionMetricsClient.IProps['postId'] {
    return this.props.postId;
  }

  public get reactionsCount(): ICommunityPostReactionMetricsClient.IProps['reactionsCount'] {
    return this.props.reactionsCount;
  }

  public get commentsCount(): ICommunityPostReactionMetricsClient.IProps['commentsCount'] {
    return this.props.commentsCount;
  }

  public get createdAt(): ICommunityPostReactionMetricsClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): ICommunityPostReactionMetricsClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}
