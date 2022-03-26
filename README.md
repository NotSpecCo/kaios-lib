# kaios-lib

[![CircleCI](https://circleci.com/gh/garredow/kaios-lib/tree/main.svg?style=svg)](https://circleci.com/gh/garredow/kaios-lib/tree/main)
[![npm](https://img.shields.io/npm/v/kaios-lib.svg)](https://www.npmjs.com/package/kaios-lib)

A standard library to interact with KaiOS 2.x and 3.x\* APIs.

\* 3.x support coming when there is a good dev device available for testing purposes

## Examples

### Activity

```js
// Create the service
const service = new KaiOS.Activity({
  name: 'toolbox/qr-to-text',
  data: {},
});

// Send the request and await the result
const result = await service.start();
```

### Alarm

```js
// Create the service
const service = new KaiOS.Alarm();

// Add an alarm
await service.add({
  date: new Date(Date.now() + 1000 * 10),
  respectTimezone: true,
  data: { name: 'Garrett' },
});

// List all alarms
const alarms = await service.getAll();
console.log('alarms', alarms);

// Subscribe to when an alarm is fired
service.subscribe((data) => console.log('alarm fired', data));
```

### App

```js
// Example coming soon
```

### Battery

```js
// Create the service
const service = new KaiOS.Battery();

// Get the current battery status
const current = await service.current();

// Subscribe to changes (fires on level and charging change)
service.subscribe((status) => console.log('battery status', status));

// Unsubscribe when you don't need it anymore
service.unsubscribe();
```

### FileStorage

```js
// Example coming soon
```

### Geolocation

```js
// Create the service
const service = new KaiOS.Geolocation();

// Get current position
const current = await service.current();

// Subscribe to changes
service.subscribe((position) => {
  console.log('got position', position);
});

// Unsubscribe when you don't need it anymore
service.unsubscribe();
```

### LocalStorage

```js
// Create the service
const service = new KaiOS.LocalStorage();

// Write to storage. Will use `JSON.stringify` on object passed in
service.setItem('myKey', { name: 'Garrett' });

// Retrieve data
const data = service.getItem('myKey');
```

### Network

```js
// Create the service
const service = new KaiOS.Network();

// Get current status
const current = await service.current();

// Subscribe to changes
service.subscribe((status) => console.log('got status', status));

// Unsubscribe when you don't need it anymore
service.unsubscribe();
```

### Volume

```js
// Create the service
const service = new KaiOS.Volume();

await service.show();
await service.up();
await service.down();
```
