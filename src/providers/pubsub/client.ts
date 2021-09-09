import { Client } from "../..";
import { EventType, BaseEvent, ClientHandleFunction } from "../../schema";
import { PubSub } from "@google-cloud/pubsub";

export class PubSubClient implements Client {

  readonly pubsub: PubSub;

  constructor(
    readonly id: string,
    readonly projectId: string
  ) {
    this.pubsub = new PubSub({projectId});
  }

  private subscriptionName(eventType: EventType): string {
    return `${this.id}--${eventType}--sub`
  }

  async setupSource(eventType: EventType) {
    const topic = await this.setupDestination(eventType);
    const subscription = this.pubsub.subscription(this.subscriptionName(eventType));
    if((await subscription.exists())[0]) return subscription;
    const [ newSubscription ] = await topic.createSubscription(this.subscriptionName(eventType));
    return newSubscription;
  }

  async setupDestination(eventType: EventType) {
    const topic = this.pubsub.topic(eventType)
    if ((await topic.exists())[0]) return topic;
    const [ createdTopic ] = await this.pubsub.createTopic(eventType)
    return createdTopic;
  }

  async publish(event: BaseEvent): Promise<boolean> {
    this.pubsub
      .topic(event.eventType)
      .publish(Buffer.from(JSON.stringify(event)))
    return true;
  }

  async onMessage(eventType: EventType, handle: ClientHandleFunction) {
    const subscription = this.setupSource(eventType);
    (await subscription).on(eventType, handle)
  }

  async onError(eventType: EventType, handle: ClientHandleFunction) {
    const subscription = this.pubsub.subscription(this.subscriptionName(eventType));
    subscription.on('message', handle)
  }

}