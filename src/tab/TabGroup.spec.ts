import * as jestMock from 'jest-mock';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';

test(`Tab Group - Interactive`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab-group/');

        const tabGroup = page.locator('.Interactive').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');
        // Mock tab-select event.
        const tabSelect = jestMock.fn();
        await page.exposeFunction('jestTabSelect', () => tabSelect());
        await tabGroup.evaluate((node) => {
            node.addEventListener('tab-select', () => window.jestTabSelect());
        });

        const tabBar = tabGroup.locator('.tab-bar');
        await expect(tabBar).toHaveCount(1);

        // Get all the omni-tab-headers
        const nestedTabHeaders = tabBar.locator('omni-tab-header');
        await expect(nestedTabHeaders).toHaveCount(3);

        // Get all the omni-tabs
        const tabs = tabGroup.locator('omni-tab');
        await expect(tabs).toHaveCount(3);

        await nestedTabHeaders.nth(1).click();
        await expect(tabGroup).toHaveScreenshot('tab-group-tab-selected.png');
        await expect(tabSelect).toBeCalledTimes(1);
    });
});

declare global {
    interface Window {
        jestTabSelect: () => void;
    }
}
