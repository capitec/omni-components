import * as jestMock from 'jest-mock';
import {
    testLabelBehaviour,
    testHintBehaviour,
    testErrorBehaviour,
    testValueBehaviour,
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour,
    testDisabledBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import type { SearchField } from './SearchField.js';

test(`Search Field - Interactive`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/search-field/');
        await page.evaluate(() => document.fonts.ready);

        const searchField = page.locator('[data-testid]').first();
        searchField.evaluate(async (t: SearchField) => {
            t.value = '';
            await t.updateComplete;
        });
        await expect(searchField).toHaveScreenshot('search-field.png');

        const interactions = jestMock.fn();
        await page.exposeFunction('jestInteract', () => interactions());
        await searchField.evaluate((node) => {
            node.addEventListener('input', () => (window as any).jestInteract());
        });

        const inputField = searchField.locator('#inputField');

        const value = 'search value';
        await inputField.type(value);

        await expect(inputField).toHaveValue(value);

        await expect(interactions).toBeCalledTimes(value.length);
        await expect(searchField).toHaveScreenshot('search-field-value.png');
    });
});

test('Search Field - Label Behaviour', testLabelBehaviour('omni-search-field'));
test('Search Field - Hint Behaviour', testHintBehaviour('omni-search-field'));
test('Search Field - Error Behaviour', testErrorBehaviour('omni-search-field'));
test('Search Field - Value Behaviour', testValueBehaviour('omni-search-field'));
test('Search Field - Clearable Behaviour', testClearableBehaviour('omni-search-field'));
test('Search Field - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-search-field'));
test('Search Field - Prefix Behaviour', testPrefixBehaviour('omni-search-field'));
test('Search Field - Suffix Behaviour', testSuffixBehaviour('omni-search-field'));
test('Search Field - Disabled Behaviour', testDisabledBehaviour('omni-search-field'));
