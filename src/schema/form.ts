import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
  SpannerQueryResource,
  SQLQueryResourceInsert,
} from "./resource";

import { Playlist } from "./playlist";
import { Tag } from "./tag";
import { User } from "./user";
import { Whitelabel } from "./whitelabel";
import { Timestamp } from "@google-cloud/firestore";

export class FormQuestionOption {
  name!: string;
  value!: number;
  image600x400?: string;
}

export class FormQuestionText {
  description?: string;
  value!: number;
}

export enum FormQuestionScaleType {
  STAR = "star",
}
export class FormQuestionScale<Type> {
  type!: Type;
  name?: string;
  value!: number;
}

export enum FormQuestionType {
  OPTIONS = "options",
  TEXT = "text",
  SCALE = "scale",
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
  SLIDES = "slides",
  PAGE = "page",
}

export enum FormStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const FormStatusTransitionMap = new Map<FormStatus, FormStatus[]>([
  [FormStatus.CREATED, [FormStatus.ACTIVE]],
  [FormStatus.ACTIVE, [FormStatus.CREATED]],
]);

export enum FormTrigger {
  MACHINE_LOGIN = "form.trigger.machine.login",
  USER_LOGIN = "form.trigger.user.login",
  APP_OPEN = "form.trigger.app.open",
}

export class Form extends Resource<FormStatus> implements SearchableResource {
  resourceType = ResourceType.FORM;
  name!: string;
  description?: string;
  layout!: FormLayout;
  questions?: Partial<FormQuestion>[];
  resultRanges?: Partial<FormResultRange>[];
  trigger?: FormTrigger;
  // Related
  userTags?: Partial<Tag>[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Form): DisplayResource<any, FormStatus> {
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
  CREATED = "created",
  ACTIVE = "active",
}

export const FormResponseStatusTransitionMap = new Map<
  FormResponseStatus,
  FormResponseStatus[]
>([[FormResponseStatus.CREATED, [FormResponseStatus.ACTIVE]]]);

export class FormResponse extends Resource<FormResponseStatus> implements SpannerQueryResource {
  resourceType = ResourceType.FORM_RESPONSE;
  form!: Pick<Form, "resourceId" | "name">;
  product?: Pick<Resource, "resourceId" | "resourceType"> & { name: string };
  userResponses!: FormUserResponse[];
  // Related
  user!: Pick<User, "resourceId" | "name" | "email" | "image128x128">;
  // Process
  value!: number;
  // SpannerQueryResource
  toSpannerQueryResourceInsert(): SQLQueryResourceInsert {
    return {
      table: 'FormResponse',
      data: {
        resourceId: this.resourceId,
        whitelabel: this.whitelabel,
        productId: this.product?.resourceId || '00000000-0000-0000-0000-000000000000',
        productType: this.product?.resourceType || ResourceType.PLATFORM,
        formId: this.form.resourceId,
        totalValue: Number(this.value || 0).toFixed(2),
        ownerId: this.user.resourceId,
        createdAt: (this.timestamp as Timestamp).toDate ? (this.timestamp as Timestamp).toDate() : new Date(this.timestamp as string),
      }
    };
  }
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
