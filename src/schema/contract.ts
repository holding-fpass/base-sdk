import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum ContractStatus {
  CREATED = "created",
  ACTIVE = "active",
}

export const ContractStatusTransitionMap = new Map<
  ContractStatus,
  ContractStatus[]
>([[ContractStatus.CREATED, [ContractStatus.ACTIVE]]]);

export enum ContractItemScopeKey {
  DOMAIN = "domain",
  WHITELABEL = "whitelabel",
  PRODUCER = "producer",
  MENTOR = "mentor",
  AFFILIATE = "affiliate",
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
