import { test, expect, getStoryArgs, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';

test(`Chip - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const chip = page.locator('.Interactive').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        // mock the click event.
        const click = await mockEventListener(chip, 'click');

        await chip.click({
            force: true
        });
        await chip.click({
            force: true
        });

        await expect(click).toBeCalledTimes(2);
    });
});

test(`Chip - Label Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await getStoryArgs(page, 'Label');
        const chip = page.locator('.Label').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');
        await expect(chip.locator('#label')).toHaveText(args?.label as string);
    });
});

test(`Chip - Closable Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const chip = page.locator('.Closable').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const remove = await mockEventListener(chip, 'remove');

        const closeButton = chip.locator('#closeButton');

        await closeButton.click({
            force: true
        });
        await closeButton.click({
            force: true
        });
        await chip.click({
            force: true
        });
        await chip.click({
            force: true
        });
        await expect(remove).toBeCalledTimes(2);
    });
});

test(`Chip - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const chip = page.locator('.Disabled').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const chipElement = chip.locator('#chip');
        await expect(chipElement).toHaveClass(/disabled/);

        const click = await mockEventListener(chip, 'click');

        await chip.click({
            force: true
        });
        await chip.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);
    });
});

test(`Chip - Icon Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const chip = page.locator('.Chip_Slot_Icon').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const slotElement = chip.locator('slot[name="chip_icon"]');
        await expect(slotElement).toHaveCount(1);

        const foundSlottedSvgElement = (
            await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
        ).asElement();
        await expect(foundSlottedSvgElement).toBeTruthy();
    });
});

test(`Chip - Close Icon Slot Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const chip = page.locator('.Custom_Close_Icon').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const slotElement = chip.locator('slot[name="close_icon"]');
        await expect(slotElement).toHaveCount(1);

        const foundSlottedSvgElement = (
            await slotElement.evaluateHandle((se: HTMLSlotElement) => se.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg'))
        ).asElement();
        await expect(foundSlottedSvgElement).toBeTruthy();
    });
});
