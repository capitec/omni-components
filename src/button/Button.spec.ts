import * as jestMock from 'jest-mock';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';

test(`Button - Visual Secondary`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');
        await page.evaluate(() => document.fonts.ready);

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
});

test(`Button - Visual Primary`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');
        await page.evaluate(() => document.fonts.ready);

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(0).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-primary.png');
    });
});

test(`Button - Visual Clear`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');
        await page.evaluate(() => document.fonts.ready);

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(2).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-clear.png');
    });
});

test(`Button - Visual White`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');
        await page.evaluate(() => document.fonts.ready);

        const select = await page.locator('omni-select[value=secondary]');

        await select.click();
        await select.locator('.item').nth(3).click();

        await expect(page.locator('[data-testid]').first()).toHaveScreenshot('button-white.png');
    });
});

test(`Button - Interactive Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');

        const button = page.locator('.Interactive').locator('[data-testid=test-button]');

        // Add click mock function to page and list for 'click' event on button
        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await button.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await button.click();
        await button.click();

        await expect(click).toBeCalledTimes(2);
    });
});

test(`Button - Type Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');

        const button = page.locator('.Type').locator('[data-testid=test-button]');
        const buttonElement = button.locator('#button');
        const foundPrimaryClass = await buttonElement.evaluate((btn) => btn?.classList.contains('primary'));
        await expect(foundPrimaryClass).toBeTruthy();
    });
});

test(`Button - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');

        const args = await page.locator('story-renderer[key=Label]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const button = page.locator('.Label').locator('[data-testid=test-button]');
        const labelElement = button.locator('#label');
        await expect(labelElement).toHaveText(args.label);
        await expect(button).toHaveScreenshot('button-label.png');
    });
});

test(`Button - Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');

        const button = page.locator('.Slot').locator('[data-testid=test-button]');

        const slotElement = button.locator('slot');
        const foundSlottedOmniIconElement = await slotElement.evaluateHandle((s: HTMLSlotElement) =>
            s.assignedElements().find((e) => e.tagName.toLowerCase() === 'omni-icon')
        );

        await expect(foundSlottedOmniIconElement.asElement()).toBeTruthy();
    });
});

test(`Button - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/button/');

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

        await expect(click).toBeCalledTimes(0);
    });
});
