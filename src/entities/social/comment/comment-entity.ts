import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace ICommentClient {
  export interface IHTTPComment {
    resourceId: string;
    resourceType: ResourceType.COMMENT;
    postId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    parentCommentId: string | null;
    text: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.COMMENT;
    postId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    parentCommentId: string | null;
    text: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId?: ICommentClient.IProps['resourceId'];
    resourceType: ICommentClient.IProps['resourceType'];
    postId: ICommentClient.IProps['postId'];
    userId: ICommentClient.IProps['userId'];
    isReply: ICommentClient.IProps['isReply'];
    isGraded: ICommentClient.IProps['isGraded'];
    parentCommentId: ICommentClient.IProps['parentCommentId'];
    text: ICommentClient.IProps['text'];
    whitelabel: ICommentClient.IProps['whitelabel'];
    createdAt: ICommentClient.IProps['createdAt'];
    updatedAt: ICommentClient.IProps['updatedAt'];
  }
}

export class CommentClient {
  private props: ICommentClient.IProps;

  public constructor(props: ICommentClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: props.resourceType,
      postId: props.postId,
      parentCommentId: props.parentCommentId || null,
      userId: props.userId,
      isReply: props.isReply || false,
      isGraded: props.isGraded || false,
      text: props.text,
      whitelabel: props.whitelabel,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  public get resourceId(): ICommentClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get userId(): ICommentClient.IProps['userId'] {
    return this.props.userId;
  }

  public get isReply(): ICommentClient.IProps['isReply'] {
    return this.props.isReply;
  }

  public get isGraded(): ICommentClient.IProps['isGraded'] {
    return this.props.isGraded;
  }

  public get text(): ICommentClient.IProps['text'] {
    return this.props.text;
  }

  public get createdAt(): ICommentClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): ICommentClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get parentCommentId(): ICommentClient.IProps['parentCommentId'] {
    return this.props.parentCommentId;
  }

  public get whitelabel(): ICommentClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get postId(): ICommentClient.IProps['postId'] {
    return this.props.postId;
  }

  public get resourceType(): ICommentClient.IProps['resourceType'] {
    return this.props.resourceType;
  }
}
