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
import type { EmailField } from './EmailField.js';

test(`Email Field - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/email-field/');
        await page.evaluate(() => document.fonts.ready);

        const emailField = page.locator('[data-testid]').first();
        emailField.evaluate(async (t: EmailField) => {
            t.value = '';
            await t.updateComplete;
        });

        // Confirm that the component matches the provided screenshot.
        await expect(emailField).toHaveScreenshot('email-field.png');

        const inputFn = await mockEventListener(emailField, 'input');

        const inputField = emailField.locator('#inputField');

        const value = 'johndoe@gmail.com';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(emailField).toHaveScreenshot('email-field-value.png');
    });
});

test(`Email Field - Max Length Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/email-field/');
        await page.evaluate(() => document.fonts.ready);

        const container = page.locator('.Max_Length');
        const emailField = container.locator('[data-testid]').first();
        emailField.evaluate(async (t: EmailField) => {
            t.value = '';
            t.maxLength = 4;
            await t.updateComplete;
        });

        // Confirm that the component matches the provided screenshot.
        await expect(emailField).toHaveScreenshot('email-field.png');

        const inputFn = await mockEventListener(emailField, 'input');

        const inputField = emailField.locator('#inputField');

        const typedValue = 'mail@mail.coo';
        const value = 'mail';
        await inputField.type(typedValue);

        await expect(emailField).toHaveScreenshot('email-field-value.png');
        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(typedValue.length);
    });
});

test('Email Field - Label Behaviour', testLabelBehaviour('omni-email-field'));
test('Email Field - Hint Behaviour', testHintBehaviour('omni-email-field'));
test('Email Field - Error Behaviour', testErrorBehaviour('omni-email-field'));
test('Email Field - Value Behaviour', testValueBehaviour('omni-email-field'));
test('Email Field - Clearable Behaviour', testClearableBehaviour('omni-email-field'));
test('Email Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-email-field'));
test('Email Field - Prefix Behaviour', testPrefixBehaviour('omni-email-field'));
test('Email Field - Suffix Behaviour', testSuffixBehaviour('omni-email-field'));
test('Email Field - Disabled Behaviour', testDisabledBehaviour('omni-email-field'));
