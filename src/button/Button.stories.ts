import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { raw, CSFIdentifier, ComponentStoryFormat } from '../utils/StoryUtils.js';
import { Button } from './Button.js';

import './Button.js';
import '../icon/Icon.js';

const buttonOptions = ['primary', 'secondary', 'clear', 'white'] as const;
const slotPositionOptions = ['left', 'top', 'right', 'bottom'] as const;

export default {
    title: 'UI Components/Button',
    component: 'omni-button',
    argTypes: {
        type: {
            control: 'radio',
            options: buttonOptions
        },
        slotPosition: {
            control: 'radio',
            options: slotPositionOptions
        },
        'slot-position': {
            control: false
        },
        '[Default Slot]': {
            control: 'text'
        }
    }
} as CSFIdentifier;

interface Args {
    type: (typeof buttonOptions)[number];
    label: string;
    slotPosition: (typeof slotPositionOptions)[number];
    disabled: boolean;
    '[Default Slot]': string;
}

export const Interactive = {
    render: (args: Args) => html`
    <omni-button
      data-testid="test-button"
      type="${args.type}"
      label="${ifNotEmpty(args.label)}"
      slot-position="${args.slotPosition}"
      ?disabled=${args.disabled}>
      ${unsafeHTML(args['[Default Slot]'])}
    </omni-button>
  `,
    name: 'Interactive',
    args: {
        type: 'secondary',
        label: 'Button',
        slotPosition: 'top',
        disabled: false,
        '[Default Slot]': raw`<omni-icon icon="@material/thumb_up"></omni-icon>`
    },
    play: async (context) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const click = jest.fn();
        button.addEventListener('click', () => click());
        await userEvent.click(button, {
            pointerEventsCheck: 0
        });
        await userEvent.click(button, {
            pointerEventsCheck: 0
        });
        await expect(click).toBeCalledTimes(2);
    }
} as ComponentStoryFormat<Args>;

export const Type = {
    render: (args: Args) => html` <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button> `,
    name: 'Type',
    description: 'Set the type of button to render using different combinations of primary and alternate colours.',
    args: {
        type: 'primary',
        label: 'Click'
    },
    play: async (context) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const buttonElement = button.shadowRoot?.getElementById('button') as HTMLElement;
        const foundPrimaryClass = buttonElement?.classList.contains('primary');
        await expect(foundPrimaryClass).toBeTruthy();
    }
} as ComponentStoryFormat<Args>;

export const Label = {
    render: (args: Args) => html` <omni-button label="${args.label}" data-testid="test-button"></omni-button> `,
    name: 'Label',
    description: 'Set a text value to display within.',
    args: {
        label: 'Click'
    },
    play: async (context) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const labelElement = button.shadowRoot!.getElementById('label') as HTMLElement;
        const labelMatches = labelElement?.innerText === Label.args?.label;
        await expect(labelMatches).toBeTruthy();
    }
} as ComponentStoryFormat<Args>;

export const Slot = {
    render: () => html`
    <omni-button data-testid="test-button">
      <omni-icon size="default" icon="./assets/images/direction.svg"></omni-icon>
    </omni-button>
  `,
    name: 'Slot',
    description: 'Set html content to display within.',
    args: {},
    play: async (context) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const slotElement = button.shadowRoot?.querySelector('slot');
        const foundSlottedOmniIconElement = slotElement?.assignedElements().find((e) => e.tagName.toLowerCase() === 'omni-icon');
        await expect(foundSlottedOmniIconElement).toBeTruthy();
    }
} as ComponentStoryFormat<Args>;

export const Disabled = {
    render: (args: Args) => html` <omni-button disabled label="${args.label}" data-testid="test-button"></omni-button> `,
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled'
    },
    play: async (context) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button'); // Test for disabled CSS.

        const buttonElement = button.shadowRoot?.getElementById('button');
        const foundDisabledClass = buttonElement?.classList.contains('disabled');
        await expect(foundDisabledClass).toBeTruthy(); // Test for not clickable.

        const click = jest.fn();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        button.addEventListener('click', (e) => {
            click();
        });
        await expect(() => userEvent.click(button)).rejects.toThrow(/pointer-events: none/);
        await expect(() => userEvent.click(button)).rejects.toThrow(/pointer-events: none/);
        await expect(click).toBeCalledTimes(0);
    }
} as ComponentStoryFormat<Args>;
