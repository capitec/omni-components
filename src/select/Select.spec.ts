import {
    testLabelBehaviour,
    testHintBehaviour,
    testErrorBehaviour,
    testClearableBehaviour,
    testCustomClearableSlotBehaviour,
    testPrefixBehaviour,
    testSuffixBehaviour
} from '../core/OmniInputPlaywright.js';
import { test, expect, getStoryArgs, mockEventListener, withCoverage, type Page } from '../utils/JestPlaywright.js';
import type { Select, SelectItems, SelectTypes } from './Select.js';

const displayItems = [
    { id: '1', label: 'Peter Parker' },
    { id: '2', label: 'James Howlett' },
    { id: '3', label: 'Tony Stark' },
    { id: '4', label: 'Steve Rodgers' },
    { id: '5', label: 'Bruce Banner' },
    { id: '6', label: 'Wanda Maximoff' },
    { id: '7', label: 'TChalla' },
    { id: '8', label: 'Henry P. McCoy' },
    { id: '9', label: 'Carl Lucas' },
    { id: '10', label: 'Frank Castle' }
];

const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];

test(`Select - Visual and Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Interactive').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.evaluate(async (s: Select, displayItems) => {
            s.items = displayItems;
            await s.updateComplete;
        }, displayItems);

        await selectComponent.click();

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        // Get the items container and locate the nested items.
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        // Find the first item in the items container
        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        await expect(valueChange).toBeCalledTimes(1);
        await expect(selectComponent).toHaveAttribute('value', JSON.stringify(displayItems[0]));
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Async Per Item Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Async_Per_Item').getByTestId('test-select');
        selectComponent.waitFor({ state: 'visible', timeout: 300 });
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.evaluate(async (s: Select, displayItems) => {
            async function promiseDisplayItems(data: Record<string, unknown>[]) {
                await new Promise<void>((r) => setTimeout(() => r(), 5));
                return data as SelectTypes;
            }
            s.items = promiseDisplayItems(displayItems);
            await s.updateComplete;
        }, displayItems);

        await selectComponent.click();
        // Added for cases where the items do not load in time before taking a screenshot.
        await page.waitForTimeout(200);

        await expect(selectComponent).toHaveScreenshot('select-open.png');

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        await expect(valueChange).toBeCalledTimes(1);
        await expect(selectComponent).toHaveAttribute('value', JSON.stringify(displayItems[0]));
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - String Array Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await getStoryArgs(page, 'String_Array');
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.String_Array').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.click();
        await expect(selectComponent).toHaveScreenshot('select-open.png');

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();

        await expect(valueChange).toBeCalledTimes(1);
        await expect(selectComponent).toHaveAttribute('value', argItems[0]);
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Selection Render Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await getStoryArgs(page, 'Selection_Renderer');
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.Selection_Renderer').getByTestId('test-select');
        selectComponent.waitFor({ state: 'visible', timeout: 300 });
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.evaluate(async (s: Select) => {
            s.renderSelection = async (item: any) => {
                await new Promise((resolve, reject) => {
                    setTimeout(resolve, 10);
                });
                const i = document.createElement('i');
                i.innerText = item;
                i.style.color = 'blue';
                return i;
            };
            await s.updateComplete;
        });

        await expect(selectComponent).toHaveScreenshot('select-renderer-before.png');
        await selectComponent.click();
        await page.waitForTimeout(100);

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        await expect(selectComponent).toHaveScreenshot('select-open.png');
        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        const item = selectComponent.locator('.item').first();
        await expect(item).toHaveCount(1);
        await item.click();
        // Added timeout to wait for items to render.
        await page.waitForTimeout(100);

        const selectionRender = selectComponent.locator('omni-render-element');
        await expect(selectComponent).toHaveAttribute('value', argItems[0]);
        await expect(selectionRender).toHaveCount(1);
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Empty Message Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Empty_Message').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.click();

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.items');
        await expect(items).toHaveCount(1);

        const item = items.locator('.none').first();
        await expect(item).toHaveCount(1);

        await expect(item).toHaveText('No items provided');
        await expect(valueChange).toBeCalledTimes(0);
    });
});

test(`Select - Disabled Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Disabled').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const click = await mockEventListener(selectComponent, 'click');

        await selectComponent.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (!isMobile) {
            const itemContainer = selectComponent.locator('#items-container');
            await expect(itemContainer).toHaveCount(0);
        } else {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveCount(1);
            await expect(dialog).not.toBeVisible();
        }

        await selectComponent.evaluate((d: Select) => (d.disabled = false));

        await selectComponent.click({
            force: true
        });

        await expect(click).toBeCalledTimes(1);

        if (!isMobile) {
            const itemContainer = selectComponent.locator('#items-container');
            await expect(itemContainer).toHaveCount(1);
        } else {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveCount(1);
        }
    });
});

