"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedSubscriber = void 0;
const events_1 = require("events");
function errorListener(err) { }
class RedSubscriber extends events_1.EventEmitter {
    constructor(client, events = true) {
        super();
        this.client = client;
        this.events = events;
        this.channels = new Set();
        this.listener = this.onmessage.bind(this);
        this.on("error", errorListener);
        client.on("message", this.listener);
    }
    onmessage(channel, message) {
        if (!this.subscribed(channel)) {
            return;
        }
        try {
            message = JSON.parse(message);
        }
        catch (err) {
            this.emit("error", err);
        }
        this.emit("message", channel, message);
        if (this.events) {
            this.emit(channel, message);
        }
    }
    subscribed(channel) {
        return this.channels.has(channel);
    }
    subscriptions() {
        return [...this.channels];
    }
    async subscribe(channels) {
        if (!Array.isArray(channels)) {
            channels = [channels];
        }
        await this.client.subscribe(channels);
        for (const channel of channels) {
            this.channels.add(channel);
        }
    }
    async unsubscribe(channels) {
        if (!Array.isArray(channels)) {
            channels = [channels];
        }
        await this.client.unsubscribe(channels);
        for (const channel of channels) {
            this.channels.delete(channel);
        }
    }
    async destroy() {
        this.client.removeListener("message", this.listener);
        this.removeListener("error", errorListener);
        await this.unsubscribe(this.subscriptions());
    }
}
exports.RedSubscriber = RedSubscriber;
//# sourceMappingURL=red-subscriber.js.map