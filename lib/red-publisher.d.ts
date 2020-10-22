import { Redis } from "ioredis";
export declare class RedPublisher {
    readonly client: Redis;
    constructor(client: Redis);
    publish<TMessage>(channel: string, message: TMessage): Promise<void>;
}
