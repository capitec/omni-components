import chalk from 'chalk';
import fsp from 'fs/promises';
import fs from 'fs';

async function globalSetup(config) {
    if (!process.env.CI && !process.env.PW_SCREENSHOT_TESTING) {
        console.error(chalk.yellow('No "CI" or "PW_SCREENSHOT_TESTING" environment variables set. Skipping screenshot assertion!'));
    }

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