import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
    CustomClearableSlot,
    HintStory,
    ErrorStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import { Select, SelectItems, SelectTypes } from './Select.js';

import './Select.js';

export interface Args extends BaseArgs {
    items: SelectItems | (() => SelectItems);
    displayField: string;
    emptyMessage: string;
    idField: string;
    renderItem: RenderFunction;
    renderSelection: RenderFunction;
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

async function promiseSearchFilter(filterValue: string) {
    await new Promise<void>((r) => setTimeout(() => r(), 2000));
    return customSearch(filterValue, stringItems);
}

function customSearch(filterValue: string, items: SelectTypes) {
    if (Array.isArray(items) && filterValue) {
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
            .renderSelection="${args.renderSelection}"
            .filterItems="${args.filterItems}"
            id-field="${args.idField}"
            ?disabled="${args.disabled}"
            ?clearable="${args.clearable}"
            ?searchable="${args.searchable}"
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
    frameworkSources: [
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Interactive.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="displayItems"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `window.vueData = {
    displayItems: ${JSON.stringify(args.items, undefined, 2)}
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Interactive.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) => content.replace('replace-token="x"', '.items="${displayItems}"')
                    ),
                jsFragment: (args) => `const displayItems = ${JSON.stringify(args.items, undefined, 2)};`
            }
        },
        {
            framework: 'HTML',
            load: (args) =>
                getSourceFromLit(
                    Interactive.render!(args),
                    (container) => (container.firstElementChild!.id = 'omni-select'),
                    (content) =>
                        content +
                        `
<script defer>
    const displayItems = ${JSON.stringify(args.items, undefined, 2)};       
    const select = document.getElementById('omni-select');
    select.items = displayItems;
</script>`
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
        searchable: false,
        prefix: '',
        suffix: '',
        clear: '',
        items: displayItems as Record<string, unknown>[],
        displayField: 'label',
        idField: 'id',
        loading_indicator: '',
        emptyMessage: 'No items provided'
    } as Args
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
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Async_Per_Item.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="promiseDisplayItems" :render-item.camel="renderItem"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `window.vueData = {
    promiseDisplayItems: async () => {
        await new Promise((r) => setTimeout(() => r(), 2000));
        return [
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
    },
    renderItem: async (item) => {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item.label;
        i.style.color = 'red';
    
        return i;
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" display-field="${args.displayField}" .items="\${() => promiseDisplayItems(displayItems)}" .renderItem="\${renderItem}" id-field="${args.idField}"></omni-select>`,
                jsFragment: (args) => `const displayItems = [
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
            
const promiseDisplayItems = async (data) => {
    await new Promise((r) => setTimeout(() => r(), 2000));
    return data;
}
            
const renderItem = async (item) => {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item.label;
    i.style.color = 'red';

    return i;
}
`
            }
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
    } as Args
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
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" display-field="${args.displayField}" .items="\${() => promiseDisplayItems(displayItems)}" .renderItem="\${renderItem}" id-field="${args.idField}">
    <span slot="loading_indicator">...</span>
</omni-select>`,
                jsFragment: `const displayItems = [
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
            
const promiseDisplayItems = async (data) => {
    await new Promise((r) => setTimeout(() => r(), 2000));
    return data;
}
            
const renderItem = async (item) => {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item.label;
    i.style.color = 'red';

    return i;
}
`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Loading_Slot.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="promiseDisplayItems" :render-item.camel="renderItem"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `window.vueData = {
    promiseDisplayItems: async () => {
        await new Promise((r) => setTimeout(() => r(), 2000));
        return [
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
    },
    renderItem: async (item) => {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item.label;
        i.style.color = 'red';
    
        return i;
    }
};`
            }
        },
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
    } as Args
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
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" display-field="${args.displayField}" .items="\${stringItems}" id-field="${args.idField}"></omni-select>`,
                jsFragment: `const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" display-field="${args.displayField}" .items="stringItems" id-field="${args.idField}"></omni-select>`,
                jsFragment: `window.vueData = {
    stringItems: ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan']
};`
            }
        },
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
        items: stringItems,
        displayField: 'label',
        idField: 'id'
    } as Args
};

export const Selection_Renderer: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-select
            data-testid="test-select"
            label="${ifNotEmpty(args.label)}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            .renderSelection="${args.renderSelection}"
            value="${args.value}"
            .items="${args.items}"
            display-field="${args.displayField}"
            id-field="${args.idField}">
        </omni-select>
    `,
    frameworkSources: [
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" .items="\${stringItems}" .renderSelection="\${renderSelection}" value="${args.value}"></omni-select>`,
                jsFragment: `const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];

async function renderSelection(item) {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item;
    i.style.color = 'blue';
    return i;
}`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" .items="stringItems" :render-selection.camel="renderSelection" value="${args.value}"></omni-select>`,
                jsFragment: (args) => `window.vueData = {
    stringItems: ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'],
    renderSelection: async (item) => {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item;
        i.style.color = 'blue';
        return i;
    }
};`
            }
        },
        {
            framework: 'HTML',
            load: (args) => `
            
<omni-select
    id="omni-select"
    value="${args.value}"
    label="${args.label}">
</omni-select>
<script defer>
    const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];  
    select = document.getElementById('omni-select');


    async function renderSelection(item) {
        await new Promise((resolve, reject) => {
            // Setting 2000 ms time
            setTimeout(resolve, 2000);
        });
        const i = document.createElement('i');
        i.innerText = item;
        i.style.color = 'blue';
        return i;
    }

    select.renderSelection = renderSelection;
    select.items = stringItems;
</script>
`
        },
        {
            framework: 'React',
            load: (args) => `import { OmniSelect } from "@capitec/omni-components-react/select";

async function renderSelection(item) {
    await new Promise((resolve, reject) => {
        // Setting 2000 ms time
        setTimeout(resolve, 2000);
    });
    const i = document.createElement('i');
    i.innerText = item;
    i.style.color = 'blue';
    return i;
}
const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];    
const App = () => <OmniSelect label="${args.label}" value="${args.value}" items={stringItems} renderSelection={renderSelection}/>;`
        }
    ],
    name: 'Selection Renderer',
    description: 'Provide a function to render custom html content for the selection.',
    args: {
        label: 'Selection Renderer',
        items: stringItems,
        renderSelection: async (item: any) => {
            await new Promise((resolve, reject) => {
                // Setting 2000 ms time
                setTimeout(resolve, 2000);
            });
            const i = document.createElement('i');
            i.innerText = item;
            i.style.color = 'blue';
            return i;
        },
        value: 'Clark Kent'
    } as Args
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
    } as Partial<Args>
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
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled.render!(args), undefined, (content) =>
                    content
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' clearable', ' :clearable="true"')
                        .replace(' searchable', ' :searchable="true"')
                )
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true,
        items: displayItems as Record<string, unknown>[]
    } as Args
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
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" .items="\${stringItems}">
    <svg slot="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
    <svg slot="more" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
