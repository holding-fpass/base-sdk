import { User } from "@sentry/node";
import { Timestamp } from "firebase-admin/firestore";
import {
  Resource,
  ResourceType,
  SearchableResource,
  DisplayResource,
} from "./resource";

export enum InteractionStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export enum InteractionType {
  CLICK = "click",
  OPEN = "open",
  LEAVE = "leave",
  VIEW = "view",
  UPDATE = "update",
}

export enum InteractionDataforwardType {
  NONE = "none",
  WEBHOOK = "webhook",
  MONGODB = "mongodb",
  GCP_CLOUD_STORAGE = "gcp-cloud-storage",
  GOOGLE_SPREADSHEET = "google-spreadsheet",
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

export class Interaction
  extends Resource<InteractionStatus>
  implements SearchableResource
{
  resourceType = ResourceType.INTERACTION;
  transitionMap? = InteractionStatusTransitionMap;
  productId!: string;
  productType!: ResourceType;
  parentId?: string;
  parentType?: ResourceType;
  type!: InteractionType;
  user?: Pick<User, "id">;
  // Media
  mediaStart?: number;
  mediaEnd?: number;
  mediaCount?: number;
  mediaSpeed?: number;
  mediaResolution?: string;
  //
  // ownerId!: string;
  // Dataforward
  __dataforward?: InteractionDataforward;
  //
  isPublic = false;
  public static asDisplayResource(resource: Interaction): DisplayResource {
    return {
      resourceId: resource.resourceId,
      resourceType: ResourceType.INTERACTION,
      h1: resource.productId,
      h2: resource.productType,
      parentId: resource.parentId,
      parentType: resource.parentType,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      status: resource.status,
      type: resource.type,
      isPublic: false,
      isSearchable: resource?.isSearchable,
    };
  }
}
