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

const localDate = DateTime.local();
const isoDate = localDate.toISODate();
const testLocale = localDate.locale;

interface Args {
    locale: string;
    value: string;
}

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