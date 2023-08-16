import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Expander - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Interactive').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');
        // The expanded attribute should be not set by default
        await expect(expander).not.toHaveAttribute('expanded', '');

        const expanderHeader = expander.locator('.header');
        await expanderHeader.click();
        // The expanded attribute should be set once the expander is expanded
        await expect(expander).toHaveAttribute('expanded', '');

        await expect(expander).toHaveScreenshot('expander-expanded.png');

        await expanderHeader.click();

        await expect(expander).not.toHaveAttribute('expanded', '');
    });
});

test(`Expander - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Disabled').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');

        const animantionEnd = await mockEventListener(expander, 'animationend');

        const expanderHeader = expander.locator('.header');
        await expanderHeader.click();

        await expect(expander).not.toHaveAttribute('expanded', '');

        await expect(expander).toHaveScreenshot('expander-initial.png');
        await expect(animantionEnd).toBeCalledTimes(0);
    });
});

test(`Expander - Button Alignment Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Button_Alignment').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');

        const header = expander.locator('.header');

        // Confirm that there is 3 elements in the header
        await expect(await header.evaluate((h) => h.childElementCount)).toBe(3);

        await expect(expander).toHaveAttribute('button-alignment', 'left');

        const headerButton = header.locator('.expand-icon-container');
        await expect(headerButton).toHaveCount(1);
    });
});

test(`Expander - Expanded Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Expanded').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');
        await expect(expander).toHaveAttribute('expanded', 'true');

        const expanderHeader = expander.locator('.header');
        await expanderHeader.click();

        await expect(expander).not.toHaveAttribute('expanded', '');
        await expect(expander).toHaveScreenshot('expander-closed.png');
    });
});

test(`Expander - Expand Slotted Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Expand_Icon').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');

        const header = expander.locator('.header');

        const expandIconContainer = header.locator('.expand-icon-container');
        await expect(expandIconContainer).toHaveCount(1);
    });
});

test(`Expander - Header Slotted Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Header_Icon').getByTestId('test-expander');

        await expect(expander).toHaveScreenshot('expander-initial.png');
        const header = expander.locator('.header');

        const headerIconContainer = header.locator('.header-icon-container');
        await expect(headerIconContainer).toHaveCount(1);
    });
});
