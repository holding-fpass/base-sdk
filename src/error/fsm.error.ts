import { CustomError } from "ts-custom-error";
import * as Sentry from "@sentry/node";
import { IError } from "./error.interfaces";

export class FSMError extends CustomError implements IError {
  constructor(message: string, public data?: any) {
    super(message);
  }
  publish() {
    Sentry.captureException(this, {
      level: Sentry.Severity.Warning,
    });
  }
}
