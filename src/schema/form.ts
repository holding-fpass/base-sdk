import { Playlist } from "./playlist";
import { Resource, ResourceType } from "./resource";
import { Tag } from "./tag";
import { User } from "./user";

export class FormQuestionOption {
  name!: string;
  value!: number;
  image600x400?: string;
}

export class FormQuestion {
  name!: string;
  description?: string;
  options?: Partial<FormQuestionOption>[];
  hash!: string;
}

export class FormResultRangeRecommendPlaylistAction {
  text!: string;
  playlists!: Partial<Playlist>[];
}

export class FormResultRange {
  name!: string;
  text!: string;
  valueStart!: number;
  valueEnd!: number;
  recommendPlaylistAction?: FormResultRangeRecommendPlaylistAction;
}

export enum FormStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const FormStatusTransitionMap = new Map<FormStatus, FormStatus[]>([
  [FormStatus.CREATED, [FormStatus.ACTIVE]],
]);

export class Form extends Resource<FormStatus> {
  resourceType = ResourceType.FORM;
  transitionMap = FormStatusTransitionMap;
  name!: string;
  description?: string;
  questions?: Partial<FormQuestion>[];
  resultRanges?: Partial<FormResultRange>[];
  // Related
  userTags?: Partial<Tag>[];
}

export class FormUserResponse {
  question!: Partial<FormQuestion>;
  questionHash!: string;
  value!: string;
}

export enum FormResponseStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const FormResponseStatusTransitionMap = new Map<
  FormResponseStatus,
  FormResponseStatus[]
>([[FormResponseStatus.CREATED, [FormResponseStatus.ACTIVE]]]);

export class FormResponse extends Resource<FormResponseStatus> {
  resourceType = ResourceType.FORM_RESPONSE;
  form!: Pick<Form, "resourceId" | "name">;
  userResponses!: FormUserResponse[];
  // Related
  user!: Pick<User, "resourceId" | "name" | "email">;
  // Process
  value!: number;
}
