import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    HintStory,
    ErrorStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';
import { ColorField } from './ColorField.js';

import './ColorField.js';

export const Interactive: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`
    <omni-color-field
      data-testid="test-color-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
       ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-color-field
    >
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
        data: {},
        hint: '',
        error: '',
        disabled: false,
        clearable: false,
        prefix: '',
        suffix: '',
        clear: ''
    }
};

export const Label = LabelStory<ColorField, BaseArgs>('omni-color-field');

export const Hint = HintStory<ColorField, BaseArgs>('omni-color-field');

export const Error_Label = ErrorStory<ColorField, BaseArgs>('omni-color-field');

export const Value = ValueStory<ColorField, BaseArgs>('omni-color-field', '#f6b73c');

export const Clearable = ClearableStory<ColorField, BaseArgs>('omni-color-field', '#f6b73c');

export const Custom_Clear_Slot = CustomClearableSlot<ColorField, BaseArgs>('omni-color-field', '#f6b73c');

export const Prefix = PrefixStory<ColorField, BaseArgs>('omni-color-field');

export const Suffix = SuffixStory<ColorField, BaseArgs>('omni-color-field');

export const Disabled: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`<omni-color-field data-testid="test-field" label="${ifNotEmpty(args.label)}" disabled></omni-color-field>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniColorField } from "@capitec/omni-components-react/color-field";

const App = () => <OmniColorField${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                )
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true
    }
};
