import * as jestMock from 'jest-mock';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import { Args } from './RadioGroup.stories.js';

test(`Radio Group - Check / Unchecked Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio-group/');

        // Get Radio group and radio components.
        const radioGroup = page.locator('.Interactive').getByTestId('test-radio-group');
        const radio = radioGroup.locator('omni-radio').first();
        await radioGroup.focus();

        const radioChange = jestMock.fn();
        await page.exposeFunction('jestRadioChange', () => radioChange());
        await radioGroup.evaluate((node) => {
            console.log(node);
            node.addEventListener('radio-change', (e) => {
                console.log(e);
                window.jestRadioChange();
            });
        });
        await radio.locator('#content').click();

        await expect(radioChange).toBeCalledTimes(1);
        await expect(radio).toHaveAttribute('checked', 'true');
    });
});

test(`Radio Group - Label`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio-group/');

        await page.waitForSelector('[data-testid]', {});
        const args = await page.locator('story-renderer[key=Label]').evaluate(getStoryArgs());
        const radioGroup = page.locator('.Label').getByTestId('test-radio-group');
        const label = radioGroup.locator('omni-label');

        await expect(label).toHaveAttribute('label', args.label);
        await expect(radioGroup).toHaveScreenshot('radio-group-label.png');
    });
});

test(`Radio Group - Horizontal`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio-group/');

        await page.waitForSelector('[data-testid]', {});
        const radioGroup = page.locator('.Horizontal').getByTestId('test-radio-group');
        const radios = radioGroup.locator('.radios');

        const horizontalAttribute = await radios.getAttribute('data-horizontal');

        await expect(radios).toHaveAttribute('data-horizontal', horizontalAttribute);
        await expect(radioGroup).toHaveScreenshot('radio-group-horizontal.png');
    });
});

test(`Radio Group - Deselect allowed`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/radio-group/');

        const radioGroup = page.locator('.Allow_Deselect').getByTestId('test-radio-group');
        //Get the second radio button as it is expected to be checked already
        const radio = page.locator('.Allow_Deselect').getByTestId('test-radio');

        radioGroup.focus();

        const radioChange = jestMock.fn();
        await page.exposeFunction('jestRadioChange', () => radioChange());
        await radioGroup.evaluate((node) => {
            node.addEventListener('radio-change', () => window.jestRadioChange());
        });

        //Check if the radio button is already checked
        await expect(radio).toHaveAttribute('aria-checked', 'true');
        // Click the radio button this will result in a deselection.
        await radio.locator('#content').click();

        await expect(radioChange).toBeCalledTimes(1);
        // Check the selected attribute of the Radio group and confirm it matches the value cause de selecting a radio button is allowed
        await expect(radioGroup).toHaveAttribute('selected', '-1');
    });
});

declare global {
    interface Window {
        jestRadioChange: () => void;
    }
}

function getStoryArgs() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (storyRenderer: any) => storyRenderer?.story?.args as Args;
}
