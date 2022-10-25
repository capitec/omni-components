import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgTypes,
    BaseArgTypeDefinitions,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote } from '../utils/StoryUtils';
import { CurrencyField } from './CurrencyField.js';

import './CurrencyField.js';

export default {
    title: 'UI Components/Currency Field',
    component: 'omni-currency-field',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-currency-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

export const Interactive = {
    render: (args: BaseArgTypes) => html`
        <omni-currency-field
            data-testId="test-currency-field"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}    
        </omni-currency-field>
    
    `,
    name: 'Interactive',
    parameters: {},
    args: {
        label: 'Label',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: ''
    },
    play: async (context: StoryContext)=> {
        const currencyField = within(context.canvasElement).getByTestId<CurrencyField>('test-currency-field');
        const input = jest.fn();
        currencyField.addEventListener('input', input);

        const inputField = currencyField.shadowRoot.getElementById('inputField');

        const value = '1200';
        await userEvent.type(inputField, value);
        await expect(inputField).toHaveValue(parseFloat(value));

        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<CurrencyField, BaseArgTypes>('omni-currency-field');

export const Hint = HintStory<CurrencyField, BaseArgTypes>('omni-currency-field');

export const ErrorLabel = ErrorStory<CurrencyField, BaseArgTypes>('omni-currency-field');

export const Value = ValueStory<CurrencyField, BaseArgTypes>('omni-currency-field', 1200);

export const Prefix = PrefixStory<CurrencyField, BaseArgTypes>('omni-currency-field');

export const Suffix = SuffixStory<CurrencyField, BaseArgTypes>('omni-currency-field');

export const Disabled = DisabledStory<CurrencyField, BaseArgTypes>('omni-currency-field');