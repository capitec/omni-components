import * as jestMock from 'jest-mock';
import { DateTime } from 'luxon';
import type { Calendar } from '../calendar/Calendar.js';
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
import type { DatePicker } from './DatePicker.js';

test(`Date Picker - Visual and Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const datePicker = page.locator('.Value').getByTestId('test-date-picker');

        // Prepare test data
        await datePicker.evaluate(async (d: DatePicker) => {
            d.value = '2021-10-05';

            await d.updateComplete;
        });

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        const controlButton = datePicker.locator('#control');

        await expect(controlButton).toHaveCount(1);

        await datePicker.click();

        await expect(datePicker).toHaveScreenshot('date-picker-open.png');

        const calendar = datePicker.locator('omni-calendar#calendar');
        await expect(calendar).toHaveCount(1);
        await expect(calendar).toBeVisible();

        await expect(calendar).toHaveScreenshot('date-picker-calendar-open.png');

        const controlLabel = calendar.locator('.control-label');
        await expect(controlLabel).toHaveCount(1);

        await controlLabel.click();
        await controlLabel.click();

        await expect(calendar).toHaveScreenshot('date-picker-calendar-years.png');

        const yearGrid = calendar.locator('.year-grid');
        await expect(yearGrid).toHaveCount(1);

        const yearButton = yearGrid.locator('.year').getByText('2020');
        await expect(yearButton).toHaveCount(1);
        await yearButton.click({
            force: true
        });

        await expect(calendar).toHaveScreenshot('date-picker-calendar-months.png');

        const monthGrid = calendar.locator('.month-grid');
        await expect(monthGrid).toHaveCount(1);

        const monthButton = monthGrid.locator('.month').getByText('Dec');
        await expect(monthButton).toHaveCount(1);
        await monthButton.click({
            force: true
        });

        await expect(calendar).toHaveScreenshot('date-picker-calendar-days.png');

        const daysGrid = calendar.locator('.day-grid');
        await expect(daysGrid).toHaveCount(1);

        //Find the day button at the specified position
        const dayButton = calendar.locator('div.day > div.day-label').nth(15);
        await expect(dayButton).toHaveCount(1);
        await dayButton.click({
            force: true
        });

        await expect(datePicker).toHaveAttribute('value', '2020-12-15');
        await expect(datePicker).toHaveScreenshot('date-picker-after.png');
    });
});

test(`Date Picker - Value Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const datePicker = page.locator('.Value').getByTestId('test-date-picker');
        await datePicker.evaluate(async (d: DatePicker) => {
            d.value = '2023-01-01';

            await d.updateComplete;
        });

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        await datePicker.click();

        const calendar = datePicker.locator('omni-calendar#calendar');
        await expect(calendar).toHaveCount(1);
        await expect(calendar).toHaveAttribute('value', (await datePicker.getAttribute('value')) as string);
    });
});

test(`Date Picker - Locale Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        const localDate = DateTime.fromISO('2022-06-21');
        const isoDate = localDate.toISODate() as string;
        const testLocale = 'en-ZA';

        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const datePicker = page.locator('.Locale').getByTestId('test-date-picker');

        // Prepare test data
        await datePicker.evaluate(
            async (d: DatePicker, args) => {
                d.locale = args.testLocale;
                d.value = args.isoDate;

                await d.updateComplete;
            },
            { isoDate, testLocale }
        );

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        await datePicker.click();

        const calendar = datePicker.locator('omni-calendar#calendar');
        await expect(calendar).toHaveCount(1);

        const controlLabel = calendar.locator('.control-label');
        await expect(controlLabel).toHaveCount(1);

        await expect(controlLabel).toHaveText(localDate.monthLong + ' ' + localDate.year);
    });
});

test(`Date Picker - Min Date Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Min_Date]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const datePicker = page.locator('.Min_Date').getByTestId('test-date-picker');
        await datePicker.evaluate(async (d: DatePicker, args) => {
            d.value = args.value;

            await d.updateComplete;
        }, args);

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        await datePicker.click();

        const calendar = datePicker.locator('omni-calendar#calendar');
        await expect(calendar).toHaveCount(1);

        await expect(calendar).toHaveAttribute('min-date', args.minDate);

        const days = await calendar.locator('.day').all();
        const isExcluded = days[17];

        await expect(isExcluded).toHaveClass(/excluded/);

        const preValue = await datePicker.getAttribute('value');

        await isExcluded.click({
            force: true
        });

        await expect(datePicker).toHaveAttribute('value', preValue as string);

        const isIncluded = days[20];

        await expect(isIncluded).not.toHaveClass(/excluded/);

        await isIncluded.click({
            force: true
        });

        await expect(datePicker).not.toHaveAttribute('value', preValue as string);
    });
});

test(`Date Picker - Max Date Behaviour`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Max_Date]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const datePicker = page.locator('.Max_Date').getByTestId('test-date-picker');
        await datePicker.evaluate(async (d: DatePicker, args) => {
            d.value = args.value;

            await d.updateComplete;
        }, args);

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        await datePicker.click();

        const calendar = datePicker.locator('omni-calendar#calendar');
        await expect(calendar).toHaveCount(1);

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
});

test('Date Picker - Label Behaviour', testLabelBehaviour('omni-date-picker'));
test('Date Picker - Hint Behaviour', testHintBehaviour('omni-date-picker'));
test('Date Picker - Error Behaviour', testErrorBehaviour('omni-date-picker'));
test('Date Picker - Clearable Behaviour', testClearableBehaviour('omni-date-picker'));
test('Date Picker - Custom Clear Slot Behaviour', testCustomClearableSlotBehaviour('omni-date-picker'));
test('Date Picker - Prefix Behaviour', testPrefixBehaviour('omni-date-picker'));
test('Date Picker - Suffix Behaviour', testSuffixBehaviour('omni-date-picker'));

test(`Date Picker - Disabled Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/date-picker/');

        await page.waitForSelector('[data-testid]', {});

        const args = await page.locator('story-renderer[key=Disabled]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const datePicker = page.locator('.Disabled').getByTestId('test-date-picker');
        await datePicker.evaluate(async (d: DatePicker, args) => {
            d.value = args.value;

            await d.updateComplete;
        }, args);

        await expect(datePicker).toHaveScreenshot('date-picker-initial.png');

        //Click event test.
        const click = jestMock.fn();
        await page.exposeFunction('jestClick', () => click());
        await datePicker.evaluate((node) => {
            node.addEventListener('click', () => (window as any).jestClick());
        });

        await datePicker.click({
            force: true
        });

        await expect(click).toBeCalledTimes(0);

        const calendar = datePicker.locator('omni-calendar#calendar');

        if (!isMobile) {
            await expect(calendar).toHaveCount(0);
        } else {
            await expect(calendar).not.toBeVisible();
        }

        await datePicker.evaluate((d: DatePicker) => (d.disabled = false));

        await datePicker.click({
            force: true
        });

        await expect(click).toBeCalledTimes(1);

        await expect(calendar).toHaveCount(1);
        await expect(calendar).toBeVisible();
    });
});
