import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LabelStory, BaseArgs, HintStory, ErrorStory, DisabledStory, ValueStory, PrefixStory, SuffixStory } from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
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
            fractional-precision="${args.fractionalPrecision}"
            fractional-separator="${ifNotEmpty(args.fractionalSeparator)}"
            thousands-separator="${ifNotEmpty(args.thousandsSeparator)}"
            currency-symbol="${ifNotEmpty(args.currencySymbol)}"
            formatter="${ifNotEmpty(args.formatter)}"           
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-currency-field>
    `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: '',
        fractionalPrecision: 2,
        fractionalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '$',
        formatter: '\\B(?=(\\d{3})+(?!\\d))'
    },
    play: async (context) => {
        const currencyField = within(context.canvasElement).getByTestId<CurrencyField>('test-currency-field');

        const inputField = currencyField.shadowRoot?.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);
        inputField.value = '';

        const beforeinput = jest.fn();
        currencyField.addEventListener('beforeinput', beforeinput);

        const value = '120000015';
        await userEvent.type(inputField, value);

        // Check the following value as input value is formatted to currency value;
        await waitFor(() => expect(inputField).toHaveValue('1,200,000.15'), {
            timeout: 3000
        });
        await waitFor(() => expect(beforeinput).toBeCalledTimes(value.length), {
            timeout: 3000
        });

        // Backspacing to cover the removal of cents and cents separator
        const backspace = '{Backspace>2/}';
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);
        await userEvent.type(inputField, backspace, {
            initialSelectionStart: 12,
            initialSelectionEnd: 12
        });

        await currencyField.updateComplete;

        console.log('After backspacing', inputField.value);

        await waitFor(() => expect(inputField).toHaveValue('12,000.00'), {
            timeout: 3000
        });

        // Use left arrow key to position the caret after the currency separator.
        const leftArrow = '{ArrowLeft>3/}{Backspace}';
        await userEvent.type(inputField, leftArrow);

        await waitFor(() => expect(inputField).toHaveValue('1,200.00'), {
            timeout: 3000
        });
    }
};

export const Label = LabelStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Hint = HintStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Error_Label = ErrorStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Value = ValueStory<CurrencyField, BaseArgs>('omni-currency-field', '1200.50');

export const Prefix = PrefixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Suffix = SuffixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Disabled = DisabledStory<CurrencyField, BaseArgs>('omni-currency-field', '1200');
