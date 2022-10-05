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
import { TextField } from './TextField.js';

import './TextField.js';

export default {
    title: 'UI Components/Text Field',
    component: 'omni-text-field',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-text-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

export const Interactive = {
    render: (args: BaseArgTypes) => html`
        <omni-text-field
            data-testid="test-text-field"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-text-field
        >
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
    play: async (context: StoryContext) => {
        const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
        const input = jest.fn();
        textField.addEventListener('input', input);

        const inputField = textField.shadowRoot.getElementById('inputField');

        await userEvent.type(inputField, 'Value{space}Update');
        const value = 'Value Update';
        await expect(inputField).toHaveValue(value);

        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<TextField, BaseArgTypes>('omni-text-field');

export const Hint = HintStory<TextField, BaseArgTypes>('omni-text-field');

export const ErrorLabel = ErrorStory<TextField, BaseArgTypes>('omni-text-field');

export const Value = ValueStory<TextField, BaseArgTypes>('omni-text-field');

export const Prefix = PrefixStory<TextField, BaseArgTypes>('omni-text-field');

export const Suffix = SuffixStory<TextField, BaseArgTypes>('omni-text-field');

export const Disabled = DisabledStory<TextField, BaseArgTypes>('omni-text-field');
