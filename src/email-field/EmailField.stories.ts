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
      value="${args.value}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-email-field>
  `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: ''
    },
    play: async (context) => {
        const emailField = within(context.canvasElement).getByTestId<EmailField>('test-email-field');
        emailField.value = '';

        const input = jest.fn();
        emailField.addEventListener('input', input);

        const inputField = emailField.shadowRoot?.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);

        await userEvent.type(inputField as Element, 'johndoe@gmail.com', {
            pointerEventsCheck: 0
        });
        const value = 'johndoe@gmail.com';

        await waitFor(() => expect(inputField).toHaveValue(value), {
            timeout: 3000
        });
        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<EmailField, BaseArgs>('omni-email-field');

export const Hint = HintStory<EmailField, BaseArgs>('omni-email-field');

export const Error_Label = ErrorStory<EmailField, BaseArgs>('omni-email-field');

export const Value = ValueStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');

export const Clear = ClearableStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');

export const Prefix = PrefixStory<EmailField, BaseArgs>('omni-email-field');

export const Suffix = SuffixStory<EmailField, BaseArgs>('omni-email-field');

export const Disabled = DisabledStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');
