# Network WiFi
Node.js project to interact with wifi network such as discover wifi, connect to wifi and disconnect form wifi.

### Installation
```
npm install wifi-net
```

### Compatible 
- [x] Windows
- [x] Linux

### Import
```js
import network from "wifi-net";

network.scan((networks) => {
  console.log(networks);
});

network.connect({ssid:'name', password:'pass', (err) => {
    if(err) throw err;
})

network.disconnect((err) => {
  if(err) throw err;
})
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
<p>This project is heavily inspired from <a href="https://www.npmjs.com/package/node-wifi"> node-wifi </a> but with some structural and functionality differences.</p>
