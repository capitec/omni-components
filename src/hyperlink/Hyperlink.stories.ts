import { html, TemplateResult } from 'lit';
import { Story, Meta, WebComponentsFramework } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';

import './Hyperlink.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Components/Hyperlink',
    component: "omni-hyperlink",
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: { 
      size: { control: 'select', options: ["default", "small"] }
    },
      parameters: {
      cssprops: loadCssPropertiesRemote("omni-hyperlink"),
    }
  } as Meta;

interface ArgTypes {
	label: string;
	href: string;
    target: string;
    disabled: boolean;
    inline: boolean;
    size: string;
}

const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-hyperlink 
    label="${args.label}" 
    href="${args.href}"
    target:"${args.target}"
    disabled: "${args.disabled}"
    size:"${args.size}
    >
    </omni-hyperlink>
`;

export const Default = Template.bind({});
Default.storyName = "Default"
Default.parameters = {};
Default.args = {
    label:'Click me to take you to Storybook',
    href:'https://storybook.js.org',
    target: '',
    disabled: false,
    inline: false,
    size: ''
}

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Click all you want',
    href: 'https://storybook.js.org',
    target:'',
    disabled: true,
    inline: false,
    size: ''
}

export const Small = Template.bind({});
Small.args = {
    label: 'I am a small hyperlink',
    href: 'www.google.com',
    target: '',
    disabled: false,
    inline: false,
    size: 'small'
}



