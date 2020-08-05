const channels: any = {};

let frequency = 2412;

for (var i = 1; i < 15; i++) {
    channels[i] = frequency.toString();
    frequency = frequency + 5;
}

frequency = 5180;

for (var j = 36; j <= 64; j += 2) {
    channels[j] = frequency.toString();
    frequency += 10;
}

frequency = 5500;

for (var k = 100; k <= 144; k += 2) {
    channels[k] = frequency.toString();
    frequency += 10;
}

frequency = 5745;

for (var l = 149; l <= 161; l += 2) {
    channels[l] = frequency.toString();
    frequency += 10;
}

frequency = 5825;

for (var m = 165; m <= 173; m += 4) {
    channels[m] = frequency.toString();
    frequency += 20;
}

const frequencyFromChannel = (channelId: any) => {
    return channels[parseInt(channelId)];
}

const dBFromQuality = (quality: any) => {
    return parseFloat(quality) / 2 - 100;
}

const qualityFromDB = (db: any) => {
    return 2 * (parseFloat(db) + 100);
}

export {
    frequencyFromChannel,
    dBFromQuality,
    qualityFromDB
}