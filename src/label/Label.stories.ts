import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { Label } from './Label.js';
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

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-label data-testid="test-label" label="${ifNotEmpty(args.label)}" type="${args.type}"> </omni-label>
  `,
  name: 'Interactive',
  parameters: {},
  args: {
    label: 'Label',
    type: 'default',
  },
  play: async (context: StoryContext) => {
      const label = within(context.canvasElement).getByTestId<Label>('test-label');
      await expect(label.shadowRoot).toHaveTextContent(Interactive.args.label);
  }
};

export const Title = {
  render: (args: ArgTypes) => html`
    <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Title',
    type: 'title',
  },
  play: async (context: StoryContext) => {
      const label = within(context.canvasElement).getByTestId<Label>('test-label');
      await expect(label.shadowRoot).toHaveTextContent(Title.args.label);
  }
};

export const Subtitle = {
  render: (args: ArgTypes) => html`
    <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Subtitle',
    type: 'subtitle',
  },
  play: async (context: StoryContext) => {
      const label = within(context.canvasElement).getByTestId<Label>('test-label');
      await expect(label.shadowRoot).toHaveTextContent(Subtitle.args.label);
  }
};

export const Strong = {
  render: (args: ArgTypes) => html`
    <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label>
  `,
  args: {
    label: 'Strong',
    type: 'strong',
  },
  play: async (context: StoryContext) => {
      const label = within(context.canvasElement).getByTestId<Label>('test-label');
      await expect(label.shadowRoot).toHaveTextContent(Strong.args.label);
  }
};
