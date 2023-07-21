import { test, expect, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';
import type { Modal } from './Modal.js';

test(`Modal - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Interactive');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        await modal.evaluate((m: Modal) => (m.noFullscreen = true));

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');

        const clickOutside = await mockEventListener(modal, 'click-outside');

        await dialog.click({
            force: true,
            position: {
                x: 0,
                y: 0
            }
        });

        await expect(clickOutside).toHaveBeenCalled();

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');
    });
});

test(`Modal - Header Label Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Header_Label');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});

test(`Modal - Header Align Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Header_Align');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});

test(`Modal - Header Slot Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Header_Slot');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});

test(`Modal - No Header Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.No_Header');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});

test(`Modal - Footer Slot Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Footer_Slot');
        const modal = container.getByTestId('test-modal');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();
        await expect(modal).toHaveAttribute('hide', '');

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});

test(`Modal - Scripted Modal Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/modal/');

        const container = page.locator('.Scripted_Modal');
        const modal = page.getByTestId('test-modal-scripted');
        const dialog = modal.locator('dialog');

        await expect(dialog).not.toBeVisible();

        const btn = container.getByTestId('test-modal-btn');
        btn.click();

        await expect(dialog).toBeVisible();
        await expect(dialog).toHaveScreenshot('modal-dialog-open.png');
        await expect(modal).not.toHaveAttribute('hide', '');
    });
});
