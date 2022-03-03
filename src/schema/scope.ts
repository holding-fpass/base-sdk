import { ResourceType } from "./resource";

export type Scope = ReturnType<() => Lowercase<keyof typeof ResourceType>>;
