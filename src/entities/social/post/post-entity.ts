import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IPostClient {
  export interface IHTTPPost {
    resourceId: string;
    resourceType: ResourceType.POST;
    communityId: string;
    type: IPostClient.EType;
    value: number | null;
    imageUrl: string | null;
    url: string | null;
    fileUrl: string | null;
    title: string;
    description: string;
    ownerId: string;
    pinned: boolean | false;
    tags: string[];
    whitelabel: Whitelabel;
    token: string | null;
    allowed: boolean;
    expiresAt: string | null;
    createdAt: string;
    updatedAt: string;
  }

  export enum EType {
    AVALIATIVE = 'avaliative',
    NON_AVALIATIVE = 'non-avaliative',
    NON_INTERACTIVE = 'non-interactive',
  }

  export interface IPostMetadata {
    title: string;
    description?: string;
    domain: string;
    duration?: number;
    favicon?: string;
    images: string[];
    url: string;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.POST;
    communityId: string;
    type: IPostClient.EType;
    value: number | null;
    imageUrl: string | null;
    fileUrl: string | null;
    url: string | null;
    title: string;
    description: string;
    ownerId: string;
    pinned: boolean | false;
    tags: string[];
    token: string | null;
    whitelabel: Whitelabel;
    allowed: boolean;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId?: IPostClient.IProps['resourceId'];
    resourceType: IPostClient.IProps['resourceType'];
    ownerId: IPostClient.IProps['ownerId'];
    tags: IPostClient.IProps['tags'];
    communityId: IPostClient.IProps['communityId'];
    value?: IPostClient.IProps['value'];
    type: IPostClient.IProps['type'];
    pinned: IPostClient.IProps['pinned'];
    imageUrl?: IPostClient.IProps['imageUrl'];
    fileUrl?: IPostClient.IProps['fileUrl'];
    url?: IPostClient.IProps['url'];
    title: IPostClient.IProps['title'];
    description: IPostClient.IProps['description'];
    whitelabel: IPostClient.IProps['whitelabel'];
    allowed: IPostClient.IProps['allowed'];
    token?: IPostClient.IProps['token'];
    expiresAt?: IPostClient.IProps['expiresAt'];
    createdAt?: IPostClient.IProps['createdAt'];
    updatedAt?: IPostClient.IProps['updatedAt'];
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
      tags: props.tags || [],
      value: props.value || null,
      imageUrl: props.imageUrl || null,
      fileUrl: props.fileUrl || null,
      url: props.url || null,
      title: props.title,
      description: props.description,
      allowed: props.allowed,
      whitelabel: props.whitelabel,
      ownerId: props.ownerId,
      pinned: props.pinned,
      token: props.token || null,
      expiresAt: props.expiresAt || null,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }

  public get resourceId(): IPostClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IPostClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get pinned(): IPostClient.IProps['pinned'] {
    return this.props.pinned;
  }

  public pin(): void {
    this.props.pinned = true;

    this.update();
  }

  public unpin(): void {
    this.props.pinned = false;

    this.update();
  }

  public get token(): IPostClient.IProps['token'] {
    return this.props.token;
  }

  public get tags(): IPostClient.IProps['tags'] {
    return this.props.tags;
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

  public get allowed(): IPostClient.IProps['allowed'] {
    return this.props.allowed;
  }

  public get imageUrl(): IPostClient.IProps['imageUrl'] {
    return this.props.imageUrl;
  }

  public get fileUrl(): IPostClient.IProps['fileUrl'] {
    return this.props.fileUrl;
  }

  public get url(): IPostClient.IProps['url'] {
    return this.props.url;
  }

  public get communityId(): IPostClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get value(): IPostClient.IProps['value'] {
    return this.props.value;
  }

  public get whitelabel(): IPostClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get expiresAt(): IPostClient.IProps['expiresAt'] {
    return this.props.expiresAt;
  }

  public get createdAt(): IPostClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IPostClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public update(): void {
    this.props.updatedAt = new Date();
  }

  public clone() {
    return new PostClient(this.props);
  }
}
