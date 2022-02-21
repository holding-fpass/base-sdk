import { BaseEvent } from "./baseEvent";
import { ResourceType } from "./resource";

export interface PlayerWatchEventData {
  start: number;
  end: number;
}

export class PlayerWatchEvent extends BaseEvent {
  public parentId!: string;
  public parentType!: string;
  public resourceType!: ResourceType;
  public data!: PlayerWatchEventData;
}
