import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
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

import './NumberField.js';
interface Args extends BaseArgs {
    maxLength: number;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-number-field
      data-testid="test-number-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      max-length=${args.maxLength}
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-number-field>
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
        maxLength: undefined
    }
};

export const Max_Length: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-number-field
            data-testid="test-number-field"
            label="${ifNotEmpty(args.label)}"
            value="${args.value}"
            max-length=${ifDefined(args.maxLength)}>
        </omni-number-field>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniNumberField } from "@capitec/omni-components-react/number-field";

const App = () => <OmniNumberField${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''}${
                args.maxLength ? ` max-length='${args.maxLength}'` : ''
            }/>;`
        }
    ],
    name: 'Max Length',
    description: 'Limit the character input length based on the value provided.',
    args: {
        label: 'Max Length',
        maxLength: 5
    }
};

export const Label = LabelStory<BaseArgs>('omni-number-field');
export const Hint = HintStory<BaseArgs>('omni-number-field');
export const Error_Label = ErrorStory<BaseArgs>('omni-number-field');
export const Value = ValueStory<BaseArgs>('omni-number-field', 123);
export const Clearable = ClearableStory<BaseArgs>('omni-number-field', 123);
export const Custom_Clear_Slot = CustomClearableSlot<BaseArgs>('omni-number-field', 123);
export const Prefix = PrefixStory<BaseArgs>('omni-number-field');
export const Suffix = SuffixStory<BaseArgs>('omni-number-field');
export const Disabled = DisabledStory<BaseArgs>('omni-number-field', 123);
