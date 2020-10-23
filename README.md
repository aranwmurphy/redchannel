# RedChannel
Simplified pub/sub messaging with Redis

## Warning
This library is intended for fast, fire-and-forget messaging, in situations where dropped messages are acceptable. This is due to the nature of Redis pub/sub. Additionally, if you intend to use this library at scale, please set the events parameter in the constructor to false. This will improve performance, but prevent the use of event-specific listeners.

## Available Scripts

In the project directory, you can run:

### `npm test`

Runs the library test suite, and reports the results of each test.

### `npm build`

Builds the library for production to the `lib` folder.<br />
It correctly bundles the library in production mode and optimizes the build for the best performance.

### `npm lint`

Lints the project files.

## Usage

### JavaScript (Subscriber)

```javascript
const Redis = require('ioredis');
const { RedSubscriber } = require('redchannel');

const client = new Redis();
// Use "new RedSubscriber(client, false)" if you intend to use this library at scale
const channel = new RedSubscriber(client);

async function main() {
    // Subscribe to all messages on "global:logs".
    await channel.subscribe(['global:logs']);

    // (Generic listener) Process all messages published on "global:logs".
    channel.on('message', (channel, message) => {
        channel === 'global:logs' && console.log(message);
        // Foo
    });

    // (Event specific listener) Process all messages published on "global:logs".
    channel.on('global:logs', (message) => {
        console.log(message);
        // Foo
    });

    // Check if subscribed to a channel
    console.log(channel.subscribed('global:logs'));
    // true
    
    // Unsubscribe from all messages on "global:logs".
    await channel.unsubscribe(['global:logs']);

    // Check if subscribed to a channel
    console.log(channel.subscribed('global:logs'));
    // false

    // Print current subscriptions
    console.log(channel.subscriptions());
    // []

    // Subscribe to all messages on "global:logs".
    await channel.subscribe('global:events');

    // Print current subscriptions
    console.log(channel.subscriptions());
    // ['global:events']

    // (Generic listener) Process all messages published on "global:events".
    channel.on('message', (channel, message) => {
        channel === 'global:events' && console.log(message);
        // { foo: 'bar' }
    });
    
    // Clean up subscriptions. After this point a new instance must be created
    await channel.destroy();

    // Remove all event listeners (your responsibility).
    channel.removeAllListeners();
}
```

### JavaScript (Publisher)

```javascript
const Redis = require('ioredis');
const { RedPublisher } = require('redchannel');

const client = new Redis();
const channel = new RedPublisher(client);

async function main() {
    // Publish message to all listeners on "global:logs";
    await channel.publish('global:logs', 'Foo');

    // Publish message to all listeners on "global:events";
    await channal.publish('global:events', { foo: 'bar' });
}
```

### TypeScript (Subscriber)

```typescript
import Redis = require("ioredis");
import { RedSubscriber } from "redchannel";

const client = new Redis();
// Use "new RedSubscriber(client, false)" if you intend to use this library at scale
const channel = new RedSubscriber(client);

async function main(): Promise<void> {
    // Subscribe to all messages on "global:logs".
    await channel.subscribe(["global:logs"]);

    // (Generic listener) Process all messages published on "global:logs".
    channel.on("message", (channel: string, message: any) => {
        channel === "global:logs" && console.log(message);
        // Foo
    });

    // (Event specific listener) Process all messages published on "global:logs".
    channel.on('global:logs', (message: any) => {
        console.log(message);
        // Foo
    });

    // Check if subscribed to a channel
    console.log(channel.subscribed("global:logs"));
    // true
    
    // Unsubscribe from all messages on "global:logs".
    await channel.unsubscribe(["global:logs"]);

    // Check if subscribed to a channel
    console.log(channel.subscribed("global:logs"));
    // false

    // Print current subscriptions
    console.log(channel.subscriptions());
    // []

    // Subscribe to all messages on "global:logs".
    await channel.subscribe("global:events");

    // Print current subscriptions
    console.log(channel.subscriptions());
    // ['global:events']

    // (Generic listener) Process all messages published on "global:events".
    channel.on('message', (channel: string, message: any) => {
       channel === "global:events" && console.log(message);
        // { foo: 'bar' }
    });
    
    // Clean up subscriptions. After this point a new instance must be created
    await channel.destroy();

    // Remove all event listeners (your responsibility).
    channel.removeAllListeners();
}
```


### TypeScript (Publisher)

```typescript
import Redis = require("ioredis");
import { RedPublisher } from "redchannel";

const client = new Redis();
const channel = new RedPublisher(client);

async function main(): Promise<void> {
    // Publish message to all listeners on "global:logs";
    await channel.publish("global:logs", "Foo");

    // Publish message to all listeners on "global:events";
    await channal.publish("global:events", { foo: "bar" });
}
```

## License
MIT