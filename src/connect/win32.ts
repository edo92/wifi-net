import execCommand from '../util/exec';
import Network from '../discover';

class WinConnect {
    private iface: string = 'wi-fi';

    constructor(iface?: string) 
    {
        this.iface = iface || this.iface;
    }

    public disconnectWifi = (callback?: any) => 
    {
        const cmd = 'netsh';
        const params = ['wlan', 'disconnect'];

        if (this.iface) {
            params.push('interface="' + this.iface + '"');
        }

        execCommand(cmd, params, callback || null);
    }

    public connectWifi = (cridential: Icredentials): void =>
    {
        // First turn off wifi then connect
        this.disconnectWifi();

        if (!cridential.ssid) {
            throw 'SSID is missing'
        }

        if (!cridential.password) {
            throw 'Password is missing';
        }

        let network = new Network();

        return network.scan((networks: (string | number)[]): void => 
        {
            let targetNet = networks.find((target: any) => 
            {
                return target.ssid === cridential.ssid;
            })

            if (!targetNet) 
            {
                throw 'Network was not found';
            }

            // Netsh command to connect to wifi
            execCommand('netsh', [
                'wlan',
                'add',
                'profile',
                'filename="nodeWifiConnect.xml"'
            ])
        })
    }
}

export default WinConnect;

interface Icredentials {
    ssid: string;
    password: string
}