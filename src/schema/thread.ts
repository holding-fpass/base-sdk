import { Resource, ResourceType } from "./resource";

export enum ThreadType {
  CHAT = "chat",
  CHAT_REPLY = "chat_reply",
  RESOURCE = "resource",
  USER = "user",
  REACTION = "reaction",
  NOTIFICATION = "notification",
  CONTENT = "content",
}

export class Thread extends Resource {
  resourceType = ResourceType.THREAD;
  type!: ThreadType;
}
