import * as jestMock from 'jest-mock';
import { test, expect, expectJest, type Page } from '../utils/JestPlaywright.js';

export default function setupTests(getPage: () => Page) {
    test(`Button - Visual Secondary`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const button = page.locator('[data-testid]').first();
        await expect(button).toHaveScreenshot('button-secondary.png');

        await button.hover();
        await expect(button).toHaveScreenshot('button-secondary-hover.png');

        await button.focus();
        await expect(button).toHaveScreenshot('button-secondary-focus.png');

        await button.click();
        await expect(button).toHaveScreenshot('button-secondary-clicked.png');

        await button.blur();
        await expect(button).toHaveScreenshot('button-secondary-after.png');
    });

    test(`Button - Visual Primary`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(0).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-primary.png');
    });

    test(`Button - Visual Clear`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(2).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-clear.png');
    });

    test(`Button - Visual White`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(3).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-white.png');
    });

    test(`Button - Interactive Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const button = page.locator('.Interactive').locator('[data-testid=test-button]');

        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await button.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await button.click();
        await button.click();

        await expectJest(click).toBeCalledTimes(2);
    });

    test(`Button - Type Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const button = page.locator('.Type').locator('[data-testid=test-button]');
        const buttonElement = button.locator('#button');
        const foundPrimaryClass = await buttonElement.evaluate((btn) => btn?.classList.contains('primary'));
        await expect(foundPrimaryClass).toBeTruthy();
    });

    test(`Button - Label Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Label]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const button = page.locator('.Label').locator('[data-testid=test-button]');
        const labelElement = button.locator('#label');
        await expect(labelElement).toHaveText(args.label);
    });

    test(`Button - Slot Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const button = page.locator('.Slot').locator('[data-testid=test-button]');

        const slotElement = button.locator('slot');
        const foundSlottedOmniIconElement = await slotElement.evaluateHandle((s: HTMLSlotElement) =>
            s.assignedElements().find((e) => e.tagName.toLowerCase() === 'omni-icon')
        );

        await expect(foundSlottedOmniIconElement.asElement()).toBeTruthy();
    });

    test(`Button - Disabled Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('http://localhost:6006/components/button/');

        await page.waitForSelector('[data-testid]', {});

        const button = page.locator('.Disabled').locator('[data-testid=test-button]');

        const buttonElement = button.locator('#button');

        await expect(await buttonElement.isDisabled()).toBeTruthy();

        const foundDisabledClass = await buttonElement.evaluate((btn) => btn?.classList.contains('disabled'));
        await expect(foundDisabledClass).toBeTruthy();
        await expect(buttonElement).toHaveClass(/disabled/);

        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await button.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await button.click({
            force: true
        });
        await button.click({
            force: true
        });

        await expectJest(click).toBeCalledTimes(0);
    });
}
