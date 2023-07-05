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
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import type { NumberField } from './NumberField.js';

test(`Number Field - Interactive`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/number-field/');
        await page.evaluate(() => document.fonts.ready);

        const numberField = page.locator('[data-testid]').first();
        numberField.evaluate(async (t: NumberField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(numberField).toHaveScreenshot('number-field.png');

        const inputFn = jestMock.fn();
        await page.exposeFunction('jestInput', () => inputFn());
        await numberField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInput());
        });

        const inputField = numberField.locator('#inputField');

        const value = '12345';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(numberField).toHaveScreenshot('number-field-value.png');
    });
});

testLabelBehaviour('omni-number-field');
testHintBehaviour('omni-number-field');
testErrorBehaviour('omni-number-field');
testValueBehaviour('omni-number-field');
testClearableBehaviour('omni-number-field');
testCustomClearableSlotBehaviour('omni-number-field');
testPrefixBehaviour('omni-number-field');
testSuffixBehaviour('omni-number-field');
testDisabledBehaviour('omni-number-field');
