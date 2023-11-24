import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Tab - Basic Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab/');
        await page.waitForSelector('[data-testid]', {});

        // For the purposes of the demo the Tabs are slotted in a Tab Group
        const tabGroup = page.locator('.Basic').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');
        // Get the Tab bar which will contain the tab headers.
        const tabBar = tabGroup.locator('.tab-bar').first();

        // Get all the tab headers
        const nestedTabHeaders = tabBar.locator('omni-tab-header');
        await expect(nestedTabHeaders).toHaveCount(3);

        // Get all the omni-tabs
        const tabs = tabGroup.locator('omni-tab');
        await expect(tabs).toHaveCount(3);
    });
});

test(`Tab - Active Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab/');
        await page.waitForSelector('[data-testid]', {});

        // For the purposes of the demo the Tabs are slotted in a Tab Group
        const tabGroup = page.locator('.Active').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');
        // Get the Tab bar which will contain the tab headers.
        const tabBar = tabGroup.locator('.tab-bar').first();

        // Mock tab-select event.
        const tabSelect = await mockEventListener(tabGroup, 'tab-select');
        // Get all the tab headers
        const nestedTabHeaders = tabBar.locator('omni-tab-header');
        await expect(nestedTabHeaders).toHaveCount(3);

        // Get all the omni-tabs
        const tabs = tabGroup.locator('omni-tab');
        await expect(tabs).toHaveCount(3);

        // Confirm that the second tab has the active attribute.
        await expect(tabs.nth(1)).toHaveAttribute('active', '');
        // Confirm that the second tab header has the data-active attribute.
        await expect(nestedTabHeaders.nth(1)).toHaveAttribute('data-active', '');
        // Confirm that the second tab and the second tab header has the active attributes.

        await expect(tabGroup).toHaveScreenshot('tab-group-active.png');
        await expect(tabBar).toHaveScreenshot('tab-bar.png');

        // Click the first tab header.
        await nestedTabHeaders.nth(0).click();
        await expect(tabSelect).toBeCalledTimes(1);
        await expect(tabGroup).toHaveScreenshot('tab-group-tab-selected.png');
        // Confirm that the first tab has the active attribute.
        await expect(tabs.nth(0)).toHaveAttribute('active', '');
        // Confirm that the first tab header has the data-active attribute.
        await expect(nestedTabHeaders.nth(0)).toHaveAttribute('data-active', '');
    });
});

test(`Tab - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab/');
        await page.waitForSelector('[data-testid]', {});
        // Locate the Disabled Tab example.
        const tabGroup = page.locator('.Disabled').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');

        // Mock tab-select event.
        const tabSelect = await mockEventListener(tabGroup, 'tab-select');

        const tabBar = tabGroup.locator('.tab-bar');
        await expect(tabBar).toHaveCount(1);

        // Get all the tab headers.
        const nestedTabHeaders = tabBar.locator('omni-tab-header');
        await expect(nestedTabHeaders).toHaveCount(3);

        // Get default slot.
        const tabs = tabGroup.locator('omni-tab');
        await expect(tabs).toHaveCount(3);

        // Click the disabled tab twice.
        await nestedTabHeaders.nth(2).click();
        await nestedTabHeaders.nth(2).click();
        await expect(tabGroup).toHaveScreenshot('tab-group-disabled-click.png');
        await expect(tabSelect).toBeCalledTimes(0);

        // Click the second tab.
        await nestedTabHeaders.nth(1).click();
        await expect(tabGroup).toHaveScreenshot('tab-group-non-disabled-click.png');
        await expect(tabSelect).toBeCalledTimes(1);
    });
});
