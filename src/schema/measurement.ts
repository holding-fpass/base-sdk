import { WhereFilterOp } from "firebase-admin/firestore";
import { Hash } from "./hash";
import { ProviderExtra } from "./provider";
import { CacheResourse, Resource, ResourceType } from "./resource";
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
  COURSE_STUDENTS_COUNT = "course.students.count",
  COURSE_STUDENTS_LIST = "course.students.list",
  COURSE_REACTION_COUNT = "course.reaction.count",
  COURSE_REACTION_COUNT_LIST = "course.reaction.count.list",
  COURSE_RATING_COUNT = "course.rating.count",
  COURSE_RATING_AVG = "course.rating.avg",
  COURSE_COMPLETION_RATE = "course.completion.rate",
  COURSE_CONTENT_WITH_HIGHER_DROPOUT = "course.content.with.higher.dropout",
  COURSE_SPEED_AVERAGE = "course.speed.average",
  COURSE_SPEEDS_COUNT = "course.speeds.count",
  // Content
  CONTENT_CLICK = "content.click",
  CONTENT_OPEN = "content.open",
  CONTENT_VIEW = "content.view",
  CONTENT_REACTION_COUNT = "content.reaction.count",
  CONTENT_REACTION_COUNT_LIST = "content.reaction.count.list",
  CONTENT_SPEED_AVERAGE = "content.speed.average",
  CONTENT_SPEEDS_COUNT = "content.speeds.count",
  CONTENT_WATCHERS_COUNT = "content.watchers.count",
  CONTENT_COMPLETION_RATE = "content.completion.rate",
  CONTENT_COMPLETION_COUNT = "content.completion.count",
  CONTENT_TIME_WITH_HIGHER_DROPOUT = "content.time.with.higher.dropout",
  CONTENT_FORM_RESPONSE_AVERAGE = "content.form.response.average",
  CONTENT_COMPLETION_LAST_TWELVE_WEEKS = "content.completion.last.twelve.weeks",
  // Response
  RESPONSE_AVG = "response.avg",
  RESPONSE_COUNT = "response.count",
  RESPONSE_COUNT_1 = "response.count.1",
  RESPONSE_COUNT_2 = "response.count.2",
  RESPONSE_COUNT_3 = "response.count.3",
  RESPONSE_COUNT_4 = "response.count.4",
  RESPONSE_COUNT_5 = "response.count.5",
  // Transaction
  TRANSACTIONS_TOTAL_VALUE = "transactions.total.value",
  // User
  USERS_TOTAL_COUNT = "users.total.count",
  DEVICES_TOTAL_COUNT = "devices.total.count",
  USERS_ACTIVE_COUNT = "users.active.count",
  SEARCH_QUERIES = "search.queries",
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
  userId?: string;
  resourceId?: string;
  resourceType?: ResourceType;
  resourceValues?: MeasurementFilterValues[];
  //
  dateStart?: string;
  dateEnd?: string;
  //
  limit?: string;
  offset?: string;
}

export interface MeasurementValue {
  key: string;
  value: any;
}
export class Measurement extends Resource<MeasurementStatus, MeasurementType> implements CacheResourse {
  resourceType = ResourceType.MEASUREMENT;
  //
  group?: MeasurementGroup;
  filter!: Partial<MeasurementFilter>;
  filterHash!: string;
  user!: Partial<User>;
  value?: string;
  values?: MeasurementValue[];
  // Provider
  force?: boolean;
  permanent?: boolean;
  providerExtra?: ProviderExtra[];
  // Cache Resource
  hash(): string {
    return Hash.measurementFilter(this.type!, this.filter);
  }
  cacheKey(): string {
    return `${this.whitelabel}--${ResourceType.MEASUREMENT}--hash:${this.hash}`;
  }
  cacheTtl: number = 0;
}
