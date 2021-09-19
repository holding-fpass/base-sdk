"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const schema_1 = require("./schema");
const uuid_1 = require("uuid");
const base_1 = require("./base");
const client = new _1.PubSubClient('app-test', 'project-id');
const subscriber = new base_1.Subscriber(client);
subscriber.setup(schema_1.EventType.GenericEventCreated);
subscriber.listen(schema_1.EventType.GenericEventCreated, (message, second) => {
    console.log(message);
    message.ack();
}, (error) => {
    console.log(error);
});
const publisher = new _1.Publisher(client);
publisher.setup(schema_1.EventType.GenericEventCreated);
const event = publisher.create(schema_1.EventType.GenericEventCreated, {
    resourceId: (0, uuid_1.v4)(),
    resourceType: schema_1.ResourceType.DataEvent
});
publisher.publish();
//# sourceMappingURL=sample.js.map