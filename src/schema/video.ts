import { BaseEvent } from "../schema";

// Video
export interface VideoCreatedEventData {
  language: string;
}

export class VideoCreatedEvent extends BaseEvent {
  public data!: VideoCreatedEventData;
}

// Audio
export interface VideoAudioCreatedEventData {
  language: string;
  resourceUrl: string;
}

export class VideoAudioCreatedEvent extends BaseEvent {
  public data!: VideoAudioCreatedEventData;
}

// Subtitle
export interface VideoSubtitleRequestedEventData {
  language: string;
}

export class VideoSubtitleRequestedEvent extends BaseEvent {
  public data!: VideoSubtitleRequestedEventData;
}
