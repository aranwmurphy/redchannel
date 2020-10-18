import { Redis } from "ioredis";

export class RedPublisher {

    constructor(public readonly client: Redis) {}

    public async publish(channel: string, event: string): Promise<void> {
        await this.client.publish(channel, event);
    }
}