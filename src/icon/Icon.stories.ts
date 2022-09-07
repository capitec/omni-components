import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote, loadDefaultSlotForRemote, raw } from '../utils/StoryUtils';
import { Icon } from './Icon.js';
import './Icon.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default {
  title: 'UI Components/Icon',
  component: 'omni-icon',
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'extra-small', 'small', 'medium', 'large'],
    },
    slot: {
      control: 'text',
      description: loadDefaultSlotForRemote('omni-icon').description
    }
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-icon'),
  },
} as Meta;

interface ArgTypes {
  size: string;
  icon: string;
  slot: string;
}

export const Interactive = {
  render: (args: ArgTypes) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${ifNotEmpty(args.size)}" icon="${ifNotEmpty(args.icon)}">
      ${unsafeHTML(args.slot)}
    </omni-icon>
  `,
  name: 'Interactive',
  parameters: {},
  args: {
    size: 'default',
    slot: raw`<svg
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
    icon: undefined as string,
  },
  play: async (context: StoryContext) => {
      const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
      const slotElement = icon.shadowRoot.querySelector('slot');
      const foundSlottedSvgElement = slotElement
          .assignedElements()
          .find((e) => e.tagName.toLowerCase() === 'svg');
      await expect(foundSlottedSvgElement).toBeTruthy();
  }
};

export const SVG = {
  render: (args: ArgTypes) => html`
    <omni-icon data-testid="test-icon" size="${args.size}"> 
      ${unsafeHTML(args.slot)} 
    </omni-icon>
  `,
  name: 'SVG',
  parameters: {},
  args: {
    size: 'large',
    slot: `<svg
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
  },
  play: async (context: StoryContext) => {
      const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
      const slotElement = icon.shadowRoot.querySelector('slot');
      const foundSlottedSvgElement = slotElement
          .assignedElements()
          .find((e) => e.tagName.toLowerCase() === 'svg');
      await expect(foundSlottedSvgElement).toBeTruthy();
  }
};

export const IconPath = {
  render: (args: ArgTypes) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
  `,
  name: 'Local Source',
  parameters: {},
  args: {
    size: 'default',
    icon: 'assets/colors.svg',
  },
  play: async (context: StoryContext) => {
      const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
      const imgElement = icon.shadowRoot.querySelector('img');
      await expect(imgElement).toBeTruthy();
      await expect(imgElement.src.endsWith(IconPath.args.icon)).toBeTruthy();
  }
};

export const URL = {
  render: (args: ArgTypes) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"></omni-icon>
  `,
  name: 'Remote Source',
  parameters: {},
  args: {
    size: 'default',
    icon: 'https://img.shields.io/badge/Source-remote-lightgrey.svg'
  },
  play: async (context: StoryContext) => {
      const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
      const imgElement = icon.shadowRoot.querySelector('img');
      await expect(imgElement).toBeTruthy();
      await expect(imgElement.src).toEqual(URL.args.icon);
  }
};

export const Material = {
  render: (args: ArgTypes) => html`
    <!-- Add Material to your project, e.g. Adding below link in <head>-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <!-- ------------------------------------------------------------- -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}"> </omni-icon>
  `,
  args: {
    size: 'default',
    icon: '@material/receipt_long'
  },
  play: async (context: StoryContext) => {
      const icon = within(context.canvasElement).getByTestId<Icon>('test-icon');
      const materialElement = icon.shadowRoot.querySelector<HTMLElement>('.material-icon');
      await expect(materialElement).toBeTruthy();
      await expect(materialElement.innerText).toEqual(Material.args.icon.replace('@material/',''));
  }
};
