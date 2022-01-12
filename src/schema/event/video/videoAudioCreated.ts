import { BaseEvent } from "..";

export interface VideoAudioCreatedEventData {
  language: string;
}

export class VideoAudioCreatedEvent extends BaseEvent {
  public data!: VideoAudioCreatedEventData;
}
