import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { LinkTarget, linkTarget } from './Hyperlink.js';
import './Hyperlink.js'; 

export default {
  title: 'UI Components/Hyperlink',
  component: 'omni-hyperlink',
  argTypes: { 
    size: { control: 'radio', options: ['default', 'small'] },
    target: { control: 'radio', options: linkTarget }
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-hyperlink'),
    actions: {
      handles: ['click'],
    },
  },
} as Meta;

interface ArgTypes {
  label: string;
  href: string;
  target: LinkTarget;
  disabled: boolean;
  inline: boolean;
  size: string;
} 

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-hyperlink
      data-testid="test-hyperlink"
      label="${ifNotEmpty(args.label)}"
      href="${ifNotEmpty(args.href)}"
      target="${ifNotEmpty(args.target)}"
      ?disabled="${args.disabled}"
      ?inline="${args.inline}"
      size="${args.size}"
    ></omni-hyperlink>
  `,
  name: 'Interactive',
  args: {
    label: 'Click',
    href: 'https://example.com',
    target: '',
    disabled: false,
    inline: false,
    size: '',
  },
  play: async (context :{ canvasElement: HTMLElement;}) => {
    const canvas = within(context.canvasElement);
    const Hyperlink = canvas.getByTestId('test-hyperlink');
    const click = jest.fn();
    Hyperlink.addEventListener('click', () => click());
    await userEvent.click(Hyperlink);
    await userEvent.click(Hyperlink);
    await expect(click).toBeCalledTimes(2);
  },
};

export const Small = {
  render: (args: ArgTypes) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" size="${args.size}"></omni-hyperlink>`,
  args: {
    label: 'Click',
    size: 'small',
  }
};

export const Disabled = {
  render: (args: ArgTypes) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" ?disabled="${args.disabled}"></omni-hyperlink>`,
  
  args: {
    label: 'Click',
    disabled: true,
  },
  play: async (context: { canvasElement: HTMLElement; }) => {
    const canvas = within(context.canvasElement);

    const Hyperlink = canvas.getByTestId('test-hyperlink');

    const click = jest.fn();
    Hyperlink.addEventListener('click', () => click());

    await userEvent.click(Hyperlink);
    await userEvent.click(Hyperlink);
    await expect(click).toBeCalledTimes(0);
  }
};

export const Inline = {
  render: (args: ArgTypes) => html`<p data-testid="test-paragraph">Inline <omni-hyperlink label="${args.label}" ?inline="${args.inline}"></omni-hyperlink> example</p>`,
  args: {
    label: 'Click',
    inline: true
  },
  play: async (context: { canvasElement: HTMLElement; }) => {
    const canvas = within(context.canvasElement);

    const paragraph = canvas.getByTestId('test-paragraph');
    const hyperlinkElement = paragraph.querySelector('omni-hyperlink');

    await expect(hyperlinkElement).toBeTruthy();
    await expect(paragraph.contains(hyperlinkElement)).toBeTruthy();
  },
};
