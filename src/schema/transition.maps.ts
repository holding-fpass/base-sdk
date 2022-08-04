import {
  ResourceType,
  CampaignStatusTransitionMap,
  FormStatusTransitionMap,
  MeasurementStatusTransitionMap,
  TransactionStatusTransitionMap,
} from "../schema";

export const ResourceStatusTransitionMap = new Map<
  ResourceType,
  Map<string, string[]>
>([
  [ResourceType.CAMPAIGN, CampaignStatusTransitionMap],
  [ResourceType.FORM, FormStatusTransitionMap],
  [ResourceType.MEASUREMENT, MeasurementStatusTransitionMap],
  [ResourceType.TRANSACTION, TransactionStatusTransitionMap],
]);
