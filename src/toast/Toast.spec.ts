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

test(`Toast - Show Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toast = await page.evaluateHandle(async () => {
            await customElements.whenDefined('omni-toast');

            const toastClass = customElements.get('omni-toast') as typeof Toast;
            return toastClass.show({
                type: 'info',
                header: 'Test Header',
                detail: 'Test Detail.'
            });
        });

        await expect(await toast.screenshot()).toMatchSnapshot('toast-shown.png');
    });
});

test(`Toast - Configure Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast/');

        const toastStack = await page.evaluateHandle(async () => {
            await customElements.whenDefined('omni-toast');

            const toastClass = customElements.get('omni-toast') as typeof Toast;

            toastClass.configure({
                closeable: true,
                duration: 0,
                position: 'top',
                reverse: true,
                stack: true
            });

            toastClass.show({
                type: 'info',
                header: 'Test Header 1',
                detail: 'Test First Detail.'
            });
            toastClass.show({
                type: 'success',
                header: 'Test Header 2',
                detail: 'Test Second Detail.'
            });

            return toastClass.current;
        });

        await expect(await toastStack.screenshot()).toMatchSnapshot('toasts-configured-shown.png');
    });
});
