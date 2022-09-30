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
import { TextBox } from './TextBox.js';

import './TextBox.js';

export default {
    title: 'UI Components/Text Box',
    component: 'omni-text-box',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-text-box'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

export const Interactive = {
    render: (args: BaseArgTypes) => html`
    <omni-text-box data-testid="test-text-box" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?disabled="${args.disabled}">${(args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix',args.prefix))}` : nothing)}${(args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix',args.suffix))}` : nothing)}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-text-box>
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
        const TextBox = within(context.canvasElement).getByTestId<TextBox>('test-text-box');
        const input = jest.fn();
        TextBox.addEventListener('input', input);

        const inputField = TextBox.shadowRoot.getElementById('inputField');

        await userEvent.type(inputField, 'Value{space}Update');
        const value = 'Value Update';
        await expect(inputField).toHaveValue(value);

        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<TextBox, BaseArgTypes>('omni-text-box');

export const Hint = HintStory<TextBox, BaseArgTypes>('omni-text-box');

export const ErrorLabel = ErrorStory<TextBox, BaseArgTypes>('omni-text-box');

export const Value = ValueStory<TextBox, BaseArgTypes>('omni-text-box');

export const Prefix = PrefixStory<TextBox, BaseArgTypes>('omni-text-box');

export const Suffix = SuffixStory<TextBox, BaseArgTypes>('omni-text-box');

export const Disabled = DisabledStory<TextBox, BaseArgTypes>('omni-text-box');

