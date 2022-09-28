import { html, nothing } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote, raw } from '../utils/StoryUtils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TextField } from './TextField.js';

import './TextField.js';

export default {
  title: 'UI Components/Text Field',
  component: 'omni-text-field',
  argTypes: {
    prefix: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-text-field'),
    actions: {
      handles: ['input','focus', 'focusOut']
    },
  },
} as Meta;

interface ArgTypes {
label: string;
value: string;
data: object;
hint: string;
error: string;
disabled: boolean;

suffix: string;
prefix: string;
}

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-text-field data-testid="test-text-field" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?disabled="${args.disabled}">${(args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix',args.prefix))}` : nothing)}${(args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix',args.suffix))}` : nothing)}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-text-field>
  `,
  name: 'Interactive',
  parameters: {},
  args: {
    label: 'Label',
    value: '',
    data: {},
    hint: '',
    error: '',
    disabled: false
  },
  play: async (context: StoryContext) => {
      const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
      const input = jest.fn();
      textField.addEventListener('input', input);

      const inputField = textField.shadowRoot.getElementById('inputField');

      await userEvent.type(inputField, 'Value{space}Update');
      const value = 'Value Update';
      await expect(inputField).toHaveValue(value);

      await expect(input).toBeCalledTimes(value.length);
  }
};

export const Label = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${ifNotEmpty(args.label)}"></omni-text-field>
 `,
 name: 'Label',
 args: {
  label: 'The field Label',
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    await expect(textField.shadowRoot.querySelector('label')).toHaveTextContent(Label.args.label);
  }
};

export const Value = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" .value="${(args.value)}"></omni-text-field>
 `,
 name: 'Value',
 args: {
  value: 'The field value',
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const inputEvent = jest.fn();
    textField.addEventListener('input', inputEvent);
  }
};

export const Hint = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" hint="${ifNotEmpty(args.hint)}" label="${ifNotEmpty(args.label)}"></omni-text-field>
 `,
 name: 'Hint',
 args: {
  label: 'Hint Label',
  hint: 'Hint Message' 
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const hintElement = textField.shadowRoot.querySelector<HTMLElement>('.hint');
    await expect(hintElement).toBeTruthy();
    await expect(hintElement).toHaveTextContent(Hint.args.hint);

  }
};


export const Error = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${args.label}" error="${ifNotEmpty(args.error)}"></omni-text-field>
 `,
 name: 'Error',
 args: {
  label: 'Error Label',
  error: 'Error Message',
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const errorElement  = textField.shadowRoot.querySelector<HTMLElement>('.error');
    await expect(errorElement).toBeTruthy();
    await expect(errorElement).toHaveTextContent(Error.args.error);

  }
};

export const Disabled = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}"></omni-text-field>
 `,
 name: 'Disabled',
 args: {
  label: 'The disabled field',
  disabled: true,
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');

    //Disabled class test.
    const divElement = textField.shadowRoot.querySelector<HTMLElement>('div');
    const disabledClass = divElement.classList.contains('disabled');
    await expect (disabledClass).toBeTruthy();

    //Input event test.
    const input = jest.fn();
    textField.addEventListener('input', input);

    const inputField = textField.shadowRoot.getElementById('inputField');

    await userEvent.type(inputField, 'Value{space}Update');
    await expect(inputField).toHaveValue('');

    await expect(input).toBeCalledTimes(0);
  }
};

export const PrefixSlot = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${args.label}">${unsafeHTML(args.prefix)} </omni-text-field>
 `,
 name: 'Prefix Slot',
 args: {
  label: '',
  prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const errorElement  = textField.shadowRoot.querySelector<HTMLElement>('.error');
    await expect(errorElement).toBeTruthy();
    await expect(errorElement).toHaveTextContent(Error.args.error);

  }
};

export const SuffixSlot = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${args.label}">${unsafeHTML(args.suffix)} </omni-text-field>
 `,
 name: 'Suffix Slot',
 args: {
  label: '',
  suffix: raw`<svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`,
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const errorElement  = textField.shadowRoot.querySelector<HTMLElement>('.error');
    await expect(errorElement).toBeTruthy();
    await expect(errorElement).toHaveTextContent(Error.args.error);

  }
};

export const PrefixSuffixSlot = {
  render: (args: ArgTypes) => html`
  <omni-text-field data-testid="test-text-field" label="${args.label}">${unsafeHTML(args.prefix)}${unsafeHTML(args.suffix)} </omni-text-field>
 `,
 name: 'Prefix & Suffix Slot',
 args: {
  label: 'Label',
  prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`,
  suffix: raw`<svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`,
  },
  play: async (context: StoryContext) => {
    const textField = within(context.canvasElement).getByTestId<TextField>('test-text-field');
    const errorElement  = textField.shadowRoot.querySelector<HTMLElement>('.error');
    await expect(errorElement).toBeTruthy();
    await expect(errorElement).toHaveTextContent(Error.args.error);

  }
};


