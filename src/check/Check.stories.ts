import { html, TemplateResult } from 'lit';
import { Story, Meta, WebComponentsFramework } from '@storybook/web-components';
import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';

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
    cssprops: loadCssPropertiesRemote('omni-check')
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
  check_icon: TemplateResult;
  indeterminate_icon: TemplateResult;
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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const CustomSlotTemplate: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-check 
    data-testid="test-check"
    label="${args.label}" 
    ?checked="${args.checked}"
    ?disabled="${args.disabled}"
    ?indeterminate="${args.indeterminate}"
    @value-change="${(e: any) => console.log(e)}"
    >
      <span slot="check_icon" style="width: 100%; height: 100%;">${args.check_icon}</span>
      <span slot="indeterminate_icon" style="width: 100%; height: 100%;">${args.indeterminate_icon}</span>
    </omni-check>
`;

export const CustomCheckIcon = CustomSlotTemplate.bind({});
CustomCheckIcon.args = {
  label:'Custom Check Icon' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:true,
  disabled:false,
  indeterminate: false,
  check_icon: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.79 410.38" version="1.0" width="100%" height="100%"><path style="stroke:#000;stroke-width:19.892;fill:#139e1c" d="m-1747.2-549.3 287.72 333.9c146.6-298.83 326.06-573.74 614.52-834.75-215.89 121.82-453.86 353.14-657.14 639.38l-245.1-138.53z" transform="translate(843.77 509.04) scale(.48018)"/></svg>`,
  indeterminate_icon: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%"><defs><linearGradient id="b" y2="28.275" gradientUnits="userSpaceOnUse" x2="20.07" y1="3.976" x1="12.113"><stop style="stop-color:#525bc6" offset="0"/><stop style="stop-color:#6f76db" offset="1"/></linearGradient><linearGradient id="a" y2="30" gradientUnits="userSpaceOnUse" x2="20.214" y1="2" x1="12.031"><stop style="stop-color:#20286d" offset="0"/><stop style="stop-color:#0b102f" offset="1"/></linearGradient></defs><path  d="M2.875 13C1.281 13 0 14.338 0 16s1.28 3 2.875 3h26.25C30.719 19 32 17.662 32 16s-1.281-3-2.875-3H2.875z"/><path style="fill:url(#b)" transform="translate(-.063 .063)" d="M2.875 13.938c-1.067 0-1.938.884-1.938 2.062s.87 2.062 1.938 2.062h26.25c1.067 0 1.937-.884 1.937-2.062s-.87-2.062-1.937-2.062H2.875z"/></svg>`
};

export const CustomIndeterminateIcon = CustomSlotTemplate.bind({});
CustomIndeterminateIcon.args = {
  label:'Custom Indeterminate Icon' ,
  data:{} ,
  hint:'' ,
  error: '',  
  checked:false,
  disabled:false,
  indeterminate: true,
  check_icon: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.79 410.38" version="1.0" width="100%" height="100%"><path style="stroke:#000;stroke-width:19.892;fill:#139e1c" d="m-1747.2-549.3 287.72 333.9c146.6-298.83 326.06-573.74 614.52-834.75-215.89 121.82-453.86 353.14-657.14 639.38l-245.1-138.53z" transform="translate(843.77 509.04) scale(.48018)"/></svg>`,
  indeterminate_icon: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%"><defs><linearGradient id="b" y2="28.275" gradientUnits="userSpaceOnUse" x2="20.07" y1="3.976" x1="12.113"><stop style="stop-color:#525bc6" offset="0"/><stop style="stop-color:#6f76db" offset="1"/></linearGradient><linearGradient id="a" y2="30" gradientUnits="userSpaceOnUse" x2="20.214" y1="2" x1="12.031"><stop style="stop-color:#20286d" offset="0"/><stop style="stop-color:#0b102f" offset="1"/></linearGradient></defs><path  d="M2.875 13C1.281 13 0 14.338 0 16s1.28 3 2.875 3h26.25C30.719 19 32 17.662 32 16s-1.281-3-2.875-3H2.875z"/><path style="fill:url(#b)" transform="translate(-.063 .063)" d="M2.875 13.938c-1.067 0-1.938.884-1.938 2.062s.87 2.062 1.938 2.062h26.25c1.067 0 1.937-.884 1.937-2.062s-.87-2.062-1.937-2.062H2.875z"/></svg>`
};
