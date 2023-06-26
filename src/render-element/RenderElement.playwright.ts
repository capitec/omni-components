import * as jestMock from 'jest-mock';
import { test, expect, expectJest, type Page } from '../utils/JestPlaywright.js';
import type { RenderElement } from './RenderElement.js';

export default function setupTests(getPage: () => Page) {
    test(`Render Element - Lit Template Visual and Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Lit_Template]').evaluate((storyRenderer) => (storyRenderer as any).story.args);

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

    test(`Render Element - HTML Element Instance Visual and Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const clickDialog = jestMock.fn();
        page.on('dialog', (d) => {
            clickDialog();
            d.accept();
        });

        const args = await page.locator('story-renderer[key=HTML_Element_Instance]').evaluate((storyRenderer) => (storyRenderer as any).story.args);

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

        await expectJest(clickDialog).toBeCalledTimes(1);
    });

    test(`Render Element - HTML String Visual and Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('/components/render-element/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=HTML_String]').evaluate((storyRenderer) => (storyRenderer as any).story.args);

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
}
