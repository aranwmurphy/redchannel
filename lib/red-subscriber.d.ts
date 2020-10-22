/// <reference types="node" />
import { EventEmitter } from "events";
import { Redis } from "ioredis";
export declare class RedSubscriber extends EventEmitter {
    readonly client: Redis;
    readonly events: boolean;
    protected readonly channels: Set<string>;
    protected readonly listener: any;
    constructor(client: Redis, events?: boolean);
    protected onmessage(channel: string, message: string): void;
    subscriptions(): string[];
    subscribed(channel: string): boolean;
    destroy(): Promise<void>;
    subscribe(channels: string | string[]): Promise<void>;
    unsubscribe(channels: string | string[]): Promise<void>;
}
