"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
var resource_1 = require("../resource");
var uuid_1 = require("uuid");
var BaseEvent = /** @class */ (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(eventType, resource) {
        var _this = _super.call(this, resource.resourceId, resource.resourceType, resource.data) || this;
        _this.eventType = eventType;
        _this.eventId = (0, uuid_1.v4)();
        _this.eventDate = new Date().toISOString();
        return _this;
    }
    return BaseEvent;
}(resource_1.ResourceBase));
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base.js.map