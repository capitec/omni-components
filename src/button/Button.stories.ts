import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote, loadDefaultSlotForRemote, raw } from '../utils/StoryUtils.js';
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
		slot: {
			control: 'text',
			description: loadDefaultSlotForRemote('omni-button').description
		}
	},
	parameters: {
		actions: {
			handles: ['value-change']
		},
		cssprops: loadCssPropertiesRemote('omni-button')
	}
} as Meta;

interface Args {
	type: typeof buttonOptions[number];
	label: string;
	slotPosition: typeof slotPositionOptions[number];
	disabled: boolean;
	slot: string;
}

export const Interactive = {
	render: (args: Args) => html`
		<omni-button
			data-testid="test-button"
			type="${args.type}"
			label="${ifNotEmpty(args.label)}"
			slot-position="${args.slotPosition}"
			?disabled=${args.disabled}>
			${unsafeHTML(args.slot)}
		</omni-button>
	`,
	name: 'Interactive',
	args: {
		type: 'secondary',
		label: 'Button',
		slotPosition: 'top',
		disabled: false,
		slot: raw`<omni-icon icon="@material/thumb_up"></omni-icon>`
	},
	play: async (context: StoryContext) => {
		const button = within(context.canvasElement).getByTestId<Button>('test-button');
		const click = jest.fn();
		button.addEventListener('click', () => click());
		await userEvent.click(button);
		await userEvent.click(button);
		await expect(click).toBeCalledTimes(2);
	}
};

export const Type = {
	render: (args: Args) => html` <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button> `,
	name: 'Type',
	args: {
		type: 'primary',
		label: 'Click'
	},
	play: async (context: StoryContext) => {
		const button = within(context.canvasElement).getByTestId<Button>('test-button');
		const buttonElement = button.shadowRoot.getElementById('button');
		const foundPrimaryClass = buttonElement.classList.contains('primary');
		await expect(foundPrimaryClass).toBeTruthy();
	}
};

export const Label = {
	render: (args: Args) => html` <omni-button label="${args.label}" data-testid="test-button"></omni-button> `,
	name: 'Label',
	args: {
		label: 'Click'
	},
	play: async (context: StoryContext) => {
		const button = within(context.canvasElement).getByTestId<Button>('test-button');
		const labelElement = button.shadowRoot.getElementById('label');
		const labelMatches = labelElement.innerText === Label.args.label;
		await expect(labelMatches).toBeTruthy();
	}
};

export const Slot = {
	render: () => html`
		<omni-button data-testid="test-button">
			<omni-icon size="default" icon="assets/direction.svg"></omni-icon>
		</omni-button>
	`,
	name: 'Slot',
	args: {},
	play: async (context: StoryContext) => {
		const button = within(context.canvasElement).getByTestId<Button>('test-button');
		const slotElement = button.shadowRoot.querySelector('slot');
		const foundSlottedOmniIconElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'omni-icon');
		await expect(foundSlottedOmniIconElement).toBeTruthy();
	}
};

export const Disabled = {
	render: (args: Args) => html` <omni-button disabled label="${args.label}" data-testid="test-button"></omni-button> `,
	name: 'Disabled',
	args: {
		label: 'Disabled'
	},
	play: async (context: StoryContext) => {
		const button = within(context.canvasElement).getByTestId<Button>('test-button'); // Test for disabled CSS.

		const buttonElement = button.shadowRoot.getElementById('button');
		const foundDisabledClass = buttonElement.classList.contains('disabled');
		await expect(foundDisabledClass).toBeTruthy(); // Test for not clickable.

		const click = jest.fn();
		button.addEventListener('click', () => click());
		await userEvent.click(button);
		await userEvent.click(button);
		await expect(click).toBeCalledTimes(0);
	}
};
