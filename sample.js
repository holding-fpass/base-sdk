"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
var schema_1 = require("./src/schema");
var uuid_1 = require("uuid");
var base_1 = require("./src/base");
// Define Client
var client = new src_1.PubSubClient('app-test', 'project-id');
// Prepare Subscriber
var subscriber = new base_1.Subscriber(client);
// Configure Subscription
subscriber.setup(schema_1.EventType.GenericEventCreated);
// Listen
subscriber.listen(schema_1.EventType.GenericEventCreated, function (message, second) {
    console.log(message);
    message.ack();
}, function (error) {
    console.log(error);
});
// Prepare Publisher
var publisher = new src_1.Publisher(client);
// Configure Topic on service infrastructure
publisher.setup(schema_1.EventType.GenericEventCreated);
// Create Event
var event = new schema_1.BaseEvent(schema_1.EventType.GenericEventCreated, {
    resourceId: (0, uuid_1.v4)(),
    resourceType: schema_1.ResourceType.DataEvent
});
// Publish
publisher.publish(event);
//# sourceMappingURL=sample.js.map