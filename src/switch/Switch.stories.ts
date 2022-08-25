import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Switch.js';

export default {
  title: 'UI Components/Switch',
  component: 'omni-switch',
  argTypes: {},
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-switch'),
    actions: {
      handles: ['value-change'],
    },
  },
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
    <omni-switch data-testid="test-switch" label="${ifNotEmpty(args.label)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?checked="${args.checked}" ?disabled="${args.disabled}"></omni-switch>
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
  },
  play: async (context: { canvasElement: HTMLElement; }) => {
    const canvas = within(context.canvasElement);
    const Switch = canvas.getByTestId(`test-switch`);
    console.log(Switch);
    const valueChange = jest.fn();
    Switch.addEventListener('value-change', () => valueChange());
    const content = Switch.shadowRoot.getElementById(`content`);
    console.log(content);
    await userEvent.click(content);
    await userEvent.click(content);
    await expect(valueChange).toBeCalledTimes(2);
  },
};

export const Label = {
  render: (args: ArgTypes) => html`
    <omni-switch data-testid="test-switch" label="${args.label}"></omni-switch>
  `,
  args: {
    label: 'Label'
  },
};

export const Hint = {
  render: (args: ArgTypes) => html`
    <omni-switch data-testid="test-switch" label="${args.label}" hint="${args.hint}"></omni-switch>
  `,
  args: {
    label: 'Hint',
    hint: 'This is a hint'
  },
};

export const Error = {
  render: (args: ArgTypes) => html`
    <omni-switch data-testid="test-switch" label="${args.label}" error="${args.error}"></omni-switch>
  `,
  args: {
    label: 'Error',
    error: 'This is an error state'
  },
};

export const Checked = {
  render: (args: ArgTypes) => html`
    <omni-switch data-testid="test-switch" label="${args.label}" ?checked="${args.checked}"></omni-switch>
  `,
  args: {
    label: 'Checked',
    checked: true,
  },
};

export const Disabled = {
  render: (args: ArgTypes) => html`
    <omni-switch
      data-testid="test-switch" label="${args.label}" ?disabled="${args.disabled}"></omni-switch>
  `,
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
