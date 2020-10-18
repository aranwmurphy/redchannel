// tslint:disable-next-line: no-implicit-dependencies
import { expect } from "chai";
import Redis = require("ioredis");
import { RedPublisher, RedSubscriber } from "../src";

const pubClient = new Redis();
const subClient = new Redis();

describe("RedPublisher", () => {
    describe("#publish()", () => {
        it("should publish a message to a channel", async () => {
            const subscriber = new RedSubscriber(subClient);
            const publisher = new RedPublisher(pubClient);

            const timestamp = new Date().toUTCString();
            const channel = "test:publish";

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
});