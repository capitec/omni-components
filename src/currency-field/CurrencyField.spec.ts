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
import { test, expect, withCoverage /*keyboardPaste, clipboardCopy*/ } from '../utils/JestPlaywright.js';
import type { CurrencyField } from './CurrencyField.js';

test(`Currency Field - Visual and Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/currency-field/');

        const args = await page.locator('story-renderer[key=Interactive]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
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

        const beforeinput = jestMock.fn();
        await page.exposeFunction('jestbeforeinput', () => beforeinput());
        await currencyField.evaluate((node) => {
            node.addEventListener('beforeinput', () => (window as any).jestbeforeinput());
        });

        const value = '120000015';
        await inputField.type(value);

        // Check the following value as input value is formatted to currency value;
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

        // TODO: Enable test after fixing currency-field bug
        test.fixme(true, 'Currency Field currently allows setting non-numeric content via javascript!');
        await expect(inputField).toHaveValue('124.15');

        //TODO add tests for before input scenarios
    });
});

testLabelBehaviour('omni-currency-field');
testHintBehaviour('omni-currency-field');
testErrorBehaviour('omni-currency-field');
testValueBehaviour('omni-currency-field');
testClearableBehaviour('omni-currency-field');
testCustomClearableSlotBehaviour('omni-currency-field');
testPrefixBehaviour('omni-currency-field');
testSuffixBehaviour('omni-currency-field');
testDisabledBehaviour('omni-currency-field');
