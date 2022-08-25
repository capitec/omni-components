import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Code.js';

export default {
  title: 'UI Components/Code',
  component: 'omni-code',
  argTypes: {},
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-code'),
  },
} as Meta;

interface ArgTypes {
  header: string;
  content: string;
  language: string;
}

export const Default = {
  render: (args: ArgTypes) => html`
    <omni-code
      language="${args.language}"
      data-testid="test-code"
      header="${args.header}"
      content="${args.content}"
    >
    </omni-code>
  `,
  name: 'Default',
  parameters: {},
  args: {
    header: '',
    content: 'Hello',
    language: 'html',
  },
};

export const HTML_as_content = {
  render: (args: ArgTypes) => html`
    <omni-code
      language="${args.language}"
      data-testid="test-code"
      header="${args.header}"
      content="${args.content}"
    >
    </omni-code>
  `,
  args: {
    header: 'HTML',
    content: `  
   <div>
     <h1>Hello World</h1>
   </div>
  `,
    language: 'html',
  },
};

export const HTML_as_child_element = {
  render: (args: ArgTypes) => html`
    <omni-code
      language="${args.language}"
      data-testid="test-code"
      header="${args.header}"
      content="${args.content}"
    >
      <div>
        <h1>Hello World</h1>
      </div>
    </omni-code>
  `,
  args: {
    header: 'HTML as child element',
    language: 'html',
  },
};

export const JavaScript = {
  render: (args: ArgTypes) => html`
    <omni-code
      language="${args.language}"
      data-testid="test-code"
      header="${args.header}"
      content="${args.content}"
    >
    </omni-code>
  `,
  args: {
    header: 'JavaScript',
    content: `  
    alert('this is javascript');
  `,
    language: 'javascript',
  },
};
