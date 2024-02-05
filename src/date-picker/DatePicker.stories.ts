import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DateTime } from 'luxon';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    HintStory,
    ErrorStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';

import './DatePicker.js';
export interface Args extends BaseArgs {
    locale: string;
    minDate?: string;
    maxDate?: string;
}
const localDate = DateTime.local();
const isoDate = localDate.toISODate() as string;
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
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                )
        }
    ],
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
    } as Args
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
    } as Args
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
    } as Args
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
    } as Args
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
    } as Args
};

export const Label = LabelStory<BaseArgs>('omni-date-picker');

export const Hint = HintStory<BaseArgs>('omni-date-picker');

export const Error_Label = ErrorStory<BaseArgs>('omni-date-picker');

export const Clearable = ClearableStory<BaseArgs>('omni-date-picker', isoDate);

export const Custom_Clear_Slot = CustomClearableSlot<BaseArgs>('omni-date-picker', isoDate);

export const Prefix = PrefixStory<BaseArgs>('omni-date-picker');

export const Suffix = SuffixStory<BaseArgs>('omni-date-picker');

export const Disabled: ComponentStoryFormat<BaseArgs> = {
    render: (args) =>
        html`<omni-date-picker data-testid="test-date-picker" label="${ifNotEmpty(args.label)}" value="${args.value}" disabled></omni-date-picker>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniDatePicker } from "@capitec/omni-components-react/date-picker";

const App = () => <OmniDatePicker${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''} disabled/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                )
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer/input events).',
    args: {
        label: 'Disabled',
        disabled: true,
        value: '2022-03-01'
    }
};
