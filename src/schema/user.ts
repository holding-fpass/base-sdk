import { Certificate } from "./certificate";
import { Channel } from "./channel";
import { Course } from "./course";
import { Device } from "./device";
import { Metadata } from "./metadata";
import { Playlist } from "./playlist";
import { ProviderExtra } from "./provider";
import { Resource } from "./resource";
import { Scope } from "./scope";
import { Subscription } from "./subscription";
import { Transaction } from "./transaction";
import { Whitelabel } from "./whitelabel";

export enum UserStatus {
  CREATED = "created",
  ACTIVE = "active",
  DELETED = "deleted",
}

export const UserStatusTransitionMap = new Map<UserStatus, UserStatus[]>([
  [UserStatus.CREATED, [UserStatus.ACTIVE, UserStatus.DELETED]],
  [UserStatus.ACTIVE, [UserStatus.DELETED]],
]);
export interface User extends Resource<UserStatus> {
  email: string;
  name?: string;
  taxId?: string;
  phone?: string;
  providerExtra?: ProviderExtra[];
  // Media
  image128x128?: string;
  // Permissions
  whitelabel: Whitelabel;
  devices: Device[];
  scopes?: Scope[];
  // Assessements
  wizard?: Response[];
  certificates?: Certificate[];
  //
  contentExtra?: Metadata[];
  // Purchases
  subscriptions?: Partial<Subscription>[];
  courses?: Partial<Course>[];
  transactions?: Partial<Transaction>[];
  // Playlist
  favoritePlaylist: Playlist;
  suggestPlaylist: Playlist;
}
