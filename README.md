# Network WiFi
<a href='https://www.npmjs.com/package/wifi-net'>wifi-net</a> project to interact with wifi network such as discover wifi, connect to wifi and disconnect form wifi.

### Installation
```
npm install wifi-net
```

### Compatible 
- [x] Windows
- [x] Linux

### Example
```js
import network from "wifi-net";
//# OR
const network = require('wifi-net');
```

#### Scan wifi network
```js
network.scan((networks) => {
  console.log(networks);
})
```

#### Connect to wifi
```js
network.connect({ssid:'name', password:'pass', (err) => {
    if(err) throw err;
})
```

#### Disconnect
```js
network.disconnect((err) => {
  if(err) throw err;
})
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments
<p>This project is heavily inspired from <a href="https://www.npmjs.com/package/node-wifi"> node-wifi </a> but with some structural and functionality differences.</p>
