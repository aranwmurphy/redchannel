/// <reference types="node" />
import { EventEmitter } from "events";
import { Redis } from "ioredis";
export declare class RedSubscriber extends EventEmitter {
    readonly client: Redis;
    readonly events: boolean;
    private readonly channels;
    private readonly listener;
    constructor(client: Redis, events?: boolean);
    private onmessage;
    subscribed(channel: string): boolean;
    subscriptions(): string[];
    subscribe(channels: string | string[]): Promise<void>;
    unsubscribe(channels: string | string[]): Promise<void>;
    destroy(): Promise<void>;
}
