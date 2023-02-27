import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DateTime } from 'luxon';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw } from '../utils/StoryUtils.js';
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
const testLocale = localDate.locale;

console.log(isoDate);

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
        const click = jest.fn();
        calendar.addEventListener('click', click);
    }
}

export const Value: ComponentStoryFormat<Args> = {
    render: (args: Args) =>html`
    <omni-calendar
        data-testid="test-calendar"
        .value="${args.value}"
        >
    </omni-calendar>
    `,
    name: 'Value',
    description: 'Set the value of the Calendar component, this has to be a valid date in ISOformat',
    args: {
        value: isoDate
    } as Args,
    play: async (context)=> {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        const click = jest.fn();
        calendar.addEventListener('click', click);
    }
}

export const Locale: ComponentStoryFormat<Args> = {
    render: (args: Args) =>html`
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
    play: async (context)=> {
        const calendar = within(context.canvasElement).getByTestId<Calendar>('test-calendar');
        const click = jest.fn();
        calendar.addEventListener('click', click);
    }
}