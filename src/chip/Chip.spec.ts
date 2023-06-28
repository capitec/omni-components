import * as jestMock from 'jest-mock';
import { test, expect, expectJest, withCoverage } from '../utils/JestPlaywright.js';

test(`Chip - Visual and Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Interactive]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const chip = page.locator('.Interactive').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await chip.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });
        await chip.click({
            force: true
        });
        await chip.click({
            force: true
        });

        await expectJest(click).toBeCalledTimes(2);
    });
});

test(`Chip - Label`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Label]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const chip = page.locator('.Label').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');
        await expect(chip.locator('#label')).toHaveText(args?.label as string);
    });
});

test(`Chip - Closable Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Closable]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const chip = page.locator('.Closable').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const remove = jestMock.fn();
        await page.exposeFunction('jestRemove', () => remove());
        await chip.evaluate((node) => {
            node.addEventListener('remove', () => (window as any).jestRemove());
        });

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
        await expectJest(remove).toBeCalledTimes(2);
    });
});

test(`Chip - Disabled Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Disabled]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const chip = page.locator('.Disabled').getByTestId('test-chip');

        await expect(chip).toHaveScreenshot('chip-initial.png');

        const chipElement = chip.locator('#chip');
        await expect(chipElement).toHaveClass(/disabled/);

        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await chip.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });
        await chip.click({
            force: true
        });
        await chip.click({
            force: true
        });

        await expectJest(click).toBeCalledTimes(0);
    });
});

test(`Chip - Icon Slot`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Chip_Slot_Icon]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
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

test(`Chip - Close Icon Slot`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/chip/');

        const args = await page.locator('story-renderer[key=Custom_Close_Icon]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
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
