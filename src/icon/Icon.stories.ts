import { html, TemplateResult } from 'lit';
import { Story, Meta, WebComponentsFramework } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';

import './Icon.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Icon',
  component: "omni-icon",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { 
    size: { control: 'select', options: ["default", "extra-small", "small", "medium", "large"] }
  },
	parameters: {
    cssprops: loadCssPropertiesRemote("omni-icon")
  }
} as Meta;

interface ArgTypes {
	size: string;
  icon: string;
  svg: TemplateResult;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <!-- Icons loaded by content path instead of font-based or slotted content will not be able to be styled directly -->

    <omni-icon 
    data-testid="test-icon"
    size="${args.size}" 
    icon="${args.icon}"
    >
        ${args.svg}
    </omni-icon>
`;

const SvgTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-icon 
    data-testid="test-icon"
    size="${args.size}" 
    >
        ${args.svg}
    </omni-icon>
`;

const MaterialTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <!-- Add Material to your project, e.g. Adding below link in <head>-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <!-- ------------------------------------------------------------- -->

    <omni-icon 
    data-testid="test-icon"
    size="${args.size}" 
    icon="${args.icon}"
    >
    </omni-icon>
`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = "Default"
Default.parameters = {
};
Default.args = {
  size: 'default',
  svg: html`<svg version="1.1"  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <g transform="translate(-2,-2)">
                  <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/>
              </g>
            </svg>`,
  icon: undefined
};

export const SVG = SvgTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SVG.storyName = "SVG"
SVG.parameters = {
};
SVG.args = {
  size: 'large',
  svg: html`<svg version="1.1"  viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <g transform="translate(-2,-2)">
                  <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/>
              </g>
            </svg>`
};

export const IconPath = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IconPath.storyName = "Local Source"
IconPath.parameters = {
};
IconPath.args = {
  size: 'default',
  icon: '/assets/colors.svg',
  svg: undefined
};

export const URL = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
URL.storyName = "Remote Source"
URL.parameters = {
};
URL.args = {
  size: 'default',
  icon: 'https://img.shields.io/badge/Source-remote-lightgrey.svg',
  svg: undefined
};

export const Material = MaterialTemplate.bind({});
Material.args = {
  size: 'default',
  icon: '@material/receipt_long',
  svg: undefined
};