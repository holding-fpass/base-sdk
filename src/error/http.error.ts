import { CustomError } from "ts-custom-error";
import * as Sentry from "@sentry/node";
import { HttpExceptionSentryLevelMap } from "./error.maps";

export class HTTPError extends CustomError {
  constructor(message: string, public code: number, public data?: any) {
    super(message);
  }
  publish() {
    Sentry.captureException(this, {
      level:
        HttpExceptionSentryLevelMap.get(this.code) || Sentry.Severity.Error,
    });
  }
}
