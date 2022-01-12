import { BaseEvent } from "..";

export interface VideoAudioCreatedEventData {
  language: string;
  resourceUrl: string;
}

export class VideoAudioCreatedEvent extends BaseEvent {
  public data!: VideoAudioCreatedEventData;
}
