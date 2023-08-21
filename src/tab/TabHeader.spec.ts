import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Tab Header - Advanced Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/tab-header/');

        const tabGroup = page.locator('.Advanced').getByTestId('test-tab-group');
        await expect(tabGroup).toHaveScreenshot('tab-group-initial.png');

        // Mock tab-select event.
        const tabSelect = await mockEventListener(tabGroup, 'tab-select');

        // Get all the tab headers
        const nestedTabHeaders = tabGroup.locator('omni-tab-header');
        await expect(nestedTabHeaders).toHaveCount(4);

        // Get all the omni-tabs
        const tabs = tabGroup.locator('omni-tab');
        await expect(tabs).toHaveCount(4);

        // Get the active tab header
        const activeTabHeader = tabGroup.locator('omni-tab-header[data-active]');
        await expect(activeTabHeader).toHaveCount(1);

        // Get the omni-icon in the tab header slot
        const omniIcon = activeTabHeader.locator('omni-icon');
        await expect(omniIcon).toHaveCount(1);

        // Get the third tab header
        const thirdTabHeader = nestedTabHeaders.nth(2);

        // Get the omni-icon of the third tab header
        const thirdTabHeaderIcon = thirdTabHeader.locator('omni-icon');
        // Get the SVG slotted in the omni-icon component.
        const svg = thirdTabHeaderIcon.locator('svg');
        // Click the svg this should set the third tab to be active.
        await svg.click();

        // Confirm that the tab select event occurred.
        await expect(tabSelect).toBeCalledTimes(1);
        // Confirm that the first tab has the active attribute.
        await expect(tabs.nth(2)).toHaveAttribute('active', '');
        // Confirm that the first tab header has the data-active attribute.
        await expect(thirdTabHeader).toHaveAttribute('data-active', '');
        await expect(tabGroup).toHaveScreenshot('tab-header-clicked.png');
    });
});
