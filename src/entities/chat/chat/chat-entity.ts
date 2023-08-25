
import { ResourceType, Whitelabel } from 'schema';
import { v4 as uuid } from 'uuid';

export namespace IChatClient {
export interface IHTTPChat {
    resourceId: string;
    resourceType: ResourceType.CHAT;
    users: string[];
    moderators: string[];
    name: string;
    whitelabel: Whitelabel;
    type: IChatClient.EType;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export enum EType {
    SINGLE = 'single',
    GROUP = 'group',
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.CHAT;
    users: string[];
    moderators: string[];
    name: string;
    whitelabel: Whitelabel;
    type: IChatClient.EType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId?: IChatClient.IProps['resourceId'];
    resourceType?: IChatClient.IProps['resourceType'];
    users?: IChatClient.IProps['users'];
    moderators?: IChatClient.IProps['moderators'];
    name: IChatClient.IProps['name'];
    whitelabel: IChatClient.IProps['whitelabel'];
    type: IChatClient.IProps['type'];
    createdAt?: IChatClient.IProps['createdAt'];
    updatedAt?: IChatClient.IProps['updatedAt'];
    deletedAt?: IChatClient.IProps['deletedAt'];
  }
}

export class ChatClient {
  private props: IChatClient.IProps;

  public constructor(props: IChatClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.CHAT,
      whitelabel: props.whitelabel,
      users: props.users || [],
      moderators: props.moderators || [],
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IChatClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get name(): IChatClient.IProps['name'] {
    return this.props.name;
  }

  public get resourceType(): IChatClient.IProps['resourceType'] {
    return this.props.resourceType;
  }


  public get type(): IChatClient.IProps['type'] {
    return this.props.type;
  }

  public get users(): IChatClient.IProps['users'] {
    return this.props.users;
  }

  public get moderators(): IChatClient.IProps['moderators'] {
    return this.props.moderators;
  }

  public get whitelabel(): IChatClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IChatClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IChatClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IChatClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
