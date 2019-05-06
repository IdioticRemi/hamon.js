# Official module for HamonAPI!

## Installation:
```
npm install hamon.js --save
```

## You have to update first:

### HamonAPI#update

```js
const HamonAPI = require("hamon.js");
const Hamon = new HamonAPI("YOUR TOKEN HERE");

Hamon.update().then(() => {
    // Your code...
});

// Returns a Promise<null>
```

## Example GET:

### HamonAPI#get

```js
const HamonAPI = require("hamon.js");
const Hamon = new HamonAPI("YOUR TOKEN HERE");

Hamon.update().then(() => {
    Hamon.get("endpoint", { /*OPTIONS GOES HERE (e.g: url, render, intensity, ...)*/ }).then(res => {
        // Your code...
    });
});

// Returns a Promise<Buffer|String>
```

## How do I get all the aviable endpoints?

### HamonAPI#fetchEndpoints

```js
const HamonAPI = require("hamon.js");
const Hamon = new HamonAPI("YOUR TOKEN HERE");

Hamon.fetchEndpoints(/* Should result be a formatted object? default: false, type: Boolean */).then(res => console.log(res));

// Returns a Promise<Array[String]|Object>
```

### HamonAPI#endpoints

```js
const HamonAPI = require("hamon.js");
const Hamon = new HamonAPI("YOUR TOKEN HERE");

console.log(Hamon.endpoints); // []

Hamon.update().then(() => {
    console.log(Hamon.endpoints); // Array filled with all endpoints
});

// Returns <null|Array>
```