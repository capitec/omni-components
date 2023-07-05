import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import type { Args } from './Label.stories.js';

test(`Label - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/label/');

        const args = await page.locator('story-renderer[key=Interactive]').evaluate((storyRenderer) => (storyRenderer as any).story.args as Args);
        const label = page.locator('.Interactive').getByTestId('test-label');

        await expect(label).toHaveScreenshot('label-initial.png');
        await expect(label).toHaveText(args.label);
    });
});

test(`Label - Title Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/label/');

        const label = page.locator('.Title').getByTestId('test-label');
        await expect(label).toHaveScreenshot('label-initial.png');
    });
});

test(`Label - Subtitle Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/label/');

        const label = page.locator('.Subtitle').getByTestId('test-label');
        await expect(label).toHaveScreenshot('label-initial.png');
    });
});

test(`Label - Strong Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/label/');

        const label = page.locator('.Strong').getByTestId('test-label');
        await expect(label).toHaveScreenshot('label-initial.png');
    });
});

test(`Label - Slot Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/label/');

        const label = page.locator('.Slot').getByTestId('test-label');
        await expect(label).toHaveScreenshot('label-initial.png');
    });
});
