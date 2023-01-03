import { Channel } from "./channel";
import { ResourceType } from "./resource";

export const DisplayResourceFunctionMap = new Map<ResourceType, Function>([
  [ResourceType.CHANNEL, Channel.prototype.asDisplayResource],
]);
