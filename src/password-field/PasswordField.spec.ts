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
import { test, expect, expectJest, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { PasswordField } from './PasswordField.js';

test(`Password Field - Interactive`, async ({ page, browserName }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/password-field/');
        await page.evaluate(() => document.fonts.ready);

        await page.waitForSelector('[data-testid]', {});

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

        await expectJest(interactions).toBeCalledTimes(value.length);
        await expect(passwordField).toHaveScreenshot('password-field-value.png');
    });
});

testLabelBehaviour('omni-password-field');
testHintBehaviour('omni-password-field');
testErrorBehaviour('omni-password-field');
testValueBehaviour('omni-password-field');
testClearableBehaviour('omni-password-field');
testCustomClearableSlotBehaviour('omni-password-field');
testPrefixBehaviour('omni-password-field');
testSuffixBehaviour('omni-password-field');
testDisabledBehaviour('omni-password-field');

test(`Password Field - Custom Icon Slot`, async ({ page, browserName }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/password-field/');
        await page.evaluate(() => document.fonts.ready);

        const args = await page.locator('story-renderer[key=Custom_Icon_Slot]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
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
