import {
  DisplayResource,
  Resource,
  ResourceStatus,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Course } from "./course";
import { Tag } from "./tag";
import { ImageUtils } from "../media";

export class Playlist extends Resource implements SearchableResource {
  resourceType = ResourceType.PLAYLIST;
  name!: string;
  // Media
  image256x256?: string;
  // Related
  courses?: Partial<Course>[];
  userTags?: Partial<Tag>[];
  userTags_idx?: string[];
  // SearchableResource implementation
  isPublic = true;
  public static asDisplayResource(resource: Playlist): DisplayResource<any, ResourceStatus> {
    return {
      resourceType: ResourceType.PLAYLIST,
      resourceId: resource.resourceId,
      h1: resource.name,
      isPublic: true,
      isSearchable: resource?.isSearchable,
      whitelabel: resource.whitelabel,
      status: ResourceStatus.CREATED,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
      imageUrl: ImageUtils.imageOptimized(
        resource.image256x256 as string,
        "256x256"
      ),
    };
  }
}
