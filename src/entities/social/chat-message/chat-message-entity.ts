import { Timestamp } from "firebase-admin/lib/firestore";
import { ResourceType, Whitelabel } from '../../../schema';
import { v4 as uuid } from 'uuid';

export namespace IChatMessageClient {
  export interface IHTTPChatMessage<Metadata = Record<string, unknown>> {
    resourceId: string;
    resourceType: ResourceType.CHAT_MESSAGE;
    userId: string;
    chatId: string;
    whitelabel: Whitelabel;
    text: string | null;
    type: IChatMessageClient.EType;
    fileUrl: string | null;
    metadata: Metadata | null;
    createdAt: string;
    updatedAt: string;
  }

  export interface IFirestoreChatMessage<Metadata = Record<string, unknown>> {
    resourceId: string;
    resourceType: ResourceType.CHAT_MESSAGE;
    userId: string;
    chatId: string;
    type: IChatMessageClient.EType;
    text: string | null;
    fileUrl: string | null;
    whitelabel: Whitelabel;
    metadata: Metadata | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
  }

  export enum EType {
    TEXT = 'text',
    FILE = 'file',
  }

  export interface IProps<Metadata = Record<string, unknown>> {
    resourceId: string;
    resourceType: ResourceType.CHAT_MESSAGE;
    userId: string;
    chatId: string;
    whitelabel: Whitelabel;
    text: string | null;
    type: IChatMessageClient.EType;
    fileUrl: string | null;
    metadata: Metadata | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface IConstructor {
    resourceId?: IChatMessageClient.IProps['resourceId'];
    resourceType?: IChatMessageClient.IProps['resourceType'];
    userId: IChatMessageClient.IProps['userId'];
    chatId: IChatMessageClient.IProps['chatId'];
    whitelabel: IChatMessageClient.IProps['whitelabel'];
    text?: IChatMessageClient.IProps['text'];
    type: IChatMessageClient.IProps['type'];
    fileUrl?: IChatMessageClient.IProps['fileUrl'];
    metadata?: IChatMessageClient.IProps['metadata'];
    createdAt?: IChatMessageClient.IProps['createdAt'];
    updatedAt?: IChatMessageClient.IProps['updatedAt'];
    deletedAt?: IChatMessageClient.IProps['deletedAt'];
  }
}

export class ChatMessageClient {
  private props: IChatMessageClient.IProps;

  public constructor(props: IChatMessageClient.IConstructor) {
    this.props = {
      ...props,
      resourceId: props.resourceId || uuid(),
      resourceType: ResourceType.CHAT_MESSAGE,
      chatId: props.chatId,
      text: props.text || null,
      type: props.type,
      userId: props.userId,
      fileUrl: props.fileUrl || null,
      metadata: props.metadata || null,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      deletedAt: props.deletedAt || null,
    };
  }

  public get resourceId(): IChatMessageClient.IProps['resourceId'] {
    return this.props.resourceId;
  }

  public get resourceType(): IChatMessageClient.IProps['resourceType'] {
    return this.props.resourceType;
  }

  public get userId(): IChatMessageClient.IProps['userId'] {
    return this.props.userId;
  }

  public get chatId(): IChatMessageClient.IProps['chatId'] {
    return this.props.chatId;
  }

  public get fileUrl(): IChatMessageClient.IProps['fileUrl'] {
    return this.props.fileUrl;
  }

  public get whitelabel(): IChatMessageClient.IProps['whitelabel'] {
    return this.props.whitelabel;
  }

  public get metadata(): IChatMessageClient.IProps['metadata'] {
    return this.props.metadata;
  }

  public get text(): IChatMessageClient.IProps['text'] {
    return this.props.text;
  }

  public get type(): IChatMessageClient.IProps['type'] {
    return this.props.type;
  }

  public get createdAt(): IChatMessageClient.IProps['createdAt'] {
    return this.props.createdAt;
  }

  public get updatedAt(): IChatMessageClient.IProps['updatedAt'] {
    return this.props.updatedAt;
  }

  public get deletedAt(): IChatMessageClient.IProps['deletedAt'] {
    return this.props.deletedAt;
  }
}