test(`Select - Custom Control Slot Visual`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Custom_Control_Slot').getByTestId('test-select');

        const control = selectComponent.locator('#control');
        await expect(control).toHaveCount(1);

        await expect(control).toHaveScreenshot('custom-control.png');

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (!isMobile) {
            await expect(selectComponent).toHaveScreenshot('arrow-slot-svg.png');
        } else {
            await expect(selectComponent).toHaveScreenshot('more-slot-svg.png');
        }
    });
});

test(`Select - Searchable Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Searchable').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.evaluate(async (s: Select, displayItems) => {
            s.items = displayItems;
            await s.updateComplete;
        }, displayItems);

        await selectComponent.click();

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(10);

        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        const searchValue = 'Tony';
        await searchField.type(searchValue);

        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        await expect(selectComponent).toHaveAttribute('value', JSON.stringify(displayItems[2]));
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Custom Search Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const args = await getStoryArgs(page, 'Custom_Search');
        const argItems = args.items as Record<string, unknown>[];
        const selectComponent = page.locator('.Custom_Search').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.click();

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        const searchValue = 'Clark';
        await searchField.type(searchValue);

        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        await expect(selectComponent).toHaveAttribute('value', argItems[1]);
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Server Side Filtering Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Server_Side_Filtering').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        await selectComponent.evaluate(async (s: Select, stringItems) => {
            async function promiseSearchFilter(filterValue: string) {
                await new Promise<void>((r) => setTimeout(() => r(), 10));
                return customSearch(filterValue, stringItems);
            }

            function customSearch(filterValue: string, items: SelectTypes) {
                if (Array.isArray(items) && filterValue) {
                    return (items = (items as (string | Record<string, unknown>)[]).filter((i) => itemFilter(filterValue, i)) as SelectTypes);
                } else {
                    return items;
                }
            }

            function itemFilter(filterValue: string, item: string | Record<string, unknown>) {
                return item.toString().toLowerCase().includes(filterValue.toLowerCase());
            }

            s.items = promiseSearchFilter as (filterValue?: string | undefined) => SelectItems;
            await s.updateComplete;
        }, stringItems);

        const valueChange = await mockEventListener(selectComponent, 'change');

        await selectComponent.click();

        await page.waitForTimeout(30);

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        const searchValue = 'Clark Kent';
        await searchField.type(searchValue);

        const searchedItems = selectComponent.locator('.item');
        await expect(searchedItems).toHaveCount(1);

        await searchedItems.click();
        await expect(valueChange).toBeCalledTimes(1);

        await expect(selectComponent).toHaveAttribute('value', searchValue);
        await expect(selectComponent).toHaveScreenshot('select-after.png');
    });
});

test(`Select - Custom Search Slot Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/select/');

        await page.waitForSelector('[data-testid]', {});

        const selectComponent = page.locator('.Custom_Search_Slot').getByTestId('test-select');
        await expect(selectComponent).toHaveScreenshot('select-initial.png');

        await selectComponent.click();

        // Confirm that the component matches a screenshot based on whether the tests are for mobile form factor.
        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container.png');
        }

        const items = selectComponent.locator('.item');
        await expect(items).toHaveCount(5);

        const searchField = selectComponent.locator('#searchField');
        await expect(searchField).toHaveCount(1);
        await expect(searchField).toHaveScreenshot('search-field.png');

        const searchValue = 'Steve';
        await searchField.type(searchValue);

        if (isMobile) {
            const dialog = selectComponent.locator('dialog');
            await expect(dialog).toHaveScreenshot('select-dialog-after.png');
        } else {
            const container = selectComponent.locator('#items-container');
            await expect(container).toHaveScreenshot('select-items-container-after.png');
        }
    });
});

test('Select - Label Behaviour', testLabelBehaviour('omni-select'));
test('Select - Hint Behaviour', testHintBehaviour('omni-select'));
test('Select - Error Behaviour', testErrorBehaviour('omni-select'));
test('Select - Clearable Behaviour', testClearableBehaviour('omni-select'));
test('Select - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-select'));
test('Select - Prefix Behaviour', testPrefixBehaviour('omni-select'));
test('Select - Suffix Behaviour', testSuffixBehaviour('omni-select'));
