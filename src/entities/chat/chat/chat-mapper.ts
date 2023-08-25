import { ChatMessageClient, IChatMessageClient } from '../chat-message';
import { ChatClient, IChatClient } from './chat-entity';

export type IHTTPChatMessage = IChatMessageClient.IHTTPChatMessage;

export class ChatClientMapper {
  public static toApplication(chat: IChatClient.IHTTPChat): ChatClient {
    return new ChatClient({
      resourceId: chat.resourceId,
      resourceType: chat.resourceType,
      users: chat.users,
      moderators: chat.moderators,
      name: chat.name,
      whitelabel: chat.whitelabel,
      type: chat.type,
      createdAt: new Date(chat.createdAt),
      updatedAt: new Date(chat.updatedAt),
      deletedAt: chat.deletedAt
        ? new Date(chat.deletedAt)
        : null,
    });
  }

  public static toHTTP(chat: ChatClient): IChatClient.IHTTPChat {
    return {
      resourceId: chat.resourceId,
      resourceType: chat.resourceType,
      whitelabel: chat.whitelabel,
      type: chat.type,
      users: chat.users,
      moderators: chat.moderators,
      name: chat.name,
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
      deletedAt: chat.deletedAt ? chat.deletedAt.toISOString() : null,
    }
  }
}
