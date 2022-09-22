import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote, raw } from '../utils/StoryUtils';
import { Check } from './Check.js';
import './Check.js';

export default {
	title: 'UI Components/Check',
	component: 'omni-check',
	argTypes: {
		indeterminate_icon: {
			control: 'text'
		},
		check_icon: {
			control: 'text'
		}
	},
	parameters: {
		actions: {
			handles: ['value-change']
		},
		cssprops: loadCssPropertiesRemote('omni-check')
	}
} as Meta;

interface ArgTypes {
	label: string;
	data: object;
	hint: string;
	error: string;
	checked: boolean;
	disabled: boolean;
	indeterminate: boolean;

	check_icon: string;
	indeterminate_icon: string;
}

export const Interactive = {
	render: (args: ArgTypes) => html`
		<omni-check
			data-testid="test-check"
			label="${ifNotEmpty(args.label)}"
			.data="${args.data}"
			hint="${ifNotEmpty(args.hint)}"
			error="${ifNotEmpty(args.error)}"
			?checked="${args.checked}"
			?disabled="${args.disabled}"
			?indeterminate="${args.indeterminate}"
			>${args.indeterminate_icon
				? html`${'\r\n'}${unsafeHTML(assignToSlot('indeterminate_icon', args.indeterminate_icon))}`
				: nothing}${args.check_icon
				? html`${'\r\n'}${unsafeHTML(assignToSlot('check_icon', args.check_icon))}`
				: nothing}${args.check_icon || args.indeterminate_icon ? '\r\n' : nothing}</omni-check
		>
	`,
	name: 'Interactive',
	parameters: {},
	args: {
		label: '',
		data: {},
		hint: '',
		error: '',
		checked: false,
		disabled: false,
		indeterminate: false,
		check_icon: '',
		indeterminate_icon: ''
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const valueChange = jest.fn();
		check.addEventListener('value-change', valueChange);
		await userEvent.click(check);

		const content = check.shadowRoot.getElementById('content');

		await fireEvent.keyDown(content, {
			key: ' ',
			code: 'Space'
		});
		await expect(valueChange).toBeCalledTimes(2);
	}
};

export const Label = {
	render: (args: ArgTypes) => html` <omni-check data-testid="test-check" label="${args.label}"></omni-check> `,
	args: {
		label: 'Label'
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const labelElement = check.shadowRoot.querySelector('label');
		await expect(labelElement).toBeTruthy();
		await expect(labelElement).toHaveTextContent(Label.args.label);
	}
};

export const Hint = {
	render: (args: ArgTypes) => html` <omni-check data-testid="test-check" label="${args.label}" hint="${args.hint}"></omni-check> `,
	args: {
		label: 'Hint',
		hint: 'This is a hint'
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const hintElement = check.shadowRoot.querySelector<HTMLElement>('.hint');
		await expect(hintElement).toBeTruthy();
		await expect(hintElement).toHaveTextContent(Hint.args.hint);
	}
};

export const ErrorLabel = {
	name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
	render: (args: ArgTypes) => html` <omni-check data-testid="test-check" label="${args.label}" error="${args.error}"></omni-check> `,
	args: {
		label: 'Error',
		error: 'This is an error state'
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const errorElement = check.shadowRoot.querySelector<HTMLElement>('.error');
		await expect(errorElement).toBeTruthy();
		await expect(errorElement).toHaveTextContent(ErrorLabel.args.error);
	}
};

export const Checked = {
	render: (args: ArgTypes) => html` <omni-check data-testid="test-check" label="${args.label}" ?checked="${args.checked}"></omni-check> `,
	args: {
		label: 'Checked',
		checked: true
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const checkedElement = check.shadowRoot.querySelector<HTMLElement>('.checked');
		await expect(checkedElement).toBeTruthy();
	}
};

