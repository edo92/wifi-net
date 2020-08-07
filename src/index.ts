import Discover from './discover';
import Connect from './connect';

class WifiNet 
{
    private iface: string | null  = null;

    private discover = new Discover();
    private connection = new Connect();

    public setIface(iface: string)
    {
        this.iface = iface;
    }

    public scan = (callback: any): void =>
    {
        this.discover.scan(callback, this.iface);
    }

    public connect = (crid: any, callback?: any): void => 
    {
        this.connection.connectWifi(crid, this.iface, callback);
    }

    public disconnect = (callback?: any): void => 
    {
        this.connection.disconnectWifi(this.iface, callback);
    }
}

export default new WifiNet();