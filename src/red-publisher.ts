import { Redis } from "ioredis";

export class RedPublisher {
    constructor(public readonly client: Redis) {}

    public async publish(name: string, event: string): Promise<void> {
        await this.client.publish(name, event);
    }
}