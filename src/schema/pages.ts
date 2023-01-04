import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Playlist } from "./playlist";
import { Tag } from "./tag";
import { Timestamp } from "firebase-admin/firestore";

export enum PageStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const PageStatusTransitionMap = new Map<PageStatus, PageStatus[]>([
  [PageStatus.CREATED, [PageStatus.ACTIVE]],
]);

export class Page extends Resource implements SearchableResource {
  resourceType = ResourceType.PAGE;
  name!: string;
  url!: string;
  // Related
  playlists!: Partial<Playlist>[];
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Page;
    return {
      resourceType: ResourceType.PAGE,
      resourceId: data.resourceId,
      h1: data.name,
    };
  }
}
