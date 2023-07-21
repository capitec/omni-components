/* eslint-disable @typescript-eslint/no-explicit-any */
import { fn } from 'jest-mock';
import { test, expect, getStoryArgs, withCoverage } from '../utils/JestPlaywright.js';
import type { RenderElement } from './RenderElement.js';

test(`Render Element - Lit Template Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const args = await getStoryArgs(page, 'Lit_Template');
        const renderElement = page.locator('.Lit_Template').getByTestId('test-render');
        const data = args.data;

        const span1 = renderElement.locator('span');
        await expect(span1).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-before.png');

        data.hello = 'everyone';
        await renderElement.evaluate((r: RenderElement, data) => (r.data = data), data);

        const loading = renderElement.locator('omni-loading-icon');
        await expect(loading).toHaveCount(1);
        await expect(renderElement).toHaveScreenshot('render-element-loading.png');

        const span2 = renderElement.locator('span');
        await expect(span2).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-after.png');
    });
});

test(`Render Element - HTML Element Instance Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const clickDialog = fn();
        page.on('dialog', (d) => {
            clickDialog();
            d.accept();
        });

        const args = await getStoryArgs(page, 'HTML_Element_Instance');
        const renderElement = page.locator('.HTML_Element_Instance').getByTestId('test-render');
        const data = args.data;

        const span1 = renderElement.locator('span');
        await expect(span1).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-before.png');

        data.hello = 'everyone';
        await renderElement.evaluate((r: RenderElement, data) => (r.data = data), data);

        const loading = renderElement.locator('omni-loading-icon');
        await expect(loading).toHaveCount(1);
        await expect(renderElement).toHaveScreenshot('render-element-loading.png');

        const span2 = renderElement.locator('span');
        await expect(span2).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-after.png');
        await span2.click({
            force: true
        });

        await expect(clickDialog).toBeCalledTimes(1);
    });
});

test(`Render Element - HTML String Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const args = await getStoryArgs(page, 'HTML_String');
        const renderElement = page.locator('.HTML_String').getByTestId('test-render');
        const data = args.data;

        const span1 = renderElement.locator('span');
        await expect(span1).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-before.png');

        data.hello = 'everyone';
        await renderElement.evaluate((r: RenderElement, data) => (r.data = data), data);

        const loading = renderElement.locator('omni-loading-icon');
        await expect(loading).toHaveCount(1);
        await expect(renderElement).toHaveScreenshot('render-element-loading.png');

        const span2 = renderElement.locator('span');
        await expect(span2).toHaveText(JSON.stringify(data));
        await expect(renderElement).toHaveScreenshot('render-element-after.png');
    });
});
