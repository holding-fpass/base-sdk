"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
class Subscriber {
    constructor(client) {
        this.client = client;
    }
    setup(eventType) {
        return this.client.setupSource(eventType);
    }
    listen(eventType, handleMessage, handleError) {
        this.client.onMessage(eventType, handleMessage);
        this.client.onError(eventType, handleError);
    }
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map