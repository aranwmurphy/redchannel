# RedChannel
Simplified pub/sub messaging with Redis

## Warning
This library is intended for fast, fire-and-forget messaging, in situations where dropped messages are acceptable.

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
const { RedSubscriber } = require("redchannel");

const client = new Redis();
const channel = new RedSubscriber(client);

async function main() {
    // Subscribe to all messages on "global:logs".
    await channel.subscribe(['global:logs']);

    // Process all messages published on "global:logs".
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
    await channel.subscribe(['global:events']);

    // Print current subscriptions
    console.log(channel.subscriptions());
    // ['global:events']

    // Process all messages published on "global:events".
    channel.on('global:events', (message) => {
        console.log(message);
        // Bar
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
const { RedPublisher } = require("redchannel");

const client = new Redis();
const channel = new RedPublisher(client);

async function main() {
    // Publish message to all listeners on "global:logs";
    await channel.publish('global:logs', 'Foo');

    // Publish message to all listeners on "global:events";
    await channal.publish('global:events', 'Bar');
}
```

### TypeScript (Subscriber)

```typescript
import Redis = require("ioredis");
import { RedSubscriber } from "redchannel";

const client = new Redis();
const channel = new RedSubscriber(client);

async function main(): Promise<void> {
    // Subscribe to all messages on "global:logs".
    await channel.subscribe(["global:logs"]);

    // Process all messages published on "global:logs".
    channel.on("global:logs", (message: string) => {
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
    await channel.subscribe(["global:events"]);

    // Print current subscriptions
    console.log(channel.subscriptions());
    // ['global:events']

    // Process all messages published on "global:events".
    channel.on("global:events", (message: string) => {
        console.log(message);
        // Bar
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
    await channal.publish("global:events", "Bar");
}
```

## License
MIT