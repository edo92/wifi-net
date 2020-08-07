## Usage
- [x] Windows     - [x] Linux


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

<a class="text-gray-dark no-underline" href="#url">
  A link with only part of it is <span class="link-hover-blue">blue on hover</span>.
</a>

<div style="background: #f7f7f7">
  <p>This project is heavily inspired from <a href="https://www.npmjs.com/package/node-wifi"> node-wifi </a> but with some structural and functionality differences.</p>
</div>