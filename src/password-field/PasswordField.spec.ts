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
import type { PasswordField } from './PasswordField.js';

test(`Password Field - Interactive`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/password-field/');
        await page.evaluate(() => document.fonts.ready);

        const passwordField = page.locator('[data-testid]').first();
        passwordField.evaluate(async (t: PasswordField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(passwordField).toHaveScreenshot('password-field.png');

        const interactions = jestMock.fn();
        await page.exposeFunction('jestInteract', () => interactions());
        await passwordField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInteract());
            node.addEventListener('click', () => (window as any).jestInteract());
        });

        const showSlotElement = passwordField.locator('slot[name=show]');
        await expect(showSlotElement).toHaveCount(1);
        await showSlotElement.click();
        await expect(passwordField).toHaveScreenshot('password-field-show.png');

        const hideSlotElement = passwordField.locator('slot[name=hide]');
        await expect(hideSlotElement).toHaveCount(1);
        await hideSlotElement.click();
        await expect(passwordField).toHaveScreenshot('password-field-hide.png');

        const inputField = passwordField.locator('#inputField');

        const value = 'Value Update';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(interactions).toBeCalledTimes(value.length);
        await expect(passwordField).toHaveScreenshot('password-field-value.png');
    });
});

test('Password Field - Label Behaviour', testLabelBehaviour('omni-password-field'));
test('Password Field - Hint Behaviour', testHintBehaviour('omni-password-field'));
test('Password Field - Error Behaviour', testErrorBehaviour('omni-password-field'));
test('Password Field - Value Behaviour', testValueBehaviour('omni-password-field'));
test('Password Field - Clearable Behaviour', testClearableBehaviour('omni-password-field'));
test('Password Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-password-field'));
test('Password Field - Prefix Behaviour', testPrefixBehaviour('omni-password-field'));
test('Password Field - Suffix Behaviour', testSuffixBehaviour('omni-password-field'));
test('Password Field - Disabled Behaviour', testDisabledBehaviour('omni-password-field'));

test(`Password Field - Custom Icon Slot`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/password-field/');
        await page.evaluate(() => document.fonts.ready);

        const container = page.locator('.Custom_Icon_Slot');
        const passwordField = container.locator('[data-testid]').first();
        passwordField.evaluate(async (t: PasswordField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(passwordField).toHaveScreenshot('password-field.png');

        const showSlotElement = passwordField.locator('slot[name=show]');
        await expect(showSlotElement).toHaveCount(1);
        await showSlotElement.click({
            force: true
        });
        await expect(passwordField).toHaveScreenshot('password-field-show.png');

        const hideSlotElement = passwordField.locator('slot[name=hide]');
        await expect(hideSlotElement).toHaveCount(1);
        await hideSlotElement.click({
            force: true
        });
        await expect(passwordField).toHaveScreenshot('password-field-hide.png');

        const foundSlottedSvgElement = await showSlotElement.evaluate((s: HTMLSlotElement) =>
            Boolean(s?.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-open-icon'))
        );
        await expect(foundSlottedSvgElement).toBeTruthy();
    });
});
