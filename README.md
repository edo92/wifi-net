### Compatible 
- [x] Windows
- [x] Linux


### Installation
```
npm install wifi-net
```

### Usage
```js
import network from "wifi-net";
```
or
```js
const network = require('wifi-net');
```

```js
network.scan((networks) => {
  console.log(networks);
});
```

```js
const cridentials = { 
  ssid: "my_ssid",
   password: "my_password" 
}

network.connect(cridentials, (err) => {
    if(err) throw err;
})
```

### Disconnect wifi

```js
network.disconnect((err) => {
  if(err) throw err;
})
```

<div style="background: #f7f7f7">
  <p>This project is heavily inspired from <a href="https://www.npmjs.com/package/node-wifi"> node-wifi </a> but with some structural and functionality differences.</p>
</div>