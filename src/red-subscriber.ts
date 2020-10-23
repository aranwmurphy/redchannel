import { EventEmitter } from "events";
import { Redis } from "ioredis";

// tslint:disable-next-line: no-empty
function onerror(err: any) {}

export class RedSubscriber extends EventEmitter {

    private readonly channels: Set<string> = new Set<string>();
    private readonly listener: any = this.onmessage.bind(this);

    constructor(
        public readonly client: Redis,
        public readonly events: boolean = true,
    ) {
        super();
        this.on("error", onerror);
        client.on("message", this.listener);
    }

    private onmessage(channel: string, message: string): void {
        if (!this.subscribed(channel)) {
            return;
        }
        try {
            message = JSON.parse(message);
        } catch (err) {
            this.emit("error", err);
        }
        this.emit("message", channel, message);
        if (this.events) {
            this.emit(channel, message);
        }
    }

    public subscribed(channel: string): boolean {
        return this.channels.has(channel);
    }

    public subscriptions(): string[] {
        return [...this.channels];
    }

    public async subscribe(channels: string | string[]): Promise<void> {
        if (!Array.isArray(channels)) {
            channels = [channels];
        }

        await this.client.subscribe(channels);
        for (const channel of channels) {
            this.channels.add(channel);
        }
    }

    public async unsubscribe(channels: string | string[]): Promise<void> {
        if (!Array.isArray(channels)) {
            channels = [channels];
        }

        await this.client.unsubscribe(channels);
        for (const channel of channels) {
            this.channels.delete(channel);
        }
    }

    public async destroy(): Promise<void> {
        this.client.removeListener("message", this.listener);
        this.removeListener("error", onerror);
        await this.unsubscribe(this.subscriptions());
    }
}