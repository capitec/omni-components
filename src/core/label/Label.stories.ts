import { html, TemplateResult } from 'lit';
import { Story, Meta } from '@storybook/web-components';


import './Label.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Core/Label',
  component: "omni-label",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
     type: { control: { type: "select", options: ["default", "title", "subtitle", "strong"] } }
  }
} as Meta;

interface ArgTypes {
	label: string;
	type: string;
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-label 
    label="${args.label}" 
    type="${args.type}" 
    >
    </omni-label>
`;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = "Default"
Default.parameters = {
};
Default.args = {
  label:'Label' ,
  type:'default'
};

export const Title = Template.bind({});
Title.args = {
  label:'Title',
  type:'title'
};

export const Subtitle = Template.bind({});
Subtitle.args = {
  label:'Subtitle',
  type:'subtitle'
};

export const Strong = Template.bind({});
Strong.args = {
  label:'Strong',
  type:'strong'
};
