import * as jestMock from 'jest-mock';
import {
    testLabelBehaviour,
    testHintBehaviour,
    testErrorBehaviour,
    testValueBehaviour,
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour,
    testDisabledBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, withCoverage, type Page } from '../utils/JestPlaywright.js';
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

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(textField).toHaveScreenshot('text-field-value.png');
    });
});

testLabelBehaviour('omni-text-field');
testHintBehaviour('omni-text-field');
testErrorBehaviour('omni-text-field');
testValueBehaviour('omni-text-field');
testClearableBehaviour('omni-text-field');
testCustomClearableSlotBehaviour('omni-text-field');
testPrefixBehaviour('omni-text-field');
testSuffixBehaviour('omni-text-field');
testDisabledBehaviour('omni-text-field');
