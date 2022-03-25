import { Severity } from "@sentry/node";

export const HttpExceptionSentryLevelMap = new Map<number, Severity>([
  [400, Severity.Error], // BadRequestException
  [401, Severity.Warning], // UnauthorizedException
  [412, Severity.Info], // PreconditionFailedException
  [404, Severity.Warning], // NotFoundException
  [500, Severity.Fatal], // InternalServerErrorException
]);
