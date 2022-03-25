import * as Sentry from "@sentry/node";

export class ErrorPublisher {
  private default = {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || "development",
    tracesSampleRate: 0.5,
  } as Sentry.NodeOptions;

  init(options: { version: string }) {
    Sentry.init({
      ...this.default,
      release: options.version,
    });
  }

  setUser(options: { userId: string; userName?: string }) {
    Sentry.setUser({
      id: options.userId,
      username: options?.userName,
    });
  }
}
