import { Client } from "../..";
import { EventType, BaseEvent, ClientHandleFunction } from "../../schema";
import { PubSub } from "@google-cloud/pubsub";

export class PubSubClient implements Client {
  readonly pubsub: PubSub;
  private ownerId?: string;
  private whitelabel?: string = "default";

  constructor(readonly id: string, readonly projectId: string) {
    this.pubsub = new PubSub({ projectId });
  }

  setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }

  setWhitelabel(whitelabel: string): void {
    this.whitelabel = whitelabel;
  }

  private subscriptionName(eventType: EventType): string {
    return `${this.id}--${eventType}--sub`;
  }

  async setupSource(eventType: EventType) {
    const topic = await this.setupDestination(eventType);
    const subscription = this.pubsub.subscription(
      this.subscriptionName(eventType)
    );
    if ((await subscription.exists())[0]) return subscription;
    const [newSubscription] = await topic.createSubscription(
      this.subscriptionName(eventType)
    );
    return newSubscription;
  }

  async setupDestination(eventType: EventType) {
    const topic = this.pubsub.topic(eventType);
    if ((await topic.exists())[0]) return topic;
    const [createdTopic] = await this.pubsub.createTopic(eventType);
    return createdTopic;
  }

  async publish(event: BaseEvent): Promise<boolean> {
    if (!event.ownerId) event.ownerId = this.ownerId ?? "";
    if (!event.whitelabel) event.whitelabel = this.whitelabel ?? "default";
    const eventBuffer = Buffer.from(JSON.stringify(event));
    this.pubsub.topic(event.eventType).publish(eventBuffer);
    this.pubsub
      .topic(`${EventType.WEBHOOK_OUTGOING_CREATED}--${event.whitelabel}`)
      .publish(eventBuffer);
    return true;
  }

  async onMessage(eventType: EventType, handle: ClientHandleFunction) {
    const subscription = this.setupSource(eventType);
    (await subscription).on(eventType, handle);
  }

  async onError(eventType: EventType, handle: ClientHandleFunction) {
    const subscription = this.pubsub.subscription(
      this.subscriptionName(eventType)
    );
    subscription.on("message", handle);
  }
}
