import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Tab Group - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab-group/');

        const tabGroup = page.locator('.Interactive').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');
        // Mock tab-select event.
        const tabSelect = await mockEventListener(tabGroup, 'tab-select');

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
        // Confirm that tabselect event was called.
        await expect(tabSelect).toBeCalledTimes(1);
    });
});
