import { BigQueryTimestamp } from "@google-cloud/bigquery";
import { Timestamp } from "@google-cloud/firestore";
import {
  Resource,
  ResourceType,
  SearchableResource,
  DisplayResource,
  BigQueryResource,
  SQLQueryResourceInsert,
  SpannerQueryResource,
} from "./resource";
import { User } from "./user";

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
  implements SearchableResource, BigQueryResource, SpannerQueryResource
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

  public toBigQueryResourceInsert(): SQLQueryResourceInsert {
    if (
      this.resourceType === ResourceType.INTERACTION &&
      this.productType === ResourceType.CONTENT &&
      this.type === InteractionType.VIEW
    ) {
      return this.bigQueryInteractionContentViewInsertData();
    }
    return {
      table: "resource",
      data: Interaction.asDisplayResource(this),
    };
  }

  private bigQueryInteractionContentViewInsertData() {
    return {
      table: "InteractionContentView",
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
        mediaResolution: this.mediaResolution || "1080p",
        createdAt: new BigQueryTimestamp(
          this.timestamp instanceof Timestamp
            ? this.timestamp.toDate()
            : new Date(this.timestamp as string),
        ),
      } as Pick<
        Interaction,
        | "resourceId"
        | "whitelabel"
        | "productId"
        | "productType"
        | "parentId"
        | "parentType"
        | "ownerId"
        | "mediaStart"
        | "mediaEnd"
        | "mediaCount"
        | "mediaSpeed"
        | "mediaResolution"
      > & { createdAt: BigQueryTimestamp },
    };
  }

  // SpannerQueryResource
  public toSpannerQueryResourceInsert(): SQLQueryResourceInsert {
    switch (this.type) {
      //
      case InteractionType.VIEW:
        if (
          ![ResourceType.CONTENT, ResourceType.STAGE].includes(this.productType)
        )
          throw new Error(
            "Interaction dont have proper table insert avaliable this data",
          );

        return this.toSpannerQueryResourceInsertInteractionContentViewTable();
      //
      case InteractionType.OPEN:
        if (
          ![
            ResourceType.CONTENT,
            ResourceType.COURSE,
            ResourceType.STAGE,
            ResourceType.PLATFORM,
          ].includes(this.productType)
        )
          throw new Error(
            "Interaction dont have proper table insert avaliable this data",
          );

        return this.toSpannerQueryResourceInsertInteractionTable();

      default:
        throw new Error(
          "Interaction dont have proper table insert avaliable this data",
        );
    }
  }

  private toSpannerQueryResourceInsertInteractionContentViewTable(): SQLQueryResourceInsert {
    return {
      table: "InteractionContentView_v2",
      data: {
        resourceId: this.resourceId,
        whitelabel: this.whitelabel,
        productId: this.productId,
        productType: this.productType,
        parentId: this.parentId,
        parentType: this.parentType,
        ownerId: this.ownerId,
        mediaStart: this.mediaStart?.toFixed(6),
        mediaEnd: this.mediaEnd?.toFixed(6),
        mediaCount: this.mediaCount
          ? Number(this.mediaCount)?.toFixed(2)
          : "10",
        mediaSpeed: this.mediaSpeed ? Number(this.mediaSpeed)?.toFixed(2) : "1",
        mediaResolution: this.mediaResolution || "1080p",
        createdAt: (this.timestamp as Timestamp).toDate
          ? (this.timestamp as Timestamp).toDate()
          : new Date(this.timestamp as string),
      } as Pick<
        Interaction,
        | "resourceId"
        | "whitelabel"
        | "productId"
        | "productType"
        | "parentId"
        | "parentType"
        | "ownerId"
        | "mediaResolution"
      > & {
        mediaStart: string;
        mediaEnd: string;
        mediaCount: string;
        mediaSpeed: string;
        createdAt: Date;
      },
    };
  }

  private toSpannerQueryResourceInsertInteractionTable(): SQLQueryResourceInsert {
    return {
      table: "Interaction",
      data: {
        resourceId: this.resourceId,
        whitelabel: this.whitelabel,
        productId: this.productId,
        productType: this.productType,
        parentId: this.parentId || "",
        parentType: this.parentType || "",
        ownerId: this.ownerId,
        createdAt: (this.timestamp as Timestamp).toDate
          ? (this.timestamp as Timestamp).toDate()
          : new Date(this.timestamp as string),
      } as Pick<
        Interaction,
        | "resourceId"
        | "whitelabel"
        | "productId"
        | "productType"
        | "parentId"
        | "parentType"
        | "ownerId"
      > & {
        createdAt: Date;
      },
    };
  }
}
