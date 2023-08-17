import { Playlist } from './playlist';
import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from './resource';
import { Tag } from './tag';
import { User } from './user';
import { Whitelabel } from './whitelabel';

export class FormQuestionOption {
  name!: string;
  value!: number;
  resourceId!: string;
  image600x400?: string;
}

export class FormQuestionText {
  description?: string;
  value!: number;
}

export enum FormQuestionScaleType {
  STAR = 'star',
}
export class FormQuestionScale<Type> {
  type!: Type;
  name?: string;
  value!: number;
}

export enum FormQuestionType {
  OPTIONS = 'options',
  TEXT = 'text',
  SCALE = 'scale',
  UPLOAD = 'upload',
}

export class FormQuestion {
  name!: string;
  description?: string;
  type?: FormQuestionType;
  // Types
  options?: Partial<FormQuestionOption>[];
  text?: FormQuestionText;
  scale?: FormQuestionScale<FormQuestionScaleType>[];
  public?: boolean;
  value?: string;
  // Hash
  hash!: string;
}

export class FormResultRangeRecommendPlaylistAction {
  text!: string;
  playlist!: Partial<Playlist>;
}

export class FormResultIncludeUserTagsAction {
  userTags!: Partial<Tag>[];
}

export class FormResultRange {
  name!: string;
  text!: string;
  valueStart!: number;
  valueEnd!: number;
  recommendPlaylistAction?: FormResultRangeRecommendPlaylistAction;
  includeUserTagsAction?: FormResultIncludeUserTagsAction;
}

export enum FormLayout {
  SLIDES = 'slides',
  PAGE = 'page',
}

export enum FormStatus {
  CREATED = 'created',
  ACTIVE = 'active',
}

export const FormStatusTransitionMap = new Map<FormStatus, FormStatus[]>([
  [FormStatus.CREATED, [FormStatus.ACTIVE]],
  [FormStatus.ACTIVE, [FormStatus.CREATED]],
]);

export enum FormTrigger {
  MACHINE_LOGIN = 'form.trigger.machine.login',
  USER_LOGIN = 'form.trigger.user.login',
  APP_OPEN = 'form.trigger.app.open',
}

export enum FormAssessmentMethod {
  QUANTITATIVE = 'quantitative',
  QUALITATIVE = 'qualitative',
}

export interface UserOverlay {
  maxRetry: string;
  resourceId: string;
  user: Pick<User, 'email' | 'name' | 'resourceId'>;
}

export class Form extends Resource<FormStatus> implements SearchableResource {
  resourceType = ResourceType.FORM;
  name!: string;
  description?: string;
  layout!: FormLayout;
  questions?: Partial<FormQuestion>[];
  resultRanges?: Partial<FormResultRange>[];
  trigger?: FormTrigger;
  timer?: string;
  maxRetry?: string;
  assessmentMethod?: FormAssessmentMethod;
  userOverlay?: UserOverlay[];
  // Related
  userTags?: Partial<Tag>[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(
    resource: Form
  ): DisplayResource<any, FormStatus> {
    return {
      resourceType: ResourceType.FORM,
      resourceId: resource.resourceId,
      h1: resource.name,
      type: resource.layout,
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

export class FormUserResponse {
  question!: Partial<FormQuestion>;
  questionHash!: string;
  value!: string;
}

export enum FormResponseStatus {
  CREATED = 'created',
  ACTIVE = 'active',
}

export const FormResponseStatusTransitionMap = new Map<
  FormResponseStatus,
  FormResponseStatus[]
>([[FormResponseStatus.CREATED, [FormResponseStatus.ACTIVE]]]);

export class FormResponse extends Resource<FormResponseStatus> {
  resourceType = ResourceType.FORM_RESPONSE;
  form!: Pick<Form, 'resourceId' | 'name'>;
  product?: Pick<Resource, 'resourceId' | 'resourceType'> & { name: string };
  userResponses!: FormUserResponse[];
  // Related
  user!: Pick<User, 'resourceId' | 'name' | 'email' | 'image128x128'>;
  // Process
  value!: number;
}

export interface FormResponseActiveActionEvent {
  eventId?: string;
  type: string;
  payload: {
    value: number;
    resultRange?: FormResultRange;
    maxValue: number;
  };
  whitelabel: Whitelabel;
  resourceType: ResourceType;
  resourceId: string;
}
