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
    type: ButtonType;
    label: string;
    slotPosition: SlotPositionType;
    disabled: boolean;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        data-testid="test-button"
        type="${args.type}"
        label="${args.label}"
        slot-position="${args.slotPosition}"
        ?disabled=${args.disabled}>
        <div>X</div>
    </omni-button>
`;

export const Default = DefaultTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = 'Default';
Default.parameters = { };
Default.args = {
    type: 'secondary',
    label: 'Default',
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
    type: 'primary',
    label: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.storyName = 'Secondary';
Secondary.args = {
    type: 'secondary',
    label: 'Secondary'
};

export const Clear = Template.bind({});
Clear.storyName = 'Clear';
Clear.args = {
    type: 'clear',
    label: 'Clear'
};

export const White = Template.bind({});
White.storyName = 'White';
White.args = {
    type: 'white',
    label: 'White'
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

export const IconTop = IconTemplate.bind({});
IconTop.storyName = 'Icon/Top';
IconTop.args = {
    label: 'Icon',
    slotPosition: 'top'
};

export const IconRight = IconTemplate.bind({});
IconRight.storyName = 'Icon/Right';
IconRight.args = {
    label: 'Icon',
    slotPosition: 'right'
};

export const IconBottom = IconTemplate.bind({});
IconBottom.storyName = 'Icon/Bottom';
IconBottom.args = {
    label: 'Icon',
    slotPosition: 'bottom'
};

export const Icon = IconTemplate.bind({});
Icon.storyName = 'Icon/No Label';
Icon.args = {

};