"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
var Subscriber = /** @class */ (function () {
    function Subscriber(client) {
        this.client = client;
    }
    Subscriber.prototype.setup = function (eventType) {
        return this.client.setupSource(eventType);
    };
    Subscriber.prototype.listen = function (eventType, handleMessage, handleError) {
        this.client.onMessage(eventType, handleMessage);
        this.client.onError(eventType, handleError);
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map