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
    size: typeof sizeOptions[number];
    icon: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${ifNotEmpty(args.size)}" icon="${ifNotEmpty(args.icon)}">
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
    height="100%"
  >
    <g transform="translate(-2,-2)">
      <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
    </g>
  </svg>`,
        icon: undefined as string
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const slotElement = icon.shadowRoot.querySelector('slot');
        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};

export const SVG: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-icon data-testid="test-icon" size="${args.size}"> ${unsafeHTML(args['[Default Slot]'])} </omni-icon> `,
    name: 'SVG',
    description: 'Set html/svg content to display as an icon',
    args: {
        size: 'large',
        '[Default Slot]': raw`
            <svg
                version="1.1"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
              >
                <g transform="translate(-2,-2)">
                  <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
                </g>
              </svg>
              `
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const slotElement = icon.shadowRoot.querySelector('slot');
        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};

export const Icon_Path: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
  `,
    name: 'Local Source',
    description: 'Set the icon to display as a local source file',
    args: {
        size: 'default',
        icon: './assets/images/colors.svg'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const imgElement = icon.shadowRoot.querySelector('img');
        await expect(imgElement).toBeTruthy();
        await expect(imgElement.src.endsWith(Icon_Path.args.icon.replace('./', '/'))).toBeTruthy();
    }
};

export const URL: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
  `,
    name: 'Remote Source',
    description: 'Set the icon to display as a remote file',
    args: {
        size: 'default',
        icon: 'https://img.shields.io/badge/Source-remote-lightgrey.svg'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const imgElement = icon.shadowRoot.querySelector('img');
        await expect(imgElement).toBeTruthy();
        await expect(imgElement.src).toEqual(URL.args.icon);
    }
};

export const Material: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <!-- Add Material to your project, e.g. Adding below link in <head>-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <!-- ------------------------------------------------------------- -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"> </omni-icon>
  `,
    description: 'Set the icon to display as a font icon from the Material Icons library',
    args: {
        size: 'default',
        icon: '@material/receipt_long'
    },
    play: async (context) => {
        const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
        const materialElement = icon.shadowRoot.querySelector<HTMLElement>('.material-icon');
        await expect(materialElement).toBeTruthy();
        await expect(materialElement.innerText).toEqual(Material.args.icon.replace('@material/', ''));
    }
};
