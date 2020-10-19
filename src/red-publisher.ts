import { Redis } from "ioredis";

export class RedPublisher {

    constructor(public readonly client: Redis) {}

    public async publish(channel: string, message: string): Promise<void> {
        await this.client.publish(channel, message);
    }
}