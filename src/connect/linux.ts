import execCommand from '../util/exec';

export default class Linux {
    public connectWifi = (crid: any, iface: string, callback?: any) => 
    {
        let params = [];
        params.push('-w');
        params.push('10');
        params.push('device');
        params.push('wifi');
        params.push('connect');
        params.push(crid.ssid);
        params.push('password');
        params.push(crid.password);

        if (iface) 
        {
            params.push('ifname');
            params.push(iface);
        }

        execCommand('nmcli', params, (err: any, resp: any) => 
        {
            // Errors from nmcli came from stdout, we test presence of 'Error: ' string
            if (resp.includes('Error: ')) 
            {
                err = new Error(resp.replace('Error: ', ''));
            }
            callback && callback(err);
        })
    }
}