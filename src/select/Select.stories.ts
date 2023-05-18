/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlotIcon,
    HintStory,
    ErrorStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
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
    emptyMessage: string;
    idField: string;
    renderItem: RenderFunction;
    searchable: boolean;
    loading_indicator: string;
    filterItems: (filterValue: string, items: SelectTypes) => SelectItems;
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

async function promiseSearchFilter(filterValue: string, items: SelectTypes) {
    await new Promise<void>((r) => setTimeout(() => r(), 2000));
    return customSearch(filterValue, items);
}

function customSearch(filterValue: string, items: SelectTypes) {
    if (Array.isArray(items) && filterValue !== null) {
        return (items = (items as (string | Record<string, unknown>)[]).filter((i) => itemFilter(filterValue, i)) as SelectTypes);
    } else {
        return items;
    }
}

function itemFilter(filterValue: string, item: string | Record<string, unknown>) {
    return item.toString().toLowerCase().includes(filterValue.toLowerCase());
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            value="${args.value}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            .renderItem="${args.renderItem}"
            .filterItems="${args.filterItems}"
            id-field="${args.idField}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}"
            ?seearchable="${args.searchable}"
            empty-message="${args.emptyMessage}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
            ${args.clear ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args.clear))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }
            ${args.loading_indicator ? html`${'\r\n'}${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}${'\r\n'}` : nothing}${
        args.prefix || args.suffix || args.clear ? '\r\n' : nothing
    }</omni-select
        >
    `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        clearable: false,
        searchable: false,
        prefix: '',
        suffix: '',
        clear: '',
        items: displayItems as Record<string, unknown>[],
        displayField: 'label',
        idField: 'id',
        loading_indicator: '',
        emptyMessage: 'No items provided'
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

        const controlButton = select.shadowRoot?.getElementById('control');

        await expect(controlButton).toBeTruthy();

        await userEvent.click(select);

        const itemContainer = await querySelectorAsync(select!.shadowRoot!, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot?.getElementById('items');
        await expect(items).toBeTruthy();

        const item = await querySelectorAsync(select!.shadowRoot!, '.item');

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
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
            id-field="${args.idField}">
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `
            
<omni-select
    id="omni-select"
    label="${args.label}"
    display-field="${args.displayField}"
    id-field="${args.idField}">
</omni-select>
<script defer>
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
                
    async function promiseDisplayItems(data) {
        await new Promise((r) => setTimeout(() => r(), 2000));
        return data;
    }
                
    async function renderItem(item) {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item.label;
        i.style.color = 'red';

        return i;
    }       
    select = document.getElementById('omni-select');


    select.renderItem = renderItem;
    select.items = () => promiseDisplayItems(displayItems);
</script>
`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

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
            
async function promiseDisplayItems(data) {
    await new Promise((r) => setTimeout(() => r(), 2000));
    return data;
}
            
async function renderItem(item) {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item.label;
    i.style.color = 'red';

    return i;
}           
const App = () => <OmniSelect label="${args.label}" display-field="${args.displayField}" id-field="${args.idField}" items={() => promiseDisplayItems(displayItems)} renderItem={renderItem} />;`
        }
    ],
    name: 'Async',
    description: 'Render each item from an async function.',
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
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 3000);
        } else {
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 5000);
        }
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
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
            id-field="${args.idField}">
            ${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `
            
<omni-select
    id="omni-select"
    label="${args.label}"
    display-field="${args.displayField}"
    id-field="${args.idField}">
    <span slot="loading_indicator">...</span>
</omni-select>
<script defer>
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
                
    async function promiseDisplayItems(data) {
        await new Promise((r) => setTimeout(() => r(), 2000));
        return data;
    }
                
    async function renderItem(item) {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item.label;
        i.style.color = 'red';

        return i;
    }       
    select = document.getElementById('omni-select');


    select.renderItem = renderItem;
    select.items = () => promiseDisplayItems(displayItems);
</script>
`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

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
            
async function promiseDisplayItems(data) {
    await new Promise((r) => setTimeout(() => r(), 2000));
    return data;
}
            
async function renderItem(item) {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item.label;
    i.style.color = 'red';

    return i;
}           
const App = () => <OmniSelect label="${args.label}" display-field="${args.displayField}" id-field="${args.idField}" items={() => promiseDisplayItems(displayItems)} renderItem={renderItem}>
                    <span slot="loading_indicator">...</span>
                  </OmniSelect>;`
        }
    ],
    name: 'Loading Slot',
    description: 'Set html content to render while populating items list.',
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
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 3000);
        } else {
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 5000);
        }
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const String_Array: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            id-field="${args.idField}">
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `
            
<omni-select
    id="omni-select"
    label="${args.label}"
    display-field="${args.displayField}"
    id-field="${args.idField}">
</omni-select>
<script defer>
    const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];  
    select = document.getElementById('omni-select');

    select.items = stringItems;
</script>
`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];    
const App = () => <OmniSelect label="${args.label}" display-field="${args.displayField}" id-field="${args.idField}" items={stringItems} />;`
        }
    ],
    name: 'String',
    description: 'Use a string array as the items source.',
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

        const item = await querySelectorAsync(select.shadowRoot!, '.item');
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(stringItems[0]);
    }
};

