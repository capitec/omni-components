import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DateTime } from 'luxon';
import { Calendar } from '../calendar/Calendar.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    HintStory,
    ErrorStory,
    PrefixStory,
    SuffixStory,
    DisabledStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync } from '../utils/StoryUtils.js';
import { DatePicker } from './DatePicker';

import './DatePicker.js';

export default {
    title: 'UI Components/DatePicker',
    component: 'omni-date-picker'
} as CSFIdentifier;

interface Args extends BaseArgs {
    locale: string;
    minDate?: string;
    maxDate?: string;
}
const localDate = DateTime.local();
const isoDate = localDate.toISODate();
const testLocale = localDate.locale;

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-date-picker
            data-testid="test-date-picker"
            label="${ifNotEmpty(args.label)}"
            value="${ifNotEmpty(args.value)}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            locale="${args.locale}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}"
            min-date="${ifNotEmpty(args.minDate)}"
            max-date="${ifNotEmpty(args.maxDate)}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
            ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-date-picker
        >
    `,
    name: 'Interactive',
    args: {
        label: 'Select a Date',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: '',
        clear: '',
        locale: 'en-us',
        maxDate: '',
        minDate: '',
        clearable: false
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
        await userEvent.click(datePicker);

        await expect(click).toBeCalledTimes(2);

        const controlButton = datePicker.shadowRoot?.getElementById('control');

        await expect(controlButton).toBeTruthy();

        await userEvent.click(datePicker);

        const calendar = (await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#calendar')) as HTMLElement;
        await expect(calendar).toBeTruthy();

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
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        value="${args.value}"
    >

    </omni-date-picker>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniDatePicker } from "@capitec/omni-components-react/date-picker";

const App = () => <OmniDatePicker${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''}/>;`
        }
    ],
    name: 'Value',
    description: 'Set the current value of the Date Picker component.',
    args: {
        label: 'Value',
        value: isoDate
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const date = DateTime.fromISO(isoDate);
        await expect(datePicker).toHaveValue(date.toISODate());
    }
};

export const Locale: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        .value="${args.value}"
        locale="${args.locale}"
    >
    </omni-date-picker>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniDatePicker } from "@capitec/omni-components-react/date-picker";

const App = () => <OmniDatePicker${args.label ? ` label='${args.label}'` : ''}${args.locale ? ` locale='${args.locale}'` : ''}/>;`
        }
    ],
    name: 'Locale',
    description: 'Set the current locale of the Date Picker component.',
    args: {
        label: 'Locale',
        locale: testLocale
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
        const calendar = (await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#calendar')) as HTMLElement;
        //const calendar = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.calendar');
        await expect(calendar).toBeTruthy();

        const controlLabel = await querySelectorAsync(calendar.shadowRoot as ShadowRoot, '.control-label');
        await expect(controlLabel).toBeTruthy();

        await expect(controlLabel).toHaveTextContent(localDate.monthLong + ' ' + localDate.year);
        await userEvent.click(datePicker);
    }
};

export const Min_Date: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        min-date="${ifNotEmpty(args.minDate)}"
        value="${ifNotEmpty(args.value)}"
    >
    </omni-date-picker>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniDatePicker } from "@capitec/omni-components-react/date-picker";

const App = () => <OmniDatePicker${args.label ? ` label='${args.label}'` : ''}${args.minDate ? ` min-date='${args.minDate}'` : ''}${
                args.value ? ` value='${args.value}'` : ''
            }/>;`
        }
    ],
    name: 'Min Date',
    description: 'Limit the Date Picker to only have selectable dates after and including the specified min-date.',
    args: {
        minDate: '2023-04-14',
        value: '2023-04-15'
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        datePicker.value = context.args.value;

        await userEvent.click(datePicker);

        const calendar = (await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#calendar')) as Calendar;
        await expect(calendar).toBeTruthy();

        await waitFor(() => expect(calendar).toHaveAttribute('min-date', context.args.minDate), {
            timeout: 3000
        });

        const days = Array.from(calendar.shadowRoot?.querySelectorAll('.day') as NodeListOf<Element>);
        const isExcluded = days[17];

        await expect(isExcluded).toHaveClass('excluded');

        const preValue = datePicker.value;

        await userEvent.click(isExcluded, {
            pointerEventsCheck: 0
        });

        await expect(datePicker).toHaveValue(preValue);

        const isIncluded = days[20];

        await expect(isIncluded).not.toHaveClass('excluded');

        await userEvent.click(isIncluded, {
            pointerEventsCheck: 0
        });

        await expect(datePicker).not.toHaveValue(preValue);
    }
};

export const Max_Date: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        max-date="${ifNotEmpty(args.maxDate)}"
        value="${ifNotEmpty(args.value)}"
    >
    </omni-date-picker>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniDatePicker } from "@capitec/omni-components-react/date-picker";

const App = () => <OmniDatePicker${args.label ? ` label='${args.label}'` : ''}${args.maxDate ? ` max-date='${args.maxDate}'` : ''}${
                args.value ? ` value='${args.value}'` : ''
            }/>;`
        }
    ],
    name: 'Max Date',
    description: 'Limit the Date Picker to only have selectable dates before and including the specified max-date.',
    args: {
        maxDate: '2023-04-14',
        value: '2023-04-13'
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        datePicker.value = context.args.value;

        await userEvent.click(datePicker);

        const calendar = (await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#calendar')) as Calendar;
        await expect(calendar).toBeTruthy();

        await waitFor(() => expect(calendar).toHaveAttribute('max-date', context.args.maxDate), {
            timeout: 3000
        });

        const days = Array.from(calendar.shadowRoot?.querySelectorAll('.day') as NodeListOf<Element>);
        const isExcluded = days[20];

        await expect(isExcluded).toHaveClass('excluded');

        const preValue = datePicker.value;

        await userEvent.click(isExcluded, {
            pointerEventsCheck: 0
        });

        await expect(datePicker).toHaveValue(preValue);

        const isIncluded = days[15];

        await expect(isIncluded).not.toHaveClass('excluded');

        await userEvent.click(isIncluded, {
            pointerEventsCheck: 0
        });

        await expect(datePicker).not.toHaveValue(preValue);
    }
};

export const Label = LabelStory<DatePicker, BaseArgs>('omni-date-picker');

export const Hint = HintStory<DatePicker, BaseArgs>('omni-date-picker');

export const Error_Label = ErrorStory<DatePicker, BaseArgs>('omni-date-picker');

export const Clearable = ClearableStory<DatePicker, BaseArgs>('omni-date-picker', isoDate);

export const Custom_Clear_Slot_Icon = CustomClearableSlot<DatePicker, BaseArgs>('omni-date-picker', isoDate);

export const Prefix = PrefixStory<DatePicker, BaseArgs>('omni-date-picker');

export const Suffix = SuffixStory<DatePicker, BaseArgs>('omni-date-picker');

export const Disabled = DisabledStory<DatePicker, BaseArgs>('omni-date-picker');
