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
      ?clearable="${args.clearable}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-email-field>
  `,
    frameworkSources: [
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
        value: '',
        hint: '',
        error: '',
        disabled: false,
        clearable: false,
        prefix: '',
        suffix: '',
        clear: ''
    }
};

export const Label = LabelStory<EmailField, BaseArgs>('omni-email-field');

export const Hint = HintStory<EmailField, BaseArgs>('omni-email-field');

export const Error_Label = ErrorStory<EmailField, BaseArgs>('omni-email-field');

export const Value = ValueStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');

export const Clearable = ClearableStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');

export const Custom_Clear_Slot = CustomClearableSlot<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');

export const Prefix = PrefixStory<EmailField, BaseArgs>('omni-email-field');

export const Suffix = SuffixStory<EmailField, BaseArgs>('omni-email-field');

export const Disabled = DisabledStory<EmailField, BaseArgs>('omni-email-field', 'johndoe@gmail.com');
