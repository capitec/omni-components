import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    BaseArgTypeDefinitions,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { CurrencyField } from './CurrencyField.js';

import './CurrencyField.js';

export default {
    title: 'UI Components/Currency Field',
    component: 'omni-currency-field',
    argTypes: BaseArgTypeDefinitions
} as CSFIdentifier;

interface Args extends BaseArgs {
    currency: string;
    locale: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args) => html`
        <omni-currency-field
            data-testId="test-currency-field"
            label="${ifNotEmpty(args.label)}"
            value="${ifNotEmpty(args.value)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            currency="${ifNotEmpty(args.currency)}"
            locale="${ifNotEmpty(args.locale)}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}
        </omni-currency-field>
    `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: '',
        currency: '',
        locale: ''
    },
    play: async (context) => {
        const currencyField = within(context.canvasElement).getByTestId<CurrencyField>('test-currency-field');

        const inputField = currencyField.shadowRoot.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);
        inputField.value = '';

        const input = jest.fn();
        currencyField.addEventListener('input', input);

        const value = '1200000.15';
        await userEvent.type(inputField, value);
        // Check the following value as input value is formatted to currency value;
        await expect(inputField).toHaveValue('1,200,000.15');
        await expect(input).toBeCalledTimes(value.length);

        // Backspacing to cover the removal of cents and cents separator
        const backspace = '{Backspace}';
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);
        await userEvent.type(inputField, backspace, {
            initialSelectionStart: 10,
            initialSelectionEnd: 10
        });

        await currencyField.updateComplete;

        await expect(inputField).toHaveValue('1,200,000');

        // Use left arrow key to position the caret after the currency separator.
        const leftArrow = '{ArrowLeft>3/}{Backspace}';
        await userEvent.type(inputField, leftArrow);
        await expect(inputField).toHaveValue('120,000');

        // Set currency property to be invalid value.
        currencyField.currency = 'cents';
    }
};

export const Label = LabelStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Hint = HintStory<CurrencyField, BaseArgs>('omni-currency-field');

export const ErrorLabel = ErrorStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Value = ValueStory<CurrencyField, BaseArgs>('omni-currency-field', '100.15');

export const Prefix = PrefixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Suffix = SuffixStory<CurrencyField, BaseArgs>('omni-currency-field');

export const Disabled = DisabledStory<CurrencyField, BaseArgs>('omni-currency-field');
