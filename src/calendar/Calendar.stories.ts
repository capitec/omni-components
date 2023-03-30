import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { html } from 'lit';
import { DateTime } from 'luxon';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, querySelectorAsync } from '../utils/StoryUtils.js';
import { Calendar } from './Calendar';

import './Calendar.js';

export default {
    title: 'UI Components/Calendar',
    component: 'omni-calendar'
} as CSFIdentifier;

interface Args {
    locale: string;
    value: string;
}

const localDate = DateTime.local();
const isoDate = localDate.toISODate();

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        locale="${args.locale}"
        .value="${args.value}"
    >       
    </omni-calendar>
    `,
    name: 'Interactive',
    args: {
        locale: '',
        value: ''
    } as Args,
    play: async (context) => {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');

        const controlLabel = await querySelectorAsync(calendar.shadowRoot as ShadowRoot, '.control-label');
        await expect(controlLabel).toBeTruthy();
        await userEvent.click(controlLabel as HTMLDivElement);
        await userEvent.click(controlLabel as HTMLDivElement);

        const yearGrid = (await querySelectorAsync(calendar.shadowRoot as ShadowRoot, '.year-grid')) as HTMLElement;
        await expect(yearGrid).toBeTruthy();

        const yearButtons = yearGrid.querySelectorAll('.year');
        const yearButtonArray = [...yearButtons];
        const yearButton = yearButtonArray.filter((year) => year.textContent === '2020');
        await expect(yearButton[0]).toBeTruthy();
        await userEvent.click(yearButton[0]);

        const monthGrid = (await querySelectorAsync(calendar.shadowRoot as ShadowRoot, '.month-grid')) as HTMLElement;
        await expect(monthGrid).toBeTruthy();

        const monthButtons = monthGrid.querySelectorAll('.month');
        const monthButtonsArray = [...monthButtons];
        const monthButton = monthButtonsArray.filter((month) => month.textContent === 'Dec');
        await expect(monthButton[0]).toBeTruthy();
        await userEvent.click(monthButton[0]);
        const daysGrid = await querySelectorAsync(calendar.shadowRoot as ShadowRoot, '.day-grid');
        await expect(daysGrid).toBeTruthy();

        //Find the day button at the specified position
        const dayButton = calendar.shadowRoot?.querySelectorAll('div.day > div.day-label')[15] as HTMLElement;
        await expect(dayButton).toBeTruthy();
        await userEvent.click(dayButton);
    }
};

export const Value: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        .value="${args.value}"
        >
    </omni-calendar>
    `,
    name: 'Value',
    description: 'Set the value of the Calendar component, this has to be a valid date in ISO format',
    args: {
        value: isoDate
    } as Args,
    play: async (context) => {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        const date = DateTime.fromISO(isoDate);
        await expect(calendar).toHaveValue(date.toISODate());
    }
};

export const Locale: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        locale="${args.locale}"
        >
    </omni-calendar>
    `,
    name: 'Locale',
    description: 'Set the locale of the Calendar.',
    args: {
        locale: 'ja-JP'
    } as Args,
    play: async (context) => {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        await expect(calendar).toHaveAttribute('locale', 'ja-JP');
    }
};
