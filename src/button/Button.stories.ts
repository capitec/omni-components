import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import { loadCssPropertiesRemote } from '../utils/StoryUtils.js';

import './Button.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Components/Button',
    component: "omni-button",
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
    parameters: {
        actions: {
            handles: ['value-change']
        },
        cssprops: loadCssPropertiesRemote('omni-button')
    }
} as Meta;

interface ArgTypes {
    label: string;
    type: string;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        data-testid="test-button"
        label="${args.label}" 
    >
    </omni-button>
`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = "Default";
Default.parameters = {
};
Default.args = {
    label: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.storyName = "Secondary";
Secondary.args = {
    label: 'Secondary',
    type: 'Secondary'
};