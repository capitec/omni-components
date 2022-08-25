import { html, TemplateResult } from 'lit';
import { Meta } from '@storybook/web-components';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Icon.js';

export default {
  title: 'UI Components/Icon',
  component: 'omni-icon',
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'extra-small', 'small', 'medium', 'large'],
    },
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-icon'),
  },
} as Meta;

interface ArgTypes {
  size: string;
  icon: string;
  svg: TemplateResult;
}

export const Default = {
  render: (args: ArgTypes) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon data-testid="test-icon" size="${args.size}" icon="${args.icon}">
      ${args.svg}
    </omni-icon>
  `,
  name: 'Default',
  parameters: {},
  args: {
    size: 'default',
    svg: html`<svg
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
};

export const SVG = {
  render: (args: ArgTypes) => html`
    <omni-icon data-testid="test-icon" size="${args.size}"> 
      ${args.svg} 
    </omni-icon>
  `,
  name: 'SVG',
  parameters: {},
  args: {
    size: 'large',
    svg: html`<svg
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
    icon: '/assets/colors.svg',
  },
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
  }
};
