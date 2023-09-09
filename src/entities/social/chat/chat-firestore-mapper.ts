import { ChatClient, IChatClient } from "./chat-entity";

export class ChatClientFirestoreMapper {
  public static toApplication(httpChat: IChatClient.IFirestoreChat): ChatClient {
    return new ChatClient({
      resourceId: httpChat.resourceId,
      users: httpChat.users,
      moderators: httpChat.moderators,
      name: httpChat.name,
      type: httpChat.type,
      whitelabel: httpChat.whitelabel,
      createdAt: httpChat.createdAt.toDate(),
      updatedAt: httpChat.updatedAt.toDate(),
    });
  }
}