# kaios-lib

[![CircleCI](https://circleci.com/gh/garredow/kaios-lib/tree/main.svg?style=svg)](https://circleci.com/gh/garredow/kaios-lib/tree/main)
[![npm](https://img.shields.io/npm/v/kaios-lib.svg)](https://www.npmjs.com/package/kaios-lib)

A standard library to interact with KaiOS 2.x and 3.x\* APIs.

\* 3.x support coming when there is a good dev device available for testing purposes

## Examples

### Activity

```js
// Create the service
const activity = new KaiOS.Activity({
  name: 'toolbox/qr-to-text',
  data: {},
});

// Send the request and await the result
const result = await activity.start();
```

### Alarm

```js
// Create the service
const alarms = new KaiOS.Alarm();

// Add an alarm
await alarms.add({
  date: new Date(Date.now() + 1000 * 10),
  respectTimezone: true,
  data: { name: 'Garrett' },
});

// List all alarms
const all = await alarms.getAll();
console.log('alarms', all);

// Subscribe to when an alarm is fired
alarms.subscribe((data) => console.log('alarm fired', data));
```

### App

```js
// Example coming soon
```

### Battery

```js
// Create the service
const battery = new KaiOS.Battery();

// Get the current battery status
const current = await battery.current();

// Subscribe to changes (fires on level and charging change)
battery.subscribe((status) => console.log('battery status', status));

// Unsubscribe when you don't need it anymore
battery.unsubscribe();
```

### FileStorage

```js
// Example coming soon
```

### Geolocation

```js
// Create the service
const geolocation = new KaiOS.Geolocation();

// Get current position
const current = await geolocation.current();

// Subscribe to changes
geolocation.subscribe((position) => {
  console.log('got position', position);
});

// Unsubscribe when you don't need it anymore
geolocation.unsubscribe();
```

### LocalStorage

```js
// Create the service
const localStorage = new KaiOS.LocalStorage();

// Write to storage. Will use `JSON.stringify` on object passed in
localStorage.setItem('myKey', { name: 'Garrett' });

// Retrieve data
const data = localStorage.getItem('myKey');
```

### Network

```js
// Create the service
const network = new KaiOS.Network();

// Get current status
const current = await network.current();

// Subscribe to changes
network.subscribe((status) => console.log('got status', status));

// Unsubscribe when you don't need it anymore
network.unsubscribe();
```

### QRCode

```js
// Create the service
const qrCode = new KaiOS.QRCode();

// Read QR code as text
const text = await qrCode.readAsText();
```

### Volume

```js
// Create the service
const volume = new KaiOS.Volume();

await volume.show();
await volume.up();
await volume.down();
```
