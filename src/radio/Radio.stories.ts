import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { ifDefined } from 'lit/directives/if-defined.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Radio.js';

export default {
  title: 'UI Components/Radio',
  component: 'omni-radio',
  argTypes: {},
  parameters: {
    actions: {
      handles: ['value-change'],
    },
    cssprops: loadCssPropertiesRemote('omni-radio'),
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

export const Default = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${ifDefined(args.label ? args.label : undefined)}" .data="${args.data}" hint="${ifDefined(args.hint ? args.hint : undefined)}" error="${ifDefined(args.error ? args.error : undefined)}" ?checked="${args.checked}" ?disabled="${args.disabled}"></omni-radio>
  `,
  name: 'Default',
  parameters: {},
  args: {
    label: '',
    data: {},
    hint: '',
    error: '',
    checked: false,
    disabled: false,
  },
};

export const Label = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${args.label}"></omni-radio>
  `,
  args: {
    label: 'Label',
  },
};

export const Hint = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${args.label}" hint="${args.hint}"></omni-radio>
  `,
  args: {
    label: 'Hint',
    hint: 'This is a hint'
  },
};

export const Error = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${args.label}" error="${args.error}"></omni-radio>
  `,
  args: {
    label: 'Error',
    error: 'This is an error state'
  },
};

export const Checked = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${args.label}" ?checked="${args.checked}"></omni-radio>
  `,
  args: {
    label: 'Checked',
    checked: true,
  },
};

export const Disabled = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${args.label}" ?disabled="${args.disabled}"></omni-radio>
  `,
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
