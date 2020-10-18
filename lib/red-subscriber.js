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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSubscriber = void 0;
const events_1 = require("events");
function errorListener(err) { }
class RedSubscriber extends events_1.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.channels = new Set();
        this.listener = this.onmessage.bind(this);
        this.on("error", errorListener);
        client.on("message", this.listener);
    }
    onmessage(channel, message) {
        if (this.subscribed(channel)) {
            this.emit("message", channel, message);
        }
    }
    subscriptions() {
        return [...this.channels];
    }
    subscribed(channel) {
        return this.channels.has(channel);
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.removeListener("message", this.listener);
            this.removeListener("error", errorListener);
            yield this.unsubscribe([...this.channels]);
        });
    }
    subscribe(channels) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.subscribe(channels);
            for (const channel of channels) {
                this.channels.add(channel);
            }
        });
    }
    unsubscribe(channels) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.unsubscribe(channels);
            for (const channel of channels) {
                this.channels.delete(channel);
            }
        });
    }
}
exports.RedSubscriber = RedSubscriber;
//# sourceMappingURL=red-subscriber.js.map