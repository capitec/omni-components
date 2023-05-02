/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync } from '../utils/StoryUtils.js';
import { RenderElement, RenderFunction } from './RenderElement.js';

import './RenderElement';

export default {
    title: 'UI Components/RenderElement',
    component: 'omni-render-element'
} as CSFIdentifier;

interface Args {
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
    span.addEventListener('click', (ev: MouseEvent) => (clicked ? clicked() : alert('Clicked')));
    return span;
}

async function renderAsString(data: object) {
    await new Promise<void>((r) => setTimeout(() => r(), 3000));
    return `<span>${JSON.stringify(data)}</span>`;
}

export const Lit_Template: ComponentStoryFormat<Args> = {
    frameworkSources: [
        {
            framework: 'HTML',
            load: () => `
 
<script type="module">
    import { html } from 'https://unpkg.com/lit/index.js?module';
    import { render } from 'https://unpkg.com/lit-html/lit-html.js?module';

    const someData = {
        hello: 'world',
        'other-data': false
    };
    async function renderAsLit(data) {
        await new Promise((r) => setTimeout(() => r(), 3000));
        return html\`<span>\${JSON.stringify(data)}</span>\`;
    }

    render(html\`                
        <omni-render-element 
            .data="\${someData}" 
            .renderer="\${renderAsLit}">
        </omni-render-element>
    \`, document.getElementById('root'));
</script>  
<div id="root"></div>
`
            // disableCodePen: true
        },
        {
            framework: 'React',
            load: () => `import { OmniRenderElement } from "@capitec/omni-components-react/render-element";
import { html } from 'https://unpkg.com/lit/index.js?module';

async function renderAsLit(data) {
    await new Promise((r) => setTimeout(() => r(), 3000));
    return html\`<span>\${JSON.stringify(data)}</span>\`;
}
const App = () => <OmniRenderElement renderer={renderAsLit} data={{
                    hello: 'world',
                    'other-data': false
                  }}/>;`
        }
    ],
    name: 'Lit Template',
    description: 'Render a Lit template string from the renderer function.',
    render: (args: Args) => html`
    <omni-render-element data-testid="test-render" .data="${args.data}" .renderer="${args.renderer}"
      >${
          args.loading_indicator ? html`${'\r\n'}${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}${'\r\n'}` : nothing
      }</omni-render-element
    >
  `,
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsLit,
        loading_indicator: ''
    } as Args,
    play: async (context) => {
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = JSON.parse(JSON.stringify(context.args.data));

        // await expect(renderElement.renderRoot.querySelector('omni-loading-icon')).toBeTruthy();

        console.log(`Running as '${navigator.userAgent}'`);
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
            await new Promise<void>((r) => setTimeout(() => r(), 3000));
        } else {
            await new Promise<void>((r) => setTimeout(() => r(), 10000));
        }

        const span1 = await querySelectorAsync(renderElement.renderRoot, 'span');
        await expect(span1).toHaveTextContent(JSON.stringify(data));

        data.hello = 'everyone';
        renderElement.data = { ...data };

        const loading = await querySelectorAsync(renderElement.renderRoot, 'omni-loading-icon');
        await expect(loading).toBeTruthy();

        const span2 = await querySelectorAsync(renderElement.renderRoot, 'span');
        await expect(span2).toHaveTextContent(JSON.stringify(data));

        // Cleanup
        renderElement.data = context.args.data;
    }
};

