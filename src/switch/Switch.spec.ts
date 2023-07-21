import { test, expect, getStoryArgs, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Switch - Event Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const switchElement = page.locator('.Interactive').getByTestId('test-switch');

        const valueChange = await mockEventListener(switchElement, 'value-change');

        const content = switchElement.locator('#content');
        await content.click({
            force: true
        });

        await expect(valueChange).toBeCalledTimes(1);
    });
});

test(`Switch - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const args = await getStoryArgs(page, 'Label');
        const switchElement = page.locator('.Label').getByTestId('test-switch');
        const labelElement = switchElement.locator('label');

        await expect(labelElement).toHaveText(args.label);
        await expect(switchElement).toHaveScreenshot('switch-label.png');
    });
});

test(`Switch - Hint Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const args = await getStoryArgs(page, 'Hint');
        const switchElement = page.locator('.Hint').getByTestId('test-switch');
        const hintElement = switchElement.locator('.hint');

        await expect(hintElement).toHaveText(args.hint);
        await expect(switchElement).toHaveScreenshot('switch-hint.png');
    });
});

test(`Switch - Error Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const args = await getStoryArgs(page, 'Error_Label');
        const switchElement = page.locator('.Error_Label').getByTestId('test-switch');
        const errorElement = switchElement.locator('.error');

        await expect(errorElement).toHaveText(args.error);
        await expect(switchElement).toHaveScreenshot('switch-error.png');
    });
});

test(`Switch - Checked / Unchecked Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const switchElement = page.locator('.Checked').getByTestId('test-switch');
        const checkedElement = switchElement.locator('.checked');

        // Test checked.
        await expect(checkedElement).toBeVisible();
        await expect(switchElement).toHaveScreenshot('switch-checked.png');

        await switchElement.click();

        // Test unchecked.
        const uncheckedElement = switchElement.locator('.checked');
        await expect(uncheckedElement).not.toBeVisible();
        await expect(switchElement).toHaveScreenshot('switch-unchecked.png');
    });
});

test(`Switch - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const switchElement = page.locator('.Disabled').getByTestId('test-switch');
        const disabledElement = switchElement.locator('.disabled');

        // Test initial disabled.
        await expect(disabledElement).toBeVisible();
        await expect(switchElement).toHaveScreenshot('switch-disabled.png');

        // Test not clickable when disabled.
        const click = await mockEventListener(switchElement, 'click');

        await switchElement.click({
            force: true
        });
        const content = switchElement.locator('#content');
        await content.press('Space');

        await expect(click).toBeCalledTimes(0);

        await expect(switchElement).toHaveScreenshot('switch-disabled-click.png');
    });
});

test(`Switch - Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/switch/');

        const switchElement = page.locator('.Slot').getByTestId('test-switch');
        const slottedContent = await switchElement.innerHTML();

        await expect(slottedContent).toEqual('Slotted');
        await expect(switchElement).toHaveScreenshot('switch-slot.png');
    });
});
