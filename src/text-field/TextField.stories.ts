import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory,
    ClearableStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { TextField } from './TextField.js';

import './TextField.js';

export default {
    title: 'UI Components/Text Field',
    component: 'omni-text-field'
} as CSFIdentifier;

export const Interactive: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`
    <omni-text-field
      data-testid="test-text-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-text-field>
  `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        clearable: true,
        prefix: '',
        suffix: ''
    },
    play: async (context) => {
        const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
        textField.value = '';

        const input = jest.fn();
        textField.addEventListener('input', input);

        const inputField = textField.shadowRoot?.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);

        await userEvent.type(inputField, 'Value Update', {
            pointerEventsCheck: 0
        });
        const value = 'Value Update';
        await expect(inputField).toHaveValue(value);

        await expect(input).toBeCalledTimes(value.length);
    }
};

export const Label = LabelStory<TextField, BaseArgs>('omni-text-field');

export const Hint = HintStory<TextField, BaseArgs>('omni-text-field');

export const Error_Label = ErrorStory<TextField, BaseArgs>('omni-text-field');

export const Value = ValueStory<TextField, BaseArgs>('omni-text-field');

export const Clear = ClearableStory<TextField, BaseArgs>('omni-text-field');

export const Prefix = PrefixStory<TextField, BaseArgs>('omni-text-field');

export const Suffix = SuffixStory<TextField, BaseArgs>('omni-text-field');

export const Disabled = DisabledStory<TextField, BaseArgs>('omni-text-field');
