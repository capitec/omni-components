/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { within } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { assignToSlot } from '../utils/StoryUtils.js';
import { RenderElement, RenderFunction } from './RenderElement.js';

import './RenderElement';

export default {
    title: 'UI Components/RenderElement',
    component: 'omni-render-element'
} as Meta;

interface ArgTypes {
    renderer: RenderFunction;
    data: object;
    loading_indicator: string;
}

async function renderAsLit(data: object) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    return html`<span>${JSON.stringify(data)}</span>`;
}

async function renderAsElement(data: object) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(JSON.stringify(data)));
    span.addEventListener('click', (ev: MouseEvent) => alert('Clicked'));
    return span;
}

async function renderAsString(data: object) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    return `<span>${JSON.stringify(data)}</span>`;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-render-element data-testid="test-render" .data="${args.data}" .renderer="${args.renderer}">${args.loading_indicator ? html`${'\r\n'}${unsafeHTML(assignToSlot('loading_indicator',args.loading_indicator))}${'\r\n'}` : nothing}</omni-render-element>
    `,
    argTypes: {
        renderer: {
            control: false
        }
    },
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsLit,
        loading_indicator: ''
    } as ArgTypes,
    play: async (context: StoryContext) => {
        await new Promise<void>((r) => setTimeout(() => r(), 10000));
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = context.args.data as any;
        data.hello = 'everyone';
        renderElement.data = { ...data };
    }
};

export const AsLit = {
    ...Interactive,
    parameters: {
        docs: {
            source: {
                code: `
                
<!-- Bound function used (<script> tags only for syntax highlighting) -->
<script>
async function renderAsLit(data: object) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    return html\`<span>\${JSON.stringify(data)}</span>\`;
}
</script>

...
                
<omni-render-element .data="\${this.someData}" .renderer="\${this.renderAsLit}"></omni-render-element>
`,
                language: 'html'
            }
        }
    },
    name: 'As Lit'
};

export const AsHTMLElement = {
    render: (args: ArgTypes) => {
        const addValues = async () => {
            let renderEl: RenderElement = undefined;
            while (!renderEl) {
                await new Promise<void>((r) => setTimeout(() => r(), 200));
                renderEl = document.getElementById('renderElI') as RenderElement;
            }

            renderEl.renderer = args.renderer;
            renderEl.data = args.data;
        };
        addValues();
        return html`
            <script defer>
                async function renderAsElement(data) {
                    await new Promise((r) => setTimeout(() => r(), 3000));
                    const span = document.createElement('span');
                    span.appendChild(document.createTextNode(JSON.stringify(data)));
                    span.addEventListener('click', (ev) => alert('Clicked'));
                    return span;
                }
                renderEl = document.getElementById('renderElI');

                renderEl.renderer = renderAsElement;
                renderEl.data = {
                    hello: 'world',
                    'other-data': false
                };
            </script>
            <omni-render-element id="renderElI" data-testid="test-render"></omni-render-element>
        `;
    },
    name: 'As HTML Element',
    parameters: {
        docs: {
            source: {
                code: `
<omni-render-element id="renderElI"></omni-render-element>
<script defer>
    async function renderAsElement(data) {
        await new Promise((r) => setTimeout(() => r(), 3000));
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(JSON.stringify(data)));
        span.addEventListener('click', (ev) => alert('Clicked'));
        return span;
    }
    renderEl = document.getElementById('renderElI');


    renderEl.renderer = renderAsElement;
    renderEl.data = {
            hello: 'world',
            'other-data': false
    };
</script>`,
                language: 'html'
            }
        }
    },
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsElement
    } as ArgTypes,
    play: async (context: StoryContext) => {
        await new Promise<void>((r) => setTimeout(() => r(), 10000));
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = context.args.data as any;
        data.hello = 'everyone';
        renderElement.data = { ...data };
    }
};

export const AsString = {
    render: (args: ArgTypes) => {
        const addValues = async () => {
            let renderEl: RenderElement = undefined;
            while (!renderEl) {
                renderEl = document.getElementById('renderElS') as RenderElement;
                if (!renderEl) await new Promise<void>((r) => setTimeout(() => r(), 200));
            }

            renderEl.renderer = args.renderer;
            renderEl.data = args.data;
        };
        addValues();
        return html` <omni-render-element id="renderElS" data-testid="test-render"> </omni-render-element> `;
    },
    name: 'As String',
    parameters: {
        docs: {
            source: {
                code: `
<omni-render-element id="renderElS"></omni-render-element>
<script defer>
    async function renderAsString(data) {
        await new Promise<void>((r) => setTimeout(() => r(), 3000));
        return \`<span>\${JSON.stringify(data)}</span>\`;
    }
    renderEl = document.getElementById('renderElS');


    renderEl.renderer = renderAsString;
    renderEl.data = {
            hello: 'world',
            'other-data': false
    };
</script>`,
                language: 'html'
            }
        }
    },
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsString
    } as ArgTypes,
    play: async (context: StoryContext) => {
        await new Promise<void>((r) => setTimeout(() => r(), 10000));
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = AsString.args.data as any;
        data.hello = 'everyone';
        renderElement.data = { ...data };
    }
};
