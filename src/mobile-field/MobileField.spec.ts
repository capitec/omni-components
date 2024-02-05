import {
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testDisabledBehaviour,
    testErrorBehaviour,
    testHintBehaviour,
    testLabelBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour,
    testValueBehaviour
} from '../core/OmniInputPlaywright.js';
import { expect, mockEventListener, test, withCoverage } from '../utils/JestPlaywright.js';
import type { MobileField } from './MobileField.js';

test(`Mobile Field - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/mobile-field/');
        await page.evaluate(() => document.fonts.ready);

        const mobileField = page.locator('[data-testid]').first();
        mobileField.evaluate(async (t: MobileField) => {
            t.value = '';
            await t.updateComplete;
        });

        // Confirm that the component matches the provided screenshot.
        await expect(mobileField).toHaveScreenshot('mobile-field.png');

        const inputFn = await mockEventListener(mobileField, 'input');

        const inputField = mobileField.locator('#inputField');

        const value = '12345';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(inputFn).toBeCalledTimes(value.length);
        await expect(mobileField).toHaveScreenshot('mobile-field-value.png');
    });
});

test('Mobile Field - Label Behaviour', testLabelBehaviour('omni-mobile-field'));
test('Mobile Field - Hint Behaviour', testHintBehaviour('omni-mobile-field'));
test('Mobile Field - Error Behaviour', testErrorBehaviour('omni-mobile-field'));
test('Mobile Field - Value Behaviour', testValueBehaviour('omni-mobile-field'));
test('Mobile Field - Clearable Behaviour', testClearableBehaviour('omni-mobile-field'));
test('Mobile Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-mobile-field'));
test('Mobile Field - Prefix Behaviour', testPrefixBehaviour('omni-mobile-field'));
test('Mobile Field - Suffix Behaviour', testSuffixBehaviour('omni-mobile-field'));
test('Mobile Field - Disabled Behaviour', testDisabledBehaviour('omni-mobile-field'));
