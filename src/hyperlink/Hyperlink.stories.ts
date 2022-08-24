import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';

import './Hyperlink.js';

const cssProps = loadCssPropertiesRemote('omni-hyperlink');

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI Components/Hyperlink',
    component: "omni-hyperlink",
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: { 
      size: { control: 'select', options: ["default", "small"] }
    },
      parameters: {
      cssprops: cssProps,
      actions: {
        handles: ['value-changed','value-change']
      }
    }
} as Meta;

interface ArgTypes {
	label: string;
	href: string;
  target: string;
  disabled: boolean;
  inline: boolean;
  size: string;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// Templates that story permutations will bind to.
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-hyperlink 
    data-testid="test-hyperlink"
    label="${args.label}" 
    href="${args.href}"
    target="${args.target}"
    ?disabled="${args.disabled}"
    ?inline="${args.inline}"
    size="${args.size}"
    >
    </omni-hyperlink>
`;

const InlineTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
  <p>
    this is an inline hyperlink
    <omni-hyperlink 
    label="${args.label}" 
    href="${args.href}"
    target="${args.target}"
    ?disabled="${args.disabled}"
    ?inline="${args.inline}"
    size="${args.size}"
    >
    </omni-hyperlink> feel free to click
  </p>
`;

export const Default = Template.bind({});
Default.storyName = "Default"
Default.args = {
    label:'Click me to take you to Storybook',
    href:'https://storybook.js.org',
    target: '',
    disabled: false,
    inline: false,
    size: ''
}

export const Small = Template.bind({});
Small.args = {
    label: 'I am a small hyperlink',
    href: 'www.google.com',
    target: '',
    disabled: false,
    inline: false,
    size: 'small'
}

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled hyperlink",
  href: 'www.google.com',
  target: '',
  disabled: true,
  inline: false,
  size: ''
}

export const Inline = InlineTemplate.bind({});
Inline.args = {
  label: "Inline hyperlink",
  href: 'www.google.com',
  target: '_blank',
  disabled: false,
  inline: true,
  size: ''
}

// Play function testing
Default.play = async (context) => {
  const canvas = within(context.canvasElement);
  console.log(canvas);

  const element = canvas.getByTitle

  /*
  const Hyperlink = canvas.getByTitle('omni-hyperlink');
  
  console.log(Hyperlink);
  const click = jest.fn();


  Hyperlink.addEventListener('click',() => click());
  await userEvent.click(Hyperlink);
  await userEvent.click(Hyperlink);

  await expect(click).toBeCalledTimes(2);

  
  const Hyperlink = canvas.getByTestId('test-hyperlink');
  console.log(Hyperlink);
  const click = jest.fn();
  Hyperlink.addEventListener('click', () => click());

  const content = Hyperlink.shadowRoot.get;
  console.log(content);

  await userEvent.click(content);
  */


}

