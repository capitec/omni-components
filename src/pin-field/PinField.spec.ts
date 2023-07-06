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
import type { PinField } from './PinField.js';

test(`Pin Field - Interactive`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/pin-field/');
        await page.evaluate(() => document.fonts.ready);

        const pinField = page.locator('[data-testid]').first();
        pinField.evaluate(async (t: PinField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(pinField).toHaveScreenshot('pin-field.png');

        const interactions = jestMock.fn();
        await page.exposeFunction('jestInteract', () => interactions());
        await pinField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInteract());
            node.addEventListener('click', () => (window as any).jestInteract());
        });

        const showSlotElement = pinField.locator('slot[name=show]');
        await expect(showSlotElement).toHaveCount(1);
        await showSlotElement.click();
        await expect(pinField).toHaveScreenshot('pin-field-show.png');

        const hideSlotElement = pinField.locator('slot[name=hide]');
        await expect(hideSlotElement).toHaveCount(1);
        await hideSlotElement.click();
        await expect(pinField).toHaveScreenshot('pin-field-hide.png');

        const inputField = pinField.locator('#inputField');

        const value = '1234';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(interactions).toBeCalledTimes(value.length);
        await expect(pinField).toHaveScreenshot('pin-field-value.png');
    });
});

test(`Pin Field - Max Length`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/pin-field/');
        await page.evaluate(() => document.fonts.ready);

        const container = page.locator('.Max_Length');
        const pinField = container.locator('[data-testid]').first();
        pinField.evaluate(async (t: PinField) => {
            t.value = '';
            t.maxLength = 4;
            await t.updateComplete;
        });
        await expect(pinField).toHaveScreenshot('pin-field.png');

        const interactions = jestMock.fn();
        await page.exposeFunction('jestInteract', () => interactions());
        await pinField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInteract());
        });

        const inputField = pinField.locator('#inputField');

        const typedValue = '12345678910';
        const value = '1234';
        await inputField.type(typedValue);

        await expect(pinField).toHaveScreenshot('pin-field-value.png');
        await expect(inputField).toHaveValue(value);

        await expect(interactions).toBeCalledTimes(typedValue.length);

        const showSlotElement = pinField.locator('slot[name=show]');
        await expect(showSlotElement).toHaveCount(1);
        await showSlotElement.click();
        await expect(pinField).toHaveScreenshot('pin-field-show.png');
    });
});

test('Pin Field - Label Behaviour', testLabelBehaviour('omni-pin-field'));
test('Pin Field - Hint Behaviour', testHintBehaviour('omni-pin-field'));
test('Pin Field - Error Behaviour', testErrorBehaviour('omni-pin-field'));
test('Pin Field - Value Behaviour', testValueBehaviour('omni-pin-field'));
test('Pin Field - Clearable Behaviour', testClearableBehaviour('omni-pin-field'));
test('Pin Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-pin-field'));
test('Pin Field - Prefix Behaviour', testPrefixBehaviour('omni-pin-field'));
test('Pin Field - Suffix Behaviour', testSuffixBehaviour('omni-pin-field'));
test('Pin Field - Disabled Behaviour', testDisabledBehaviour('omni-pin-field'));
