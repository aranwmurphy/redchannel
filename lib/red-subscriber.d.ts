/// <reference types="node" />
import { EventEmitter } from "events";
import { Redis } from "ioredis";
export declare class RedSubscriber extends EventEmitter {
    readonly client: Redis;
    private readonly channels;
    private readonly listener;
    constructor(client: Redis);
    protected onmessage(channel: string, message: string): void;
    subscriptions(): string[];
    subscribed(channel: string): boolean;
    destroy(): Promise<void>;
    subscribe(channels: string[]): Promise<void>;
    unsubscribe(channels: string[]): Promise<void>;
}
