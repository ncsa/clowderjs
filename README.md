# Clowder.js
Node.js library for [Clowder](https://clowder.ncsa.illinois.edu).  

## Installation
```
npm install clowder --save
```

## Setup
```
var clowder = require('clowderjs');
```
Clowder.js offers a simple way to configure a connection to your Clowder instance.
```
var auth = clowder.connect({
  "url": "http://clowder.ncsa.illinois.edu",
  "username": "user@example.com",
  "password": "clowderPassword"
});
```
However, you'll probably want to be able to connect to local, development and production instances, so we would recommend that you use the included `config.json` file in this repo. It looks like this:
```
{
  "dev": {
    "url": "",
    "username": "",
    "password": ""
  },
  "prod": {
    "url": "",
    "username": "",
    "password": ""
  },
  "local": {
    "url": "",
    "username": "",
    "password": ""
  }
}
```
Use this template to create a `clowder.json` in your project directory and add `clowder.json` to your `.gitignore` file. The above could then be written like this:
```
var clowder = require('clowderjs');
var config = require('clowder.json')['dev'];
var auth = clowder.connect(config);
```
The `auth` object is then passed as the first argument in each of the methods.

## Usage Examples
```js
clowder.datasets.getMine(auth, function(datasets){
  console.log(datasets);
});

clowder.geostreams.sensors(auth, function(sensors){
  console.log(sensors);
});

clowder.geostreams.counts(auth, function(counts){
  console.log(counts);
});
```
More suggestions can be found in the [examples](./examples) directory.
