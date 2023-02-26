import { Resource, ResourceStatus, ResourceType } from "./resource";

export enum ThreadType {
  CHAT = "chat",
  CHAT_REPLY = "chat_reply",
  RESOURCE = "resource",
  USER = "user",
  REACTION = "reaction",
  NOTIFICATION = "notification",
  CONTENT = "content",
}

export class Thread extends Resource<ResourceStatus, ThreadType> {
  resourceType = ResourceType.THREAD;
}
