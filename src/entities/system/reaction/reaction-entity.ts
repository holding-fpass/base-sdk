import { ResourceType, Whitelabel } from '../../../schema';
import { v4 as uuid } from 'uuid';

export namespace IReactionClient {
  export enum EEmoji {
    HEART = 'heart',
    THUMBS_UP = 'thumbs-up',
    CLAP = 'clap',
    STAR_STRUCK = 'star-struck',
    SAD_BUT_RELIEVED_FACE = 'sad-but-relieved-face',
  }
  export interface IHTTPReaction {
    resourceId: string;
    resourceType: ResourceType.REACTION;
    userId: string;
    contentId?: string | null;
    communityId?: string | null;
    courseId?: string | null;
    postId?: string | null;
    commentId?: string | null;
    whitelabel: Whitelabel;
    emoji: IReactionClient.EEmoji;
    createdAt: string;
    updatedAt: string;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.REACTION;
    userId: string;
    contentId?: string | null;
    communityId?: string | null;
    courseId?: string | null;
    postId?: string | null;
    commentId?: string | null;
    whitelabel: Whitelabel;
    emoji: IReactionClient.EEmoji;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId: IReactionClient.IProps['resourceId'];
    resourceType: IReactionClient.IProps['resourceType'];
    userId: IReactionClient.IProps['userId'];
    contentId?: IReactionClient.IProps['contentId'];
    communityId?: IReactionClient.IProps['communityId'];
    courseId?: IReactionClient.IProps['courseId'];
    postId?: IReactionClient.IProps['postId'];
    commentId?: IReactionClient.IProps['commentId'];
    whitelabel: IReactionClient.IProps['whitelabel'];
    emoji: IReactionClient.IProps['emoji'];
    createdAt: IReactionClient.IProps['createdAt'];
    updatedAt: IReactionClient.IProps['updatedAt'];
  }
}

export class ReactionClient {
  private props: IReactionClient.IProps;

  public constructor(props: IReactionClient.IProps) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.REACTION,
      emoji: props.emoji,
      userId: props.userId,
      whitelabel: props.whitelabel,
      contentId: props.contentId || null,
      communityId: props.communityId || null,
      courseId: props.courseId || null,
      postId: props.postId || null,
      commentId: props.commentId || null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  public get resourceId(): IReactionClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IReactionClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get emoji(): IReactionClient.IProps['emoji'] {
    return this.props.emoji;
  }

  public get userId(): IReactionClient.IProps['userId'] {
    return this.props.userId;
  }

  public get whitelabel(): IReactionClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get contentId(): IReactionClient.IProps['contentId'] {
    return this.props.contentId;
  }

  public get communityId(): IReactionClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get courseId(): IReactionClient.IProps['courseId'] {
    return this.props.courseId;
  }

  public get postId(): IReactionClient.IProps['postId'] {
    return this.props.postId;
  }

  public get commentId(): IReactionClient.IProps['commentId'] {
    return this.props.commentId;
  }
  public get createdAt(): IReactionClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IReactionClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}
