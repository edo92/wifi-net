import execCommand from '../util/exec';
import * as networkUtils from '../util/networks';

export default class Linux 
{
    public scan = (callback: any, iface: string) => 
    {
        let args = [];
        args.push('--terse');
        args.push('--fields');
        args.push(
            'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags'
        );
        args.push('device');
        args.push('wifi');
        args.push('list');

        if (iface) 
        {
            args.push('ifname');
            args.push(iface);
        }

        execCommand('nmcli', args, (err: any, scanResults: any) => 
        {
            if (err)
            {
                callback && callback(err);
                return;
            }

            let lines = scanResults.split('\n');

            let networks = [];
            for (let i = 0; i < lines.length; i++)
            {
                if (lines[i] != '' && lines[i].includes(':')) 
                {
                    let fields = lines[i].replace(/\\:/g, '&&').split(':');
                    if (fields.length >= 9) 
                    {
                        networks.push({
                            ssid: fields[1].replace(/&&/g, ':'),
                            bssid: fields[2].replace(/&&/g, ':'),
                            mac: fields[2].replace(/&&/g, ':'), // for retrocompatibility with version 1.x
                            mode: fields[3].replace(/&&/g, ':'),
                            channel: parseInt(fields[4].replace(/&&/g, ':')),
                            frequency: parseInt(fields[5].replace(/&&/g, ':')),
                            signal_level: networkUtils.dBFromQuality(
                                fields[6].replace(/&&/g, ':')
                            ),
                            quality: parseFloat(fields[6].replace(/&&/g, ':')),
                            security:
                                fields[7].replace(/&&/g, ':') != '(none)'
                                    ? fields[7].replace(/&&/g, ':')
                                    : 'none',
                            security_flags: {
                                wpa: fields[8].replace(/&&/g, ':'),
                                rsn: fields[9].replace(/&&/g, ':')
                            }
                        });
                    }
                }
            }
            callback && callback(null, networks);
        });
    }
}