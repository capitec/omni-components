/* eslint-disable no-useless-catch */
import path from 'path';
import fsp from 'fs/promises';
import fs from 'fs';
import { test, expect } from '@playwright/test';
import { globbySync } from 'globby';
import jsdom from 'jsdom';
import XMLHttpRequest from 'xhr2';
import { v4 } from 'uuid';
import fetch from 'node-fetch';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import v8toIstanbul from 'v8-to-istanbul';

global.window = global.window || new jsdom.JSDOM().window;
global.document = window.document;
global.Document = window.Document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = XMLHttpRequest;
global.fetch = global.window.fetch = fetch;

let page;

//Setup browser shims 
Object.keys(window).forEach((key) => {
    if (!global[key]) {
        try {
            global[key] = window[key];
        } catch (error) {
            // Ignore
        }
    }
});

export function splitPascalCase(word) {
	var wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
	return word.match(wordRe).join(' ');
}


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

/**
 * Transform, save and report coverage results
 * @param {*} page 
 * @param {*} config 
 * @returns 
 */
const saveV8Coverage = async (page, config) => {
    let coverage = await page.coverage.stopJSCoverage();

    // Create coverage output directory if necessary
    if (!fs.existsSync(`./coverage`)) {
        await fsp.mkdir(`./coverage`, {
            recursive: true
        });
    }

    //Save coverage information for current test worker
    fs.writeFileSync(`coverage/${v4()}.json`, JSON.stringify(coverage), {
        encoding: 'utf-8'
    });

    coverage = [];
    let files = await fsp.readdir(`coverage`);

    //Only the last running worker should report coverage, if the number of saved coverage is less than the workers, stop processing
    if (files.filter(f => {
        f = `coverage/${f}`;
        return f.toLowerCase().endsWith('.json') && fs.existsSync(f) && isAvailable(f);
    }).length < config.workers) {
        return;
    }

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
            if (entry.url === '' || !entry.url.startsWith('http://localhost:6006/dist')) {
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
}

test.beforeAll(async ({ browser }) => {
    try {
        await fsp.rm('coverage', { force: true, recursive: true });
    } catch (error) {
        //Ignore
    }
    page = await browser.newPage();

    //Each test worker must start collecting coverage information for the duration of its tests
    await page.coverage.startJSCoverage();
});

test.afterAll(async ({ }, { config }) => {
    //Each test worker must collect and save its coverage information. The last worker will also report the coverage
    await saveV8Coverage(page, config);
    await page.close();
});

const dynamicTests = async () => {
    const stories = globbySync('./dist/**/*.stories.js');

    for (let index = 0; index < stories.length; index++) {
        const storyImport = path.join(process.cwd(), stories[index]);       
        const storyName = splitPascalCase(path.basename(stories[index].replace('.stories.js', '')));
        const storyPath = `http://localhost:6006/components/${storyName.replaceAll(' ', '-').toLowerCase()}/`;
        let storyObj;
        try {
            storyObj = await import('file://' + storyImport);
        } catch (error) {
            storyObj = error;
            console.error(error);
            continue;
        }
        const storyTests = Object.keys(storyObj).filter((item) => {
            if (item === 'default') {
                return false;
            }
            return true;
        });

        for (let index2 = 0; index2 < storyTests.length; index2++) {
            const storyTest = storyTests[index2];
            const story = storyObj[storyTest];

            test(`${storyName} - ${storyTest.replaceAll('_',' ')}`, async () => {
                await page.goto(storyPath);

                if (!story || !story.play) {
                    return;
                }

                const fullPage = await page.content();
                try {
                    await page.waitForSelector(`.${storyTest}`, {
                        state: 'attached'
                    });
                } catch (error) {
                    throw new Error(`${error.toString()} \r\n\r\n${fullPage}`);
                }

                const res = await page.evaluate(async ([storyTest]) => {
                    try {
                        const canvas = document.querySelector(
                            `.${storyTest}`
                        );

                        if (!canvas) {
                            throw new Error(`Canvas not found for ${storyTest}`);
                        }

                        const story = canvas.data;
                        if (!story || !story.play) {
                            return;
                        }

                        await story.play({
                            story: story,
                            args: story.args,
                            canvasElement: canvas,
                        });
                    } catch (error) {
                        return error;
                    }
                }, [storyTest]);

                if (res) {
                    throw res;
                }
            });
        }
    }
};

await dynamicTests();
