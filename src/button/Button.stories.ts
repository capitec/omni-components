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

interface Args {
    type: ButtonType;
    label: string;
    slotPosition: SlotPositionType;
    disabled: boolean;
}

// -----------
// INTERACTIVE
// -----------

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const InteractiveTemplate: Story<Args> = (args: Args) => html`
    <omni-button 
        data-testid="test-button"
        type="${args.type}"
        label="${args.label}"
        slot-position="${args.slotPosition}"
        ?disabled=${args.disabled}>
        <omni-icon icon="@material/thumb_up"></omni-icon>
    </omni-button>
`;

export const Interactive = InteractiveTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Interactive.storyName = 'Interactive';
Interactive.parameters = { };
Interactive.args = {
    type: 'secondary',
    label: 'Button',
    slotPosition: 'top',
    disabled: false
};

// ----
// TYPE
// ----

const TypeTemplate: Story<Args> = (args: Args) => html`
    <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button>
`;

export const Type = TypeTemplate.bind({});
Type.storyName = 'Type';
Type.args = {
    type: 'primary',
    label: 'Click'
};

// -----
// LABEL
// -----

const LabelTemplate: Story<Args> = (args: Args) => html`
    <omni-button label="${args.label}" data-testid="test-button"></omni-button>
`;

export const Label = LabelTemplate.bind({});
Label.storyName = 'Label';
Label.args = {
    label: 'Click'
};

// ----
// SLOT
// ----

const SlotTemplate: Story<Args> = () => html`
    <omni-button 
        data-testid="test-button">
        <omni-icon size="default" icon="/assets/direction.svg"></omni-icon>
    </omni-button>
`;

export const Slot = SlotTemplate.bind({});
Slot.storyName = 'Slot';
Slot.args = { };