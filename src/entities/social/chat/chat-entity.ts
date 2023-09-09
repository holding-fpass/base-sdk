import { Timestamp } from "firebase-admin/firestore";
import { v4 as uuid } from 'uuid';
import { ResourceType, Whitelabel } from "../../../schema";

export namespace IChatClient {
  export interface IHTTPChat {
    resourceId: string;
    resourceType: ResourceType.CHAT;
    users: string[];
    moderators: string[];
    name: string;
    type: IChatClient.EType;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
  }

  export interface IFirestoreChat {
    resourceId: string;
    resourceType: ResourceType.CHAT;
    users: string[];
    moderators: string[];
    name: string;
    type: IChatClient.EType;
    whitelabel: Whitelabel;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
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
    type: IChatClient.EType;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IConstructor {
    resourceId?: IChatClient.IProps['resourceId'];
    users?: IChatClient.IProps['users'];
    moderators?: IChatClient.IProps['moderators'];
    name: IChatClient.IProps['name'];
    type: IChatClient.IProps['type'];
    whitelabel: IChatClient.IProps['whitelabel'];
    createdAt?: IChatClient.IProps['createdAt'];
    updatedAt?: IChatClient.IProps['updatedAt'];
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
    };
  }

  public get resourceId(): IChatClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IChatClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get name(): IChatClient.IProps['name'] {
    return this.props.name;
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
}
