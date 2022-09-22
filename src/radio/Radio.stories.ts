import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { Radio } from './Radio.js';

import './Radio.js';

export default {
	title: 'UI Components/Radio',
	component: 'omni-radio',
	argTypes: {},
	parameters: {
		actions: {
			handles: ['value-change']
		},
		cssprops: loadCssPropertiesRemote('omni-radio')
	}
} as Meta;

interface ArgTypes {
	label: string;
	data: object;
	hint: string;
	error: string;
	checked: boolean;
	disabled: boolean;
}

export const Interactive = {
	render: (args: ArgTypes) => html`
		<omni-radio
			data-testid="test-radio"
			label="${ifNotEmpty(args.label)}"
			.data="${args.data}"
			hint="${ifNotEmpty(args.hint)}"
			error="${ifNotEmpty(args.error)}"
			?checked="${args.checked}"
			?disabled="${args.disabled}"></omni-radio>
	`,
	name: 'Interactive',
	parameters: {},
	args: {
		label: '',
		data: {},
		hint: '',
		error: '',
		checked: false,
		disabled: false
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		radio.focus();

		const content = radio.shadowRoot.getElementById('content');
		const valueChange = jest.fn();
		radio.addEventListener('value-change', valueChange);

		await userEvent.click(content);
		await fireEvent.keyDown(content, {
			key: ' ',
			code: 'Space'
		});

		await expect(valueChange).toBeCalledTimes(2);
	}
};

export const Label = {
	render: (args: ArgTypes) => html` <omni-radio data-testid="test-radio" label="${args.label}"></omni-radio> `,
	args: {
		label: 'Label'
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		const labelElement = radio.shadowRoot.getElementById('label');
		await expect(labelElement).toHaveTextContent(Label.args.label);
	}
};

export const Hint = {
	render: (args: ArgTypes) => html` <omni-radio data-testid="test-radio" label="${args.label}" hint="${args.hint}"></omni-radio> `,
	args: {
		label: 'Hint',
		hint: 'This is a hint'
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		const element = radio.shadowRoot.querySelector<HTMLElement>('.hint');
		await expect(element).toHaveTextContent(Hint.args.hint);
	}
};

export const Error = {
	render: (args: ArgTypes) => html` <omni-radio data-testid="test-radio" label="${args.label}" error="${args.error}"></omni-radio> `,
	args: {
		label: 'Error',
		error: 'This is an error state'
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		const element = radio.shadowRoot.querySelector<HTMLElement>('.error');
		await expect(element).toHaveTextContent(Error.args.error);
	}
};

export const Checked = {
	render: (args: ArgTypes) => html` <omni-radio data-testid="test-radio" label="${args.label}" ?checked="${args.checked}"></omni-radio> `,
	args: {
		label: 'Checked',
		checked: true
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		const checkedElement = radio.shadowRoot.querySelector<HTMLElement>('.checked');
		await expect(checkedElement).toBeTruthy();
	}
};

export const Disabled = {
	render: (args: ArgTypes) => html`
		<omni-radio data-testid="test-radio" label="${args.label}" ?disabled="${args.disabled}"></omni-radio>
	`,
	args: {
		label: 'Disabled',
		disabled: true
	},
	play: async (context: StoryContext) => {
		const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
		const valueChange = jest.fn();
		radio.addEventListener('value-change', valueChange);

		const disabledElement = radio.shadowRoot.querySelector<HTMLElement>('.disabled');
		await expect(disabledElement).toBeTruthy();

		const content = radio.shadowRoot.getElementById('content');
		await userEvent.click(content);
		await fireEvent.keyDown(content, {
			key: ' ',
			code: 'Space'
		});
		await expect(valueChange).toBeCalledTimes(0);
	}
};
