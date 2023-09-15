import { ResourceType, Whitelabel } from '../../../schema';
import { v4 as uuid } from 'uuid';

export namespace ICommunityClient {

  export interface IHTTPCommunity {
    resourceId: string;
    resourceType: ResourceType.FORUM;
    members: string[];
    moderators: string[];
    courseId: string | null;
    channelId: string | null;
    type: ICommunityClient.EType;
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
    resourceType: ResourceType.COMMUNITY;
    members: string[];
    moderators: string[];
    courseId: string | null;
    channelId: string | null;
    type: ICommunityClient.EType;
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
    resourceId: ICommunityClient.IProps['resourceId'];
    resourceType: ICommunityClient.IProps['resourceType'];
    members: ICommunityClient.IProps['members'];
    moderators: ICommunityClient.IProps['moderators'];
    name: ICommunityClient.IProps['name'];
    description: ICommunityClient.IProps['description'];
    type: ICommunityClient.IProps['type'];
    courseId: ICommunityClient.IProps['courseId'];
    channelId: ICommunityClient.IProps['channelId'];
    isPrivate: ICommunityClient.IProps['isPrivate'];
    ownerId: ICommunityClient.IProps['ownerId'];
    whitelabel: ICommunityClient.IProps['whitelabel'];
    createdAt: ICommunityClient.IProps['createdAt'];
    updatedAt: ICommunityClient.IProps['updatedAt'];
    deletedAt: ICommunityClient.IProps['deletedAt'];
  }
}

export class CommunityClient {
  private props: ICommunityClient.IProps;

  public constructor(props: ICommunityClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.COMMUNITY,
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

  public get resourceId(): ICommunityClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): ICommunityClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get members(): ICommunityClient.IProps['members'] {
    return this.props.members;
  }

  public get moderators(): ICommunityClient.IProps['moderators'] {
    return this.props.moderators;
  }

  public get isPrivate(): ICommunityClient.IProps['isPrivate'] {
    return this.props.isPrivate;
  }

  public get name(): ICommunityClient.IProps['name'] {
    return this.props.name;
  }

  public get description(): ICommunityClient.IProps['description'] {
    return this.props.description;
  }

  public get ownerId(): ICommunityClient.IProps['ownerId'] {
    return this.props.ownerId;
  }

  public get type(): ICommunityClient.IProps['type'] {
    return this.props.type;
  }

  public get courseId(): ICommunityClient.IProps['courseId'] {
    return this.props.courseId;
  }

  public get channelId(): ICommunityClient.IProps['channelId'] {
    return this.props.channelId;
  }

  public get whitelabel(): ICommunityClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get createdAt(): ICommunityClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): ICommunityClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): ICommunityClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
