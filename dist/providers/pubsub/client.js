"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubClient = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
class PubSubClient {
    constructor(id, projectId) {
        this.id = id;
        this.projectId = projectId;
        this.pubsub = new pubsub_1.PubSub({ projectId });
    }
    subscriptionName(eventType) {
        return `${this.id}--${eventType}--sub`;
    }
    setupSource(eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield this.setupDestination(eventType);
            const subscription = this.pubsub.subscription(this.subscriptionName(eventType));
            if ((yield subscription.exists())[0])
                return subscription;
            const [newSubscription] = yield topic.createSubscription(this.subscriptionName(eventType));
            return newSubscription;
        });
    }
    setupDestination(eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = this.pubsub.topic(eventType);
            if ((yield topic.exists())[0])
                return topic;
            const [createdTopic] = yield this.pubsub.createTopic(eventType);
            return createdTopic;
        });
    }
    publish(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pubsub
                .topic(event.eventType)
                .publish(Buffer.from(JSON.stringify(event)));
            return true;
        });
    }
    onMessage(eventType, handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = this.setupSource(eventType);
            (yield subscription).on(eventType, handle);
        });
    }
    onError(eventType, handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = this.pubsub.subscription(this.subscriptionName(eventType));
            subscription.on('message', handle);
        });
    }
}
exports.PubSubClient = PubSubClient;
//# sourceMappingURL=client.js.map