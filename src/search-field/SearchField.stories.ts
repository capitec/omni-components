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
        prefix: '',
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
