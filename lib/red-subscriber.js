"use strict";
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
    async destroy() {
        this.client.removeListener("message", this.listener);
        this.removeListener("error", errorListener);
        await this.unsubscribe([...this.channels]);
    }
    async subscribe(channels) {
        await this.client.subscribe(channels);
        for (const channel of channels) {
            this.channels.add(channel);
        }
    }
    async unsubscribe(channels) {
        await this.client.unsubscribe(channels);
        for (const channel of channels) {
            this.channels.delete(channel);
        }
    }
}
exports.RedSubscriber = RedSubscriber;
//# sourceMappingURL=red-subscriber.js.map