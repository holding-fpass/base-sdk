import { User } from "@sentry/node";
import { Timestamp } from "firebase-admin/firestore";
import { Resource, ResourceType } from "./resource";

export enum InteractionStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum InteractionType {
  CLICK = "click",
  OPEN = "open",
  LEAVE = "leave",
  VIEW = "view",
}

export enum InteractionDataforwardType {
  NONE = "none",
  WEBHOOK = "webhook",
  MONGODB = "mongodb",
  GCP_CLOUD_STORAGE = "gcp-cloud-storage",
  GOOGLE_SPREADSHEET = "google-spreadsheet"
}

export interface InteractionDataforward {
  result: boolean;
  reason: string;
  deliveredAt: string | Timestamp;
}

export const InteractionStatusTransitionMap = new Map<
  InteractionStatus,
  InteractionStatus[]
>([[InteractionStatus.CREATED, [InteractionStatus.ACTIVE]]]);

export class Interaction extends Resource<InteractionStatus> {
  resourceType = ResourceType.INTERACTION;
  transitionMap = InteractionStatusTransitionMap;
  productId!: string;
  productType!: ResourceType;
  parentId!: string;
  parentType!: ResourceType;
  type!: InteractionType;
  user!: Pick<User, "id">;
  // Media
  mediaStart?: number;
  mediaEnd?: number;
  mediaCount?: number;
  // Dataforward
  __dataforward?: InteractionDataforward;
}