</omni-select>`,
                jsFragment: `const stringItems = ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan'];`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Custom_Control_Slot.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="stringItems"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `window.vueData = {
    stringItems: ['Bruce Wayne', 'Clark Kent', 'Barry Allen', 'Arthur Curry', 'Hal Jordan']
};`
            }
        },
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
    } as Args
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
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" display-field="${args.displayField}" .items="\${displayItems}" id-field="${args.idField}" searchable></omni-select>`,
                jsFragment: `const displayItems = [
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
];`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Searchable.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="displayItems"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `window.vueData = {
    displayItems: [
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
    ]
};`
            }
        },
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
    } as Args
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
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}"  .items="\${stringItems}" .filterItems="\${customSearch}" searchable></omni-select>`,
                jsFragment: `const stringItems = [
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
`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Custom_Search.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="stringItems" :filter-items.camel="customSearch"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `function itemFilter(filter, item){
    return item.includes(filter);
}

window.vueData = {
    stringItems: [
        'Bruce Wayne', 
        'Clark Kent', 
        'Barry Allen', 
        'Arthur Curry', 
        'Hal Jordan'
    ],
    customSearch: (filter, items) => {
        if(Array.isArray(items) && filter !== null) {
            return items = items.filter((i) => itemFilter(filter,i));
        } else {
            return items;
        }
    }
};`
            }
        },
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
    } as Args
};

