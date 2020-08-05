import * as cp from 'child_process';

const env = Object.assign(process.env, {
    LANG: 'en_US.UTF-8',
    LC_ALL: 'en_US.UTF-8',
    LC_MESSAGES: 'en_US.UTF-8'
});

export default (cmd: string, params: string[] | null, callback?: any): void => {
    cp.execFile(cmd, params || null, { env, shell: true },
        (err: any, stdout: any, stderr: any): void => {
            // Command output to error
            if (err) {
                err.stdout = stdout;
                err.stderr = stderr;

                callback && callback(err, false);
            }
            else {
                callback && callback(false, stdout);
            }
        })
}