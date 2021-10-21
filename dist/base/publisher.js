"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
var Publisher = /** @class */ (function () {
    function Publisher(client) {
        this.client = client;
    }
    Publisher.prototype.setup = function (eventType) {
        return this.client.setupDestination(eventType);
    };
    Publisher.prototype.publish = function (event) {
        return this.client.publish(event);
    };
    return Publisher;
}());
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.js.map