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
import './SearchField.js';
import { SearchField } from './SearchField.js';

export default {
    title: 'UI Components/Search Field',
    component: 'omni-search-field'
} as CSFIdentifier;

export const Interactive: ComponentStoryFormat<BaseArgs> = {
    render: (args: BaseArgs) => html`
        <omni-search-field
            data-testid="test-search-field"
            label="${ifNotEmpty(args.label)}"
            value="${args.value}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}">${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-search-field>
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
        const searchField = within(context.canvasElement).getByTestId<SearchField>('test-search-field');
        const interaction = jest.fn();
        const click = jest.fn();
        searchField.addEventListener('input', interaction);
        searchField.addEventListener('click', click);

        const inputField = searchField.shadowRoot?.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);

        const value = 'Batman';
        await userEvent.type(inputField, value);

        // TODO: Fix race conditions in tests
        await waitFor(() => expect(inputField).toHaveValue(value), {
            timeout: 3000
        });
        await waitFor(() => expect(interaction).toBeCalledTimes(value.length), {
            timeout: 3000
        });

        const clearButton = searchField.shadowRoot?.getElementById(`clear-click`) as HTMLElement;
        await userEvent.click(clearButton);

        await waitFor(() => expect(inputField).toHaveValue(''), {
            timeout: 3000
        });
    }
};

export const Label = LabelStory<SearchField, BaseArgs>('omni-search-field');

export const Hint = HintStory<SearchField, BaseArgs>('omni-search-field');

export const ErrorLabel = ErrorStory<SearchField, BaseArgs>('omni-search-field');

export const Value = ValueStory<SearchField, BaseArgs>('omni-search-field');

export const Clear = ClearableStory<SearchField, BaseArgs>('omni-search-field', 'Clear my name');

export const Prefix = PrefixStory<SearchField, BaseArgs>('omni-search-field');

export const Suffix = SuffixStory<SearchField, BaseArgs>('omni-search-field');

export const Disabled = DisabledStory<SearchField, BaseArgs>('omni-search-field');