export const Server_Side_Filtering: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?searchable="${args.searchable}">
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) => raw`<omni-select label="${args.label}" .items="\${serverSideFilterItems}" searchable></omni-select>`,
                jsFragment: `const stringItems = [
    'Bruce Wayne', 
    'Clark Kent', 
    'Barry Allen', 
    'Arthur Curry', 
    'Hal Jordan'
];

async function serverSideFilterItems(filter){
    await new Promise((r) => setTimeout(() => r(), 2000));
    return customSearch(filter,stringItems);
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
`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Server_Side_Filtering.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="serverSideFilterItems"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: (args) => `const stringItems = [
    'Bruce Wayne', 
    'Clark Kent', 
    'Barry Allen', 
    'Arthur Curry', 
    'Hal Jordan'
];

async function serverSideFilterItems(filter){
    await new Promise((r) => setTimeout(() => r(), 2000));
    return customSearch(filter,stringItems);
}

function customSearch(filter, items){
    if(Array.isArray(items) && filter) {
        return items = items.filter((i) => itemFilter(filter,i));
    } else {
        return items;
    }
}
function itemFilter(filter, item){
    return item.includes(filter);
}
window.vueData = {
    serverSideFilterItems: serverSideFilterItems
};`
            }
        },
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
        async function searchFilter(filter){
            await new Promise((r) => setTimeout(() => r(), 2000));
            return customSearch(filter,stringItems);
        }
        
        function customSearch(filter, items){
            if(Array.isArray(items) && filter) {
                return items = items.filter((i) => itemFilter(filter,i));
            } else {
                return items;
            }
        }

        function itemFilter(filter, item){
            return item.includes(filter);
        }
        select = document.getElementById('omni-select');
        select.items = searchFilter;
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
async function searchFilter(filter){
    await new Promise((r) => setTimeout(() => r(), 2000));
    return customSearch(filter,stringItems);
}
function customSearch(filter, items){
    if(Array.isArray(items) && filter){
        return items = items.filter((i) => itemFilter(filter,i));
    } else {
        return items;
    }
}
function itemFilter(filter, item){
    return item.includes(filter);
}

const App = () => <OmniSelect label="${args.label}" items={searchFilter} searchable></OmniSelect>`
        }
    ],
    name: 'Server Side Filtering',
    description: 'Select with server side filtering',
    args: {
        label: 'Server Side Filtering',
        searchable: true,
        items: promiseSearchFilter
    } as Args
};

export const Custom_Search_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-select data-testid="test-select" label="${ifNotEmpty(args.label)}" .items="${args.items}" ?searchable="${args.searchable}">
    <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
    </omni-select>
`,
    frameworkSources: [
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    raw`<omni-select label="${args.label}" .items="\${stringItems}" searchable>
    <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
</omni-select>`,
                jsFragment: `const stringItems = [
    'Bruce Wayne', 
    'Clark Kent', 
    'Barry Allen', 
    'Arthur Curry', 
    'Hal Jordan'
];  `
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        Custom_Search_Slot.render!(args),
                        (container) => container.firstElementChild?.setAttribute('replace-token', 'x'),
                        (content) =>
                            content
                                .replace('replace-token="x"', '.items="stringItems"')
                                .replace(' disabled', ' :disabled="true"')
                                .replace(' clearable', ' :clearable="true"')
                                .replace(' searchable', ' :searchable="true"')
                    ),
                jsFragment: `const stringItems = [
    'Bruce Wayne', 
    'Clark Kent', 
    'Barry Allen', 
    'Arthur Curry', 
    'Hal Jordan'
];
window.vueData = {
    stringItems: stringItems
};`
            }
        },
        {
            framework: 'HTML',
            load: (args) => `
            <omni-select id='omni-select' label="${args.label}" searchable>
              <svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
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
<svg slot="search-clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
</OmniSelect>`
        }
    ],
    name: 'Custom Search Field Slot',
    description: 'Select component with search field custom slotted icon.',
    args: {
        label: 'Custom Search Slot',
        searchable: true,
        items: stringItems
    } as Args
};

export const Label = LabelStory<Select, BaseArgs>('omni-select');

export const Hint = HintStory<Select, BaseArgs>('omni-select');

export const Error_Label = ErrorStory<Select, BaseArgs>('omni-select');

export const Clearable = ClearableStory<Select, BaseArgs>('omni-select');

export const Custom_Clear_Slot = CustomClearableSlot<Select, BaseArgs>('omni-select');

export const Prefix = PrefixStory<Select, BaseArgs>('omni-select');

export const Suffix = SuffixStory<Select, BaseArgs>('omni-select');
