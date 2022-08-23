import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import { loadCssPropertiesRemote } from '../utils/StoryUtils.js';
import { ButtonType, buttonType, slotPositionType, SlotPositionType } from './Button';

import './Button.js';
import '../icon/Icon.js';


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
        label="${args.label}">
        <omni-icon icon="@material/thumb_up"></omni-icon>
    </omni-button>
`;

export const IconLeft = IconTemplate.bind({});
IconLeft.storyName = 'Icon';
IconLeft.args = {
    label: 'Icon'
};