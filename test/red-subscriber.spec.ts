// tslint:disable-next-line: no-implicit-dependencies
import { expect } from "chai";
import Redis = require("ioredis");
import { RedPublisher, RedSubscriber } from "../src";

const pubClient = new Redis();
const subClient = new Redis();

describe("RedSubscriber", () => {
    describe("#destroy()", () => {
        it("should prevent messages from being propogated", async () => {
            const subscriber = new RedSubscriber(subClient);
            const channels = ["test:destroy"];

            await subscriber.subscribe(channels);
            await subscriber.destroy();

            expect(subscriber.subscriptions().length).to.equal(0);

            subscriber.removeAllListeners();
            await subscriber.destroy();
        });
    });

    describe("#subscriptions()", () => {
        it("should return the correct subscriptions", async () => {
            const subscriber = new RedSubscriber(subClient);
            const channels = ["test:subscriptions", "test:subscriptions1"];

            await subscriber.subscribe(channels);
            expect(subscriber.subscriptions().length).to.equal(2);

            subscriber.removeAllListeners();
            await subscriber.destroy();
        });
    });

    describe("#subscribe()", () => {
        it("should add subscriptions", async () => {
            const subscriber = new RedSubscriber(subClient);
            const channels = ["test:subscribe", "test:subscribe"];

            await subscriber.subscribe(channels);
            expect(subscriber.subscriptions().length).to.equal(1);

            subscriber.removeAllListeners();
            await subscriber.destroy();
        });

        it("should propogate messages from subscriptions", async () => {
            const subscriber = new RedSubscriber(subClient);
            const publisher = new RedPublisher(pubClient);

            const timestamp = new Date().toUTCString();
            const channel = "test:subscribe";

            const verifier = new Promise((resolve, reject) => {
                subscriber.on("message",
                    (ch, message) => (channel === ch &&
                        message === timestamp && resolve()));
            });

            await subscriber.subscribe([channel]);
            await publisher.publish(channel, timestamp);
            await verifier;

            await subscriber.destroy();
            subscriber.removeAllListeners();
        });
    });

    describe("#unsubscribe()", () => {
        it("should remove subscriptions", async () => {
            const subscriber = new RedSubscriber(subClient);
            const channels = ["test:unsubscribe", "test:unsubscribe"];

            await subscriber.subscribe(channels);
            expect(subscriber.subscriptions().length).to.equal(1);
            await subscriber.unsubscribe(channels);
            expect(subscriber.subscriptions().length).to.equal(0);

            subscriber.removeAllListeners();
            await subscriber.destroy();
        });
    });
});