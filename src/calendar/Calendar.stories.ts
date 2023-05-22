import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { html } from 'lit';
import { DateTime } from 'luxon';
import { ifNotEmpty } from '../utils/Directives.js';
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
    minDate?: string;
    maxDate?: string;
}

const localDate = DateTime.local().plus({ days: 1 });
const isoDate = localDate.toISODate();

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        locale="${ifNotEmpty(args.locale)}"
        value="${ifNotEmpty(args.value)}"
        min-date="${ifNotEmpty(args.minDate)}"
        max-date="${ifNotEmpty(args.maxDate)}"
    >       
    </omni-calendar>
    `,
    name: 'Interactive',
    args: {
        locale: '',
        value: '',
        maxDate: '',
        minDate: ''
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
        value="${args.value}"
        >
    </omni-calendar>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCalendar } from "@capitec/omni-components-react/calendar";

const App = () => <OmniCalendar${args.value ? ` value='${args.value}'` : ''}/>;`
        }
    ],
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
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCalendar } from "@capitec/omni-components-react/calendar";

const App = () => <OmniCalendar${args.locale ? ` locale='${args.locale}'` : ''}/>;`
        }
    ],
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

export const Min_Date: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        min-date="${ifNotEmpty(args.minDate)}"
        value="${ifNotEmpty(args.value)}"
        >
    </omni-calendar>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCalendar } from "@capitec/omni-components-react/calendar";

const App = () => <OmniCalendar${args.minDate ? ` min-date='${args.minDate}'` : ''}${args.value ? ` value='${args.value}'` : ''}/>;`
        }
    ],
    name: 'Min Date',
    description: 'Limit the Calendar to only have selectable dates after and including the specified min-date.',
    args: {
        minDate: '2023-04-14',
        value: '2023-04-15'
    } as Args,
    play: async (context) => {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        calendar.value = context.args.value;
        await expect(calendar).toHaveAttribute('min-date', context.args.minDate);

        const days = Array.from(calendar.shadowRoot?.querySelectorAll('.day') as NodeListOf<Element>);
        const isExcluded = days[17];

        await expect(isExcluded).toHaveClass('excluded');

        const preValue = calendar.value;

        await userEvent.click(isExcluded, {
            pointerEventsCheck: 0
        });

        await expect(calendar).toHaveValue(preValue);

        const isIncluded = days[20];

        await expect(isIncluded).not.toHaveClass('excluded');

        await userEvent.click(isIncluded, {
            pointerEventsCheck: 0
        });

        await expect(calendar).not.toHaveValue(preValue);
    }
};

export const Max_Date: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-calendar
        data-testid="test-calendar"
        max-date="${ifNotEmpty(args.maxDate)}"
        value="${ifNotEmpty(args.value)}"
        >
    </omni-calendar>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCalendar } from "@capitec/omni-components-react/calendar";

const App = () => <OmniCalendar${args.maxDate ? ` max-date='${args.maxDate}'` : ''}${args.value ? ` value='${args.value}'` : ''}/>;`
        }
    ],
    name: 'Max Date',
    description: 'Limit the Calendar to only have selectable dates before and including the specified max-date.',
    args: {
        maxDate: '2023-04-14',
        value: '2023-04-13'
    } as Args,
    play: async (context) => {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        calendar.value = context.args.value;
        await expect(calendar).toHaveAttribute('max-date', context.args.maxDate);

        const days = Array.from(calendar.shadowRoot?.querySelectorAll('.day') as NodeListOf<Element>);
        const isExcluded = days[20];

        await expect(isExcluded).toHaveClass('excluded');

        const preValue = calendar.value;

        await userEvent.click(isExcluded, {
            pointerEventsCheck: 0
        });

        await expect(calendar).toHaveValue(preValue);

        const isIncluded = days[15];

        await expect(isIncluded).not.toHaveClass('excluded');

        await userEvent.click(isIncluded, {
            pointerEventsCheck: 0
        });

        await expect(calendar).not.toHaveValue(preValue);
    }
};
