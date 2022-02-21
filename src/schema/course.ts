import { Resource } from "./resource";
import { Whitelabel } from "./whitelabel";

export interface Course extends Resource {
  name: string;
  description: string;
  whitelabel: Whitelabel;
  producer: string;
  unavaliable: boolean;
}
