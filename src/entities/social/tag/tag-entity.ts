import { ResourceType, Whitelabel } from "schema";

export namespace ITagClient {
  export interface IHTTPTag {
    resourceId: string;
    resourceType: ResourceType.TAG;
    name: string;
    communityId: string;
    userId: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.TAG;
    name: string;
    communityId: string;
    userId: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId: ITagClient.IProps['resourceId'];
    resourceType: ITagClient.IProps['resourceType'];
    name: ITagClient.IProps['name'];
    communityId: ITagClient.IProps['communityId'];
    userId: ITagClient.IProps['userId'];
    whitelabel: ITagClient.IProps['whitelabel'];
    createdAt?: ITagClient.IProps['createdAt'];
    updatedAt?: ITagClient.IProps['updatedAt'];
  }
}

export class TagClient {
  private props: ITagClient.IProps;

  public constructor(props: ITagClient.IProps) {
    this.props = {
      ...props,
      resourceId: props.resourceId,
      resourceType: props.resourceType,
      name: props.name,
      communityId: props.communityId,
      userId: props.userId,
      whitelabel: props.whitelabel,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
  }

  public get resourceId(): ITagClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): ITagClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get name(): ITagClient.IProps['name'] {
    return this.props.name;
  }

  public get communityId(): ITagClient.IProps['communityId'] {
    return this.props.communityId;
  }

  public get userId(): ITagClient.IProps['userId'] {
    return this.props.userId;
  }

  public get whitelabel(): ITagClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): ITagClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): ITagClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }
}
