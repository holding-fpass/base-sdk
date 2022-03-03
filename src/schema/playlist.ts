import { Course } from "./course";
import { Resource } from "./resource";

export interface Playlist extends Resource {
  name: string;
  // Media
  image256x256: string;
  courses: Course[];
}
