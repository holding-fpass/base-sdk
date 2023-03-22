import {
  Resource,
  ResourceStatus,
  ResourceType,
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
}
