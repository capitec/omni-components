import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Expander - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Interactive').getByTestId('test-expander');
    });
});

test(`Expander - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Disabled').getByTestId('test-expander');
    });
});

test(`Expander - Button Alignment Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Button_Alignment').getByTestId('test-expander');
    });
});

test(`Expander - Expanded Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Expanded').getByTestId('test-expander');
    });
});

test(`Expander - Expand Slotted Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Expand_Icon').getByTestId('test-expander');
    });
});

test(`Expander - Header Slotted Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander/');
        const expander = page.locator('.Header_Icon').getByTestId('test-expander');
    });
});
