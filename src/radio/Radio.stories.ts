import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { ifNotEmpty } from '../utils/Directives.js';
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

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-radio label="${ifNotEmpty(args.label)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?checked="${args.checked}" ?disabled="${args.disabled}"></omni-radio>
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
