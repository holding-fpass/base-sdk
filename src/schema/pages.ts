import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Playlist } from "./playlist";
import { Tag } from "./tag";

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
  playlists!: Pick<Playlist, "resourceId" | "name">[];
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource<any, ResourceStatus> {
    const data = resource as Page;
    return {
      resourceType: ResourceType.PAGE,
      resourceId: data.resourceId,
      h1: data.name,
      isPublic: data.isPublic,
      resourceUrl: resource.url,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}

export enum FLabelAppPagePath {
  HOME = "/",
  SEARCH = "/search",
  SEARCH_RESULTS = "/search/:text",
  CHANNEL_HOME = "/channel",
  CHANNEL = "/channel/:channelId",
  CHANNEL_COURSE = "/channel/:channelId/course/:courseId",
  CHANNEL_PLAYER = "/channel/:channelId/player/:contentId",
  CHANNEL_CALENDAR = "/channel/:channelId/calendar",
  CHANNEL_STAGE = "/channel/:channelId/stage/:slug",
  PREMIUM_HOME = "/premium",
  PREMIUM_COURSE = "/premium/:courseId",
  COURSE = "/course/:courseId",
  COURSE_CERTIFICATE = "/course/:courseId/certificate/:certificateId",
  PLAYER = "/player/:contentId",
  STAGE = "/stage/:slug",
  LIBRARY = "/library",
  PROFILE = "/profile",
  WALLET = "/wallet",
  WAITING_ROOM = "/waiting-room",
  OPEN_REVOLUTION = "/open-revolution",
  ABOUT_US = "/about-us",
  COMPANIES = "/companies",
  FLABEL = "/flabel",
  DEVELOPERS = "/developers",
  METAVERSO = "/metaverso",
  CALENDAR = "/calendar",
}

export function PageUrl(pagePath: string, args?: any) {
  if (!args) return pagePath;
  const keys = Object.keys(args);
  let url = "";
  for (const key of keys) {
    url = !!url
      ? url.replace(`:${key}`, args[key])
      : pagePath.replace(`:${key}`, args[key]);
  }
  return url;
}
