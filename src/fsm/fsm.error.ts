import { CustomError } from "ts-custom-error";
export class FSMError extends CustomError {
  constructor(message: string, public data?: any) {
    super(message);
  }
}
