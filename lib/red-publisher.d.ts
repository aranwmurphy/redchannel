import { Redis } from "ioredis";
export declare class RedPublisher {
    readonly client: Redis;
    constructor(client: Redis);
    publish(channel: string, message: any): Promise<void>;
}
