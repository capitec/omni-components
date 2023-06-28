/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs';
import {
    expect as expectPatched,
    test,
    type Expect,
    type Locator,
    type Page,
    type PageScreenshotOptions,
    type LocatorScreenshotOptions
} from '@playwright/test';
export * from '@playwright/test';
import * as matchers from '@testing-library/jest-dom/matchers.js';
//@ts-ignore
import jsdom from 'jsdom';
//@ts-ignore
import fetch from 'node-fetch';
import { v4 } from 'uuid';
//@ts-ignore
import XMLHttpRequest from 'xhr2';
//@ts-ignore
import playwrightExportedMatchers from '../../node_modules/@playwright/test/lib/matchers/matchers.js';
//@ts-ignore
import playwrightSnapshotMatchers from '../../node_modules/@playwright/test/lib/matchers/toMatchSnapshot.js';

global.window = global.window || new jsdom.JSDOM().window;
global.document = global.document || window.document;
global.Document = global.Document || window.Document;
global.HTMLElement = global.HTMLElement || window.HTMLElement;
global.SVGElement = global.SVGElement || window.SVGElement;
global.XMLHttpRequest = global.XMLHttpRequest || XMLHttpRequest;
if (!global.window.fetch) {
    global.window.fetch = fetch;
}
if (!global.fetch) {
    global.fetch = global.window.fetch;
}

//Setup browser shims
Object.keys(window).forEach((key) => {
    if (!(global as any)[key]) {
        try {
            (global as any)[key] = (window as any)[key];
        } catch (error) {
            // Ignore
        }
    }
});

// const playwrightMatchers = [
//     'toBeAttached',
//     'toBeChecked',
//     'toBeDisabled',
//     'toBeEditable',
//     'toBeEmpty',
//     'toBeEnabled',
//     'toBeFocused',
//     'toBeHidden',
//     'toBeInViewport',
//     'toBeOK',
//     'toBeVisible',
//     'toContainText',
//     'toHaveAttribute',
//     'toHaveClass',
//     'toHaveCount',
//     'toHaveCSS',
//     'toHaveId',
//     'toHaveJSProperty',
//     'toHaveText',
//     'toHaveTitle',
//     'toHaveURL',
//     'toHaveValue',
//     'toHaveValues',
//     'toHaveScreenshot',
//     'toPass'
// ];

const playwrightMatchers = {
    ...playwrightExportedMatchers,
    ...playwrightSnapshotMatchers
};

function extendExpect<T, U = jest.Expect>(initialExpect: T): U {
    const expect = ((initialExpect as any).default || initialExpect) as T & jest.Expect;

    const validMatchers: any = { ...(matchers.default || matchers) };
    Object.keys(validMatchers).forEach((matcherName) => {
        const matcher = validMatchers[matcherName];
        if (typeof matcher === 'undefined' || typeof matcher === 'boolean') {
            delete validMatchers[matcherName];
        }

        if (playwrightMatchers[matcherName]) {
            validMatchers[matcherName] = async function (...args: any[]) {
                if (args.length > 0) {
                    const received = args[0];
                    if (received instanceof HTMLElement || received instanceof SVGElement) {
                        return await matcher.apply(this, args);
                    } else {
                        return await playwrightMatchers[matcherName].apply(this, args);
                    }
                }
                return await playwrightMatchers[matcherName].apply(this, args);
            };
        }
    });

    expect.extend(validMatchers);

    if (!process.env.CI && !process.env.PW_SCREENSHOT_TESTING) {
        expect.extend({
            toHaveScreenshot: async function (
                received: Locator | Page,
                name: string | Array<string>,
                options?: PageScreenshotOptions | LocatorScreenshotOptions
            ) {
                const testInfo = test.info();

                if (Array.isArray(name)) {
                    name = name.join('/');
                }

                if (testInfo && received) {
                    testInfo.annotations.push({ type: 'warning', description: `Screenshot assertion was skipped! (${name})` });

                    if (received.screenshot) {
                        const screenshot = await received.screenshot(options);
                        await testInfo.attach(name, { body: screenshot, contentType: 'image/png' });
                    }
                }
                return {
                    pass: true,
                    message: () => 'No "CI" or "PW_SCREENSHOT_TESTING" environment variables set. Skipping screenshot assertion!'
                };
            }
        });
    }

    return expect as any as U;
}

const expect = extendExpect<Expect, Expect>(expectPatched);
const expectJest = expect as any as jest.Expect;

async function withCoverage<T>(this: any, page: Page, testAction: () => T | Promise<T>) {
    const browserName = page.context()?.browser()?.browserType()?.name();

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

    // Only chromium supports coverage
    if (page.coverage && browserName === 'chromium') {
        //Each test worker must start collecting coverage information for the duration of its tests
        await page.coverage.startJSCoverage();
    }

    let result: any;
    try {
        result = await testAction.apply(this);
    } finally {
        // Only chromium supports coverage
        if (page.coverage && browserName === 'chromium') {
            //Each test worker must collect and save its coverage information. The last worker will also report the coverage

            const coverage = await page.coverage.stopJSCoverage();

            //Save coverage information for current test worker
            fs.writeFileSync(`coverage/${v4()}.json`, JSON.stringify(coverage), {
                encoding: 'utf-8'
            });
        }
    }

    return result;
}

export { expect, expectJest, withCoverage };
