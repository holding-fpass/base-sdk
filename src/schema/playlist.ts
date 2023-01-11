import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Course } from "./course";
import { Tag } from "./tag";

export class Playlist extends Resource implements SearchableResource<Playlist> {
  resourceType = ResourceType.PLAYLIST;
  name!: string;
  // Media
  image256x256?: string;
  // Related
  courses?: Partial<Course>[];
  userTags?: Partial<Tag>[];
  // SearchableResource implementation
  isPublic = true;
  asDisplayResource(resource: Playlist): DisplayResource {
    return {
      resourceType: ResourceType.PLAYLIST,
      resourceId: resource.resourceId,
      h1: resource.name,
      isPublic: true,
      isSearchable: resource?.isSearchable,
    };
  }
}
