
/* eslint-disable no-useless-catch */
import fsp from 'fs/promises';
import fs from 'fs';
import chalk from 'chalk';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import v8toIstanbul from 'v8-to-istanbul';


/**
 * Test whether file is available and not locked 
 * @param {*} filePath 
 * @returns 
 */
const isAvailable = (filePath) => {
    let fileAccess = false
    try {
        fs.closeSync(fs.openSync(filePath, 'r+'))
        fileAccess = true
    } catch (err) {
        //Ignore
    }
    return fileAccess
}

async function globalTeardown() {

    let coverage = [];
    let files = await fsp.readdir(`coverage`);

    //Load and merge coverage information from all test workers
    for (let index = 0; index < files.length; index++) {
        const f = `coverage/${files[index]}`;
        if (f.toLowerCase().endsWith('.json') && fs.existsSync(f)) {
            try {
                //Wait and test for coverage file availability. Files may be locked if other workers are still writing
                while (!isAvailable(f)) {
                    await new Promise(resolve => {
                        setTimeout(resolve, 100);
                    })
                    if (!fs.existsSync(f)) {
                        break;
                    }
                }
                if (!fs.existsSync(f)) {
                    continue;
                }
                const cov = await fsp.readFile(f, 'utf-8');
                coverage = [
                    ...coverage,
                    ...(JSON.parse(cov))
                ];
            } catch (error) {
                throw new Error(`Read fail: \r\n\r\n${error.toString()}`);
            }
        }

    }

    const cwd = process.cwd();
    const map = libCoverage.createCoverageMap();
    for (const entry of coverage) {
        try {

            //Skip any scripts that aren't from dist, we only care about code coverage related to our source code
            if (entry.url === '' || !entry.url.startsWith(`http://${process.env.PLAYWRIGHT_HOST_ORIGIN ?? 'localhost'}:6006/dist`)) {
                continue;
            }
            const scriptPath = `${cwd}${new URL(entry.url).pathname}`;
            const converter = v8toIstanbul(scriptPath, 0, { source: entry.source }, (filepath) => {
                const normalized = filepath.replace(/\\/g, '/');

                // Vendor code, stories files, index files and utils do not need to have coverage checked
                const ret = normalized.includes('node_modules/') ||
                    normalized.includes('node-modules') ||
                    normalized.includes('utils/') ||
                    normalized.includes('.index.') ||
                    normalized.includes('.stories.');
                return ret;
            });
            await converter.load();
            converter.applyCoverage(entry.functions);
            const data = converter.toIstanbul();
            map.merge(data);
        } catch (error) {
            console.error(entry.url, error);
        }
    }
    const context = libReport.createContext({ coverageMap: map });

    //Report both to html for detailed coverage report as well as console for terminal output
    reports.create('html').execute(context);
    reports.create('text').execute(context);
    
    if (!process.env.CI && !process.env.PW_SCREENSHOT_TESTING) {
        console.error(chalk.yellow('No "CI" or "PW_SCREENSHOT_TESTING" environment variables set. Screenshot assertion was skipped!'));
    }
}

export default globalTeardown;