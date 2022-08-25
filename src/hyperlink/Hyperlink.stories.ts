import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Hyperlink.js'; 

export default {
  title: 'UI Components/Hyperlink',
  component: 'omni-hyperlink',
  argTypes: { 
    size: { control: 'select', options: ['default', 'small'] },
    target: { control: 'select', options: ['_self', '_blank', '_parent', '_top']},
    disabled: { control: 'select', options: ['true', 'false'] },
    inline: { control: 'select', options: ['true', 'false'] }
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
  target: string;
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
      size="${ifNotEmpty(args.size)}"
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
    const Hyperlink = canvas.getByTestId(`test-hyperlink`);
    const click = jest.fn();
    Hyperlink.addEventListener('click', () => click());
    await userEvent.click(Hyperlink);
    await userEvent.click(Hyperlink);
    await expect(click).toBeCalledTimes(2);
  },
};

export const Small = {
  render: (args: ArgTypes) => html`<omni-hyperlink label="${args.label}" size="${args.size}"></omni-hyperlink>`,
  args: {
    label: 'Small link',
    size: 'small',
  },
};

export const Disabled = {
  render: (args: ArgTypes) => html`<omni-hyperlink label="${args.label}" ?disabled="${args.disabled}"></omni-hyperlink>`,
  args: {
    label: 'You never click this #BoratVoice',
    disabled: true,
  },
  play: async (context: { canvasElement: HTMLElement; }) => {
    const canvas = within(context.canvasElement);

    const Hyperlink = canvas.getByTestId(`test-hyperlink`);

    const click = jest.fn();
    Hyperlink.addEventListener('click', () => click());

    await userEvent.click(Hyperlink);
    await userEvent.click(Hyperlink);
    await expect(click).toBeCalledTimes(0);
  },
};

export const Inline = {
  render: (args: ArgTypes) => html`<p>Inline <omni-hyperlink label="${args.label}" ?inline="${args.inline}"></omni-hyperlink> click</p>`,
  args: {
    label: 'Click inline',
    inline: true
  },
};
