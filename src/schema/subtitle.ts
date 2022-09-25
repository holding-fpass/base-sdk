import { Content } from "./course";
import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export class Sentence {
  index!: number;
  start!: string | number | Long | null | undefined;
  end!: string | number | Long | null | undefined;
  content!: string;
  lastOfFull!: boolean;
  speakerTag?: number;
}

export enum SubtitleStatus {
  CREATED = "created",
  PROVIDER_AUDIO_EXTRACTED = "provider.audio.extracted",
  PROVIDER_AUDIO_TRANSCRIBED = "provider.audio.transcribed",
  PROVIDER_SENTENCES_EXTRACTED = "provider.sentences.extracted",
  PROVIDER_SENTENCES_TRANSLATED = "provider.sentences.translated",
  FILE_GENERATED = "file.generated",
  ACTIVE = "active",
}

export const SubtitleStatusTransitionMap = new Map<
  SubtitleStatus,
  SubtitleStatus[]
>([
  [SubtitleStatus.CREATED, [SubtitleStatus.PROVIDER_AUDIO_EXTRACTED]],
  [
    SubtitleStatus.PROVIDER_AUDIO_EXTRACTED,
    [SubtitleStatus.PROVIDER_AUDIO_TRANSCRIBED],
  ],
  [
    SubtitleStatus.PROVIDER_AUDIO_TRANSCRIBED,
    [SubtitleStatus.PROVIDER_SENTENCES_EXTRACTED],
  ],
  [
    SubtitleStatus.PROVIDER_SENTENCES_EXTRACTED,
    [SubtitleStatus.PROVIDER_SENTENCES_TRANSLATED],
  ],
  [
    SubtitleStatus.PROVIDER_SENTENCES_EXTRACTED,
    [SubtitleStatus.FILE_GENERATED],
  ],
  [
    SubtitleStatus.PROVIDER_SENTENCES_TRANSLATED,
    [SubtitleStatus.FILE_GENERATED],
  ],
  [SubtitleStatus.FILE_GENERATED, [SubtitleStatus.ACTIVE]],
  [SubtitleStatus.ACTIVE, [SubtitleStatus.FILE_GENERATED]]
]);

export class Subtitle extends Resource<SubtitleStatus> {
  resourceType = ResourceType.SUBTITLE;
  name!: string;
  // Related
  content!: Pick<Content, "resourceId" | "name">;
  speakers?: Pick<User, "resourceId" | "name">[];
  parent?: Pick<Subtitle, "resourceId" | "name">;
  // Process
  language!: string;
  videoUrl!: string;
  audioUrl?: string;
  subtitleUrl?: string;
  // Data
  fullSentences?: Sentence[];
  partSentences?: Sentence[];
}
