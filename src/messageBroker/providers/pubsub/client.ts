import { PubSub, v1 } from "@google-cloud/pubsub";
import { MessageBrokerClient, MessageBrokerHandleFunction } from "../../..";
import { EventType, BaseEvent } from "../../../schema";

export class PubSubClient implements MessageBrokerClient {
  readonly pubsub: PubSub;
  readonly publisher: v1.PublisherClient;
  readonly publisherWebhook: v1.PublisherClient;
  private ownerId?: string;
  private whitelabel?: string = "default";
  private ownerExternalId?: string;

  private static retrySettings = {
    retryCodes: [
      10, // 'ABORTED'
      1, // 'CANCELLED',
      4, // 'DEADLINE_EXCEEDED'
      13, // 'INTERNAL'
      8, // 'RESOURCE_EXHAUSTED'
      14, // 'UNAVAILABLE'
      2, // 'UNKNOWN'
    ],
    backoffSettings: {
      initialRetryDelayMillis: 100,
      retryDelayMultiplier: 1.3,
      maxRetryDelayMillis: 60000,
      initialRpcTimeoutMillis: 5000,
      rpcTimeoutMultiplier: 1.2,
      maxRpcTimeoutMillis: 600000,
      totalTimeoutMillis: 600000,
    },
  };

  constructor(readonly id: string, readonly projectId: string) {
    // const apiEndpoint = "us-central1-pubsub.googleapis.com:443";
    this.publisher = new v1.PublisherClient({ projectId });
    this.publisherWebhook = new v1.PublisherClient({ projectId });
    this.pubsub = new PubSub({ projectId });
  }

  setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }

  setOwnerExternalId(ownerExternalId: string): void {
    this.ownerExternalId = ownerExternalId;
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

  private async _publish(event: BaseEvent, topic?: string): Promise<boolean> {
    // Prepare
    if (!event.ownerId) event.ownerId = this.ownerId ?? "";
    if (!event.ownerExternalId) event.ownerExternalId = this.ownerExternalId;
    if (!event.whitelabel) event.whitelabel = this.whitelabel ?? "default";
    const eventBuffer = Buffer.from(JSON.stringify(event));
    this.pubsub.topic(topic ?? event.eventType).publish(eventBuffer);
    this.pubsub
      .topic(`${EventType.WEBHOOK_OUTGOING_CREATED}--${event.whitelabel}`)
      .publish(eventBuffer);
    // const formattedTopic = this.publisher.projectTopicPath(
    //   this.projectId,
    //   topic ?? event.eventType
    // );
    // const messages = [
    //   {
    //     data: eventBuffer,
    //   },
    // ];
    // this.publisher.publish(
    //   {
    //     topic: formattedTopic,
    //     messages,
    //   },
    //   { retry: PubSubClient.retrySettings }
    // );
    // Webhook Event Prepare
    // const formattedTopicWebhook = this.publisher.projectTopicPath(
    //   this.projectId,
    //   `${EventType.WEBHOOK_OUTGOING_CREATED}--${event.whitelabel}`
    // );
    // this.publisher.publish(
    //   {
    //     topic: formattedTopicWebhook,
    //     messages,
    //   },
    //   { retry: PubSubClient.retrySettings }
    // );
    return true;
  }

  async publish(event: BaseEvent): Promise<boolean> {
    return this._publish(event);
  }

  async publishForWhitelabel(event: BaseEvent): Promise<boolean> {
    return this._publish(event, `${event.eventType}--${event.whitelabel}`);
  }

  async onMessage(eventType: EventType, handle: MessageBrokerHandleFunction) {
    const subscription = this.setupSource(eventType);
    (await subscription).on("message", handle);
  }

  async onError(eventType: EventType, handle: MessageBrokerHandleFunction) {
    const subscription = this.pubsub.subscription(
      this.subscriptionName(eventType)
    );
    subscription.on("error", handle);
  }
}
