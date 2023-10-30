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
import { test, expect, mockEventListener, withCoverage /*keyboardPaste, clipboardCopy*/ } from '../utils/JestPlaywright.js';
import type { CurrencyField } from './CurrencyField.js';

test(`Currency Field - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/currency-field/');

        const currencyField = page.locator('.Interactive').getByTestId('test-currency-field');

        await currencyField.evaluate(async (c: CurrencyField) => {
            c.value = '';
            await c.updateComplete;
        });

        await expect(currencyField).toHaveScreenshot('currency-field-initial.png');

        const inputField = currencyField.locator('input#inputField');

        // Simulate click, focus and blur events
        await inputField.click();
        await expect(currencyField).toHaveScreenshot('currency-field-clicked.png');

        await inputField.focus();
        await expect(currencyField).toHaveScreenshot('currency-field-focussed.png');

        await inputField.blur();
        await expect(currencyField).toHaveScreenshot('currency-field-blurred.png');

        const beforeinput = await mockEventListener(currencyField, 'beforeinput');

        const value = '120000015';
        await inputField.type(value);

        // Check the following value as input value is formatted to currency value.
        await expect(inputField).toHaveValue('1,200,000.15');
        await expect(beforeinput).toBeCalledTimes(value.length);

        // Backspacing to cover the removal of cents and cents separator

        await inputField.press('Backspace');
        await inputField.press('Backspace');

        await expect(inputField).toHaveValue('12,000.00');

        // Use left arrow key to position the caret after the currency separator.
        await inputField.press('ArrowLeft');
        await inputField.press('ArrowLeft');
        await inputField.press('ArrowLeft');
        await inputField.press('Backspace');

        await expect(inputField).toHaveValue('1,200.00');

        const number = '88.88';
        // await clipboardCopy(page, number);
        // await inputField.focus();
        // await inputField.click();

        // //Set the selection range of the input component to ensure the entire value is selected.
        // await inputField.evaluate((i: HTMLInputElement) => i.setSelectionRange(0, 10));

        // await keyboardPaste(page);
        await currencyField.evaluate((c: CurrencyField, number) => (c.value = number), number);

        await expect(inputField).toHaveValue(number);

        await currencyField.evaluate(async (c: CurrencyField) => {
            c.value = '';
            await c.updateComplete;
        });

        await inputField.type(value);

        // Check the following value as input value is formatted to currency value;
        await expect(inputField).toHaveValue('1,200,000.15');

        // // Paste invalid numeric value the alpha characters should be stripped and the value should be updated accordingly.
        // await inputField.evaluate((i: HTMLInputElement) => i.setSelectionRange(3, 10));

        // const invalidNumber = '4abc';
        const invalidNumber = '124abc.15';
        // await clipboardCopy(page, invalidNumber);
        // await keyboardPaste(page);
        await currencyField.evaluate((c: CurrencyField, invalidNumber) => (c.value = invalidNumber), invalidNumber);
        await expect(inputField).toHaveValue('124.15');
        await expect(currencyField).toHaveScreenshot('currency-field-invalid-evaluate.png');

        //TODO add tests for before input scenarios
        await currencyField.evaluate(async (c: CurrencyField) => {
            c.value = '';
            await c.updateComplete;
        });

        //Reset the mock count.
        await beforeinput.mockReset();
        // Ensure the mock reset worked as expected.
        await expect(beforeinput).toBeCalledTimes(0);

        const invalidTypedValue = '1234a55';
        /**
         * Added delay when typing, initially a timeout was used as the value of the input element would have a flaky value eg: expect the value of 1,234.55 and instead would get 12.34.
         * delay is the time to wait between keydown and keyup in milliseconds.
         */
        await inputField.type(invalidTypedValue, { delay: 100 });

        await expect(inputField).toHaveValue('1,234.55');
        await expect(currencyField).toHaveScreenshot('currency-field-invalid-typed.png');
        await expect(beforeinput).toBeCalledTimes(invalidTypedValue.length);

        await currencyField.evaluate(async (c: CurrencyField) => {
            c.value = '';
            await c.updateComplete;
        });

        const numericValue = 88.88;
        await currencyField.evaluate((c: CurrencyField, numericValue) => (c.value = numericValue), numericValue);
        await expect(inputField).toHaveValue(numericValue.toString());
        await expect(currencyField).toHaveScreenshot('currency-field-numeric-evaluate.png');
    });
});

test('Currency Field - Label Behaviour', testLabelBehaviour('omni-currency-field'));
test('Currency Field - Hint Behaviour', testHintBehaviour('omni-currency-field'));
test('Currency Field - Error Behaviour', testErrorBehaviour('omni-currency-field'));
test('Currency Field - Value Behaviour', testValueBehaviour('omni-currency-field'));
test('Currency Field - Clearable Behaviour', testClearableBehaviour('omni-currency-field'));
test('Currency Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-currency-field'));
test('Currency Field - Prefix Behaviour', testPrefixBehaviour('omni-currency-field'));
test('Currency Field - Suffix Behaviour', testSuffixBehaviour('omni-currency-field'));
test('Currency Field - Disabled Behaviour', testDisabledBehaviour('omni-currency-field'));
