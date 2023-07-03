import { test, expect, withCoverage } from '../utils/JestPlaywright.js';

test(`Icon - Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Interactive').getByTestId('test-icon');

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});

test(`Icon - Local Source Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Local_Source').getByTestId('test-icon');

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});

test(`Icon - Remote Source Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Remote_Source').getByTestId('test-icon');

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});

test(`Icon - Material Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Material').getByTestId('test-icon');

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});

test(`Icon - Asymmetrical Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Asymmetrical').getByTestId('test-icon');

        const svg = icon.locator('svg');
        const svgWidth = await svg.evaluate((s) => s.clientWidth);
        const svgHeight = await svg.evaluate((s) => s.clientHeight);
        await expect(svgWidth).not.toEqual(svgHeight);

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});

test(`Icon - Symmetrical Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/icon/');

        const icon = page.locator('.Symmetrical').getByTestId('test-icon');

        const svg = icon.locator('svg');
        const svgWidth = await svg.evaluate((s) => s.clientWidth);
        const svgHeight = await svg.evaluate((s) => s.clientHeight);
        await expect(svgWidth).toEqual(svgHeight);

        await expect(icon).toHaveScreenshot('icon-initial.png');
    });
});
