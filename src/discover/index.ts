import linux from './linux';
import win32 from './win32';

const OS: any = {
    linux,
    win32
}

export default OS[process.platform];