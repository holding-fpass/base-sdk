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
import { Response } from "./form";

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  UNAVALIABLE = "unavaliable",
  DELETED = "deleted",
}

export enum UserPermission {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMINISTRATOR = 'administrator',
  PRODUCER = 'producer',
  MACHINE = 'machine',
  SYSTEM = 'system',
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
  // Media
  image128x128?: string;
  // Permissions
  whitelabel!: Whitelabel;
  devices?: Partial<Device>[];
  scopes?: Scope[];
  // Assessements
  wizard?: Partial<Response>[];
  certificates?: Partial<Certificate>[];
  // Extras
  contentExtra?: Metadata[];
  // Purchases
  subscriptions?: Partial<Subscription>[];
  courses?: Partial<Course>[];
  transactions?: Partial<Transaction>[];
  // Playlist
  favoritePlaylist?: Partial<Playlist>;
  suggestPlaylist?: Partial<Playlist>;
}
