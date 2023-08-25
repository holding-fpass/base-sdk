import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IForumPostClient {
  export interface IHTTPForumPost {
    resourceId: string;
    resourceType: ResourceType.FORUM_POST;
    forumId: string;
    type: IForumPostClient.EType;
    imageUrl: string | null;
    title: string;
    description: string;
    ownerId: string;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }
  
  export enum EType {
    AVALIATIVE = 'avaliative',
    NON_AVALIATIVE = 'non-avaliative',
    NON_INTERACTIVE = 'non-interactive',
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.FORUM_POST;
    forumId: string;
    type: IForumPostClient.EType;
    imageUrl: string | null;
    title: string;
    description: string;
    ownerId: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId?: IForumPostClient.IProps['resourceId'];
    resourceType: IForumPostClient.IProps['resourceType'];
    ownerId: IForumPostClient.IProps['ownerId'];
    forumId: IForumPostClient.IProps['forumId'];
    type: IForumPostClient.IProps['type'];
    imageUrl?: IForumPostClient.IProps['imageUrl'];
    title: IForumPostClient.IProps['title'];
    description: IForumPostClient.IProps['description'];
    whitelabel: IForumPostClient.IProps['whitelabel'];
    createdAt?: IForumPostClient.IProps['createdAt'];
    updatedAt?: IForumPostClient.IProps['updatedAt'];
    deletedAt?: IForumPostClient.IProps['deletedAt'];
  }
}

export class ForumPostClient {
  private props: IForumPostClient.IProps;

  public constructor(props: IForumPostClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: props.resourceType,
      type: props.type,
      forumId: props.forumId,
      imageUrl: props.imageUrl || null,
      title: props.title,
      description: props.description,
      whitelabel: props.whitelabel,
      ownerId: props.ownerId,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IForumPostClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IForumPostClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get title(): IForumPostClient.IProps['title'] {
    return this.props.title;
  }

  public get description(): IForumPostClient.IProps['description'] {
    return this.props.description;
  }

  public get ownerId(): IForumPostClient.IProps['ownerId'] {
    return this.props.ownerId;
  }

  public get type(): IForumPostClient.IProps['type'] {
    return this.props.type;
  }

  public get imageUrl(): IForumPostClient.IProps['imageUrl'] {
    return this.props.imageUrl;
  }

  public get forumId(): IForumPostClient.IProps['forumId'] {
    return this.props.forumId;
  }

  public get whitelabel(): IForumPostClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IForumPostClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IForumPostClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IForumPostClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
