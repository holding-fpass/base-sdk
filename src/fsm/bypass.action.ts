import { StateAction } from "./fsm.sdk";

export const BypassStateAction: StateAction<unknown, unknown> = async () =>
  true;
