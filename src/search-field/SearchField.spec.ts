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
import { test, expect, expectJest, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { SearchField } from './SearchField.js';

test(`Search Field - Interactive`, async ({ page, browserName }) => {
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

        await expectJest(interactions).toBeCalledTimes(value.length);
        await expect(searchField).toHaveScreenshot('search-field-value.png');
    });
});

testLabelBehaviour('omni-search-field');
testHintBehaviour('omni-search-field');
testErrorBehaviour('omni-search-field');
testValueBehaviour('omni-search-field');
testClearableBehaviour('omni-search-field');
testCustomClearableSlotBehaviour('omni-search-field');
testPrefixBehaviour('omni-search-field');
testSuffixBehaviour('omni-search-field');
testDisabledBehaviour('omni-search-field');
