import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit } from '../utils/StoryUtils.js';
import { CurrencyField } from './CurrencyField.js';

import './CurrencyField.js';

export default {
    title: 'UI Components/Currency Field',
    component: 'omni-currency-field'
} as CSFIdentifier;

interface Args extends BaseArgs {
    fractionalPrecision: number;
    fractionalSeparator: string;
    thousandsSeparator: string;
    currencySymbol: string;
    formatter: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args) => html`
        <omni-currency-field
            data-testId="test-currency-field"
            label="${ifNotEmpty(args.label)}"
            value="${ifNotEmpty(args.value)}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}"
            fractional-precision="${args.fractionalPrecision}"
            fractional-separator="${ifNotEmpty(args.fractionalSeparator)}"
            thousands-separator="${ifNotEmpty(args.thousandsSeparator)}"
            currency-symbol="${ifNotEmpty(args.currencySymbol)}"
            formatter="${ifNotEmpty(args.formatter)}"           
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
            ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-currency-field>
    `,
    frameworkSources: [
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) => getSourceFromLit(Interactive!.render!(args), undefined, (s) => s.replace('formatter', '.formatter'))
            }
        },
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
        label: 'Label',
        value: '123456789',
        hint: '',
        error: '',
        disabled: false,
        clearable: false,
        prefix: '',
        suffix: '',
        clear: '',
        fractionalPrecision: 2,
        fractionalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '$',
        formatter: '\\B(?=(\\d{3})+(?!\\d))'
    }
};

export const Label = LabelStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Hint = HintStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Error_Label = ErrorStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Value = ValueStory<CurrencyField, BaseArgs>('omni-currency-field', '1200.50');

export const Clearable = ClearableStory<CurrencyField, BaseArgs>('omni-currency-field', '1200.50');

export const Custom_Clear_Slot = CustomClearableSlot<CurrencyField, BaseArgs>('omni-currency-field', '1200.50');

export const Prefix = PrefixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Suffix = SuffixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Disabled = DisabledStory<CurrencyField, BaseArgs>('omni-currency-field', '1200');
