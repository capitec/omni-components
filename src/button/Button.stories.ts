import { Meta, Story } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { html } from 'lit';
import { loadCssPropertiesRemote } from '../utils/StoryUtils.js';

import { Button, ButtonType, buttonType, slotPositionType, SlotPositionType } from './Button.js';
import './Button.js';
import '../icon/Icon.js';

// More on writing stories: https://storybook.js.org/docs/web-components/writing-stories/introduction

export default {
    title: 'UI Components/Button',
    component: 'omni-button',
    // More on argTypes: https://storybook.js.org/docs/web-components/api/argtypes
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

// More templates and args: https://storybook.js.org/docs/web-components/writing-stories/introduction#using-args

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
Interactive.storyName = 'Interactive';
Interactive.parameters = {};
Interactive.args = {
    type: 'secondary',
    label: 'Button',
    slotPosition: 'top',
    disabled: false
};
Interactive.play = async (context) => {
    const button = within(context.canvasElement).getByTestId<Button>('test-button');
    const click = jest.fn();
    button.addEventListener('click', () => click());

    await userEvent.click(button);
    await userEvent.click(button);
    await expect(click).toBeCalledTimes(2);
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
Type.play = async (context) => {
    const button = within(context.canvasElement).getByTestId<Button>('test-button');
    const buttonElement = button.shadowRoot.getElementById('button');
    const foundPrimaryClass = buttonElement.classList.contains('primary');
    await expect(foundPrimaryClass).toBeTruthy();
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
Label.play = async (context) => {
    const button = within(context.canvasElement).getByTestId<Button>('test-button');
    const labelElement = button.shadowRoot.getElementById('label');
    const labelMatches = labelElement.innerText === Label.args.label;
    await expect(labelMatches).toBeTruthy();
};

// ----
// SLOT
// ----

const SlotTemplate: Story<Args> = () => html`
    <omni-button data-testid="test-button">
        <omni-icon size="default" icon="/assets/direction.svg"></omni-icon>
    </omni-button>
`;

export const Slot = SlotTemplate.bind({});
Slot.storyName = 'Slot';
Slot.args = {};
Slot.play = async (context) => {
    const button = within(context.canvasElement).getByTestId<Button>('test-button');
    const slot = button.shadowRoot.querySelector('slot');
    const found = slot.assignedElements().find(e => e.tagName.toLowerCase() === 'omni-icon');
    await expect(found).toBeTruthy();
};
