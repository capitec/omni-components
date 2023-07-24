import { test, expect, getStoryArgs, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Check - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const args = await getStoryArgs(page, 'Label');
        const check = page.locator('.Label').getByTestId('test-check');
        const labelElement = check.locator('label');

        await expect(labelElement).toHaveText(args.label);
        await expect(check).toHaveScreenshot('check-label.png');
    });
});

test(`Check - Hint Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const args = await getStoryArgs(page, 'Hint');
        const check = page.locator('.Hint').getByTestId('test-check');
        const hintElement = check.locator('.hint');

        await expect(hintElement).toHaveText(args.hint);
        await expect(check).toHaveScreenshot('check-hint.png');
    });
});

test(`Check - Error Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const args = await getStoryArgs(page, 'Error_Label');
        const check = page.locator('.Error_Label').getByTestId('test-check');
        const errorElement = check.locator('.error');

        await expect(errorElement).toHaveText(args.error);
        await expect(check).toHaveScreenshot('check-error.png');
    });
});

test(`Check - Checked / Unchecked Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Checked').getByTestId('test-check');
        const checkedElement = check.locator('.checked');

        // Test checked.
        await expect(checkedElement).toBeVisible();
        await expect(check).toHaveScreenshot('check-checked.png');

        await check.click();

        // Test unchecked.
        const uncheckedElement = check.locator('.checked');
        await expect(uncheckedElement).not.toBeVisible();
        await expect(check).toHaveScreenshot('check-unchecked.png');
    });
});

test(`Check - Indeterminate Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Indeterminate').getByTestId('test-check');
        const indeterminateElement = check.locator('.indeterminate');

        // Test checked.
        await expect(indeterminateElement).toBeVisible();
        await expect(check).toHaveScreenshot('check-indeterminate.png');
    });
});

test(`Check - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Disabled').getByTestId('test-check');
        const disabledElement = check.locator('.disabled');

        // Test initial disabled.
        await expect(disabledElement).toBeVisible();
        await expect(check).toHaveScreenshot('check-disabled.png');

        const click = await mockEventListener(check, 'click');

        await check.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);

        await expect(check).toHaveScreenshot('check-disabled-click.png');
    });
});

test(`Check - Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Slot').getByTestId('test-check');

        await expect(await check.innerHTML()).toEqual('Slotted');
        await expect(check).toHaveScreenshot('check-slot.png');
    });
});

test(`Check - Custom Check Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Custom_Check_Icon').getByTestId('test-check');
        const slotElement = check.locator('slot[name="check_icon"]');

        await expect(slotElement).toHaveCount(1);
        await expect(check).toHaveScreenshot('check-custom-check-icon.png');
    });
});

test(`Check - Custom Indeterminate Icon Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/check/');

        const check = page.locator('.Custom_Indeterminate_Icon').getByTestId('test-check');
        const slotElement = check.locator('slot[name="indeterminate_icon"]');

        await expect(slotElement).toHaveCount(1);
        await expect(check).toHaveScreenshot('check-custom-indeterminate-icon.png');
    });
});
