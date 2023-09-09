import { ChatMessageClient, IChatMessageClient } from "./chat-message-entity";

export class ChatMessageClientFirestoreMapper {
  public static toApplication(chatMessage: IChatMessageClient.IFirestoreChatMessage): ChatMessageClient {
    return new ChatMessageClient({
      resourceId: chatMessage.resourceId,
      resourceType: chatMessage.resourceType,
      whitelabel: chatMessage.whitelabel,
      metadata: chatMessage.metadata,
      chatId: chatMessage.chatId,
      userId: chatMessage.userId,
      text: chatMessage.text,
      type: chatMessage.type,
      fileUrl: chatMessage.fileUrl,
      createdAt: chatMessage.createdAt.toDate(),
      updatedAt: chatMessage.updatedAt.toDate(),
    });
  }
}
