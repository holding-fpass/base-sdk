import { WhereFilterOp } from "firebase-admin/firestore";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { User } from "./user";

export enum MeasurementType {
  // Entity
  ENTITY_COUNT = "entity.count",
  // Page
  PAGE_CLICK = "page.click",
  PAGE_OPEN = "page.open",
  // Course
  COURSE_CLICK = "course.click",
  COURSE_OPEN = "course.open",
  COURSE_VIEW = "course.view",
  COURSE_WATCHERS_COUNT = "course.watchers.count",
  COURSE_REACTION_COUNT = "course.reaction.count",
  COURSE_COMPLETION_RATE = "course.completion.rate",
  COURSE_CONTENT_WITH_HIGHER_DROPOUT = 'course.content.with.higher.dropout',
  COURSE_SPEED_AVERAGE = "course.speed.average",
  // Content
  CONTENT_CLICK = "content.click",
  CONTENT_OPEN = "content.open",
  CONTENT_VIEW = "content.view",
  CONTENT_REACTION_COUNT = "content.reaction.count",
  CONTENT_SPEED_AVERAGE = "content.speed.average",
  CONTENT_WATCHERS_COUNT = "content.watchers.count",
  CONTENT_COMPLETION_RATE = "content.completion.rate",
  CONTENT_COMPLETION_COUNT = "content.completion.count",
  CONTENT_TIME_WITH_HIGHER_DROPOUT = "content.time.with.higher.dropout",
  // Response
  RESPONSE_AVG = "response.avg",
  RESPONSE_COUNT = "response.count",
  RESPONSE_COUNT_1 = "response.count.1",
  RESPONSE_COUNT_2 = "response.count.2",
  RESPONSE_COUNT_3 = "response.count.3",
  RESPONSE_COUNT_4 = "response.count.4",
  RESPONSE_COUNT_5 = "response.count.5",
  // Transaction
  TRANSACTIONS_TOTAL_VALUE = 'transactions.total.value',
  // User
  USERS_TOTAL_COUNT = 'users.total.count',
  DEVICES_TOTAL_COUNT = 'devices.total.count',
  USERS_ACTIVE_COUNT = 'users.active.count',
}

export enum MeasurementStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  PROVIDER_EXECUTED = "provider.executed",
  ACTIVE = "active",
  DELETED = "deleted",
}

export enum MeasurementGroup {
  COURSE_STUDENTS_PROGRESS = "course.students.progress",
  CONTENT_STUDENTS_PROGRESS = "course.students.progress",
}

export const MeasurementStatusTransitionMap = new Map<
  MeasurementStatus,
  MeasurementStatus[]
>([
  [MeasurementStatus.CREATED, [MeasurementStatus.PROVIDER_CREATED]],
  [MeasurementStatus.PROVIDER_CREATED, [MeasurementStatus.PROVIDER_EXECUTED]],
  [MeasurementStatus.PROVIDER_EXECUTED, [MeasurementStatus.ACTIVE]],
  [MeasurementStatus.ACTIVE, [MeasurementStatus.DELETED]],
]);

export class MeasurementFilterValues {
  key!: string;
  operator!: WhereFilterOp;
  value!: string;
}
export class MeasurementFilter {
  userId!: string;
  resourceId!: string;
  resourceType!: ResourceType;
  resourceValues!: MeasurementFilterValues[];
  dateStart!: string;
  dateEnd!: string;
}
export class Measurement extends Resource<MeasurementStatus> {
  resourceType = ResourceType.MEASUREMENT;
  //
  type!: MeasurementType;
  group?: MeasurementGroup;
  filter!: Partial<MeasurementFilter>;
  filterHash!: string;
  user!: Partial<User>;
  value!: string;
  // Provider
  force!: boolean;
  permanent!: boolean;
  providerExtra?: ProviderExtra[];
}
