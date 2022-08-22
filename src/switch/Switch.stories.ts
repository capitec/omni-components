import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';

import './Switch.js';

const cssProps = loadCssPropertiesRemote('omni-switch');


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Switch',
  component: 'omni-switch',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
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
	data: object;
	hint: string;
	error: string;
	checked: boolean;
	disabled: boolean;
  'value-change': any;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-switch 
    data-testid="test-switch"
    label="${args.label}" 
    .data="${args.data}" 
    hint="${args.hint}" 
    error="${args.error}"
    ?checked="${args.checked}"
    ?disabled="${args.disabled}"
    @value-change="${(e: any) => console.log(e)}"
    >
    </omni-switch>
`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = 'Default';
Default.parameters = {
};
Default.args = {
  label:'' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:false
};
Default.play = async (context) => {
  
  const canvas = within(context.canvasElement);

  const Switch = canvas.getByTestId(`test-switch`);
  console.log(Switch);
  const valueChange = jest.fn();
  Switch.addEventListener('value-change',()=> valueChange());

  const content = Switch.shadowRoot.getElementById(`content`);
  console.log(content);

  await userEvent.click(content);
  await userEvent.type(content,'[Enter]');
  await expect(valueChange).toBeCalledTimes(2);
};

export const Label = Template.bind({});
Label.args = {
  label:'Label' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:false
};

export const Hint = Template.bind({});
Hint.args = {
  label:'Hint' ,
  data:{} ,
  hint:'This is a hint' ,
  error: '',  
  checked:false,
  disabled:false
};

export const Error = Template.bind({});
Error.args = {
  label:'Error' ,
  data:{} ,
  hint:'' ,
  error: 'This is an error state',  
  checked:false,
  disabled:false
};

export const Checked = Template.bind({});
Checked.args = {
  label:'Checked' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:true,
  disabled:false
};

export const Disabled = Template.bind({});
Disabled.args = {
  label:'Disabled' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:true
};
