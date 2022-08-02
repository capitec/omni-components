import { html, TemplateResult } from 'lit';
import { Story, Meta } from '@storybook/web-components';

import './Radio.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Radio',
  component: "omni-radio",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
	parameters: {
		actions: {
			handles: ['value-change']
		},
	}
} as Meta;

interface ArgTypes {
	label: string;
	data: Object;
	hint: string;
	error: string;
	checked: boolean;
	disabled: boolean;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-radio 
    label="${args.label}" 
    .data="${args.data}" 
    hint="${args.hint}" 
    error="${args.error}"
    ?checked="${args.checked}"
    ?disabled="${args.disabled}"
    @value-change="${(e: any) => console.log(e)}"
    >
    </omni-radio>
`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = "Default"
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
