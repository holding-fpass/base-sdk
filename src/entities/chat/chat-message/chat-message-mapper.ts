import { ChatMessageClient, IChatMessageClient } from "./chat-message-entity";

export class ChatMessageClientMapper {
  public static toApplication(chatMessage: IChatMessageClient.IHTTPChatMessage): ChatMessageClient {
    return new ChatMessageClient({
      resourceId: chatMessage.resourceId,
      resourceType: chatMessage.resourceType,
      whitelabel: chatMessage.whitelabel,
      metadata: chatMessage.metadata,chatId: chatMessage.chatId,
      userId: chatMessage.userId,
      text: chatMessage.text,
      type: chatMessage.type,
      fileUrl: chatMessage.fileUrl,
      createdAt: new Date(chatMessage.createdAt),
      updatedAt: new Date(chatMessage.updatedAt),
      deletedAt: chatMessage.deletedAt ? new Date(chatMessage.deletedAt) : null,
    });
  }

  public static toHTTP(chatMessage: ChatMessageClient): IChatMessageClient.IHTTPChatMessage {
    return {
      resourceId: chatMessage.resourceId,
      resourceType: chatMessage.resourceType,
      whitelabel: chatMessage.whitelabel,
      metadata: chatMessage.metadata,
      chatId: chatMessage.chatId,
      userId: chatMessage.userId,
      text: chatMessage.text,
      type: chatMessage.type,
      fileUrl: chatMessage.fileUrl,
      createdAt: chatMessage.createdAt.toISOString(),
      updatedAt: chatMessage.updatedAt.toISOString(),
      deletedAt: chatMessage.deletedAt ? chatMessage.deletedAt.toISOString() : null,
    }
  }
}