"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
const resource_1 = require("../resource");
const uuid_1 = require("uuid");
class BaseEvent extends resource_1.ResourceBase {
    constructor(eventType, resource) {
        super(resource.resourceId, resource.resourceType, resource.data);
        this.eventType = eventType;
        this.eventId = (0, uuid_1.v4)();
        this.eventDate = new Date().toISOString();
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base.js.map