export const Indeterminate = {
	render: (args: ArgTypes) => html`
		<omni-check data-testid="test-check" label="${args.label}" ?indeterminate="${args.indeterminate}"></omni-check>
	`,
	args: {
		label: 'Indeterminate',
		indeterminate: true
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const indeterminateElement = check.shadowRoot.querySelector<HTMLElement>('.indeterminate');
		await expect(indeterminateElement).toBeTruthy();
	}
};

export const Disabled = {
	render: (args: ArgTypes) => html`
		<omni-check data-testid="test-check" label="${args.label}" ?disabled="${args.disabled}"></omni-check>
	`,
	args: {
		label: 'Disabled',
		disabled: true
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const valueChange = jest.fn();
		check.addEventListener('value-change', valueChange);

		const disabledElement = check.shadowRoot.querySelector<HTMLElement>('.disabled');
		await expect(disabledElement).toBeTruthy();

		const content = check.shadowRoot.getElementById('content');
		await userEvent.click(content);
		await fireEvent.keyDown(content, {
			key: ' ',
			code: 'Space'
		});
		await expect(valueChange).toBeCalledTimes(0);
	}
};

export const CustomCheckIcon = {
	render: (args: ArgTypes) => html`
		<omni-check data-testid="test-check" label="${args.label}" ?checked="${args.checked}"> ${unsafeHTML(args.check_icon)} </omni-check>
	`,
	args: {
		label: 'Custom Check Icon',
		checked: true,
		check_icon: raw`<svg slot="check_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.79 410.38" version="1.0" width="100%"
                      height="100%">
                      <path style="stroke:#000;stroke-width:19.892;fill:#ffffff"
                        d="m-1747.2-549.3 287.72 333.9c146.6-298.83 326.06-573.74 614.52-834.75-215.89 121.82-453.86 353.14-657.14 639.38l-245.1-138.53z"
                        transform="translate(843.77 509.04) scale(.48018)" />
                    </svg>`
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const slotElement = check.shadowRoot.querySelector<HTMLSlotElement>('slot[name=check_icon]');
		await expect(slotElement).toBeTruthy();

		const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
		await expect(foundSlottedSvgElement).toBeTruthy();
	}
};

export const CustomIndeterminateIcon = {
	render: (args: ArgTypes) => html`
		<omni-check data-testid="test-check" label="${args.label}" ?indeterminate="${args.indeterminate}">
			${unsafeHTML(args.indeterminate_icon)}
		</omni-check>
	`,
	args: {
		label: 'Custom Indeterminate Icon',
		indeterminate: true,
		indeterminate_icon: raw`
			<svg slot="indeterminate_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
				<defs>
				<linearGradient id="b" y2="28.275" gradientUnits="userSpaceOnUse" x2="20.07" y1="3.976" x1="12.113">
					<stop style="stop-color:#ffffff" offset="0" />
					<stop style="stop-color:#ffffff" offset="1" />
				</linearGradient>
				<linearGradient id="a" y2="30" gradientUnits="userSpaceOnUse" x2="20.214" y1="2" x1="12.031">
					<stop style="stop-color:#ffffff" offset="0" />
					<stop style="stop-color:#ffffff" offset="1" />
				</linearGradient>
				</defs>
				<path d="M2.875 13C1.281 13 0 14.338 0 16s1.28 3 2.875 3h26.25C30.719 19 32 17.662 32 16s-1.281-3-2.875-3H2.875z" />
				<path style="fill:url(#b)" transform="translate(-.063 .063)"
				d="M2.875 13.938c-1.067 0-1.938.884-1.938 2.062s.87 2.062 1.938 2.062h26.25c1.067 0 1.937-.884 1.937-2.062s-.87-2.062-1.937-2.062H2.875z" />
			</svg>
		`
	},
	play: async (context: StoryContext) => {
		const check = within(context.canvasElement).getByTestId<Check>('test-check');
		const slotElement = check.shadowRoot.querySelector<HTMLSlotElement>('slot[name=indeterminate_icon]');
		await expect(slotElement).toBeTruthy();

		const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
		await expect(foundSlottedSvgElement).toBeTruthy();
	}
};
