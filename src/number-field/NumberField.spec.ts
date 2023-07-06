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

test('Number Field - Label Behaviour', testLabelBehaviour('omni-number-field'));
test('Number Field - Hint Behaviour', testHintBehaviour('omni-number-field'));
test('Number Field - Error Behaviour', testErrorBehaviour('omni-number-field'));
test('Number Field - Value Behaviour', testValueBehaviour('omni-number-field'));
test('Number Field - Clearable Behaviour', testClearableBehaviour('omni-number-field'));
test('Number Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-number-field'));
test('Number Field - Prefix Behaviour', testPrefixBehaviour('omni-number-field'));
test('Number Field - Suffix Behaviour', testSuffixBehaviour('omni-number-field'));
test('Number Field - Disabled Behaviour', testDisabledBehaviour('omni-number-field'));
