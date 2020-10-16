import { Redis } from "ioredis";
export declare class RedPublisher {
    readonly client: Redis;
    constructor(client: Redis);
    publish(name: string, event: string): Promise<void>;
}
