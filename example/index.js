import network from 'wifi-net';
// # OR
const network = require('wifi-net');

// Scan network
network.scan((networks) => {
    console.log(networks);
})

// Wifi cridentials
const cridentials = {
    ssid: "my_ssid",
    password: "my_password"
}
// Connect to wifi
network.connect(cridentials, (err) => {
    if (err) throw err;
})


// Disconnect wifi
network.disconnect((err) => {
    if (err) throw err;
})