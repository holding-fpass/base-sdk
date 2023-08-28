import { ChatClient, IChatClient } from "./chat-entity";

export class ChatMapper {
  public static toHTTP(chat: ChatClient): IChatClient.IHTTPChat {
    return {
      resourceId: chat.resourceId,
      resourceType: chat.resourceType,
      users: chat.users,
      moderators: chat.moderators,
      name: chat.name,
      type: chat.type,
      whitelabel: chat.whitelabel,
      createdAt: chat.createdAt.toISOString(),
      updatedAt: chat.updatedAt.toISOString(),
    }
  }

  public static toApplication(httpChat: IChatClient.IHTTPChat): ChatClient {
    return new ChatClient({
      resourceId: httpChat.resourceId,
      users: httpChat.users,
      moderators: httpChat.moderators,
      name: httpChat.name,
      type: httpChat.type,
      whitelabel: httpChat.whitelabel,
      createdAt: new Date(httpChat.createdAt),
      updatedAt: new Date(httpChat.updatedAt),
    });
  }
}