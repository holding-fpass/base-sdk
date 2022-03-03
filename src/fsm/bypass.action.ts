import { StateAction } from "./fsm.sdk";

export const BypassStateAction: StateAction<any, any> = async () => {
  return {
    result: true,
  };
};
