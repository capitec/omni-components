import fsp from 'fs/promises';

async function globalSetup(config) {
    try {
        await fsp.rm('coverage', { force: true, recursive: true });
    } catch (error) {
        //Ignore
    }
}

export default globalSetup;