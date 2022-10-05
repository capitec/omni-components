import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
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
import { NumericField } from './NumericField';

import './NumericField';

export default {
    title: 'UI Components/Numeric Field',
    component: 'omni-numeric-field',
    argTypes: {
        ...BaseArgTypeDefinitions,
        increase: {
            control: 'text'
        },
        decrease: {
            control: 'text'
        }
    },
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-numeric-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

interface ArgTypes extends BaseArgTypes {
    increase: string;
    decrease: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
      <omni-numeric-field data-testid="test-numeric-field" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?disabled="${args.disabled}">${(args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix',args.prefix))}` : nothing)}${(args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix',args.suffix))}` : nothing)}${(args.increase ? html`${'\r\n'}${unsafeHTML(assignToSlot('increase',args.increase))}` : nothing)}${(args.decrease ? html`${'\r\n'}${unsafeHTML(assignToSlot('decrease',args.decrease))}` : nothing)}${args.prefix || args.suffix || args.increase || args.decrease ? '\r\n' : nothing}</omni-numeric-field>
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
        suffix: '',
        increase: '',
        decrease: ''
    },
    play: async (context: StoryContext) => {
        const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
        const inputEvent = jest.fn();
        numericField.addEventListener('input', inputEvent);

        const inputField = numericField.shadowRoot.getElementById('inputField');
        const value = '12345';
        await userEvent.type(inputField, value);

        await expect(inputField).toHaveValue(parseInt(value));

        await expect(inputEvent).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Hint = HintStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const ErrorLabel = ErrorStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Value = ValueStory<NumericField, BaseArgTypes>('omni-numeric-field', 123);

export const Prefix = PrefixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Suffix = SuffixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Disabled = DisabledStory<NumericField, BaseArgTypes>('omni-numeric-field');
