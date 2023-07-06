import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { html } from 'lit';
import { DateTime } from 'luxon';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, querySelectorAsync } from '../utils/StoryUtils.js';
import { Calendar } from './Calendar';

import './Calendar.js';

interface Args {
    locale: string;
    value: string;
    minDate?: string;
    maxDate?: string;
}

const localDate = DateTime.local().plus({ days: 1 });
const isoDate = localDate.toISODate() as string;

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
    } as Args
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
    } as Args
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
    } as Args
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
    } as Args
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
    } as Args
};
