import { BaseEvent } from "./events";
import { ResourceType } from "./resource";
import { User } from "./user";

export interface PageView {
  productId: string;
  productType:
    | ResourceType.CHANNEL
    | ResourceType.COURSE
    | ResourceType.CONTENT
    | ResourceType.CONTENT_ITEM;
  // Media
  mediaStart?: number;
  mediaEnd?: number;
  mediaCount?: number;
  //
  user: User;
}
export interface PlayerWatchEventData {
  start: number;
  end: number;
}

export class PlayerWatchEvent extends BaseEvent<PlayerWatchEventData> {}
