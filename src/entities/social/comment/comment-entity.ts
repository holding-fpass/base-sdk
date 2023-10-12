import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace ICommentClient {
  export interface IHTTPComment {
    resourceId: string;
    resourceType: ResourceType.COMMENT;
    postId: string;
    communityId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    fileUrl: string | null;
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
    communityId: string;
    userId: string;
    isReply: boolean;
    isGraded: boolean;
    fileUrl: string | null;
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
    communityId: ICommentClient.IProps['communityId'];
    userId: ICommentClient.IProps['userId'];
    isReply: ICommentClient.IProps['isReply'];
    isGraded: ICommentClient.IProps['isGraded'];
    fileUrl: ICommentClient.IProps['fileUrl']
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
      communityId: props.communityId,
      parentCommentId: props.parentCommentId || null,
      userId: props.userId,
      fileUrl: props.fileUrl,
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

  public get communityId(): ICommentClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get isReply(): ICommentClient.IProps['isReply'] {
    return this.props.isReply;
  }

  public get isGraded(): ICommentClient.IProps['isGraded'] {
    return this.props.isGraded;
  }

  public setGraded(): void {
    this.props.isGraded = true;

    this.update();
  }

  public setNotGraded(): void {
    this.props.isGraded = false;

    this.update();
  }

  public get text(): ICommentClient.IProps['text'] {
    return this.props.text;
  }

  public get fileUrl(): ICommentClient.IProps['fileUrl'] {
    return this.props.fileUrl;
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

  public update(): void {
    this.props.updatedAt = new Date();
  }
}