let clicked = () => alert('Clicked');
export const HTML_Element_Instance: ComponentStoryFormat<Args> = {
    render: (args: Args) => {
        const addValues = async () => {
            let renderEl: RenderElement = undefined as any;
            while (!renderEl) {
                await new Promise<void>((r) => setTimeout(() => r(), 200));
                renderEl = document.getElementById('renderElI') as RenderElement;
            }

            renderEl.renderer = args.renderer;
            renderEl.data = args.data;
        };
        addValues();
        return html` <omni-render-element id="renderElI" data-testid="test-render"></omni-render-element> `;
    },
    name: 'HTML Element Instance',
    description: 'Render an HTMLElement instance from the renderer function.',
    frameworkSources: [
        {
            framework: 'HTML',
            load: () => `
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
</script>`
        },
        {
            framework: 'React',
            load: () => `import { OmniRenderElement } from "@capitec/omni-components-react/render-element";

async function renderAsElement(data) {
    await new Promise((r) => setTimeout(() => r(), 3000));
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(JSON.stringify(data)));
    span.addEventListener('click', (ev) => alert('Clicked'));
    return span;
}
const App = () => <OmniRenderElement renderer={renderAsElement} data={{
                    hello: 'world',
                    'other-data': false
                  }}/>;`
        }
    ],
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsElement
    } as Args,
    play: async (context) => {
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = JSON.parse(JSON.stringify(context.args.data));
        clicked = jest.fn();

        // await expect(renderElement.renderRoot.querySelector('omni-loading-icon')).toBeTruthy();

        console.log(`Running as '${navigator.userAgent}'`);
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
            await new Promise<void>((r) => setTimeout(() => r(), 3000));
        } else {
            await new Promise<void>((r) => setTimeout(() => r(), 10000));
        }

        const span1 = (await querySelectorAsync(renderElement.renderRoot, 'span')) as HTMLSpanElement;
        await expect(span1).toHaveTextContent(JSON.stringify(data));

        data.hello = 'everyone';
        renderElement.data = { ...data };

        const load = await querySelectorAsync(renderElement.renderRoot, 'omni-loading-icon');
        await expect(load).toBeTruthy();

        const span2 = (await querySelectorAsync(renderElement.renderRoot, 'span')) as HTMLSpanElement;
        await expect(span2).toHaveTextContent(JSON.stringify(data));
        await userEvent.click(span2, {
            pointerEventsCheck: 0
        });
        await userEvent.click(span2, {
            pointerEventsCheck: 0
        });
        await expect(clicked).toBeCalledTimes(2);

        clicked = () => alert('Clicked');

        // Cleanup
        renderElement.data = context.args.data;
    }
};

export const HTML_String: ComponentStoryFormat<Args> = {
    render: (args: Args) => {
        const addValues = async () => {
            let renderEl: RenderElement = undefined as any;
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
    name: 'HTML String',
    description: 'Render a string from the renderer function as html.',
    frameworkSources: [
        {
            framework: 'HTML',
            load: () => `
<omni-render-element id="renderElS"></omni-render-element>
<script defer>
    async function renderAsString(data) {
        await new Promise((r) => setTimeout(() => r(), 3000));
        return \`<span>\${JSON.stringify(data)}</span>\`;
    }
    renderEl = document.getElementById('renderElS');


    renderEl.renderer = renderAsString;
    renderEl.data = {
            hello: 'world',
            'other-data': false
    };
</script>`
        },
        {
            framework: 'React',
            load: () => `import { OmniRenderElement } from "@capitec/omni-components-react/render-element";

async function renderAsString(data) {
    await new Promise((r) => setTimeout(() => r(), 3000));
    return \`<span>\${JSON.stringify(data)}</span>\`;
}
const App = () => <OmniRenderElement renderer={renderAsString} data={{
                    hello: 'world',
                    'other-data': false
                  }}/>;`
        }
    ],
    args: {
        data: {
            hello: 'world',
            'other-data': false
        },
        renderer: renderAsString
    } as Args,
    play: async (context) => {
        const renderElement = within(context.canvasElement).getByTestId<RenderElement>('test-render');
        const data = JSON.parse(JSON.stringify(context.args.data));

        // await expect(renderElement.renderRoot.querySelector('omni-loading-icon')).toBeTruthy();

        console.log(`Running as '${navigator.userAgent}'`);
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
            await new Promise<void>((r) => setTimeout(() => r(), 3000));
        } else {
            await new Promise<void>((r) => setTimeout(() => r(), 10000));
        }

        const span1 = await querySelectorAsync(renderElement.renderRoot, 'span');
        await expect(span1).toHaveTextContent(JSON.stringify(data));

        data.hello = 'everyone';
        renderElement.data = { ...data };

        const loading = await querySelectorAsync(renderElement.renderRoot, 'omni-loading-icon');
        await expect(loading).toBeTruthy();

        const span2 = await querySelectorAsync(renderElement.renderRoot, 'span');
        await expect(span2).toHaveTextContent(JSON.stringify(data));

        // Cleanup
        renderElement.data = context.args.data;
    }
};
