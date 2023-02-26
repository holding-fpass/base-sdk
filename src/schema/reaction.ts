import { Timestamp } from "@google-cloud/firestore";
import {
  Resource,
  ResourceStatus,
  ResourceType,
  SpannerQueryResource,
  SQLQueryResourceInsert,
} from "./resource";

import { Whitelabel } from "./whitelabel";

export enum ReactionType {
  CREATED = "reaction.created"
}

export class Reaction extends Resource<ResourceStatus, ReactionType> implements SpannerQueryResource {
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
        parentId: this.parentId,
        parentType: this.parentType,
        ownerId: this.ownerId,
        emoji: this.content,
        createdAt: this.timestamp instanceof Timestamp ? this.timestamp.toDate() : new Date(this.timestamp as string)
      }
    }
  }
}
