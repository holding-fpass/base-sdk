"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const schema_1 = require("../schema");
class Publisher {
    constructor(client) {
        this.client = client;
    }
    setup(eventType) {
        return this.client.setupDestination(eventType);
    }
    create(eventType, resource) {
        return this.event = new schema_1.BaseEvent(eventType, resource);
    }
    publish() {
        return this.client.publish(this.event);
    }
}
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.js.map