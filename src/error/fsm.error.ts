import { CustomError } from "ts-custom-error";
import * as Sentry from "@sentry/node";
import { IError } from "./error.interfaces";

export class FSMError extends CustomError implements IError {
  constructor(
    public message: string,
    public code: number = 0,
    public data?: any
  ) {
    super(message);
  }
  publish() {
    Sentry.configureScope((scope) => {
      scope.setExtra("extra", this?.data);
    });
    Sentry.captureException(this, {
      level: Sentry.Severity.Warning,
    });
  }
}
