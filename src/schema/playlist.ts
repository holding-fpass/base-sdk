import { Tags } from "yaml";
import { Course } from "./course";
import { Resource, ResourceType } from "./resource";

export class Playlist extends Resource {
  resourceType = ResourceType.PLAYLIST;
  name!: string;
  // Media
  image256x256?: string;
  // Related
  courses?: Partial<Course>[];
  userTags?: Partial<Tags>[];
}
