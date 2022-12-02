/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote, querySelectorAsync } from '../utils/StoryUtils';
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
    items:
        | string[]
        | object[]
        | Promise<object[]>
        | Promise<string[]>
        | (() => string[] | object[] | Promise<object[]> | Promise<string[]>);
    displayField: string;
    idField: string;
    renderItem: RenderFunction;
}

const displayItems = [
    { id: '1', label: 'Peter Parker' },
    { id: '2', label: 'James Howlett' },
    { id: '3', label: 'Tony Stark' },
    { id: '4', label: 'Steve Rodgers' },
    { id: '5', label: 'Bruce Banner' }
];

const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];

async function promiseDisplayItems(data: object[]) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    return data;
}

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
        displayField: 'label',
        idField: 'id'
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);
        await userEvent.click(select);

        await expect(click).toBeCalledTimes(2);

        const controlButton = select.shadowRoot.getElementById('control');

        await expect(controlButton).toBeTruthy();

        await userEvent.click(select);

        const itemContainer = await querySelectorAsync(select.shadowRoot, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot.getElementById('items');
        await expect(items).toBeTruthy();

        const item = await querySelectorAsync(select.shadowRoot, '.item');

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);

        await expect(change).toBeCalledTimes(1);
    }
};

export const AsyncItems = {
    render: (args: ArgTypes) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            .renderItem="${args.renderItem}"
            idField="${args.idField}">
        </omni-select>
    `,
    name: 'Promise',
    parameters: {},
    args: {
        label: 'Promise',
        data: {},
        items: promiseDisplayItems(displayItems),
        displayField: 'label',
        idField: 'id'
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot, '.item');
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const AsyncPerItem = {
    render: (args: ArgTypes) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            .renderItem="${args.renderItem}"
            idField="${args.idField}">
        </omni-select>
    `,
    name: 'Async',
    parameters: {},
    args: {
        label: 'Async',
        data: {},
        items: () => promiseDisplayItems(displayItems),
        displayField: 'label',
        idField: 'id',
        renderItem: async (item: any) => {
            await new Promise((resolve, reject) => {
                // Setting 2000 ms time
                setTimeout(resolve, 2000);
            });
            const i = document.createElement('i');
            i.innerText = item.label;
            i.style.color = 'red';

            return i;
        }
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot, '.item');
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const StringArray = {
    render: (args: ArgTypes) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            .renderItem="${args.renderItem}"
            idField="${args.idField}">
        </omni-select>
    `,
    name: 'String',
    parameters: {},
    args: {
        label: 'String',
        data: {},
        items: stringItems,
        displayField: 'label',
        idField: 'id'
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot, '.item');
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(stringItems[0]);
    }
};

export const Empty = {
    render: (args: ArgTypes) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            idField="${args.idField}">
        </omni-select>
    `,
    name: 'Empty',
    parameters: {},
    args: {
        label: 'Empty',
        items: [],
        displayField: 'label',
        idField: 'id'
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);
        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot, '.none');
        await expect(item).toHaveTextContent('No items provided');
    }
};

export const Disabled = {
    render: (args: ArgTypes) => html`
        <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?disabled="${args.disabled}">
        </omni-select>
    `,
    name: 'Disabled',
    parameters: {},
    args: {
        label: 'Disabled',
        disabled: true,
        items: displayItems
    } as ArgTypes,
    play: async (context: StoryContext) => {
        // To be updated with the new branch changes
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        await expect(() => userEvent.click(select)).not.toBe(true);
    }
};

export const Label = LabelStory<Select, BaseArgTypes>('omni-select');

export const Hint = HintStory<Select, BaseArgTypes>('omni-select');

export const ErrorLabel = ErrorStory<Select, BaseArgTypes>('omni-select');

export const Prefix = PrefixStory<Select, BaseArgTypes>('omni-select');

export const Suffix = SuffixStory<Select, BaseArgTypes>('omni-select');
