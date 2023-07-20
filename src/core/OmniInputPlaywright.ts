import {
    expect,
    withCoverage,
    type PlaywrightTestArgs,
    type PlaywrightTestOptions,
    type PlaywrightWorkerArgs,
    type PlaywrightWorkerOptions,
    type TestInfo,
    getStoryArgs,
    mockEventListener
} from '../utils/JestPlaywright.js';
import type { OmniFormElement } from './OmniFormElement.js';
import type { BaseArgs } from './OmniInputStories.js';

function asDirectoryName(omniElementTag: string) {
    return omniElementTag.replace('omni-', '');
}

export const testLabelBehaviour = (tagName: string, storyExport = 'Label'): TestFunction => {
    return async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            await expect(input.locator(`.label > div`)).toHaveText(args?.label);
        });
    };
};

export const testHintBehaviour = (tagName: string, storyExport = 'Hint'): TestFunction => {
    return async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const hintElement = input.locator('.hint-label');
            await expect(hintElement).toHaveCount(1);
            await expect(hintElement).toHaveText(args?.hint as string);
        });
    };
};

export const testErrorBehaviour = (tagName: string, storyExport = 'Error_Label'): TestFunction => {
    return async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const errorElement = input.locator('.error-label');
            await expect(errorElement).toHaveCount(1);
            await expect(errorElement).toHaveText(args?.error as string);
        });
    };
};

export const testValueBehaviour = (tagName: string, storyExport = 'Value'): TestFunction => {
    return async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const args = await getStoryArgs<BaseArgs>(page, storyExport);
            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            const inputField = input.locator('input#inputField');
            await expect(inputField).toHaveValue(args?.value?.toString() as string);
        });
    };
};

export const testPrefixBehaviour = (tagName: string, storyExport = 'Prefix'): TestFunction => {
    return async ({ page }) => {
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
    };
};

export const testSuffixBehaviour = (tagName: string, storyExport = 'Suffix'): TestFunction => {
    return async ({ page }) => {
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
    };
};

export const testClearableBehaviour = (tagName: string, storyExport = 'Clearable'): TestFunction => {
    return async ({ page }) => {
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
    };
};

export const testCustomClearableSlotBehaviour = (tagName: string, storyExport = 'Custom_Clear_Slot'): TestFunction => {
    return async ({ page }) => {
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
    };
};

export const testDisabledBehaviour = (tagName: string, storyExport = 'Disabled'): TestFunction => {
    return async ({ page }) => {
        await withCoverage(page, async () => {
            await page.goto(`/components/${asDirectoryName(tagName)}/`);

            await page.waitForSelector('[data-testid]', {});

            const input = page.locator(`.${storyExport}`).getByTestId('test-field');

            //Disabled class test.
            await expect(input).toHaveAttribute('disabled', '');

            //Input event test.
            const inputTest = await mockEventListener(input, 'input');

            const inputField = input.locator('input#inputField');

            await inputField.type('Value Update 3');
            // Confirm that mock input event is called zero times
            await expect(inputTest).toBeCalledTimes(0);
        });
    };
};

export type TestArgs = PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions;
export type TestFunction = (args: TestArgs, testInfo: TestInfo) => Promise<void>;
