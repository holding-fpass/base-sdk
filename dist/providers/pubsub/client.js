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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubClient = void 0;
var pubsub_1 = require("@google-cloud/pubsub");
var PubSubClient = /** @class */ (function () {
    function PubSubClient(id, projectId) {
        this.id = id;
        this.projectId = projectId;
        this.pubsub = new pubsub_1.PubSub({ projectId: projectId });
    }
    PubSubClient.prototype.subscriptionName = function (eventType) {
        return this.id + "--" + eventType + "--sub";
    };
    PubSubClient.prototype.setupSource = function (eventType) {
        return __awaiter(this, void 0, void 0, function () {
            var topic, subscription, newSubscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setupDestination(eventType)];
                    case 1:
                        topic = _a.sent();
                        subscription = this.pubsub.subscription(this.subscriptionName(eventType));
                        return [4 /*yield*/, subscription.exists()];
                    case 2:
                        if ((_a.sent())[0])
                            return [2 /*return*/, subscription];
                        return [4 /*yield*/, topic.createSubscription(this.subscriptionName(eventType))];
                    case 3:
                        newSubscription = (_a.sent())[0];
                        return [2 /*return*/, newSubscription];
                }
            });
        });
    };
    PubSubClient.prototype.setupDestination = function (eventType) {
        return __awaiter(this, void 0, void 0, function () {
            var topic, createdTopic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        topic = this.pubsub.topic(eventType);
                        return [4 /*yield*/, topic.exists()];
                    case 1:
                        if ((_a.sent())[0])
                            return [2 /*return*/, topic];
                        return [4 /*yield*/, this.pubsub.createTopic(eventType)];
                    case 2:
                        createdTopic = (_a.sent())[0];
                        return [2 /*return*/, createdTopic];
                }
            });
        });
    };
    PubSubClient.prototype.publish = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pubsub
                    .topic(event.eventType)
                    .publish(Buffer.from(JSON.stringify(event)));
                return [2 /*return*/, true];
            });
        });
    };
    PubSubClient.prototype.onMessage = function (eventType, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscription = this.setupSource(eventType);
                        return [4 /*yield*/, subscription];
                    case 1:
                        (_a.sent()).on(eventType, handle);
                        return [2 /*return*/];
                }
            });
        });
    };
    PubSubClient.prototype.onError = function (eventType, handle) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription;
            return __generator(this, function (_a) {
                subscription = this.pubsub.subscription(this.subscriptionName(eventType));
                subscription.on('message', handle);
                return [2 /*return*/];
            });
        });
    };
    return PubSubClient;
}());
exports.PubSubClient = PubSubClient;
//# sourceMappingURL=client.js.map