import { Timestamp } from "@google-cloud/firestore";
import {
  Resource,
  ResourceStatus,
  ResourceType,
  SQLQueryResourceInsert,
} from "./resource";

import { Whitelabel } from "./whitelabel";

export enum ReactionType {
  CREATED = "reaction.created"
}

export class Reaction extends Resource<ResourceStatus, ReactionType> {
  resourceType = ResourceType.REACTION;
  ownerName?: string;
  ownerWhitelabel?: Whitelabel;
  parentId?: string;
  parentType?: ResourceType;
  threadId!: string;
  threadType!: ResourceType;
  //
  content!: string;
  // SpannerQueryResource
  toSpannerQueryResourceInsert(): SQLQueryResourceInsert {
    return {
      table: 'InteractionReaction',
      data: {
        resourceId: this.resourceId,
        whitelabel: this.whitelabel,
        productId: this.threadId,
        productType: ResourceType.CONTENT,
        parentId: this.parentId || '00000000-0000-0000-0000-000000000000',
        parentType: this.parentType || ResourceType.PLATFORM,
        ownerId: this.ownerId,
        emoji: this.content,
        createdAt: (this.timestamp as Timestamp).toDate ? (this.timestamp as Timestamp).toDate() : new Date(this.timestamp as string)
      }
    }
  }
}
