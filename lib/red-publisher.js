"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedPublisher = void 0;
class RedPublisher {
    constructor(client) {
        this.client = client;
    }
    async publish(channel, event) {
        await this.client.publish(channel, event);
    }
}
exports.RedPublisher = RedPublisher;
//# sourceMappingURL=red-publisher.js.map