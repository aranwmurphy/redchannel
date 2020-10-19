import { Redis } from "ioredis";

export class RedPublisher {

    constructor(public readonly client: Redis) {}

    public async publish<T>(channel: string, message: T): Promise<void> {
        await this.client.publish(channel, JSON.stringify(message));
    }
}