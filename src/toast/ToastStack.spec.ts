import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';
import type { ToastStack } from './ToastStack.js';

test(`Toast Stack - Visual and Behaviour`, async ({ page }) => {
    // Mark test as slow due to 6 second wait for toasts to close
    test.slow();

    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');
        const toastRemove = await mockEventListener(toastStack, 'toast-remove');

        await toastStack.focus();
        await expect(toastStack).toHaveScreenshot('toast-stack-initial.png');

        const shown = await toastStack
            .evaluateHandle((ts: ToastStack) => ts.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 2000 }))
            .then((r) => r.asElement());

        await expect(shown).toBeTruthy();
        await expect(await shown?.screenshot()).toMatchSnapshot('toast-shown.png');

        const toastStackRemove = await mockEventListener(shown, 'toast-stack-remove');

        await toastStack.evaluate((ts: ToastStack) => {
            ts.showToast({
                type: 'info',
                header: 'Test',
                detail: 'Test Info',
                closeable: true,
                // duration: 15000,
                prefix: `✅`,
                close: `❎`,
                content: `<span>My Extra <strong>Content</strong></span>`
            });
        });
        await expect(toastStack).toHaveScreenshot('toast-stack-more.png');

        // Wait for toast removals
        await page.waitForTimeout(6000);

        await expect(toastRemove).toBeCalledTimes(5);
        await expect(toastStackRemove).toBeCalled();

        await expect(await toastStack.evaluate((t) => t.childElementCount)).toBe(2);
        await expect(toastStack).toHaveScreenshot('toast-stack-final.png');
    });
});

test(`Toast Stack - Reverse Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set to reverse and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.reverse = true;

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-reversed.png');

        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.reverse = false;

            await ts.updateComplete;
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-not-reversed.png');
    });
});

test(`Toast Stack - Bottom Right Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'bottom-right';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Bottom Left Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'bottom-left';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Top Right Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'top-right';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Top Left Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'top-left';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Right Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'right';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Left Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'left';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Bottom Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'bottom';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});

test(`Toast Stack - Top Position Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/toast-stack/');

        const btn = page.locator('.Interactive').locator('omni-button');
        btn.click();

        const toastStack = page.getByTestId('test-toast-stack');

        // Clear toasts, set position and add new toasts
        await toastStack.evaluate(async (ts: ToastStack) => {
            ts.innerHTML = '';
            ts.position = 'top';

            await ts.updateComplete;

            ts.showToast({
                closeable: true,
                header: 'Toast 1',
                detail: 'Toast 1 Content',
                type: 'info'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 2',
                detail: 'Toast 2 Content',
                type: 'error'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 3',
                detail: 'Toast 3 Content',
                type: 'success'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 4',
                detail: 'Toast 4 Content',
                type: 'warning'
            });
            ts.showToast({
                closeable: true,
                header: 'Toast 5',
                detail: 'Toast 5 Content',
                type: 'none'
            });
        });

        await expect(toastStack).toHaveScreenshot('toast-stack-top.png');
        await expect(page).toHaveScreenshot('toast-stack-page-top.png');
    });
});
