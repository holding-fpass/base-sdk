import { BaseEvent } from "..";

export interface VideoCreatedEventData {
  language: string;
}

export class VideoCreatedEvent extends BaseEvent {
  public data!: VideoCreatedEventData;
}
