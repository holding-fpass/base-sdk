export enum EventType {
  GenericEventCreated = "generic.created",
  DataEventCreated = "data-event.created",
  EmailCreated = "email.created",
  MFACreated = "mfa.created",
  MFAVerified = "mfa.verified",
  ClaimCreated = "claim.created",
  ClaimAuthorized = "claim.authorized",
  VIDEO_CREATED = "video.created",
  VIDEO_AUDIO_CREATED = "video.audio.created",
  VIDEO_SUBTITLE_REQUESTED = "video.subtitle.requested",
  WEBHOOK_OUTGOING_CREATED = "webhook.outgoing.created",
}
