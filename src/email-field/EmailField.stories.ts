import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LabelStory, BaseArgs, HintStory, ErrorStory, DisabledStory, ValueStory, PrefixStory, SuffixStory } from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { EmailField } from './EmailField.js';

import './EmailField.js';

export default {
    title: 'UI Components/Email Field',
    component: 'omni-email-field'
} as CSFIdentifier;

export const Interactive: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`
    <omni-email-field
      data-testid="test-email-field"
      label="${ifNotEmpty(args.label)}"
      .value="${args.value}"
      .data="${args.data}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-email-field
    >
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
        suffix: ''
    },
    play: async (context) => {
        const textField = within(context.canvasElement).getByTestId<EmailField>('test-email-field');
        const input = jest.fn();
        textField.addEventListener('input', input);

        const inputField = textField.shadowRoot.getElementById('inputField');

        await userEvent.type(inputField, 'Value Update', {
            pointerEventsCheck: 0
        });
        const value = 'Value Update';
        await expect(inputField).toHaveValue(value);

        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<EmailField, BaseArgs>('omni-email-field');

export const Hint = HintStory<EmailField, BaseArgs>('omni-email-field');

export const Error_Label = ErrorStory<EmailField, BaseArgs>('omni-email-field');

export const Value = ValueStory<EmailField, BaseArgs>('omni-email-field');

export const Prefix = PrefixStory<EmailField, BaseArgs>('omni-email-field');

export const Suffix = SuffixStory<EmailField, BaseArgs>('omni-email-field');

export const Disabled = DisabledStory<EmailField, BaseArgs>('omni-email-field');