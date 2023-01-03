import { Timestamp } from "firebase-admin/firestore";
import { Playlist } from "./playlist";
import { Resource, ResourceType, DisplayResource } from "./resource";
import { Tag } from "./tag";

export enum PageStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const PageStatusTransitionMap = new Map<PageStatus, PageStatus[]>([
  [PageStatus.CREATED, [PageStatus.ACTIVE]],
]);

export class Page extends Resource {
  resourceType = ResourceType.PAGE;
  name!: string;
  url!: string;
  // Related
  playlists!: Partial<Playlist>[];
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
}
