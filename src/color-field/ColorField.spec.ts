import {
    testLabelBehaviour,
    testHintBehaviour,
    testErrorBehaviour,
    testValueBehaviour,
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, getStoryArgs, mockEventListener, withCoverage } from '../utils/JestPlaywright.js';
import type { ColorField } from './ColorField.js';

test(`Color Field - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/color-field/');
        await page.evaluate(() => document.fonts.ready);

        const field = page.locator('[data-testid]').first();

        const inputField = field.locator('#inputField');

        await expect(inputField).toHaveAttribute('type', 'color');
        
        // Confirm that the component matches the screenshot
        await expect(field).toHaveScreenshot('color-field.png');

        await field.evaluate(async (f: ColorField) => {
            f.value = '#F6B73C';
            await f.updateComplete;
        });
        await expect(field).toHaveScreenshot('color-field-value.png');
    });
});

test('Color Field - Label Behaviour', testLabelBehaviour('omni-color-field'));
test('Color Field - Hint Behaviour', testHintBehaviour('omni-color-field'));
test('Color Field - Error Behaviour', testErrorBehaviour('omni-color-field'));
test('Color Field - Value Behaviour', testValueBehaviour('omni-color-field'));
test('Color Field - Clearable Behaviour', testClearableBehaviour('omni-color-field'));
test('Color Field - Custom Clearable Slot Behaviour', testCustomClearableSlotBehaviour('omni-color-field'));
test('Color Field - Prefix Behaviour', testPrefixBehaviour('omni-color-field'));
test('Color Field - Suffix Behaviour', testSuffixBehaviour('omni-color-field'));

test(`Color Field - Disabled Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/color-field/');

        const args = await getStoryArgs(page, 'Disabled');
        const colorField = page.locator('.Disabled').getByTestId('test-field');
        await colorField.evaluate(async (d: ColorField, args) => {
            d.value = args.value;

            await d.updateComplete;
        }, args);

        await expect(colorField).toHaveScreenshot('color-field-initial.png');

        const click = await mockEventListener(colorField, 'click');

        await colorField.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);
    });
});
