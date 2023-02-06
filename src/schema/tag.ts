import { Resource, ResourceType, DisplayResource } from "./resource";

export enum TagStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum TagType {
  COURSE = "course",
  USER = "user",
  SYSTEM = "system",
}

export enum SystemTag {
  USER_ALL = "system.tag.user.all", // Machine or Student
  USER_AUTHENTICATED = "system.tag.user.authenticaded", // Student
  USER_MACHINE = "system.tag.user.machine", // Machine
}

export const TagStatusTransitionMap = new Map<TagStatus, TagStatus[]>([
  [TagStatus.CREATED, [TagStatus.ACTIVE]],
]);

export class Tag extends Resource<TagStatus> {
  resourceType = ResourceType.TAG;
  transitionMap = TagStatusTransitionMap;
  //
  h1!: string;
  type!: TagStatus;
}
