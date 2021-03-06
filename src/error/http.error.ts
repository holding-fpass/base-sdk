import { CustomError } from "ts-custom-error";
import * as Sentry from "@sentry/node";
import { HttpExceptionSentryLevelMap } from "./error.maps";
import { IError } from "./error.interfaces";

export class HTTPError extends CustomError implements IError {
  constructor(message: string, public code: number = 500, public data?: any) {
    super(message);
  }
  publish() {
    Sentry.configureScope((scope) => {
      scope.setExtra("extra", this?.data);
    });
    Sentry.captureException(this, {
      level:
        HttpExceptionSentryLevelMap.get(this.code) || Sentry.Severity.Error,
    });
  }
}
