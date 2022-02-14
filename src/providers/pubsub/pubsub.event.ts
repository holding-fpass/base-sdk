export const PubSubEvent = <EventType>(pubSubMessage: any, title?: string) => {
  const event =
    JSON.parse(Buffer.from(pubSubMessage.data, "base64").toString()) || {};
  console.info(
    `${title} Received [EventID: ${event?.eventId}] ResourceID: [${event?.resourceId}]`
  );
  return event as EventType;
};
