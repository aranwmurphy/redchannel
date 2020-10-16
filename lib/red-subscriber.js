"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSubscriber = void 0;
var events_1 = require("events");
function errorListener(err) { }
var RedSubscriber = (function (_super) {
    __extends(RedSubscriber, _super);
    function RedSubscriber(client) {
        var _this = _super.call(this) || this;
        _this.client = client;
        _this.channels = new Set();
        _this.listener = _this.propogate.bind(_this);
        _this.on("error", errorListener);
        client.on("message", _this.listener);
        return _this;
    }
    RedSubscriber.prototype.propogate = function (channel, message) {
        if (this.channels.has(channel)) {
            this.emit(channel, message);
        }
    };
    RedSubscriber.prototype.subscriptions = function () {
        return __spread(this.channels);
    };
    RedSubscriber.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.client.removeListener("message", this.listener);
                        this.removeListener("error", errorListener);
                        return [4, this.unsubscribe(__spread(this.channels))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    RedSubscriber.prototype.subscribe = function (names) {
        return __awaiter(this, void 0, void 0, function () {
            var names_1, names_1_1, name_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.subscribe(names)];
                    case 1:
                        _b.sent();
                        try {
                            for (names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                                name_1 = names_1_1.value;
                                this.channels.add(name_1);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2];
                }
            });
        });
    };
    RedSubscriber.prototype.unsubscribe = function (names) {
        return __awaiter(this, void 0, void 0, function () {
            var names_2, names_2_1, name_2;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.unsubscribe(names)];
                    case 1:
                        _b.sent();
                        try {
                            for (names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                                name_2 = names_2_1.value;
                                this.channels.delete(name_2);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (names_2_1 && !names_2_1.done && (_a = names_2.return)) _a.call(names_2);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2];
                }
            });
        });
    };
    return RedSubscriber;
}(events_1.EventEmitter));
exports.RedSubscriber = RedSubscriber;
//# sourceMappingURL=red-subscriber.js.map