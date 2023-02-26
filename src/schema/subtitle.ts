import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Content } from "./course";
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
    [
      SubtitleStatus.PROVIDER_SENTENCES_TRANSLATED,
      SubtitleStatus.FILE_GENERATED,
    ],
  ],
  [
    SubtitleStatus.PROVIDER_SENTENCES_TRANSLATED,
    [SubtitleStatus.FILE_GENERATED],
  ],
  [SubtitleStatus.FILE_GENERATED, [SubtitleStatus.ACTIVE]],
  [SubtitleStatus.ACTIVE, [SubtitleStatus.FILE_GENERATED]],
]);

export class Subtitle
  extends Resource<SubtitleStatus>
  implements SearchableResource {
  resourceType = ResourceType.SUBTITLE;
  name!: string;
  // Related
  content!: Pick<Content, "resourceId" | "name">;
  speakers?: Pick<User, "resourceId" | "name">[];
  parent?: Pick<Subtitle, "resourceId" | "name">;
  parentId!: string;
  parentType!: ResourceType;
  // Process
  language!: string;
  videoUrl!: string;
  audioUrl?: string;
  audioCodec?: "mp3" | "mp4";
  subtitleUrl?: string;
  // Data
  fullSentences?: Sentence[];
  partSentences?: Sentence[];
  // Translations
  fullSentences_es?: Sentence[];
  partSentences_es?: Sentence[];
  fullSentences_enUs?: Sentence[];
  partSentences_enUs?: Sentence[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Subtitle): DisplayResource<any, SubtitleStatus> {
    return {
      resourceType: ResourceType.SUBTITLE,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
