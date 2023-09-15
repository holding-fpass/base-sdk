import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IPostClient {
  export interface IHTTPPost {
    resourceId: string;
    resourceType: ResourceType.POST;
    communityId: string;
    type: IPostClient.EType;
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
    resourceType: ResourceType.POST;
    communityId: string;
    type: IPostClient.EType;
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
    resourceId?: IPostClient.IProps['resourceId'];
    resourceType: IPostClient.IProps['resourceType'];
    ownerId: IPostClient.IProps['ownerId'];
    communityId: IPostClient.IProps['communityId'];
    type: IPostClient.IProps['type'];
    imageUrl?: IPostClient.IProps['imageUrl'];
    title: IPostClient.IProps['title'];
    description: IPostClient.IProps['description'];
    whitelabel: IPostClient.IProps['whitelabel'];
    createdAt?: IPostClient.IProps['createdAt'];
    updatedAt?: IPostClient.IProps['updatedAt'];
    deletedAt?: IPostClient.IProps['deletedAt'];
  }
}

export class PostClient {
  private props: IPostClient.IProps;

  public constructor(props: IPostClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: props.resourceType,
      type: props.type,
      communityId: props.communityId,
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

  public get resourceId(): IPostClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IPostClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get title(): IPostClient.IProps['title'] {
    return this.props.title;
  }

  public get description(): IPostClient.IProps['description'] {
    return this.props.description;
  }

  public get ownerId(): IPostClient.IProps['ownerId'] {
    return this.props.ownerId;
  }

  public get type(): IPostClient.IProps['type'] {
    return this.props.type;
  }

  public get imageUrl(): IPostClient.IProps['imageUrl'] {
    return this.props.imageUrl;
  }

  public get communityId(): IPostClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get whitelabel(): IPostClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IPostClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IPostClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IPostClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
