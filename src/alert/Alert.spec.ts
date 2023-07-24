import { test, expect, mockEventListener, withCoverage, createWaitHandle } from '../utils/JestPlaywright.js';
import { Alert } from './Alert.js';

test(`Alert - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();
        const primary = alert.locator('omni-button');

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');
        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');

        const alertActionClickResponse = createWaitHandle<string>();

        const alertClose = await mockEventListener(alert, 'alert-close');
        const alertActionClick = await mockEventListener(alert, 'alert-action-click', (e) => {
            const actionClickEvent = e as CustomEvent<{ secondary: boolean }>;
            alertActionClickResponse.release(actionClickEvent.detail.secondary.toString());
        });

        await primary.click({
            force: true
        });

        const secondary = await alertActionClickResponse.completed;

        await expect(alertActionClick).toHaveBeenCalled();
        await expect(alertClose).toHaveBeenCalled();
        await expect(secondary).toBe('false');
    });
});

test(`Alert - Success Status Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.status = 'success';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Warning Status Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.status = 'warning';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Error Status Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.status = 'error';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Info Status Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.status = 'info';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Show Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        await page.evaluate(async () => {
            const AlertType = (await customElements.whenDefined('omni-alert')) as typeof Alert;
            AlertType.show({
                id: 'test-show-alert',
                status: 'success',
                message: 'Success!',
                description: 'It was successful.'
            });
        });

        const alert = page.locator('omni-alert#test-show-alert');

        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();
        const primary = alert.locator('omni-button');

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');
        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');

        const alertActionClickResponse = createWaitHandle<string>();

        const alertClose = await mockEventListener(alert, 'alert-close');
        const alertActionClick = await mockEventListener(alert, 'alert-action-click', (e) => {
            const actionClickEvent = e as CustomEvent<{ secondary: boolean }>;
            alertActionClickResponse.release(actionClickEvent.detail.secondary.toString());
        });

        await primary.click({
            force: true
        });

        const secondary = await alertActionClickResponse.completed;

        await expect(alertActionClick).toHaveBeenCalled();
        await expect(alertClose).toHaveBeenCalled();
        await expect(secondary).toBe('false');
    });
});

test(`Alert - Show Async Behaviour (Primary)`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const alertActionClickResponse = page.evaluate(async () => {
            const AlertType = (await customElements.whenDefined('omni-alert')) as typeof Alert;
            const response = await AlertType.showAsync({
                id: 'test-show-alert',
                status: 'success',
                message: 'Success!',
                enableSecondary: true,
                description: 'It was successful.'
            });

            return response;
        });

        const alert = page.locator('omni-alert#test-show-alert');

        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();
        const primary = alert.locator('omni-button[type=primary]');

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');
        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');

        await primary.click({
            force: true
        });

        const response = await alertActionClickResponse;

        await expect(response).toBe('primary');
    });
});

test(`Alert - Show Async Behaviour (Secondary)`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const alertActionClickResponse = page.evaluate(async () => {
            const AlertType = (await customElements.whenDefined('omni-alert')) as typeof Alert;
            const response = await AlertType.showAsync({
                id: 'test-show-alert',
                status: 'success',
                message: 'Success!',
                enableSecondary: true,
                description: 'It was successful.'
            });

            return response;
        });

        const alert = page.locator('omni-alert#test-show-alert');

        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();
        const secondary = alert.locator('omni-button[type=secondary]');

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');
        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');

        await secondary.click({
            force: true
        });

        const response = await alertActionClickResponse;

        await expect(response).toBe('secondary');
    });
});

test(`Alert - Show Async Behaviour (Auto)`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const alertActionClickResponse = page.evaluate(async () => {
            const AlertType = (await customElements.whenDefined('omni-alert')) as typeof Alert;
            const response = await AlertType.showAsync({
                id: 'test-show-alert',
                status: 'success',
                message: 'Success!',
                enableSecondary: true,
                description: 'It was successful.'
            });

            return response;
        });

        const alert = page.locator('omni-alert#test-show-alert');

        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');
        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');

        await alert.evaluate((a: Alert) => {
            a.hide();
        });

        const response = await alertActionClickResponse;

        await expect(response).toBe('auto');
    });
});

test(`Alert - Header Align Left Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.headerAlign = 'left';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Header Align Center Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.headerAlign = 'center';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Header Align Right Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.headerAlign = 'right';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Description Align Left Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.descriptionAlign = 'left';
            element.description = `Additional context for the alert. 
Aligned to the ${element.descriptionAlign}.`;
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Description Align Center Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.descriptionAlign = 'center';
            element.description = `Additional context for the alert. 
Aligned to the ${element.descriptionAlign}.`;
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Description Align Right Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.descriptionAlign = 'right';
            element.description = `Additional context for the alert. 
Aligned to the ${element.descriptionAlign}.`;
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Primary Action Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.primaryAction = 'Acknowledge';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Secondary Action Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.enableSecondary = true;
            element.secondaryAction = 'Discard';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Action Align Left Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.enableSecondary = true;
            element.actionAlign = 'left';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Action Align Center Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.enableSecondary = true;
            element.actionAlign = 'center';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Action Align Right Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.enableSecondary = true;
            element.actionAlign = 'right';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Action Align Stretch Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Interactive');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await alert.evaluate(async (element: Alert) => {
            element.enableSecondary = true;
            element.actionAlign = 'stretch';
            await element.updateComplete;
        });

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Custom Status Indicator Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Custom_Status_Indicator');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Custom Header Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Custom_Header');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Custom Body Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Custom_Body');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Custom Primary Action Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Custom_Primary_Action');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});

test(`Alert - Custom Secondary Action Visual`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/alert/');

        const container = page.locator('.Custom_Secondary_Action');
        const alert = container.getByTestId('test-alert');
        const modal = alert.locator('omni-modal');
        const dialog = modal.locator('dialog');
        const modalContainer = dialog.locator('.container').first();

        const btn = container.getByTestId('test-alert-btn');
        await btn.click();

        await expect(dialog).toBeVisible();
        await expect(modalContainer).toBeVisible();
        await expect(modal).not.toHaveAttribute('hide', '');

        await expect(modalContainer).toHaveScreenshot('alert-modal-dialog-open.png');
    });
});
