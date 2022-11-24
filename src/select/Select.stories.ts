import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
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
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote } from '../utils/StoryUtils';
import { Select } from './Select.js';

import './Select.js';

export default {
    title: 'UI Components/Select',
    component: 'omni-select',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-select'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

interface ArgTypes extends BaseArgTypes {
    items: Array<unknown>;
    selectedItem: string;
    placeHolder: string;
    inline: boolean;
    displayField: string;
    idField: string;
    renderItem: RenderFunction;
}

const displayItems = [
    {id:'1', label: 'Peter Parker'},
    {id:'2', label: 'James Howlett'},
    {id:'3', label: 'Tony Stark'},
    {id:'4', label: 'Steve Rodgers'},
    {id:'5', label: 'Bruce Banner'}
];

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            selectedItem="${args.selectedItem}"
            display-field="${args.displayField}"
            .renderItem="${args.renderItem}"
            idField="${args.idField}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-select
        >
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
        suffix: '',
        items: displayItems,
        selectedItem:'',
        placeHolder: '',
        inline: false,
        displayField: 'label',
        idField: 'id'

    } as ArgTypes,
    play: async (context: StoryContext) => {
        const Select = within(context.canvasElement).getByTestId<Select>('test-select');
        const input = jest.fn();
        Select.addEventListener('input', input);
    }
};
/*
export const Label = LabelStory<Select, BaseArgTypes>('omni-select');

export const Hint = HintStory<Select, BaseArgTypes>('omni-select');

export const ErrorLabel = ErrorStory<Select, BaseArgTypes>('omni-select');

export const Value = ValueStory<Select, BaseArgTypes>('omni-select');

export const Prefix = PrefixStory<Select, BaseArgTypes>('omni-select');

export const Suffix = SuffixStory<Select, BaseArgTypes>('omni-select');

export const Disabled = DisabledStory<Select, BaseArgTypes>('omni-select');

*/
