import {
  ResourceType,
  CampaignStatusTransitionMap,
  FormStatusTransitionMap,
  MeasurementStatusTransitionMap,
  TransactionStatusTransitionMap,
  FormResponseStatusTransitionMap,
  SubtitleStatusTransitionMap,
  PlanStatusTransitionMap,
} from '../schema';

export const ResourceStatusTransitionMap = new Map<
  ResourceType,
  Map<string, string[]>
>([
  [ResourceType.CAMPAIGN, CampaignStatusTransitionMap],
  [ResourceType.FORM, FormStatusTransitionMap],
  [ResourceType.MEASUREMENT, MeasurementStatusTransitionMap],
  [ResourceType.TRANSACTION, TransactionStatusTransitionMap],
  [ResourceType.FORM_RESPONSE, FormResponseStatusTransitionMap],
  [ResourceType.SUBTITLE, SubtitleStatusTransitionMap],
  [ResourceType.PLAN, PlanStatusTransitionMap],
]);
