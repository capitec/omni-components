import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Expander Group - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/expander-group/');
        await page.waitForSelector('[data-testid]', {});

        //For the purposes of the demo the Tabs are slotted in a Tab Group
        const expander = page.locator('.Interactive').getByTestId('test-expander');
    });
});