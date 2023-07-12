import * as jestMock from 'jest-mock';
import {
    testLabelBehaviour,
    testHintBehaviour,
    testErrorBehaviour,
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { Select } from './Select.js';
import { Args } from './Select.stories.js';

test(`Select - Interactive`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Interactive]').evaluate(getStoryArgs());
        const selectComponent = page.locator('.Interactive').getByTestId('test-select');
        const argItems = args.items as Record<string, unknown>[];

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        // Get the items container and locate the nested items
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        // Find the first item in the items container
        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        await expect(valueChange).toBeCalledTimes(1);
        // Assert that the first record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', JSON.stringify(argItems[0]));
    });
});

test(`Select - Async Per Item`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Async_Per_Item').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();
        // Take screen shot of input element once it is clicked.
        await expect(selectComponent).toHaveScreenshot('select-open.png');

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        //Find the first item in the items container
        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        // Assert that the first record of the bound items was selected.
        await expect(valueChange).toBeCalledTimes(1);
        await expect(selectComponent).toHaveAttribute('value', '{"id":"1","label":"Peter Parker"}');
    });
});

/**
 * Covers the Async per item test also
 */
test(`Select - Loading Slot`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});
        const selectComponent = page.locator('.Loading_Slot').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();
        // Take screen shot of input element once it is clicked.
        await expect(selectComponent).toHaveScreenshot('select-open.png');

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.items');
        await expect(items).toHaveCount(1);

        // Get the items in the items container this is after the loading indicator and confirm that 10 records exist.
        const item = items.locator('.item');
        await expect(item).toHaveCount(10);

        //Find the first item in the items container
        const firstItem = items.locator('.item').first();
        await expect(firstItem).toHaveCount(1);
        await firstItem.click();

        await expect(valueChange).toBeCalledTimes(1);
        await expect(selectComponent).toHaveAttribute('value', '{"id":"1","label":"Peter Parker"}');
    });
});

test(`Select - String Array`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=String_Array]').evaluate(getStoryArgs());
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.String_Array').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();
        // Take screen shot of input element once it is clicked.
        await expect(selectComponent).toHaveScreenshot('select-open.png');

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        //Take snapshot of items container open
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        //Find the first item in the items container
        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        await expect(valueChange).toBeCalledTimes(1);
        // Assert that the first record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', argItems[0]);
    });
});

test(`Select - Selection Render`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Selection_Renderer]').evaluate(getStoryArgs());
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.Selection_Renderer').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        // Get screenshot of component before any interaction.
        await expect(selectComponent).toHaveScreenshot('select-renderer-before.png');
        // Click on the Select component this should open the items container.
        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        // Take screen shot of input element once it is clicked.
        await expect(selectComponent).toHaveScreenshot('select-open.png');
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        // Find the first item in the items container
        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        // Get the selection renderer field of the component.
        const selectionRender = selectComponent.locator('omni-render-element');
        // Assert that the first record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', argItems[0]);
        await expect(selectionRender).toHaveCount(1);
    });
});

test(`Select - Empty Message`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Empty_Message]').evaluate(getStoryArgs());
        const selectComponent = page.locator('.Empty_Message').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.items');
        await expect(items).toHaveCount(1);

        // Find the first item in the items container
        const item = items.locator('.none').first();
        await expect(item).toHaveCount(1);

        // Check the text content of the empty message div
        await expect(item).toHaveText('No items provided');
        // When the item is clicked it should trigger a change event.
        await expect(valueChange).toBeCalledTimes(0);
    });
});

test(`Select - Disabled`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const select = page.locator('.Disabled').getByTestId('test-select');

        //Click event test.
        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await select.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await select.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);

        if (!isMobile) {
            const itemContainer = select.locator('#items-container');
            await expect(itemContainer).toHaveCount(0);
        } else {
            const dialog = select.locator('dialog');
            await expect(dialog).toHaveCount(1);
            await expect(dialog).not.toBeVisible();
        }

        await select.evaluate((d: Select) => (d.disabled = false));

        await select.click({
            force: true
        });

        await expect(click).toBeCalledTimes(1);

        if (!isMobile) {
            const itemContainer = select.locator('#items-container');
            await expect(itemContainer).toHaveCount(1);
        } else {
            const dialog = select.locator('dialog');
            await expect(dialog).toHaveCount(1);
        }
    });
});

