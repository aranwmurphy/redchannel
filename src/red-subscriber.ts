import { EventEmitter } from "events";
import { Redis } from "ioredis";

// tslint:disable-next-line: no-empty
function errorListener(err: any) {}

export class RedSubscriber extends EventEmitter {

    protected readonly channels: Set<string> = new Set<string>();
    protected readonly listener: any = this.onmessage.bind(this);

    constructor(
        public readonly client: Redis,
        public readonly events: boolean = true,
    ) {
        super();
        this.on("error", errorListener);
        client.on("message", this.listener);
    }

    protected onmessage(channel: string, message: string): void {
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
        this.removeListener("error", errorListener);
        await this.unsubscribe(this.subscriptions());
    }
}