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
import './SearchField.js';
import { SearchField } from './SearchField.js';

export const Interactive: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`
        <omni-search-field
            data-testid="test-search-field"
            label="${ifNotEmpty(args.label)}"
            value="${args.value}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}">${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
            ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix || args.clear ? '\r\n' : nothing}</omni-search-field>
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

export const Label = LabelStory<SearchField, BaseArgs>('omni-search-field');

export const Hint = HintStory<SearchField, BaseArgs>('omni-search-field');

export const Error_Label = ErrorStory<SearchField, BaseArgs>('omni-search-field');

export const Value = ValueStory<SearchField, BaseArgs>('omni-search-field');

export const Clearable = ClearableStory<SearchField, BaseArgs>('omni-search-field', 'Clear my name');

export const Custom_Clear_Slot = CustomClearableSlot<SearchField, BaseArgs>('omni-search-field', 'Clear my name');

export const Prefix = PrefixStory<SearchField, BaseArgs>('omni-search-field');

export const Suffix = SuffixStory<SearchField, BaseArgs>('omni-search-field');

export const Disabled = DisabledStory<SearchField, BaseArgs>('omni-search-field');
