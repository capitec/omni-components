import { within } from '@testing-library/dom';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, raw } from '../utils/StoryUtils.js';
import { Icon } from './Icon.js';
import './Icon.js';

const sizeOptions = ['default', 'extra-small', 'small', 'medium', 'large'] as const;

export default {
    title: 'UI Components/Icon',
    component: 'omni-icon'
} as CSFIdentifier;

interface Args {
    size: (typeof sizeOptions)[number];
    icon: string;
    symmetrical: boolean;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->
        <omni-icon 
            data-testid="test-icon" 
            size="${ifNotEmpty(args.size)}" 
            icon="${ifNotEmpty(args.icon)}"
            ?symmetrical=${args.symmetrical}>
            ${unsafeHTML(args['[Default Slot]'])}
        </omni-icon>
    `,
    name: 'Interactive',
    args: {
        size: 'default',
        '[Default Slot]': raw`<svg
    version="1.1"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%">
    <g transform="translate(-2,-2)">
        <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
    </g>
</svg>`,
        icon: undefined as unknown as string
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const slotElement = icon.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};

export const SVG: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`<omni-icon data-testid="test-icon" size="${args.size}">${unsafeHTML(args['[Default Slot]'])}</omni-icon>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";

const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.symmetrical ? ` symmetrical` : ''}>
                    <svg
                        version="1.1"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%">
                        <g transform="translate(-2,-2)">
                            <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
                        </g>
                    </svg>
                  </OmniIcon>;`
        }
    ],
    name: 'SVG',
    description: 'Set html/svg content to display as an icon.',
    args: {
        size: 'large',
        '[Default Slot]': raw`
            <svg
                version="1.1"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%">
                <g transform="translate(-2,-2)">
                  <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
                </g>
              </svg>
        `
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const slotElement = icon.shadowRoot?.querySelector('slot') as HTMLSlotElement;
        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};

export const Local_Source: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";
            
/*
    Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly
*/
const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.icon ? ` icon='${args.icon}'` : ''}${args.symmetrical ? ` symmetrical` : ''}/>;`,
            disableCodePen: true
        },
        {
            framework: 'HTML',
            disableCodePen: true
        }
    ],
    name: 'Local Source',
    description: 'Set the icon to display as a local source file.',
    args: {
        size: 'default',
        icon: './assets/images/colors.svg'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const imgElement = icon.shadowRoot?.querySelector('img') as HTMLImageElement;
        await expect(imgElement).toBeTruthy();
        await expect(imgElement.src.endsWith(context.args.icon.replace('./', '/'))).toBeTruthy();
    }
};

export const Remote_Source: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";
            
/*
    Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly
*/
const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.icon ? ` icon='${args.icon}'` : ''}${args.symmetrical ? ` symmetrical` : ''}/>;`
        }
    ],
    name: 'Remote Source',
    description: 'Set the icon to display as a remote file.',
    args: {
        size: 'default',
        icon: 'https://img.shields.io/badge/Source-remote-lightgrey.svg'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const imgElement = icon.shadowRoot?.querySelector('img') as HTMLImageElement;
        await expect(imgElement).toBeTruthy();
        await expect(imgElement?.src).toEqual(context.args.icon);
    }
};

export const Material: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Add Material to your project, e.g. Adding below link in <head>-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <!-- ------------------------------------------------------------- -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";

/*
<!-- Add Material to your project, e.g. Adding below link in <head>-->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<!-- ------------------------------------------------------------- -->
*/
const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.icon ? ` icon='${args.icon}'` : ''}${args.symmetrical ? ` symmetrical` : ''}/>;`
        }
    ],
    description: 'Set the icon to display as a font icon from the Material Icons library.',
    args: {
        size: 'default',
        icon: '@material/receipt_long'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const materialElement = icon.shadowRoot?.querySelector<HTMLElement>('.material-icon');
        await expect(materialElement).toBeTruthy();
        await expect(materialElement?.innerText).toEqual(Material.args?.icon?.replace('@material/', ''));
    }
};

export const Asymmetrical: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-icon 
            data-testid="test-icon" 
            size="${args.size}" 
            ?symmetrical=${args.symmetrical}>
            <svg 
                viewBox="0 0 138 26" 
                fill="none" 
                stroke-width="2.3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                width="100%"
                height="100%"
                title="CodePen">
                    <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
                </svg>
        </omni-icon>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";

const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.symmetrical ? ` symmetrical` : ''}>
                    <svg 
                        viewBox="0 0 138 26" 
                        fill="none" 
                        stroke-width="2.3" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                        width="100%"
                        height="100%"
                        title="CodePen">
                            <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
                    </svg>
                  </OmniIcon>;`
        }
    ],
    description: () => html`Renders the icon by aligning only the inner height to the <strong>size</strong> attribute, this is the default behavior.`,
    args: {
        size: 'large',
        symmetrical: false
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const svg = icon.querySelector('svg') as SVGElement;
        await expect(svg.clientWidth).not.toEqual(svg.clientHeight);
    }
};

export const Symmetrical: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-icon 
            data-testid="test-icon" 
            size="${args.size}" 
            ?symmetrical=${args.symmetrical}>
            <svg 
                viewBox="0 0 138 26" 
                fill="none" 
                stroke-width="2.3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                width="100%"
                height="100%"
                title="CodePen">
                    <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
                </svg>
        </omni-icon>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniIcon } from "@capitec/omni-components-react/icon";

const App = () => <OmniIcon${args.size ? ` size='${args.size}'` : ''}${args.symmetrical ? ` symmetrical` : ''}>
                    <svg 
                        viewBox="0 0 138 26" 
                        fill="none" 
                        stroke-width="2.3" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                        width="100%"
                        height="100%"
                        title="CodePen">
                            <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
                    </svg>
                  </OmniIcon>;`
        }
    ],
    description: () =>
        html`Renders the icon by aligning both the inner height and width to the <strong>size</strong> attribute, creating a 1:1 aspect ratio.`,
    args: {
        size: 'large',
        symmetrical: true
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const svg = icon.querySelector('svg') as SVGElement;
        await expect(svg.clientWidth).toEqual(svg.clientHeight);
    }
};
