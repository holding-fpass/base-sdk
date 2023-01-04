import { ContentItem, Course } from "./course";
import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { Form } from "./form";
import { Metadata } from "./metadata";
import { Plan } from "./plan";
import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";

export enum StageStatus {
  CREATED = "created",
}

export enum StageFeatureFlags {
  CHAT = "stage.feature-flag.chat",
  PAYMENT_REQUIRED = "stage.feature-flag.payment-required",
}

export class StageScheduleContent {
  name?: string;
  description?: string;
  speakers?: Pick<User, "resourceId" | "name" | "image128x128">[];
  duration?: string;
  image96x96?: string;
}

export class StageScheduleTimeBox {
  name?: string;
  timeStart?: string;
  timeEnd?: string;
  contents?: StageScheduleContent[];
}

export class StageScheduleDayBox {
  name?: string;
  dateStart?: Date | Timestamp;
  timeboxes?: StageScheduleTimeBox[];
}

export class StageSchedule {
  dayboxes?: StageScheduleDayBox[];
}

export class StagePartnerBoxPartner {
  name?: string;
  url?: string;
  bannerSize?: "image416x120" | "image300x88";
  image416x120?: string;
  image300x88?: string;
}

export class StagePartnerBox {
  name?: string;
  partners?: StagePartnerBoxPartner[];
}

export class StagePayment {
  plans?: Pick<Plan, "resourceId" | "name">[];
  courses?: Pick<Course, "resourceId" | "name">[];
}

export class Stage extends Resource<StageStatus> implements SearchableResource {
  // Data
  resourceType = ResourceType.STAGE;
  name?: string;
  slug?: string;
  description?: string;
  // Transmission
  rtmpUrl?: string;
  isRunning?: boolean;
  // Media
  image968x168?: string;
  // Content
  schedule?: StageSchedule;
  items?: Partial<ContentItem>[];
  forms?: Pick<Form, "resourceId" | "name">[];
  // Stands
  partnerboxes?: StagePartnerBox[];
  // Finance
  payment?: StagePayment;
  features!: Metadata<StageFeatureFlags>[];
  // SearchableResource implementation
  isPublic = false;
  asDisplayResource(resource: any): DisplayResource {
    const data = resource as Stage;
    return {
      resourceType: ResourceType.STAGE,
      resourceId: data.resourceId,
      h1: data.name,
      status: data.status,
      isPublic: data.isPublic,
    };
  }
}
