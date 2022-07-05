import { User } from "@sentry/node";
import { Resource } from "./resource";

export enum InteractionType {
  CLICK = "click",
  OPEN = "open",
  VIEW = "view",
}
export class Interaction extends Resource {
  user!: Pick<User, "id">;
  // Media
  mediaStart?: number;
  mediaEnd?: number;
  mediaCount?: number;
}
