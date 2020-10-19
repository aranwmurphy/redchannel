import { Redis } from "ioredis";

export class RedPublisher {

    constructor(public readonly client: Redis) {}

    public async publish<T>(channel: string, event: T): Promise<void> {
        const message = typeof event !== "string"
            ? JSON.stringify(event) : event;
        await this.client.publish(channel, message);
    }
}