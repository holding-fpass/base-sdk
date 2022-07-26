import { Resource, ResourceType } from "./resource";

export enum TagStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum TagType {
  COURSE = "course",
  USER = "user",
}

export enum SystemTag {
  USER_ALL = "system.tag.user.all",
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
