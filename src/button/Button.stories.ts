import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import { loadCssPropertiesRemote } from '../utils/StoryUtils.js';
import { ButtonType, buttonType, slotPositionType, SlotPositionType } from './Button';

import './Button.js';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Components/Button',
    component: 'omni-button',
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: { 
        type: { control: 'select', options: buttonType },
        slotPosition: { control: 'select', options: slotPositionType }
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
    type: ButtonType;
    slotPosition: SlotPositionType,
    disabled: boolean
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        data-testid="test-button"
        label="${args.label}"
        type="${args.type}"
        slot-position="${args.slotPosition}"
        ?disabled=${args.disabled}
    ></omni-button>
`;

export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = 'Default';
Default.parameters = { };
Default.args = {
    label: 'Default',
    type: 'secondary',
    slotPosition: 'left',
    disabled: false
};

const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        label="${args.label}"
        type="${args.type}"
        data-testid="test-button">
    </omni-button>
`;

export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = {
    label: 'Primary',
    type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.storyName = 'Secondary';
Secondary.args = {
    label: 'Secondary',
    type: 'secondary'
};

export const Clear = Template.bind({});
Clear.storyName = 'Clear';
Clear.args = {
    label: 'Clear',
    type: 'clear'
};

export const White = Template.bind({});
White.storyName = 'White';
White.args = {
    label: 'White',
    type: 'white'
};

const IconTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        data-testid="test-button"
        label="${args.label}"
        slot-position="${args.slotPosition}">
        <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
            <g transform="translate(-2,-2)">
                <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"></path>
            </g>
        </svg>
    </omni-button>
`;

export const IconLeft = IconTemplate.bind({});
IconLeft.storyName = 'Icon/Left';
IconLeft.args = {
    label: 'Icon',
    slotPosition: 'left'
};

export const Icon = IconTemplate.bind({});
Icon.storyName = 'Icon/Top';
Icon.args = {
    label: 'Icon',
    slotPosition: 'top'
};