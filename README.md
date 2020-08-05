## Usage

```
npm install wifi-net
```

```js
import * as network from "wifi-net";
```

### Scan networks

```js
network.scan((networks) => {
  console.log(networks);
});
```

### Connect to wifi

```js
network.connect({ ssid: "my_ssid", password: "my_password" });
```

### Disconnect wifi

```js
network.disconnect();
```
