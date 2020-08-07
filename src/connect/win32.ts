import * as fs from 'fs';
import execCommand from '../util/exec';
import Network from '../discover';

class WinConnect 
{
    public disconnectWifi = (iface: string, callback?: any) => 
    {
        const cmd = 'netsh';
        const params = ['wlan', 'disconnect'];

        if (iface) {
            params.push('interface="' + iface + '"');
        }

        execCommand(cmd, params, callback || null);
    }

    public connectWifi = (cridential: Icredentials, iface: string, callback?: any): void => 
    {
        // First turn off wifi then connect
        this.disconnectWifi(iface);

        if (!cridential.ssid) 
        {
            callback && callback('SSID is missing');
        }

        if (!cridential.password) 
        {
            callback && callback('Password is missing');
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
                callback && callback('Network was not found');
            }

            // Create profile
            fs.writeFileSync(
                'nodeWifiConnect.xml',
                this.Win32Profile(targetNet, cridential.password)
            )

            // Netsh command to connect to wifi
            const cmd = 'netsh';
            const params = [
                'wlan',
                'add',
                'profile',
                'filename="nodeWifiConnect.xml"'
            ]

            if (iface) 
            {
                params.push('interface="' + iface + '"');
            }

            // Delete prifile XML
            execCommand(cmd, params, (err: any): void =>
            {
                callback && callback(err);
                execCommand('del ".\\nodeWifiConnect.xml"', null);
            })
        })
    }

    private Win32Profile = (selectedAp: any, key: string) => 
    {
        const getHexSsid = (plainTextSsid: string) => 
        {
            let i, j, ref, hex;

            hex = '';

            for (
                i = j = 0, ref = plainTextSsid.length - 1;
                0 <= ref ? j <= ref : j >= ref;
                i = 0 <= ref ? ++j : --j
            ) {
                hex += plainTextSsid.charCodeAt(i).toString(16);
            }
            return hex;
        };

        let profile_content =
            '<?xml version="1.0"?> <WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1"> <name>' +
            selectedAp.ssid +
            '</name> <SSIDConfig> <SSID> <hex>' +
            getHexSsid(selectedAp.ssid) +
            '</hex> <name>' +
            selectedAp.ssid +
            '</name> </SSID> </SSIDConfig>';

        if (selectedAp.security.indexOf('WPA2') !== -1)
        {
            profile_content +=
                '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPA2PSK</authentication> <encryption>AES</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>' +
                key +
                '</keyMaterial> </sharedKey> </security> </MSM>';
        } 
        else if (selectedAp.security.indexOf('WPA') !== -1)
        {
            profile_content +=
                '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>WPAPSK</authentication> <encryption>TKIP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>passPhrase</keyType> <protected>false</protected> <keyMaterial>' +
                key +
                '</keyMaterial> </sharedKey> </security> </MSM>';
        } 
        else 
        {
            if (selectedAp.security_flags.indexOf('WEP') !== -1) 
            {
                profile_content +=
                    '<connectionType>ESS</connectionType> <connectionMode>auto</connectionMode> <autoSwitch>true</autoSwitch> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>WEP</encryption> <useOneX>false</useOneX> </authEncryption> <sharedKey> <keyType>networkKey</keyType> <protected>false</protected> <keyMaterial>' +
                    key +
                    '</keyMaterial> </sharedKey> </security> </MSM>';
            }
            else 
            {
                profile_content +=
                    '<connectionType>ESS</connectionType> <connectionMode>manual</connectionMode> <MSM> <security> <authEncryption> <authentication>open</authentication> <encryption>none</encryption> <useOneX>false</useOneX> </authEncryption> </security> </MSM>';
            }
        };

        profile_content += '</WLANProfile>';
        return profile_content;
    };
}

export default WinConnect;

interface Icredentials {
    ssid: string;
    password: string
}