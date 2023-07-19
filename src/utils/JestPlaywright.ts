/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs';
// import { platform } from 'os';
import { expect as expectPatched, test, type Locator, type Page, type PageScreenshotOptions, type LocatorScreenshotOptions } from '@playwright/test';
export * from '@playwright/test';
import { fn } from 'jest-mock';
//@ts-ignore
import jsdom from 'jsdom';
//@ts-ignore
import fetch from 'node-fetch';
import { v4 } from 'uuid';
//@ts-ignore
import XMLHttpRequest from 'xhr2';

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

const expect = expectPatched;

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
        },
        toMatchSnapshot: async function (received: string | Buffer, name: string | Array<string>) {
            const testInfo = test.info();

            if (Array.isArray(name)) {
                name = name.join('/');
            }

            if (testInfo && received) {
                testInfo.annotations.push({ type: 'warning', description: `Snapshot assertion was skipped! (${name})` });

                if (typeof received !== 'string') {
                    await testInfo.attach(name, { body: received, contentType: 'image/png' });
                }
            }
            return {
                pass: true,
                message: () => 'No "CI" or "PW_SCREENSHOT_TESTING" environment variables set. Skipping snapshot assertion!'
            };
        }
    });
}

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
        try {
            //Each test worker must start collecting coverage information for the duration of its tests
            await page.coverage.startJSCoverage();
        } catch (error: any) {
            if (!error.toString().includes('JSCoverage is already enabled')) {
                throw error;
            }
        }
    }

    let result: any;
    try {
        result = await testAction.apply(this);
    } finally {
        // Only chromium supports coverage
        if (page.coverage && browserName === 'chromium' && !page.isClosed()) {
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

/**
 * Read story args from story renderer with provided key
 */
async function getStoryArgs<T = any>(page: Page, key: string, readySelector = '[data-testid]') {
    await page.waitForSelector(readySelector);

    const args = await page.locator(`story-renderer[key=${key}]`).evaluate((storyRenderer: any) => storyRenderer?.story?.args as T);
    return args;
}

async function mockEventListener(locator: Locator, eventName: string) {
    const tempFunction = `mock_${v4()}`;
    const eventFunction = fn();
    await locator.page().exposeFunction(tempFunction, () => eventFunction());
    await locator.evaluate(
        (node, { tempFunction, eventName }) => {
            //@ts-ignore
            node.addEventListener(eventName, () => window[tempFunction]());
        },
        { tempFunction, eventName }
    );
    return eventFunction;
}

/*
    const valueChange = jestMock.fn();
    await page.exposeFunction('jestChange', () => valueChange());
    await selectComponent.evaluate((node) => {
        node.addEventListener('change', () => window.jestChange());
    });

*/
// TODO: Revisit once playwright clipboard support is completed
/*
    clipboard isolation: [feature] clipboard isolation: https://github.com/microsoft/playwright/issues/13097
    dedicated clipboard API: [Feature] a dedicated clipboard API: https://github.com/microsoft/playwright/issues/15860
    basic clipboard support via shortcuts: Ctrl+C/V and Cmd+C/V: https://github.com/microsoft/playwright/issues/8114
*/

// async function keyboardCopy(page: Page): Promise<void> {
//     await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
//     const isMac = platform() === 'darwin';
//     const modifier = isMac ? 'Meta' : 'Control';
//     await page.keyboard.press(`${modifier}+KeyC`);
// }

// async function clipboardCopy(page: Page, content: string): Promise<void> {
//     await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
//     await page.evaluate(`navigator.clipboard.writeText('${content}')`);
// }

// async function keyboardPaste(page: Page): Promise<void> {
//     await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
//     const isMac = platform() === 'darwin';
//     const modifier = isMac ? 'Meta' : 'Control';
//     await page.keyboard.press(`${modifier}+KeyV`);
// }

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace PlaywrightTest {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        export interface Matchers<R, T = unknown> extends jest.Matchers {}
    }
}

export { expect, withCoverage, getStoryArgs, mockEventListener /*keyboardCopy, keyboardPaste, clipboardCopy*/ };
