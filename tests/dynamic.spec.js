/* eslint-disable no-useless-catch */
import path from 'path';
import { test, expect } from '@playwright/test';
import { globbySync } from 'globby';
import jsdom from 'jsdom';
import XMLHttpRequest   from 'xhr2';

global.window = global.window || new jsdom.JSDOM().window;
global.document = window.document;
global.Document = window.Document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = XMLHttpRequest;

Object.keys(window).forEach((key) => {
    if (!global[key]) {
        try {
            global[key] = window[key];
        } catch (error) {
            // Ignore
        }
    }
});

const dynamicTests = async () => {
    const stories = globbySync('./dist/**/*.stories.js');

    for (let index = 0; index < stories.length; index++) {
        const storyImport = path.join(process.cwd(), stories[index]);
        const storyName = path.basename(path.dirname(stories[index]));
        const storyPath = `http://localhost:6006/components/${storyName.replaceAll('-','')}/`;
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

            test(`${storyName} - ${storyTest}`, async ({ page }) => {
                await page.goto(storyPath);

                if (!story || !story.play) {
                    return;
                }

                const fullPage = await page.content();
                try {
                    await page.waitForSelector(`.${storyTest}`, {
                        state: 'attached'
                    } );
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