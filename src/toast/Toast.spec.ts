import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import type { Toast } from './Toast.js';

test(`Toast - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Interactive').getByTestId('test-toast');

        await expect(toast).toHaveScreenshot('toast-initial.png');
    });
});

test(`Toast - Custom Slotted Content`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Custom_Slotted_Content').getByTestId('test-toast');

        await expect(toast).toHaveScreenshot('toast-initial.png');
    });
});

test(`Toast - Custom Slotted Prefix`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Custom_Slotted_Prefix').getByTestId('test-toast');

        await expect(toast).toHaveScreenshot('toast-initial.png');
    });
});

test(`Toast - Closeable`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Closeable').getByTestId('test-toast');

        await expect(toast).toHaveScreenshot('toast-initial.png');
    });
});

test(`Toast - Custom Slotted Close`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Custom_Slotted_Close').getByTestId('test-toast');

        await expect(toast).toHaveScreenshot('toast-initial.png');
    });
});

/* 'success' | 'warning' | 'error' | 'info' | 'none' */
test(`Toast - Success Type`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Type').getByTestId('test-toast');
        await toast.evaluate(async (t: Toast) => {
            t.type = 'success';
            await t.updateComplete;
        });

        await expect(toast).toHaveScreenshot('toast-type.png');
    });
});

test(`Toast - Error Type`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Type').getByTestId('test-toast');
        await toast.evaluate(async (t: Toast) => {
            t.type = 'error';
            await t.updateComplete;
        });

        await expect(toast).toHaveScreenshot('toast-type.png');
    });
});

test(`Toast - Info Type`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Type').getByTestId('test-toast');
        await toast.evaluate(async (t: Toast) => {
            t.type = 'info';
            await t.updateComplete;
        });

        await expect(toast).toHaveScreenshot('toast-type.png');
    });
});

test(`Toast - Warning Type`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Type').getByTestId('test-toast');
        await toast.evaluate(async (t: Toast) => {
            t.type = 'warning';
            await t.updateComplete;
        });

        await expect(toast).toHaveScreenshot('toast-type.png');
    });
});

test(`Toast - No Type`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = page.locator('.Type').getByTestId('test-toast');
        await toast.evaluate(async (t: Toast) => {
            t.type = 'none';
            await t.updateComplete;
        });

        await expect(toast).toHaveScreenshot('toast-type.png');
    });
});