export const Empty_Message: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            .items="${args.items}"
            display-field="${args.displayField}"
            empty-message="${args.emptyMessage}"
            id-field="${args.idField}">
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";
              
const App = () => <OmniSelect label="${args.label}" display-field="${args.displayField}" empty-message="${args.emptyMessage}" id-field="${args.idField}"/>;`
        }
    ],
    name: 'Empty Message',
    description: 'Set a text value to display when there are no items.',
    args: {
        label: 'Empty',
        items: [],
        emptyMessage: 'No items provided',
        displayField: 'label',
        idField: 'id'
    } as Partial<Args>,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);
        await userEvent.click(select);

        const item = await querySelectorAsync(select.shadowRoot!, '.none');
        await expect(item).toHaveTextContent(context.args.emptyMessage);
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?disabled="${args.disabled}">
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

const App = () => <OmniSelect label="${args.label}" disabled/>;`
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
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

export const Custom_Control_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}">
            <svg slot="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
            <svg slot="more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `
            
<omni-select
    id="omni-select"
    label="${args.label}">
        <svg slot="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
        <svg slot="more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
</omni-select>
<script defer>
    const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];    

    select = document.getElementById('omni-select');
    select.items = stringItems;
</script>
`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];           
const App = () => <OmniSelect label="${args.label}" items={stringItems}>                    
                    <svg slot="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
                    <svg slot="more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
                  </OmniSelect>;`
        }
    ],
    name: 'Custom Control Slot',
    description: 'Set html content to display within the available control slots.',
    args: {
        label: 'Custom slots',
        items: stringItems
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');

        if (!window.matchMedia ? window.innerWidth >= 767 : window.matchMedia('screen and (min-width: 767px)').matches) {
            const slotElement = select.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=arrow]');
            await expect(slotElement).toBeTruthy();

            const foundSlottedSvgElement = slotElement?.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
            await expect(foundSlottedSvgElement).toBeTruthy();
        } else {
            const slotElement = select.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=more]');
            await expect(slotElement).toBeTruthy();

            const foundSlottedSvgElement = slotElement?.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
            await expect(foundSlottedSvgElement).toBeTruthy();
        }
    }
};

export const Searchable: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" display-field="${args.displayField}" id-field="${
        args.idField
    }" ?searchable="${args.searchable}">
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (
                args
            ) => `<omni-select id='omni-select' label="${args.label}" display-field="${args.displayField}" id-field="${args.idField}" searchable></omni-select>
        <script defer>
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
            select = document.getElementById('omni-select');
            select.items = displayItems;
        </script>`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

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

        const App = () => <OmniSelect label="${args.label}" display-field="${args.displayField}" id-field="${args.idField}" items={displayItems} searchable></OmniSelect>`
        }
    ],
    name: 'Searchable',
    description: 'Adds a search input to limit the options to Select',
    args: {
        label: 'Searchable',
        displayField: 'label',
        idField: 'id',
        searchable: true,
        items: displayItems as Record<string, unknown>[]
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);

        await userEvent.click(select);

        const searchField = (await querySelectorAsync(select!.shadowRoot!, '#searchField')) as HTMLInputElement;
        await expect(searchField).toBeTruthy();

        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(searchField);
        await userEvent.click(searchField);

        const value = 'Peter';
        await userEvent.type(searchField, value);

        //Add check to find the items-container once the component is opened.
        const itemContainer = await querySelectorAsync(select!.shadowRoot!, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot?.getElementById('items');
        await expect(items).toBeTruthy();

        const item = await querySelectorAsync(select!.shadowRoot!, '.item');

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(displayItems[0].label);
    }
};

export const Custom_Search: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?searchable="${args.searchable}" .filterItems="${
        args.filterItems
    }">
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `<omni-select id='omni-select' label="${args.label}" searchable></omni-select>
    <script defer>
        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ];  
        function customSearch(filter, items){
            if(Array.isArray(items) && filter !== null) {
                return items = items.filter((i) => itemFilter(filter,i));
            } else {
                return items;
            }
        }
        function itemFilter(filter, item){
            return item.includes(filter);
        }
        select = document.getElementById('omni-select');
        select.items = stringItems;
        select.filterItems = customSearch;
    </script>`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ];
        function customSearch(filter, items){
            if(Array.isArray(items) && filter !== null){
                return items = items.filter((i) => itemFilter(filter,i));
            } else {
                return items;
            }
        }
        function itemFilter(filter, item){
            return item.includes(filter);
        }

        const App = () => <OmniSelect label="${args.label}" items={stringItems} filterItems={customSearch} searchable>
        </OmniSelect>`
        }
    ],
    name: 'Custom Search',
    description: 'Custom search function',
    args: {
        label: 'Custom Search',
        searchable: true,
        items: stringItems,
        filterItems: customSearch
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);

        await userEvent.click(select);

        const searchField = (await querySelectorAsync(select!.shadowRoot!, '#searchField')) as HTMLInputElement;
        await expect(searchField).toBeTruthy();

        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(searchField);
        await userEvent.click(searchField);

        const value = 'Bruce';
        await userEvent.type(searchField, value);

        //Add check to find the items-container once the component is opened.
        const itemContainer = await querySelectorAsync(select!.shadowRoot!, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot?.getElementById('items');
        await expect(items).toBeTruthy();

        const item = await querySelectorAsync(select!.shadowRoot!, '.item');

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(stringItems[0]);
    }
};

