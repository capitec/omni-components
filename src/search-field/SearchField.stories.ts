import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgTypes,
    BaseArgTypeDefinitions,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote, raw } from '../utils/StoryUtils';
import './SearchField.js';
import { SearchField } from './SearchField.js';

export default {
    title: 'UI Components/Search Field',
    component: 'omni-search-field',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-search-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

const heroes = [
    'Batman',
    'Superman',
    'Wonder Woman',
    'Flash',
    'Aquaman',
    'Green Lantern',
    'Shazam',
];

export const Interactive = {
    render: (args: BaseArgTypes) => html`
        <omni-search-field
            data-testid="test-search-field"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"         
        >
        ${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}
        </omni-search-field>
    `,
    name: 'Interactive',
    parameters: {},
    args: {
        label: 'Label',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix:  raw`<div style="padding: 8px 15px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M8.5.25a8.25 8.25 0 0 1 6.34 13.529l7.683 7.684a.75.75 0 0 1-.976 1.133l-.084-.073-7.684-7.683A8.25 8.25 0 1 1 8.5.25Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Z"/></svg></div>`,
        suffix: ''
    },
    play: async (context: StoryContext) => {
        const searchField= within(context.canvasElement).getByTestId<SearchField>('test-search-field');
        const input = jest.fn();
        searchField.addEventListener('input', input);    

        const inputField = searchField.shadowRoot.getElementById('inputField');

        const searchValue = 'Batman';
        await userEvent.type(inputField, searchValue);
        await expect(inputField).toHaveValue(searchValue);
        await expect(heroes.includes(searchValue)).toBeTruthy();
        await expect(input).toBeCalledTimes(searchValue.length);
    }
};

export const Label = LabelStory<SearchField, BaseArgTypes>('omni-search-field');

export const Hint = HintStory<SearchField, BaseArgTypes>('omni-search-field');

export const ErrorLabel = ErrorStory<SearchField, BaseArgTypes>('omni-search-field');

export const Value = ValueStory<SearchField, BaseArgTypes>('omni-search-field');

export const Prefix = PrefixStory<SearchField, BaseArgTypes>('omni-search-field');

export const Suffix = SuffixStory<SearchField, BaseArgTypes>('omni-search-field');

export const Disabled = DisabledStory<SearchField, BaseArgTypes>('omni-search-field');
