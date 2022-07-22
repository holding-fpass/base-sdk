import { Certificate } from "./certificate";
import { Course } from "./course";
import { Device } from "./device";
import { Metadata } from "./metadata";
import { Playlist } from "./playlist";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { Scope } from "./scope";
import { Subscription } from "./subscription";
import { Transaction } from "./transaction";
import { Whitelabel } from "./whitelabel";
import { FormResponse } from "./form";
import { Tag } from "./tag";

export enum UserPermission {
  STUDENT = "student",
  TEACHER = "teacher",
  ADMINISTRATOR = "administrator",
  PRODUCER = "producer",
  MACHINE = "machine",
  SYSTEM = "system",
}

export enum UserData {
  TAX_ID = "taxId",
  NAME = "name",
  EMAIL = "email",
  PHONE = "phone",
  EXTERNAL_ID = "externalId",
  CUSTOM_001 = "custom_001",
  CUSTOM_002 = "custom_002",
  CUSTOM_003 = "custom_003",
  CUSTOM_004 = "custom_004",
  CUSTOM_005 = "custom_005",
  CUSTOM_006 = "custom_006",
  CUSTOM_007 = "custom_007",
  CUSTOM_008 = "custom_008",
  CUSTOM_009 = "custom_009",
  CUSTOM_010 = "custom_010",
}

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
  DELETED = "deleted",
}

export const UserStatusTransitionMap = new Map<UserStatus, UserStatus[]>([
  [UserStatus.CREATED, [UserStatus.ACTIVE, UserStatus.DELETED]],
  [UserStatus.ACTIVE, [UserStatus.DELETED, UserStatus.UNAVALIABLE]],
  [UserStatus.UNAVALIABLE, [UserStatus.DELETED]],
  [UserStatus.DELETED, [UserStatus.CREATED]],
]);
export class User extends Resource<UserStatus> {
  id!: string;
  resourceType = ResourceType.USER;
  transitionMap = UserStatusTransitionMap;
  email!: string;
  name?: string;
  taxId?: string;
  phone?: string;
  externalId?: string;
  token?: string;
  permission!: UserPermission;
  providerExtra?: ProviderExtra[];
  // Data
  data?: Record<UserData, string>;
  // Media
  imageUrl?: string;
  image128x128?: string;
  // Permissions
  whitelabel!: Whitelabel;
  devices?: Partial<Device>[];
  scopes?: Scope[];
  restricted?: boolean;
  // Assessements
  formResponses?: Partial<FormResponse>[];
  certificates?: Partial<Certificate>[];
  // Extras
  contentExtra?: Metadata[];
  tags?: Partial<Tag>[];
  // Purchases
  subscriptions?: Partial<Subscription>[];
  courses?: Partial<Course>[];
  transactions?: Partial<Transaction>[];
  // Playlist
  favoritePlaylist?: Partial<Playlist>;
  suggestPlaylist?: Partial<Playlist>;
}
