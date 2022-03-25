import { CustomError } from "ts-custom-error";
import * as Sentry from "@sentry/node";
import { HttpExceptionSentryLevelMap } from "./error.maps";

export class FSMError extends CustomError {
  constructor(message: string, public data?: any) {
    super(message);
  }
  publish() {
    Sentry.captureException(this, {
      level: Sentry.Severity.Warning,
    });
  }
}
