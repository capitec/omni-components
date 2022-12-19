/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LabelStory, BaseArgs, HintStory, ErrorStory, PrefixStory, SuffixStory } from '../core/OmniInputStories.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw } from '../utils/StoryUtils.js';
import { Select, SelectItems, SelectTypes } from './Select.js';

import './Select.js';

export default {
    title: 'UI Components/Select',
    component: 'omni-select'
} as CSFIdentifier;

interface Args extends BaseArgs {
    items: SelectItems | (() => SelectItems);
    displayField: string;
    idField: string;
    renderItem: RenderFunction;
    loading_indicator: string;
}

const displayItems = [
    { id: '1', label: 'Peter Parker' },
    { id: '2', label: 'James Howlett' },
    { id: '3', label: 'Tony Stark' },
    { id: '4', label: 'Steve Rodgers' },
    { id: '5', label: 'Bruce Banner' },
    { id: '6', label: 'Wanda Maximoff' },
    { id: '7', label: 'TChalla' },
    { id: '8', label: 'Henry P. McCoy' },
    { id: '9', label: 'Carl Lucas' },
    { id: '10', label: 'Frank Castle' }
];

const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];

async function promiseDisplayItems(data: Record<string, unknown>[]) {
    await new Promise<void>((r) => setTimeout(() => r(), 2000));
    return data as SelectTypes;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
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
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }
            ${args.loading_indicator ? html`${'\r\n'}${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}${'\r\n'}` : nothing}${
        args.prefix || args.suffix ? '\r\n' : nothing
    }</omni-select
        >
    `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: '',
        items: displayItems as Record<string, unknown>[],
        displayField: 'label',
        idField: 'id',
        loading_indicator: ''
    } as Args,
    play: async (context) => {
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

export const Async_Per_Item: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
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
    args: {
        label: 'Async item renderer function',
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
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);

        let item;
        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            item = await querySelectorAsync(select.shadowRoot, '.item', undefined, 3000);
        } else {
            item = await querySelectorAsync(select.shadowRoot, '.item', undefined, 5000);
        }
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const Loading_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
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
            ${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}
        </omni-select>
    `,
    name: 'Loading Slot',
    args: {
        label: 'Loading Slot',
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
        },
        loading_indicator: raw`<span>...</span>`
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        const change = jest.fn();
        select.addEventListener('click', click);
        select.addEventListener('change', change);

        await userEvent.click(select);

        let item;
        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            item = await querySelectorAsync(select.shadowRoot, '.item', undefined, 3000);
        } else {
            item = await querySelectorAsync(select.shadowRoot, '.item', undefined, 5000);
        }
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const String_Array: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
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
    args: {
        label: 'String',
        data: {},
        items: stringItems,
        displayField: 'label',
        idField: 'id'
    } as Args,
    play: async (context) => {
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

export const Empty: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            idField="${args.idField}">
        </omni-select>
    `,
    name: 'Empty',
    args: {
        label: 'Empty',
        items: [],
        displayField: 'label',
        idField: 'id'
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);
        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot, '.none');
        await expect(item).toHaveTextContent('No items provided');
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?disabled="${args.disabled}">
        </omni-select>
    `,
    name: 'Disabled',
    args: {
        label: 'Disabled',
        disabled: true,
        items: displayItems as Record<string, unknown>[]
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);
        await expect(() => userEvent.click(select)).rejects.toThrow(/pointer-events: none/);
        await expect(click).toBeCalledTimes(0);
    }
};

export const Label = LabelStory<Select, BaseArgs>('omni-select');

export const Hint = HintStory<Select, BaseArgs>('omni-select');

export const Error_Label = ErrorStory<Select, BaseArgs>('omni-select');

export const Prefix = PrefixStory<Select, BaseArgs>('omni-select');

export const Suffix = SuffixStory<Select, BaseArgs>('omni-select');
