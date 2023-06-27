import * as jestMock from 'jest-mock';
import {
    LabelBehaviour,
    HintBehaviour,
    ErrorBehaviour,
    ValueBehaviour,
    ClearableBehaviour,
    CustomClearableSlotBehaviour,
    PrefixBehaviour,
    SuffixBehaviour,
    DisabledBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, expectJest, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { TextField } from './TextField.js';

test(`Text Field - Interactive`, async ({ page, browserName }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/text-field/');
        await page.evaluate(() => document.fonts.ready);

        await page.waitForSelector('[data-testid]', {});

        const textField = page.locator('[data-testid]').first();
        textField.evaluate(async (t: TextField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(textField).toHaveScreenshot('text-field.png');

        const inputFn = jestMock.fn();
        await page.exposeFunction('jestInput', () => inputFn());
        await textField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInput());
        });

        const inputField = textField.locator('#inputField');

        const value = 'Value Update';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expectJest(inputFn).toBeCalledTimes(value.length);
        await expect(textField).toHaveScreenshot('text-field-value.png');
    });
});

LabelBehaviour('omni-text-field');
HintBehaviour('omni-text-field');
ErrorBehaviour('omni-text-field');
ValueBehaviour('omni-text-field');
ClearableBehaviour('omni-text-field');
CustomClearableSlotBehaviour('omni-text-field');
PrefixBehaviour('omni-text-field');
SuffixBehaviour('omni-text-field');
DisabledBehaviour('omni-text-field');
