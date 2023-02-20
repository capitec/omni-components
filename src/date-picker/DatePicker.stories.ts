import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DateTime } from 'luxon';
import { LabelStory, BaseArgs, HintStory, ErrorStory, PrefixStory, SuffixStory, DisabledStory } from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw } from '../utils/StoryUtils.js';
import { DatePicker } from './DatePicker';

import './DatePicker.js';

export default {
    title: 'UI Components/Select',
    component: 'omni-select'
} as CSFIdentifier;

interface Args extends BaseArgs {
    locale: string;
}
const localDate = DateTime.local();
const isoDate = localDate.toISODate();
const testLocale = localDate.locale;

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-date-picker
            data-testid="test-date-picker"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            locale="${args.locale}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-date-picker
        >
    `,
    name: 'Interactive',
    args: {
        label: 'Select a Date',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: '',
        locale: 'en-us'
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
        await userEvent.click(datePicker);

        await expect(click).toBeCalledTimes(2);

        const controlButton = datePicker.shadowRoot!.getElementById('control');

        await expect(controlButton).toBeTruthy();

        await userEvent.click(datePicker);

        const pickerContainer = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#picker-container');
        await expect(pickerContainer).toBeTruthy();

        const periodButton = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.month-year');
        await expect(pickerContainer).toBeTruthy();
        await userEvent.click(periodButton as HTMLDivElement);
        await userEvent.click(periodButton as HTMLDivElement);

        const yearScroller = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.year-scroller');
        await expect(yearScroller).toBeTruthy();

        const yearButton = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '[label="2020"]');
        await expect(yearButton).toBeTruthy();
        await userEvent.click(yearButton as HTMLElement);

        const monthGrid = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.month-grid');
        await expect(monthGrid).toBeTruthy();

        const monthButton = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '[label="Dec"]');
        await expect(monthButton).toBeTruthy();
        await userEvent.click(monthButton as HTMLElement);

        const daysGrid = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.days-grid');
        await expect(daysGrid).toBeTruthy();

        //Find the day button at the specified position
        const dayButton = datePicker.shadowRoot!.querySelectorAll('div.day > div.day-label')[15];
        console.log(dayButton);
        await expect(dayButton).toBeTruthy();
        await userEvent.click(dayButton);
    }
};

export const Value: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        .value="${args.value}"
    >

    </omni-date-picker>
    `,
    name: 'Value',
    description: 'Set the current value of the Date picker component.',
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
    name: 'Locale',
    description: 'Set the current locale of the Date picker component.',
    args: {
        label: 'Locale',
        locale: testLocale
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
        const pickerContainer = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '#picker-container');
        await expect(pickerContainer).toBeTruthy();

        const periodButton = await querySelectorAsync(datePicker.shadowRoot as ShadowRoot, '.month-year');
        await expect(periodButton).toBeTruthy();

        await expect(periodButton).toHaveTextContent(localDate.monthLong + ' ' + localDate.year);
        await userEvent.click(datePicker);
    }
};

export const Label = LabelStory<DatePicker, BaseArgs>('omni-date-picker');

export const Hint = HintStory<DatePicker, BaseArgs>('omni-date-picker');

export const Error_Label = ErrorStory<DatePicker, BaseArgs>('omni-date-picker');

export const Prefix = PrefixStory<DatePicker, BaseArgs>('omni-date-picker');

export const Suffix = SuffixStory<DatePicker, BaseArgs>('omni-date-picker');

export const Disabled = DisabledStory<DatePicker, BaseArgs>('omni-date-picker');