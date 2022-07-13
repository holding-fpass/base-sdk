import { PubsubMessage } from "@google-cloud/pubsub/build/src/publisher";
import { BaseEvent } from "schema";

export const PubSubEvent = <EventType = BaseEvent<any>>(
  payload: unknown,
  logTitle: string = "Event"
): EventType => {
  let event: EventType;
  if (process.env.NODE_ENV === "development") {
    event = (payload as Request).body as unknown as EventType;
  } else {
    event =
      JSON.parse(
        Buffer.from(
          (payload as PubsubMessage).data as string,
          "base64"
        ).toString()
      ) || {};
  }
  console.info(
    `${logTitle} Received [EventID: ${
      (event as unknown as BaseEvent).eventId
    }] ResourceID: [${(event as unknown as BaseEvent).resourceId}]`
  );
  return event;
};
