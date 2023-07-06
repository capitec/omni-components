import * as jestMock from 'jest-mock';
import { test, expect, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { OmniFormElement } from './OmniFormElement.js';
import type { BaseArgs } from './OmniInputStories.js';

function toComponentName(text: string) {
    return asDirectoryName(text).replace(/(^\w|-\w)/g, spaceAndUpper);
}

function spaceAndUpper(text: string) {
    return text.replace(/-/, ' ').toUpperCase();
}

function asDirectoryName(omniElementTag: string) {
    return omniElementTag.replace('omni-', '');
}

export const testLabelBehaviour = (tagName: string, storyExport = 'Label') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            await expect(input.locator(`.label > div`)).toHaveText(args?.label);
        });
    });
};

export const testHintBehaviour = (tagName: string, storyExport = 'Hint') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const hintElement = input.locator('.hint-label');
            await expect(hintElement).toHaveCount(1);
            await expect(hintElement).toHaveText(args?.hint as string);
        });
    });
};

export const testErrorBehaviour = (tagName: string, storyExport = 'Error_Label') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const errorElement = input.locator('.error-label');
            await expect(errorElement).toHaveCount(1);
            await expect(errorElement).toHaveText(args?.error as string);
        });
    });
};

export const testValueBehaviour = (tagName: string, storyExport = 'Value') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const inputField = input.locator('input#inputField');
            await expect(inputField).toHaveValue(args?.value?.toString() as string);
        });
    });
};

export const testPrefixBehaviour = (tagName: string, storyExport = 'Prefix') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const slotElement = input.locator('slot[name=prefix]');
            await expect(slotElement).toHaveCount(1);

            const foundSlottedSvgElement = (
                await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
            ).asElement();
            await expect(foundSlottedSvgElement).toBeTruthy();
        });
    });
};

export const testSuffixBehaviour = (tagName: string, storyExport = 'Suffix') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const slotElement = input.locator('slot[name=suffix]');
            await expect(slotElement).toHaveCount(1);

            const foundSlottedSvgElement = (
                await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
            ).asElement();
            await expect(foundSlottedSvgElement).toBeTruthy();
        });
    });
};

export const testClearableBehaviour = (tagName: string, storyExport = 'Clearable') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            //Clearable attribute test.
            await expect(input).toHaveAttribute('clearable', '');

            const clearButton = input.locator('#clear-click');
            await clearButton.click();

            await expect(await input.evaluate((i: OmniFormElement) => !i.value || i.value === '0.00')).toBeTruthy();
        });
    });
};

export const testCustomClearableSlotBehaviour = (tagName: string, storyExport = 'Custom_Clear_Slot') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            //Clearable attribute test.
            await expect(input).toHaveAttribute('clearable', '');

            const clearButton = input.locator('#clear-click');
            await clearButton.click();

            await expect(await input.evaluate((i: OmniFormElement) => !i.value || i.value === '0.00')).toBeTruthy();
        });
    });
};

export const testDisabledBehaviour = (tagName: string, storyExport = 'Disabled') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            //Disabled class test.
            await expect(input).toHaveAttribute('disabled', '');

            //Input event test.
            const inputTest = jestMock.fn();
            await page.exposeFunction('jestInput', () => inputTest());
            await input.evaluate((node) => {
                node.addEventListener('input', () => (window as any).jestInput());
            });

            const inputField = input.locator('input#inputField');

            await inputField.type('Value Update 3');

            await expect(inputTest).toBeCalledTimes(0);
        });
    });
};

/**
 * Read story args from story renderer with provided key 
 */
export async function getStoryArgs<T = any>(page: Page, key: string, readySelector = '[data-testid]') {
    await page.waitForSelector(readySelector);

    const args = await page.locator(`story-renderer[key=${key}]`).evaluate((storyRenderer: any) => storyRenderer?.story?.args as T);
    return args;
}
