import { ResourceType, Whitelabel } from '../../../schema';
import { v4 as uuid } from 'uuid';

export namespace IForumClient {

  export interface IHTTPForum {
    resourceId: string;
    resourceType: ResourceType.FORUM;
    members: string[];
    moderators: string[];
    courseId: string | null;
    channelId: string | null;
    type: IForumClient.EType;
    name: string;
    description: string;
    ownerId: string;
    isPrivate: boolean;
    whitelabel: Whitelabel;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export enum EType {
    CHANNEL = 'channel',
    COURSE = 'course',
  }

  export interface IProps {
    resourceId: string;
    resourceType: ResourceType.FORUM;
    members: string[];
    moderators: string[];
    courseId: string | null;
    channelId: string | null;
    type: IForumClient.EType;
    name: string;
    description: string;
    ownerId: string;
    isPrivate: boolean;
    whitelabel: Whitelabel;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId: IForumClient.IProps['resourceId'];
    resourceType: IForumClient.IProps['resourceType'];
    members: IForumClient.IProps['members'];
    moderators: IForumClient.IProps['moderators'];
    name: IForumClient.IProps['name'];
    description: IForumClient.IProps['description'];
    type: IForumClient.IProps['type'];
    courseId: IForumClient.IProps['courseId'];
    channelId: IForumClient.IProps['channelId'];
    isPrivate: IForumClient.IProps['isPrivate'];
    ownerId: IForumClient.IProps['ownerId'];
    whitelabel: IForumClient.IProps['whitelabel'];
    createdAt: IForumClient.IProps['createdAt'];
    updatedAt: IForumClient.IProps['updatedAt'];
    deletedAt: IForumClient.IProps['deletedAt'];
  }
}

export class ForumClient {
  private props: IForumClient.IProps;

  public constructor(props: IForumClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.FORUM,
      channelId: props.channelId || null,
      courseId: props.courseId || null,
      members: props.members || [],
      type: props.type,
      moderators: props.moderators || [],
      isPrivate: props.isPrivate || false,
      name: props.name,
      description: props.description,
      whitelabel: props.whitelabel,
      ownerId: props.ownerId,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IForumClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IForumClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get members(): IForumClient.IProps['members'] {
    return this.props.members;
  }

  public get moderators(): IForumClient.IProps['moderators'] {
    return this.props.moderators;
  }

  public get isPrivate(): IForumClient.IProps['isPrivate'] {
    return this.props.isPrivate;
  }

  public get name(): IForumClient.IProps['name'] {
    return this.props.name;
  }

  public get description(): IForumClient.IProps['description'] {
    return this.props.description;
  }

  public get ownerId(): IForumClient.IProps['ownerId'] {
    return this.props.ownerId;
  }

  public get type(): IForumClient.IProps['type'] {
    return this.props.type;
  }

  public get courseId(): IForumClient.IProps['courseId'] {
    return this.props.courseId;
  }

  public get channelId(): IForumClient.IProps['channelId'] {
    return this.props.channelId;
  }

  public get whitelabel(): IForumClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): IForumClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IForumClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IForumClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
