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

import './PinField.js';
import '../icons/Check.icon.js';
import '../icons/LockOpen.icon.js';
import '../icons/LockClosed.icon.js';

interface Args extends BaseArgs {
    hide: string;
    show: string;
    maxLength: number;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-pin-field
      data-testid="test-pin-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      max-length=${args.maxLength}
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}">${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.hide ? html`${'\r\n'}${unsafeHTML(assignToSlot('hide', args.hide))}` : nothing}${
        args.show ? html`${'\r\n'}${unsafeHTML(assignToSlot('show', args.show))}` : nothing
    }</omni-pin-field>
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
        clear: '',
        hide: '',
        show: '',
        maxLength: undefined
    }
};

export const Max_Length: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-pin-field
      data-testid="test-pin-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      max-length=${ifDefined(args.maxLength)}>
    </omni-pin-field>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniPinField } from "@capitec/omni-components-react/pin-field";

const App = () => <OmniPinField${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''}${
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

export const Label = LabelStory<BaseArgs>('omni-pin-field');

export const Hint = HintStory<BaseArgs>('omni-pin-field');

export const Error_Label = ErrorStory<BaseArgs>('omni-pin-field');

export const Value = ValueStory<BaseArgs>('omni-pin-field', '1234');

export const Clearable = ClearableStory<BaseArgs>('omni-pin-field', '1234');

export const Custom_Clear_Slot = CustomClearableSlot<BaseArgs>('omni-pin-field', '1234');

export const Prefix = PrefixStory<BaseArgs>('omni-pin-field');

export const Suffix = SuffixStory<BaseArgs>('omni-pin-field');

export const Disabled = DisabledStory<BaseArgs>('omni-pin-field', '1234');
