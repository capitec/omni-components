import fsp from 'fs/promises';
import fs from 'fs';

async function globalSetup(config) {
    try {
        await fsp.rm('coverage', { force: true, recursive: true });
    } catch (error) {
        //Ignore
    }

    // Create coverage output directory if necessary
    if (!fs.existsSync(`./coverage`)) {
        await fsp.mkdir(`./coverage`, {
            recursive: true
        });
    }
}

export default globalSetup;