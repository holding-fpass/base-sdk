import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum ContractStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVAILABLE = "unavailable",
}

export const ContractStatusTransitionMap = new Map<
  ContractStatus,
  ContractStatus[]
>([
  [ContractStatus.CREATED, [ContractStatus.ACTIVE]],
  [ContractStatus.ACTIVE, [ContractStatus.UNAVAILABLE]],
]);

export enum ContractItemScopeKey {
  DOMAIN = "domain",
  WHITELABEL = "whitelabel",
  PRODUCER = "producer",
  MENTOR = "mentor",
  AFFILIATE = "affiliate",
  PRODUCT_PER_MINUTE = 'producer.per.minute',
  CUSTOM = "custom",
}

export interface ContractItem {
  scopeKey: ContractItemScopeKey;
  scopeValue: string;
  // Purchase
  percentage: number;
  value: number;
  //
  children?: ContractItem[];
}

export class Contract extends Resource<ContractStatus> {
  resourceType = ResourceType.CONTRACT;
  transitionMap = ContractStatusTransitionMap;
  name!: string;
  whitelabel!: Whitelabel;
  items!: ContractItem[];
}
