import { html, TemplateResult } from 'lit';
import { Story, Meta, WebComponentsFramework } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';

import './Check.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Check',
  component: "omni-check",
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
	indeterminate: boolean;
  "value-change": any;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-check 
    data-testid="test-check"
    label="${args.label}" 
    .data="${args.data}" 
    hint="${args.hint}" 
    error="${args.error}"
    ?checked="${args.checked}"
    ?disabled="${args.disabled}"
    ?indeterminate="${args.indeterminate}"
    @value-change="${(e: any) => console.log(e)}"
    >
    </omni-check>
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
  disabled:false,
  indeterminate: false
};

export const Label = Template.bind({});
Label.args = {
  label:'Label' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:false,
  indeterminate: false
};

export const Hint = Template.bind({});
Hint.args = {
  label:'Hint' ,
  data:{} ,
  hint:'This is a hint' ,
  error: '',  
  checked:false,
  disabled:false,
  indeterminate: false
};

export const Error = Template.bind({});
Error.args = {
  label:'Error' ,
  data:{} ,
  hint:'' ,
  error: 'This is an error state',  
  checked:false,
  disabled:false,
  indeterminate: false
};

export const Checked = Template.bind({});
Checked.args = {
  label:'Checked' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:true,
  disabled:false,
  indeterminate: false
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  label:'Indeterminate' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:false,
  indeterminate: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  label:'Disabled' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:true,
  indeterminate: false
};
