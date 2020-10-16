/// <reference types="node" />
import { EventEmitter } from "events";
import { Redis } from "ioredis";
export declare class RedSubscriber extends EventEmitter {
    readonly client: Redis;
    static readonly MESSAGE: symbol;
    private readonly channels;
    private readonly listener;
    constructor(client: Redis);
    protected propogate(channel: string, message: string): void;
    subscriptions(): string[];
    destroy(): Promise<void>;
    subscribe(names: string[]): Promise<void>;
    unsubscribe(names: string[]): Promise<void>;
}
