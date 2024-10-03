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
import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';
import type { TextField } from './TextField.js';

test(`Text Field - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/text-field/');
        await page.evaluate(() => document.fonts.ready);

        await page.waitForSelector('[data-testid]', {});

        // Locate text field component.
        const textField = page.locator('[data-testid]').first();
        textField.evaluate(async (t: TextField) => {
            t.value = '';
            await t.updateComplete;
        });

        // Confirm that the component matches the provided screenshot.
        await expect(textField).toHaveScreenshot('text-field.png');
        const inputFn = await mockEventListener(textField, 'input');

        const inputField = textField.locator('#inputField');

        const value = 'Value Update';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(textField).toHaveScreenshot('text-field-value.png');
    });
});

test(`Text Field - Max Length Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/text-field/');
        await page.evaluate(() => document.fonts.ready);

        const container = page.locator('.Max_Length');
        const textField = container.locator('[data-testid]').first();
        textField.evaluate(async (t: TextField) => {
            t.value = '';
            t.maxLength = 4;
            await t.updateComplete;
        });

        // Confirm that the component matches the provided screenshot.
        await expect(textField).toHaveScreenshot('text-field.png');

        const inputFn = await mockEventListener(textField, 'input');

        const inputField = textField.locator('#inputField');

        const typedValue = 'Tests';
        const value = 'Test';
        await inputField.type(typedValue);

        await expect(textField).toHaveScreenshot('text-field-value.png');
        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(typedValue.length);
    });
});

test('Text Field - Label Behaviour', testLabelBehaviour('omni-text-field'));
test('Text Field - Hint Behaviour', testHintBehaviour('omni-text-field'));
test('Text Field - Error Behaviour', testErrorBehaviour('omni-text-field'));
test('Text Field - Value Behaviour', testValueBehaviour('omni-text-field'));
test('Text Field - Clearable Behaviour', testClearableBehaviour('omni-text-field'));
test('Text Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-text-field'));
test('Text Field - Prefix Behaviour', testPrefixBehaviour('omni-text-field'));
test('Text Field - Suffix Behaviour', testSuffixBehaviour('omni-text-field'));
test('Text Field - Disabled Behaviour', testDisabledBehaviour('omni-text-field'));
