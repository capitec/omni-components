import * as jestMock from 'jest-mock';
import { test, expect, expectJest, type Page } from '../utils/JestPlaywright.js';
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

export const LabelBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Label') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        await expect(input.locator(`.label > div`)).toHaveText(args?.label as string);
    });
};

export const HintBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Hint') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        const hintElement = input.locator('.hint-label');
        await expect(hintElement).toHaveCount(1);
        await expect(hintElement).toHaveText(args?.hint as string);
    });
};

export const ErrorBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Error_Label') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        const errorElement = input.locator('.error-label');
        await expect(errorElement).toHaveCount(1);
        await expect(errorElement).toHaveText(args?.error as string);
    });
};

export const ValueBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Value') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        const inputField = input.locator('input#inputField');
        await expect(inputField).toHaveValue(args?.value as string);
    });
};

export const PrefixBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Prefix') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        const slotElement = input.locator('slot[name=prefix]');
        await expect(slotElement).toHaveCount(1);

        const foundSlottedSvgElement = (
            await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
        ).asElement();
        await expect(foundSlottedSvgElement).toBeTruthy();
    });
};

export const SuffixBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Suffix') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        const slotElement = input.locator('slot[name=suffix]');
        await expect(slotElement).toHaveCount(1);

        const foundSlottedSvgElement = (
            await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
        ).asElement();
        await expect(foundSlottedSvgElement).toBeTruthy();
    });
};

export const ClearableBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Clearable') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        //Clearable attribute test.
        await expect(input).toHaveAttribute('clearable', '');

        const clearButton = input.locator('#clear-click');
        await clearButton.click();

        await expect(await input.evaluate((i: OmniFormElement) => i.value)).toBeFalsy();
    });
};

export const CustomClearableSlotBehaviour = <T extends HTMLElement, U extends BaseArgs>(
    getPage: () => Page,
    tagName: string,
    storyExport = 'Custom_Clear_Slot'
) => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
        const input = page.locator(`.${storyExport}`).getByTestId('test-field');

        //Clearable attribute test.
        await expect(input).toHaveAttribute('clearable', '');

        const clearButton = input.locator('#clear-click');
        await clearButton.click();

        await expect(await input.evaluate((i: OmniFormElement) => i.value)).toBeFalsy();
    });
};

export const DisabledBehaviour = <T extends HTMLElement, U extends BaseArgs>(getPage: () => Page, tagName: string, storyExport = 'Disabled') => {
    test(`${toComponentName(tagName)} - ${storyExport} Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto(`/components/${asDirectoryName(tagName)}/`);

        await page.waitForSelector('[data-testid]', {});

        const args = (await page.locator(`story-renderer[key=${storyExport}]`).evaluate((storyRenderer) => (storyRenderer as any).story.args)) as U;
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

        await expectJest(inputTest).toBeCalledTimes(0);
    });
};
