import network from '../dist';

// Scan network
network.scan((networks) => {
    console.log(networks);
})


// Connet to wifi network
const cridentials = {
    ssid: "my_ssid",
    password: "my_password"
}

network.connect(cridentials, (err) => {
    if (err) throw err;
})


// Disconnect wifi
network.disconnect((err) => {
    if (err) throw err;
})