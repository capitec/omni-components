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
import type { EmailField } from './EmailField.js';

test(`Email Field - Interactive`, async ({ page, browserName }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/email-field/');
        await page.evaluate(() => document.fonts.ready);

        const emailField = page.locator('[data-testid]').first();
        emailField.evaluate(async (t: EmailField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(emailField).toHaveScreenshot('email-field.png');

        const inputFn = jestMock.fn();
        await page.exposeFunction('jestInput', () => inputFn());
        await emailField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInput());
        });

        const inputField = emailField.locator('#inputField');

        const value = 'johndoe@gmail.com';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(emailField).toHaveScreenshot('email-field-value.png');
    });
});

testLabelBehaviour('omni-email-field');
testHintBehaviour('omni-email-field');
testErrorBehaviour('omni-email-field');
testValueBehaviour('omni-email-field');
testClearableBehaviour('omni-email-field');
testCustomClearableSlotBehaviour('omni-email-field');
testPrefixBehaviour('omni-email-field');
testSuffixBehaviour('omni-email-field');
testDisabledBehaviour('omni-email-field');
