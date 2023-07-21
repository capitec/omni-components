import { test, expect, getStoryArgs, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Hyperlink - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const hyperlink = page.locator('.Interactive').getByTestId('test-hyperlink');

        await expect(hyperlink).toHaveScreenshot('hyperlink-initial.png');

        const click = await mockEventListener(hyperlink, 'click');

        await hyperlink.click({
            force: true
        });
        await hyperlink.click({
            force: true
        });

        await expect(click).toBeCalledTimes(2);
    });
});

test(`Hyperlink - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const args = await getStoryArgs(page, 'Label');
        const hyperlink = page.locator('.Label').getByTestId('test-hyperlink');

        await expect(hyperlink).toHaveScreenshot('hyperlink-initial.png');

        await expect(hyperlink.getByText(args.label)).toHaveCount(1);
    });
});

test(`Hyperlink - Size Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const hyperlink = page.locator('.Size').getByTestId('test-hyperlink');

        await expect(hyperlink).toHaveScreenshot('hyperlink-size.png');
    });
});

test(`Hyperlink - Href Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const args = await getStoryArgs(page, 'Href');
        const hyperlink = page.locator('.Href').getByTestId('test-hyperlink');

        await expect(hyperlink).toHaveScreenshot('hyperlink-initial.png');

        // Start waiting for popup before clicking. Note there is no await, rather the promise is kept as a reference
        const popupPromise = page.waitForEvent('popup');

        await hyperlink.click();

        const newPage = await popupPromise;
        // Wait for the popup to load.
        await newPage.waitForLoadState();

        await expect(newPage.url()).toBe(new URL(args.href).toString());

        await newPage.close();
    });
});

test(`Hyperlink - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const hyperlink = page.locator('.Disabled').getByTestId('test-hyperlink');

        await expect(hyperlink).toHaveScreenshot('hyperlink-initial.png');

        const click = await mockEventListener(hyperlink, 'click');

        await hyperlink.click({
            force: true
        });
        await hyperlink.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);
    });
});

test(`Hyperlink - Inline Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/hyperlink/');

        const paragraph = page.locator('.Inline').getByTestId('test-paragraph');
        await expect(paragraph.locator('omni-hyperlink')).toHaveCount(1);

        await expect(paragraph).toHaveScreenshot('hyperlink-inline.png');
    });
});
