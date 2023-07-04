import { DateTime } from 'luxon';
import { test, expect, withCoverage } from '../utils/JestPlaywright.js';
import type { Calendar } from './Calendar.js';

test(`Calendar - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/calendar/');

        // Use LivePropertyEditor to set Calendar initial date (Use LPE to ensure code snippet is also updated in case it gets picked up in the screenshot)
        await page.locator('#examples #inputField').nth(3).fill('2021-10-05');

        const calendar = page.locator('.Interactive').getByTestId('test-calendar');

        await expect(calendar).toHaveScreenshot('calendar-initial.png');

        const controlLabel = calendar.locator('.control-label');
        await expect(controlLabel).toHaveCount(1);

        await controlLabel.click();
        await controlLabel.click();

        await expect(calendar).toHaveScreenshot('calendar-years.png');

        const yearGrid = calendar.locator('.year-grid');
        await expect(yearGrid).toHaveCount(1);

        const yearButton = yearGrid.locator('.year').getByText('2020');
        await expect(yearButton).toHaveCount(1);
        await yearButton.click({
            force: true
        });

        await expect(calendar).toHaveScreenshot('calendar-months.png');

        const monthGrid = calendar.locator('.month-grid');
        await expect(monthGrid).toHaveCount(1);

        const monthButton = monthGrid.locator('.month').getByText('Dec');
        await expect(monthButton).toHaveCount(1);
        await monthButton.click({
            force: true
        });

        await expect(calendar).toHaveScreenshot('calendar-days.png');

        const daysGrid = calendar.locator('.day-grid');
        await expect(daysGrid).toHaveCount(1);

        //Find the day button at the specified position
        const dayButton = calendar.locator('div.day > div.day-label').nth(15);
        await expect(dayButton).toHaveCount(1);
        await dayButton.click({
            force: true
        });
        await expect(calendar).toHaveScreenshot('calendar-after.png');
    });
});

test(`Calendar - Value Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/calendar/');

        const calendar = page.locator('.Value').getByTestId('test-calendar');
        await calendar.evaluate(async (c: Calendar) => {
            c.value = '2023-01-01';

            await c.updateComplete;
        });

        await expect(calendar).toHaveScreenshot('calendar-initial.png');
        await expect(calendar).toHaveAttribute('value', '2023-01-01');
        await expect(await calendar.evaluate((c: Calendar) => c.value)).toBe('2023-01-01');
    });
});

test(`Calendar - Locale Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/calendar/');

        const args = await page.locator('story-renderer[key=Locale]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const calendar = page.locator('.Locale').getByTestId('test-calendar');

        const localDate = DateTime.fromISO('2022-06-21', {
            locale: args.locale
        });
        const isoDate = localDate.toISODate() as string;

        // Prepare test data
        await calendar.evaluate(
            async (d: Calendar, args) => {
                d.value = args.isoDate;

                await d.updateComplete;
            },
            { isoDate }
        );

        await expect(calendar).toHaveScreenshot('calendar-initial.png');
        await expect(calendar).toHaveAttribute('locale', args.locale);

        const controlLabel = calendar.locator('.control-label');
        await expect(controlLabel).toHaveCount(1);

        await expect(controlLabel).toHaveText(localDate.monthLong + ' ' + localDate.year);
    });
});

test(`Calendar - Min Date Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/calendar/');

        const args = await page.locator('story-renderer[key=Min_Date]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const calendar = page.locator('.Min_Date').getByTestId('test-calendar');

        await expect(calendar).toHaveScreenshot('calendar-initial.png');

        await expect(calendar).toHaveAttribute('min-date', args.minDate);

        const days = await calendar.locator('.day').all();
        const isExcluded = days[17];

        await expect(isExcluded).toHaveClass(/excluded/);

        const preValue = await calendar.getAttribute('value');

        await isExcluded.click({
            force: true
        });

        await expect(calendar).toHaveAttribute('value', preValue as string);

        const isIncluded = days[20];

        await expect(isIncluded).not.toHaveClass(/excluded/);

        await isIncluded.click({
            force: true
        });

        await expect(calendar).not.toHaveAttribute('value', preValue as string);
    });
});

test(`Calendar - Max Date Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/calendar/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Max_Date]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const calendar = page.locator('.Max_Date').getByTestId('test-calendar');

        await expect(calendar).toHaveScreenshot('calendar-initial.png');

        await expect(calendar).toHaveAttribute('max-date', args.maxDate);

        const days = await calendar.locator('.day').all();
        const isExcluded = days[20];

        await expect(isExcluded).toHaveClass(/excluded/);

        const preValue = await calendar.getAttribute('value');

        await isExcluded.click({
            force: true
        });

        await expect(calendar).toHaveAttribute('value', preValue as string);

        const isIncluded = days[15];

        await expect(isIncluded).not.toHaveClass(/excluded/);

        await isIncluded.click({
            force: true
        });

        await expect(calendar).not.toHaveAttribute('value', preValue as string);
    });
});
