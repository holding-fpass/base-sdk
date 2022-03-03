import { BaseEvent } from "../schema";

// Video
export interface VideoCreatedEventData {
  language: string;
}

export class VideoCreatedEvent extends BaseEvent<VideoCreatedEventData> {}

// Audio
export interface VideoAudioCreatedEventData {
  language: string;
  resourceUrl: string;
}

export class VideoAudioCreatedEvent extends BaseEvent<VideoAudioCreatedEventData> {}

// Subtitle
export interface VideoSubtitleRequestedEventData {
  language: string;
}

export class VideoSubtitleRequestedEvent extends BaseEvent<VideoSubtitleRequestedEventData> {}
