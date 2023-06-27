import * as jestMock from 'jest-mock';
import {
    LabelBehaviour,
    HintBehaviour,
    ErrorBehaviour,
    ValueBehaviour,
    ClearableBehaviour,
    CustomClearableSlotBehaviour,
    PrefixBehaviour,
    SuffixBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, expectJest, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { ColorField } from './ColorField.js';

test(`Color Field - Interactive`, async ({ page, browserName }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/color-field/');
        await page.evaluate(() => document.fonts.ready);

        await page.waitForSelector('[data-testid]', {});

        const field = page.locator('[data-testid]').first();

        const inputField = field.locator('#inputField');

        await expect(inputField).toHaveAttribute('type', 'color');
        await expect(field).toHaveScreenshot('color-field.png');

        await field.evaluate(async (f: ColorField) => {
            f.value = '#F6B73C';
            await f.updateComplete;
        });
        await expect(field).toHaveScreenshot('color-field-value.png');
    });
});

LabelBehaviour('omni-color-field');
HintBehaviour('omni-color-field');
ErrorBehaviour('omni-color-field');
ValueBehaviour('omni-color-field');
ClearableBehaviour('omni-color-field');
CustomClearableSlotBehaviour('omni-color-field');
PrefixBehaviour('omni-color-field');
SuffixBehaviour('omni-color-field');

test(`Color Field - Disabled Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/color-field/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Disabled]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const colorField = page.locator('.Disabled').getByTestId('test-field');
        await colorField.evaluate(async (d: ColorField, args) => {
            d.value = args.value;

            await d.updateComplete;
        }, args);

        await expect(colorField).toHaveScreenshot('color-field-initial.png');

        //Click event test.
        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await colorField.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await colorField.click({
            force: true
        });

        await expectJest(click).toBeCalledTimes(0);
    });
});
