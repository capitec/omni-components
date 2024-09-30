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

import './PasswordField.js';
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
    <omni-password-field
      data-testid="test-password-field"
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
    }</omni-password-field>
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
        show: ''
    }
};

export const Max_Length: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-password-field
            data-testid="test-password-field"
            label="${ifNotEmpty(args.label)}"
            value="${args.value}"
            max-length=${ifDefined(args.maxLength)}>
        </omni-password-field>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniPasswordField } from "@capitec/omni-components-react/password-field";

const App = () => <OmniPasswordField${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''}${
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

export const Label = LabelStory<BaseArgs>('omni-password-field');
export const Hint = HintStory<BaseArgs>('omni-password-field');
export const Error_Label = ErrorStory<BaseArgs>('omni-password-field');
export const Value = ValueStory<BaseArgs>('omni-password-field', 'Password123');
export const Clearable = ClearableStory<BaseArgs>('omni-password-field', 'Password123');
export const Custom_Clear_Slot = CustomClearableSlot<BaseArgs>('omni-password-field', 'Password123');
export const Prefix = PrefixStory<BaseArgs>('omni-password-field');
export const Suffix = SuffixStory<BaseArgs>('omni-password-field');
export const Disabled = DisabledStory<BaseArgs>('omni-password-field', 'Password123');

export const Custom_Icon_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
      <omni-lock-open-icon style="fill: orange;" slot="show"></omni-lock-open-icon>
      <omni-lock-closed-icon style="fill: lightgreen;" slot="hide"></omni-lock-closed-icon>
    </omni-password-field>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniPasswordField } from "@capitec/omni-components-react/password-field";
import { OmniLockClosedIcon,OmniLockOpenIcon } from "@capitec/omni-components-react/icons";

const App = () => <OmniPasswordField${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}>
                    <OmniLockOpenIcon style={{fill: 'orange'}} slot="show"/>
                    <OmniLockClosedIcon style={{fill: 'lightgreen'}} slot="hide"/>
                  </OmniPasswordField>;`
        }
    ],
    name: 'Custom Icon Slot',
    description: 'Set html content to display as the visibility indicators of the field.',
    args: {
        label: 'Custom Icon Slot'
    }
};
