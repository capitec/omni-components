/* eslint-disable no-useless-catch */
import path from 'path';
import fs from 'fs';
import { test } from '@playwright/test';
import { globbySync } from 'globby';
import jsdom from 'jsdom';
import XMLHttpRequest from 'xhr2';
import { v4 } from 'uuid';
import fetch from 'node-fetch';
import playwrightConfig from '../../playwright.config.js';

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

const saveV8Coverage = async (page) => {
    let coverage = await page.coverage.stopJSCoverage();

    //Save coverage information for current test worker
    fs.writeFileSync(`coverage/${v4()}.json`, JSON.stringify(coverage), {
        encoding: 'utf-8'
    });
}

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    
    // Uncomment for verbose logging from browser console.
    // await page.on('console', (msg) => {
    //     if (msg && msg.text) {
    //       if (typeof msg.text === 'function') {
    //         console.log('PAGE LOG:', msg.text());
    //       } else {
    //         console.log('PAGE LOG:', msg.text);
    //       }
    //     } else {
    //         console.log('PAGE LOG:', msg);
    //     }
    // });
    
    const url = page.url();
    await page.goto(`http://${process.env.PLAYWRIGHT_HOST_ORIGIN ?? 'localhost'}:6006`);
    await page.evaluate(() => {
        window.sessionStorage.setItem('omni-docs-theme-selection', 'light');
        window.localStorage.setItem('omni-docs-framework-selection', 'HTML');
    });
    await page.goBack();
    if (page.url() !== url) {
        await page.goto(url);
    }

    const browserName = page.context().browser().browserType().name();
    const deviceProject = playwrightConfig.projects.find(p => p.name === browserName);

    // Only chromium supports coverage
    if (page.coverage && (deviceProject?.use?.defaultBrowserType === 'chromium' || browserName === 'chromium')) {
        //Each test worker must start collecting coverage information for the duration of its tests
        await page.coverage.startJSCoverage();
    }

});

test.afterAll(async ({ }, { config }) => {
    const browserName = page.context().browser().browserType().name();
    const deviceProject = playwrightConfig.projects.find(p => p.name === browserName);

    // Only chromium supports coverage
    if (page.coverage && (deviceProject?.use?.defaultBrowserType === 'chromium' || browserName === 'chromium')) {
        //Each test worker must collect and save its coverage information. The last worker will also report the coverage
        await saveV8Coverage(page);
    }
    await page.close();
});

/**
 * Setup Tests per stories file.
 */
const dynamicComponentStoryPlayFunctions = async () => {
    const stories = globbySync('./dist/**/*.stories.js');

    for (let index = 0; index < stories.length; index++) {
        const storyImport = path.join(process.cwd(), stories[index]);
        const storyName = splitPascalCase(path.basename(stories[index].replace('.stories.js', '')));
        const storyPath = `http://${process.env.PLAYWRIGHT_HOST_ORIGIN ?? 'localhost'}:6006/components/${storyName.replaceAll(' ', '-').toLowerCase()}/`;
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

            test(`${storyName} - ${storyTest.replaceAll('_', ' ')}`, async () => {
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

/**
 * Setup tests per component playwright test file.
 */
const dynamicComponentPlaywrightTests = async () => {
    const playwrightTests = globbySync('./dist/**/*.playwright.js');


    for (let index = 0; index < playwrightTests.length; index++) {
        const testImport = path.join(process.cwd(), playwrightTests[index]);
        const testName = splitPascalCase(path.basename(playwrightTests[index].replace('.playwright.js', '')));
        const testSetup = await import('file://' + testImport);

        await testSetup.default(() => page);
    }
};

await dynamicComponentPlaywrightTests();

// await dynamicComponentStoryPlayFunctions();
