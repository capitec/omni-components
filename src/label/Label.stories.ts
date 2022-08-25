import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Label.js';

export default {
  title: 'UI Components/Label',
  component: 'omni-label',
  argTypes: {
    type: {
      control: {
        type: 'radio',
        options: ['default', 'title', 'subtitle', 'strong'],
      },
    },
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-label'),
  },
} as Meta;

interface ArgTypes {
  label: string;
  type: string;
}

export const Default = {
  render: (args: ArgTypes) => html`
    <omni-label label="${args.label}" type="${args.type}"> </omni-label>
  `,
  name: 'Default',
  parameters: {},
  args: {
    label: 'Label',
    type: 'default',
  },
};

export const Title = {
  render: (args: ArgTypes) => html`
    <omni-label label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Title',
    type: 'title',
  },
};

export const Subtitle = {
  render: (args: ArgTypes) => html`
    <omni-label label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Subtitle',
    type: 'subtitle',
  },
};

export const Strong = {
  render: (args: ArgTypes) => html`
    <omni-label label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Strong',
    type: 'strong',
  },
};
