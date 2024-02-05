import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    DisabledStory,
    ErrorStory,
    HintStory,
    LabelStory,
    PrefixStory,
    SuffixStory,
    ValueStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, assignToSlot, getSourceFromLit } from '../utils/StoryUtils.js';

import './MobileField.js';

interface Args extends BaseArgs {
    countryCode: boolean;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args) => html`
    <omni-mobile-field
      data-testid="test-mobile-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?country-code="${args.countryCode}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-mobile-field>
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
        prefix: '',
        suffix: '',
        clear: '',
        countryCode: true
    }
};

export const Label = LabelStory<BaseArgs>('omni-mobile-field');
export const Hint = HintStory<BaseArgs>('omni-mobile-field');
export const Error_Label = ErrorStory<BaseArgs>('omni-mobile-field');
export const Value = ValueStory<BaseArgs>('omni-mobile-field', 123);
export const Clearable = ClearableStory<BaseArgs>('omni-mobile-field', 123);
export const Custom_Clear_Slot = CustomClearableSlot<BaseArgs>('omni-mobile-field', 123);
export const Prefix = PrefixStory<BaseArgs>('omni-mobile-field');
export const Suffix = SuffixStory<BaseArgs>('omni-mobile-field');
export const Disabled = DisabledStory<BaseArgs>('omni-mobile-field', 123);
