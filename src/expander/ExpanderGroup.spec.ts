import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Expander Group - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander-group/');
        const expanderGroup = page.locator('.Interactive').getByTestId('test-expander-group');
        await expect(expanderGroup).toHaveCount(1);

        await expect(expanderGroup).toHaveScreenshot('expander-group-initial.png');
        await expect(expanderGroup).toHaveAttribute('expand-mode', 'single');

        // Get all the omni-expanders
        const nestedExpanders = expanderGroup.locator('omni-expander');
        await expect(nestedExpanders).toHaveCount(2);

        // Open the first expander.
        const expander = nestedExpanders.first();
        await expander.click();

        await expect(expanderGroup).toHaveScreenshot('expander-group-expanded.png');

        const secondExpander = nestedExpanders.nth(1);
        await secondExpander.click();

        //Take a screenshot of the expected behaviour of the second expander expanding and the first one closing
        await expect(expanderGroup).toHaveScreenshot('expander-group-second-expanded.png');
    });
});

test(`Expander Group - Expand Mode Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander-group/');
        const expanderGroup = page.locator('.Expand_Mode').getByTestId('test-expander-group');
        await expect(expanderGroup).toHaveCount(1);

        await expect(expanderGroup).toHaveAttribute('expand-mode', 'multiple');

        // Get all the omni-expanders
        const nestedExpanders = expanderGroup.locator('omni-expander');
        await expect(nestedExpanders).toHaveCount(2);

        // Open the first expander.
        const expander = nestedExpanders.first();
        await expander.click();

        await expect(expanderGroup).toHaveScreenshot('expander-group-expanded.png');

        const secondExpander = nestedExpanders.nth(1);
        await secondExpander.click();

        //Take a screenshot of the expected behaviour of both expanders being open due to the expander-groups expand-mode attribute being set to multiple.
        await expect(expanderGroup).toHaveScreenshot('expander-group-both-expanded.png');
    });
});
