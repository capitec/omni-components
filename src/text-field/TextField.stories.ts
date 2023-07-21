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
import { assignToSlot, ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';
import { TextField } from './TextField.js';

import './TextField.js';

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
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-text-field>
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

export const Label = LabelStory<TextField, BaseArgs>('omni-text-field');

export const Hint = HintStory<TextField, BaseArgs>('omni-text-field');

export const Error_Label = ErrorStory<TextField, BaseArgs>('omni-text-field');

export const Value = ValueStory<TextField, BaseArgs>('omni-text-field');

export const Clearable = ClearableStory<TextField, BaseArgs>('omni-text-field');

export const Custom_Clear_Slot = CustomClearableSlot<TextField, BaseArgs>('omni-text-field');

export const Prefix = PrefixStory<TextField, BaseArgs>('omni-text-field');

export const Suffix = SuffixStory<TextField, BaseArgs>('omni-text-field');

export const Disabled = DisabledStory<TextField, BaseArgs>('omni-text-field');
