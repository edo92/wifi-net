import Discover from './discover';
import Connect from './connect';

const discover = new Discover();
const connection = new Connect();

export const scan = (callback: any): void => {
    discover.scan(callback);
}

export const connect = (crid: any, callback?: any): void => {
    connection.connectWifi(crid, callback || null);
}

export const disconnect = (callback: any) => {
    connection.disconnectWifi(callback);
}