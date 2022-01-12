import { BaseEvent } from "..";

export interface VideoSubtitleRequestedEventData {
  language: string;
}

export class VideoSubtitleRequestedEvent extends BaseEvent {
  public data!: VideoSubtitleRequestedEventData;
}
