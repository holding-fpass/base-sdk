import { ResourceType, Whitelabel } from "schema";

export namespace IForumTagClient {
  export interface IHTTPForumTag {
    resourceId: string;
    resourceType: ResourceType.TAG;
    name: string;
    forumId: string;
    userId: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.TAG;
    name: string;
    forumId: string;
    userId: string;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId: IForumTagClient.IProps['resourceId'];
    resourceType: IForumTagClient.IProps['resourceType'];
    name: IForumTagClient.IProps['name'];
    forumId: IForumTagClient.IProps['forumId'];
    userId: IForumTagClient.IProps['userId'];
    whitelabel: IForumTagClient.IProps['whitelabel'];
    createdAt?: IForumTagClient.IProps['createdAt'];
    updatedAt?: IForumTagClient.IProps['updatedAt'];
    deletedAt?: IForumTagClient.IProps['deletedAt'];
  }
}

export class ForumTagClient {
  private props: IForumTagClient.IProps;

  public constructor(props: IForumTagClient.IProps) {
    this.props = {
      ...props,
      resourceId: props.resourceId,
      resourceType: props.resourceType,
      name: props.name,
      forumId: props.forumId,
      userId: props.userId,
      whitelabel: props.whitelabel,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IForumTagClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IForumTagClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get name(): IForumTagClient.IProps['name'] {
    return this.props.name;
  }

  public get forumId(): IForumTagClient.IProps['forumId'] {
    return this.props.forumId;
  }

  public get userId(): IForumTagClient.IProps['userId'] {
    return this.props.userId;
  }

  public get whitelabel(): IForumTagClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IForumTagClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IForumTagClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IForumTagClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