export const Server_Side_Filtering: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?searchable="${args.searchable}" .filterItems="${
        args.filterItems
    }">
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `<omni-select id='omni-select' label="${args.label}" searchable></omni-select>
    <script defer>
        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ]; 
        async function searchFilter(filter,items){
            await new Promise((r) => setTimeout(() => r(), 2000));
            return customSearch(filter,items);
        }
        
        function customSearch(filter, items){
            if(Array.isArray(items) && filter !== null) {
                return items = items.filter((i) => itemFilter(filter,i));
            } else {
                return items;
            }
        }
        function itemFilter(filter, item){
            return item.includes(filter);
        }
        select = document.getElementById('omni-select');
        select.items = stringItems;
        select.filterItems = searchFilter;
    </script>`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ];
        async function searchFilter(filter, items){
            await new Promise((r) => setTimeout(() => r(), 2000));
            return customSearch(filter,items);
        }
        function customSearch(filter, items){
            if(Array.isArray(items) && filter !== null){
                return items = items.filter((i) => itemFilter(filter,i));
            } else {
                return items;
            }
        }
        function itemFilter(filter, item){
            return item.includes(filter);
        }

        const App = () => <OmniSelect label="${args.label}" items={stringItems} filterItems={searchFilter} searchable></OmniSelect>`
        }
    ],
    name: 'Server Side Filtering',
    description: 'Select with server side filtering',
    args: {
        label: 'Server Side Filtering',
        searchable: true,
        items: stringItems,
        filterItems: promiseSearchFilter
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);

        await userEvent.click(select);

        const searchField = (await querySelectorAsync(select!.shadowRoot!, '#searchField')) as HTMLInputElement;
        await expect(searchField).toBeTruthy();

        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(searchField);
        await userEvent.click(searchField);

        const value = 'Bruce';
        await userEvent.type(searchField, value);

        //Add check to find the items-container once the component is opened.
        const itemContainer = await querySelectorAsync(select!.shadowRoot!, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot?.getElementById('items');
        await expect(items).toBeTruthy();

        let item;
        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 3000);
        } else {
            item = await querySelectorAsync(select.shadowRoot!, '.item', undefined, 5000);
        }

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(stringItems[0]);
    }
};

export const Custom_Search_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?searchable="${args.searchable}">
        <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => `
            <omni-select id='omni-select' label="${args.label}" searchable>
                <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
            </omni-select>
    <script defer>
        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ];  
        select = document.getElementById('omni-select');
        select.items = stringItems;
    </script>`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

        const stringItems = [
            'Bruce Wayne', 
            'Clark Kent', 
            'Barry Allen', 
            'Arthur Curry', 
            'Hal Jordan'
        ];

        const App = () => <OmniSelect label="${args.label}" items={stringItems} searchable>
        <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
        </OmniSelect>`
        }
    ],
    name: 'Custom Search Clear Icon',
    description: 'Select component with a custom search field clear icon',
    args: {
        label: 'Custom Search Icon',
        searchable: true,
        items: stringItems
    } as Args,
    play: async (context) => {
        const select = within(context.canvasElement).getByTestId<Select>('test-select');
        const click = jest.fn();
        select.addEventListener('click', click);

        await userEvent.click(select);

        const searchField = (await querySelectorAsync(select!.shadowRoot!, '#searchField')) as HTMLInputElement;
        await expect(searchField).toBeTruthy();

        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(searchField);
        await userEvent.click(searchField);

        const value = 'Bruce';
        await userEvent.type(searchField, value);

        //Add check to find the items-container once the component is opened.
        const itemContainer = await querySelectorAsync(select!.shadowRoot!, '#items-container');
        await expect(itemContainer).toBeTruthy();

        const items = select.shadowRoot?.getElementById('items');
        await expect(items).toBeTruthy();

        const item = await querySelectorAsync(select!.shadowRoot!, '.item');

        await expect(item).toBeTruthy();
        await userEvent.click(item as HTMLDivElement);

        const selectField = select.shadowRoot?.getElementById('select');
        await expect(selectField).toHaveValue(stringItems[0]);
    }
};

export const Label = LabelStory<Select, BaseArgs>('omni-select');

export const Hint = HintStory<Select, BaseArgs>('omni-select');

export const Error_Label = ErrorStory<Select, BaseArgs>('omni-select');

export const Clearable = ClearableStory<Select, BaseArgs>('omni-select');

export const Custom_Clear_Slot_Icon = CustomClearableSlotIcon<Select, BaseArgs>('omni-select');

export const Prefix = PrefixStory<Select, BaseArgs>('omni-select');

export const Suffix = SuffixStory<Select, BaseArgs>('omni-select');
