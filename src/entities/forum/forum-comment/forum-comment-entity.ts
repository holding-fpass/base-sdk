import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IForumCommentClient {
  export interface IHTTPForumComment {
    resourceId: string;
    resourceType: ResourceType.COMMENT;
    postId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    isApproved: boolean;
    parentCommentId: string | null;
    text: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.COMMENT;
    postId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    isApproved: boolean;
    parentCommentId: string | null;
    text: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId?: IForumCommentClient.IProps['resourceId'];
    resourceType: IForumCommentClient.IProps['resourceType'];
    postId: IForumCommentClient.IProps['postId'];
    userId: IForumCommentClient.IProps['userId'];
    isReply: IForumCommentClient.IProps['isReply'];
    isGraded: IForumCommentClient.IProps['isGraded'];
    isApproved: IForumCommentClient.IProps['isApproved'];
    parentCommentId: IForumCommentClient.IProps['parentCommentId'];
    text: IForumCommentClient.IProps['text'];
    whitelabel: IForumCommentClient.IProps['whitelabel'];
    createdAt: IForumCommentClient.IProps['createdAt'];
    updatedAt: IForumCommentClient.IProps['updatedAt'];
    deletedAt: IForumCommentClient.IProps['deletedAt'];
  }
}

export class ForumCommentClient {
  private props: IForumCommentClient.IProps;

  public constructor(props: IForumCommentClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: props.resourceType,
      postId: props.postId,
      parentCommentId: props.parentCommentId || null,
      userId: props.userId,
      isReply: props.isReply || false,
      isGraded: props.isGraded || false,
      isApproved: props.isApproved || false,
      text: props.text,
      whitelabel: props.whitelabel,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IForumCommentClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get userId(): IForumCommentClient.IProps['userId'] {
    return this.props.userId;
  }

  public get isReply(): IForumCommentClient.IProps['isReply'] {
    return this.props.isReply;
  }

  public get isGraded(): IForumCommentClient.IProps['isGraded'] {
    return this.props.isGraded;
  }

  public get isApproved(): boolean {
    return this.props.isApproved;
  }

  public get text(): IForumCommentClient.IProps['text'] {
    return this.props.text;
  }

  public get createdAt(): IForumCommentClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IForumCommentClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IForumCommentClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }

  public get parentCommentId(): IForumCommentClient.IProps['parentCommentId'] {
    return this.props.parentCommentId;
  }

  public get whitelabel(): IForumCommentClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get postId(): IForumCommentClient.IProps['postId'] {
    return this.props.postId;
  }

  public get resourceType(): IForumCommentClient.IProps['resourceType'] {
    return this.props.resourceType;
  }
}
