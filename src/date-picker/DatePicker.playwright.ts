import * as jestMock from 'jest-mock';
import { test, expect, expectJest, type Page } from '../utils/JestPlaywright.js';
import type { DatePicker } from './DatePicker.js';

export default function setupTests(getPage: () => Page) {
    test(`Date Picker - Max Date Behaviour`, async ({ page }) => {
        page = getPage();
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Max_Date]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const datePicker = page.locator('.Max_Date').getByTestId('test-date-picker');
        await datePicker.evaluate((d: DatePicker, args) => (d.value = args.value), args);

        await datePicker.click();

        const calendar = datePicker.locator('#calendar').and(datePicker.locator('omni-calendar'));
        await expect(calendar).toBeTruthy();

        await expect(calendar).toHaveAttribute('max-date', args.maxDate);

        const days = await calendar.locator('.day').all();
        const isExcluded = days[20];

        await expect(isExcluded).toHaveClass(/excluded/);

        const preValue = await datePicker.getAttribute('value');

        await isExcluded.click({
            force: true
        });

        await expect(datePicker).toHaveAttribute('value', preValue as string);

        const isIncluded = days[15];

        await expect(isIncluded).not.toHaveClass(/excluded/);

        await isIncluded.click({
            force: true
        });

        await expect(datePicker).not.toHaveAttribute('value', preValue as string);
    });
}
