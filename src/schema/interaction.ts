import { BigQueryTimestamp } from "@google-cloud/bigquery";
import { User } from "@sentry/node";
import { Timestamp } from "firebase-admin/firestore";
import {
  Resource,
  ResourceType,
  SearchableResource,
  DisplayResource,
  BigQueryResource,
  BigQueryResourceInsert,
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
  implements SearchableResource, BigQueryResource {
  resourceType = ResourceType.INTERACTION;
  transitionMap?= InteractionStatusTransitionMap;
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
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(resource: Interaction): DisplayResource {
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

  public toBigQueryResourceInsert(): BigQueryResourceInsert {
    if (
      this.resourceType === ResourceType.INTERACTION &&
      this.productType === ResourceType.CONTENT &&
      this.type === InteractionType.VIEW
    ) {
      return this.bigQueryInteractionContentViewInsertData();
    }
    return {
      table: 'resource',
      data: Interaction.asDisplayResource(this)
    };
  }

  private bigQueryInteractionContentViewInsertData() {
    return {
      table: 'InteractionContentView',
      data: {
        resourceId: this.resourceId,
        whitelabel: this.whitelabel,
        productId: this.productId,
        productType: this.productType,
        parentId: this.parentId,
        parentType: this.parentType,
        ownerId: this.ownerId,
        mediaStart: Number(this.mediaStart?.toFixed(6)),
        mediaEnd: Number(this.mediaEnd?.toFixed(6)),
        mediaCount: this.mediaCount ? Number(this.mediaCount)?.toFixed(2) : 10,
        mediaSpeed: this.mediaSpeed ? Number(this.mediaSpeed)?.toFixed(2) : 1,
        mediaResolution: this.mediaResolution || '1080p',
        createdAt: new BigQueryTimestamp(this.timestamp instanceof Timestamp ? this.timestamp.toDate() : new Date(this.timestamp as string)),
      } as Pick<
        Interaction,
        | 'resourceId'
        | 'whitelabel'
        | 'productId'
        | 'productType'
        | 'parentId'
        | 'parentType'
        | 'ownerId'
        | 'mediaStart'
        | 'mediaEnd'
        | 'mediaCount'
        | 'mediaSpeed'
        | 'mediaResolution'
      > & { createdAt: BigQueryTimestamp },
    };
  }
}
