import { EventEmitter } from "events";
import { Redis } from "ioredis";

// tslint:disable-next-line: no-empty
function errorListener(err: any) {}

export class RedSubscriber extends EventEmitter {
    private readonly channels: Set<string> = new Set<string>();
    private readonly listener: any = this.propogate.bind(this);

    constructor(public readonly client: Redis) {
        super();
        this.on("error", errorListener);
        client.on("message", this.listener);
    }

    protected propogate(channel: string, message: string): void {
        if (this.channels.has(channel)) {
            this.emit(channel, message);
        }
    }

    public subscriptions(): string[] {
        return [...this.channels];
    }

    public async destroy(): Promise<void> {
        this.client.removeListener("message", this.listener);
        this.removeListener("error", errorListener);
        await this.unsubscribe([...this.channels]);
    }

    public async subscribe(names: string[]): Promise<void> {
        await this.client.subscribe(names);
        for (const name of names) {
            this.channels.add(name);
        }
    }

    public async unsubscribe(names: string[]): Promise<void> {
        await this.client.unsubscribe(names);
        for (const name of names) {
            this.channels.delete(name);
        }
    }
}