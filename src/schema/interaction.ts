import { Timestamp } from 'firebase-admin/firestore';
import { DisplayResource, Resource, ResourceType, SearchableResource } from './resource';
import { User } from './user';
import { Channel } from './channel';

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
  REACTION = "reaction",
}

export enum InteractionDataforwardType {
  NONE = "none",
  WEBHOOK = "webhook",
  MONGODB = "mongodb",
  GCP_CLOUD_STORAGE = "gcp-cloud-storage",
  GOOGLE_SPREADSHEET = "google-spreadsheet",
  AZURE_BLOB_STORAGE = "azure-blog-storage",
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
  extends Resource<InteractionStatus, InteractionType>
  implements SearchableResource
{
  resourceType = ResourceType.INTERACTION;
  productId!: string;
  productType!: ResourceType;
  parentId?: string;
  parentType?: ResourceType;
  user?: Pick<User, "id">;
  // Media
  mediaStart?: number;
  mediaEnd?: number;
  mediaCount?: number;
  mediaSpeed?: number;
  mediaResolution?: string;
  // Channel
  channel?: Pick<Channel, "resourceId" | "slug" | "name">
  //
  // ownerId!: string;
  // Dataforward
  __dataforward?: InteractionDataforward;
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(
    resource: Interaction,
  ): DisplayResource<any, InteractionStatus> {
    return {
      resourceId: resource.resourceId,
      resourceType: ResourceType.INTERACTION,
      h1: `${resource.productType}:${resource.type}`,
      ownerId: resource.ownerId || resource.user?.id,
      referenceId: resource.productId,
      referenceType: resource.productType,
      parentId: resource.parentId,
      parentType: resource.parentType,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      status: resource.status,
      type: resource.type,
      isPublic: false,
      isSearchable: resource?.isSearchable,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
    };
  }
}
