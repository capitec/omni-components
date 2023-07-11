import * as jestMock from 'jest-mock';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import { Args } from './Radio.stories.js';
//import {getStoryArgs} from '../utils/JestPlaywright.js';

test(`Radio - Check / Unchecked Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');

        const radio = page.locator('.Interactive').getByTestId('test-radio');

        await radio.focus();
        // Take screen shot of radio before it is clicked and changed to a checked state.
        await expect(radio).toHaveScreenshot('radio-initial.png');
        const content = radio.locator('#content');
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestValueChange', () => valueChange());
        await radio.evaluate((node) => {
            node.addEventListener('value-change', () => window.jestValueChange());
        });

        await content.click();
        await expect(radio).toHaveScreenshot('radio-checked.png');
        await content.press('Space');
        await expect(radio).toHaveScreenshot('radio-unchecked.png');
        await expect(valueChange).toBeCalledTimes(2);
    });
});

test(`Radio - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');

        await page.waitForSelector('[data-testid]', {});
        const args = await page.locator('story-renderer[key=Label]').evaluate(getStoryArgs());
        const radio = page.locator('.Label').getByTestId('test-radio');
        const label = radio.locator('label');
        await expect(label).toHaveText(args.label);
        await expect(radio).toHaveScreenshot('radio-label.png');
    });
});

test(`Radio - Hint Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');

        await page.waitForSelector('[data-testid]', {});
        const args = await page.locator('story-renderer[key=Hint]').evaluate(getStoryArgs());
        const radio = page.locator('.Hint').getByTestId('test-radio');
        const hint = radio.locator('.hint');
        await expect(hint).toHaveText(args.hint);
        await expect(radio).toHaveScreenshot('radio-hint.png');
    });
});

test(`Radio - Error Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');
        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Error_Label]').evaluate(getStoryArgs());
        const radio = page.locator('.Error_Label').getByTestId('test-radio');
        const element = radio.locator('.error');
        await expect(element).toHaveText(args.error);
        await expect(radio).toHaveScreenshot('radio-error.png');
    });
});

test(`Radio - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');
        const radio = page.locator('.Disabled').getByTestId('test-radio');

        const disabledElement = radio.locator('.disabled');
        // Test initial disabled.
        await expect(disabledElement).toBeVisible();
        await expect(radio).toHaveScreenshot('radio-disabled.png');

        // Test not clickable when disabled.
        const click = jestMock.fn();
        await page.exposeFunction('setRadioClicked', () => click());
        await radio.evaluate((n) => n.addEventListener('click', () => window.setRadioClicked()));

        await radio.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);

        await expect(radio).toHaveScreenshot('radio-disabled-click.png');
    });
});

test(`Radio - Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio/');

        const radio = page.locator('.Slot').getByTestId('test-radio');
        const slottedContent = await radio.innerHTML();

        await expect(slottedContent).toEqual('Slotted');
        await expect(radio).toHaveScreenshot('radio-slot.png');
    });
});

declare global {
    interface Window {
        jestValueChange: () => void;
        setRadioClicked: () => void;
    }
}

function getStoryArgs() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (storyRenderer: any) => storyRenderer?.story?.args as Args;
}
