import { Redis } from "ioredis";

export class RedPublisher {

    constructor(public readonly client: Redis) {}

    public async publish<TMessage>(channel: string, message: TMessage): Promise<void> {
        await this.client.publish(channel, JSON.stringify(message));
    }
}