test(`Select - Custom Control Slot`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Custom_Control_Slot]').evaluate(getStoryArgs());
        const selectComponent = page.locator('.Custom_Control_Slot').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        const control = selectComponent.locator('#control');
        await expect(control).toHaveCount(1);

        // Take screen shot of control div
        await expect(control).toHaveScreenshot('custom-control.png');

        // Check slot depending on isMobile flag
        if (!isMobile) {
            const svg = selectComponent.locator('svg[slot=arrow]');
            await expect(svg).toHaveCount(1);
            await expect(svg).toHaveScreenshot('arrow-slot-svg.png');
        } else {
            const svg = selectComponent.locator('svg[slot=more]');
            await expect(svg).toHaveCount(1);
            await expect(svg).toHaveScreenshot('more-slot-svg.png');
        }
    });
});

test(`Select - Searchable`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Searchable]').evaluate(getStoryArgs());
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.Searchable').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        // Locate the search control div and take a screenshot of it
        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        // Type some text in the select field this should reduce the amount of items rendered in the items container.
        const searchValue = 'Tony';
        await searchField.type(searchValue);

        //Confirm that the items container only has one record rendering now.
        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        // Assert that the third record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', JSON.stringify(argItems[2]));
    });
});

test(`Select - Custom Search`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Custom_Search]').evaluate(getStoryArgs());
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.Custom_Search').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        // Locate the search control div and take a screenshot of it
        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        // Type some text in the select field this should reduce the amount of items rendered in the items container.
        const searchValue = 'Clark';
        await searchField.type(searchValue);

        //Confirm that the items container only has one record rendering now.
        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        // Assert that the second record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', argItems[1]);
    });
});

test(`Select - Server Side Filtering`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Server_Side_Filtering').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        // Locate the items container
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        // Locate the search control div and take a screenshot of it
        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        // Type some text in the select field this should reduce the amount of items rendered in the items container.
        const searchValue = 'Clark Kent';
        await searchField.type(searchValue);

        //Confirm that the items container only has one record rendering now.
        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        // Assert that the second record of the bound items was selected.
        await expect(selectComponent).toHaveAttribute('value', searchValue);
    });
});

test(`Select - Custom Search Slot`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Searchable]').evaluate(getStoryArgs());
        const selectComponent = page.locator('.Searchable').getByTestId('test-select');

        // Mock change event.
        const valueChange = jestMock.fn();
        await page.exposeFunction('jestChange', () => valueChange());
        await selectComponent.evaluate((node) => {
            node.addEventListener('change', () => window.jestChange());
        });

        await selectComponent.click();

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('select-initial.png');
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        // Locate the items container
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        //Locate the div that has the search input nested this will be used later to locate the clear button div.

        // Locate the search control div and take a screenshot of it
        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        // Type some text in the select field this should reduce the amount of items rendered in the items container.
        const searchValue = 'Steve';
        await searchField.type(searchValue);

        // Get the div that surrounds the slotted clear button
        const clearButtonDiv = searchField.locator('#search-clear-click');

        // Find the slot after a value has been typed in the search field.
    });
});

test('Select - Label Behaviour', testLabelBehaviour('omni-select'));
test('Select - Hint Behaviour', testHintBehaviour('omni-select'));
test('Select - Error Behaviour', testErrorBehaviour('omni-select'));
test('Select - Clearable Behaviour', testClearableBehaviour('omni-select'));
test('Select - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-select'));
test('Select - Prefix Behaviour', testPrefixBehaviour('omni-select'));
test('Select - Suffix Behaviour', testSuffixBehaviour('omni-select'));

function getStoryArgs() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (storyRenderer: any) => storyRenderer?.story?.args as Args;
}

declare global {
    interface Window {
        jestChange: () => void;
        jestClick: () => void;
    }
}
