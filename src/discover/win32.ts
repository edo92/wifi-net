import execCommand from '../util/exec';
import * as networkUtils from '../util/networks';
import * as os from 'os';

export default class DiscoverWin32 
{
    public interfaces = (callback?: any) => 
    {
        const ifaces = os.networkInterfaces();

        callback && callback(ifaces);
        return ifaces;
    }

    public scan = (callback: any) => 
    {
        const cmd = 'netsh';
        const params = ['wlan', 'show', 'networks', 'mode=Bssid'];

        execCommand(cmd, params, (err: any, res: any): void => 
        {
            if (err) throw err;

            // Convert raw text
            res = res
                .toString('utf8')
                .split('\r')
                .join('')
                .split('\n')
                .slice(5, res.length);

            let network;
            let networks = [];
            let netCount = -1;
            let line = 0;
            let netTmp;
            let netTmps = [];
            let i;

            for (i = 0; i < res.length; i++) 
            {
                if (res[i] === '') 
                {
                    netCount++;
                    netTmp = res.slice(line, i);
                    netTmps.push(netTmp);
                    line = i + 1;
                }
            }

            for (i = 0; i < netCount; i++) 
            {
                // skip empty networks
                if (netTmps[i] && netTmps[i].length > 0) 
                {
                    network = this.parse(netTmps[i]);
                    networks.push(network);
                }
            }
            callback(networks);
        })
    }

    private parse = (netTmp: any) => 
    {
        let network: any = {};

        // Match with key
        network.mac = netTmp[4] ? netTmp[4].match(/.*?:\s(.*)/)[1] : '';
        network.bssid = network.mac;
        network.ssid = netTmp[0] ? netTmp[0].match(/.*?:\s(.*)/)[1] : '';
        network.channel = netTmp[7]
            ? parseInt(netTmp[7].match(/.*?:\s(.*)/)[1])
            : -1;
        network.frequency = network.channel
            ? parseInt(networkUtils.frequencyFromChannel(network.channel))
            : 0;
        network.signal_level = netTmp[5]
            ? networkUtils.dBFromQuality(netTmp[5].match(/.*?:\s(.*)/)[1])
            : Number.MIN_VALUE;
        network.quality = netTmp[5]
            ? parseFloat(netTmp[5].match(/.*?:\s(.*)/)[1])
            : 0;
        network.security = netTmp[2] ? netTmp[2].match(/.*?:\s(.*)/)[1] : '';
        network.security_flags = netTmp[3]
            ? netTmp[3].match(/.*?:\s(.*)/)[1]
            : '';
        network.mode = 'Unknown';
        return network;
    }
}
