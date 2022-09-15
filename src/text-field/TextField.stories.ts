import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { TextField } from './TextField.js';

import './TextField.js';

export default {
  title: 'UI Components/Text Field',
  component: 'omni-text-field',
  argTypes: {},
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-text-field'),
    actions: {
      handles: ['input'],
    },
  },
} as Meta;

interface ArgTypes {
label: string;
value: string;
data: object;
hint: string;
error: string;
focussed: boolean;
disabled: boolean;
}

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-text-field data-testid="test-text-field" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?focussed="${args.focussed}" ?disabled="${args.disabled}"></omni-text-field>
  `,
  name: 'Interactive',
  parameters: {},
  args: {
    label: 'Label',
    value: '',
    data: {},
    hint: '',
    error: '',
    focussed: false,
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
  label: 'The Text Label',
  hint: 'The Field hint' 
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
  <omni-text-field data-testid="test-text-field" .value="${args.value}" error="${ifNotEmpty(args.error)}"></omni-text-field>
 `,
 name: 'Error',
 args: {
  value: 'The invalid value',
  error: 'The error label to inform you',
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


