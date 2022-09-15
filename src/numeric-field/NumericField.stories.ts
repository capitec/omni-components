import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { NumericField } from './NumericField';
import { InputBase } from '../internal/InputBase.js';

import './NumericField';

export default {
  title: 'UI Components/Numeric Field',
  component: 'omni-numeric-field',
  argTypes: {},
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-numeric-field'),
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
      <omni-numeric-field data-testid="test-numeric-field" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?focussed="${args.focussed}" ?disabled="${args.disabled}"></omni-numeric-field>
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
        const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
        const input = jest.fn();
        numericField.addEventListener('input', input);
  
        /*
        const inputField = numericField.shadowRoot.getElementById('inputField');
  
        await userEvent.type(inputField, 'Value{space}Update');
        const value = 'Value Update';
        await expect(inputField).toHaveValue(value);
  
        await expect(input).toBeCalledTimes(value.length);
        */
    }
};

export const Label = {
  render: (args: ArgTypes) => html`
  <omni-numeric-field data-testid="test-numeric-field" label="${ifNotEmpty(args.label)}"></omni-numeric-field>
 `,
 name: 'Label',
 args: {
  label: 'The field Label',
  },
  play: async (context: StoryContext) => {
    const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
    await expect(numericField.shadowRoot.querySelector('label')).toHaveTextContent(Label.args.label);
  }
};


export const Value = {
  render: (args: ArgTypes) => html`
  <omni-numeric-field data-testid="test-numeric-field" .value="${(args.value)}"></omni-numeric-field>
 `,
 name: 'Value',
 args: {
  value: '12345',
  },
  play: async (context: StoryContext) => {
    const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
    const inputEvent = jest.fn();
    numericField.addEventListener('input', inputEvent);
  }
};

export const Hint = {
    render: (args: ArgTypes) => html`
    <omni-numeric-field data-testid="test-numeric-field" hint="${ifNotEmpty(args.hint)}" label="${ifNotEmpty(args.label)}"></omni-numeric-field>
   `,
   name: 'Hint',
   args: {
    label: 'The Text Label',
    hint: 'The Field hint' 
    },
    play: async (context: StoryContext) => {
      const numericField = within(context.canvasElement).getByTestId<NumericField>('test-text-field');
      const hintElement = numericField.shadowRoot.querySelector<HTMLElement>('.hint');
      await expect(hintElement).toBeTruthy();
      await expect(hintElement).toHaveTextContent(Hint.args.hint);
  
    }
};

export const Error = {
    render: (args: ArgTypes) => html`
    <omni-numeric-field data-testid="test-numeric-field" .value="${args.value}" error="${ifNotEmpty(args.error)}"></omni-numeric-field>
   `,
   name: 'Error',
   args: {
    value: 'The invalid value',
    error: 'The error label to inform you',
    },
    play: async (context: StoryContext) => {
      const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
      const errorElement  = numericField.shadowRoot.querySelector<HTMLElement>('.error');
      await expect(errorElement).toBeTruthy();
      await expect(errorElement).toHaveTextContent(Error.args.error);
  
    }
  };
  
  export const Disabled = {
    render: (args: ArgTypes) => html`
    <omni-numeric-field data-testid="test-numeric-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}"></omni-numeric-field>
   `,
   name: 'Disabled',
   args: {
    label: 'The disabled field',
    disabled: true,
    },
    play: async (context: StoryContext) => {
      const numericField = within(context.canvasElement).getByTestId<NumericField>('test-text-field');
  
      //Disabled class test.
      const divElement = numericField.shadowRoot.querySelector<HTMLElement>('div');
      const disabledClass = divElement.classList.contains('disabled');
      await expect (disabledClass).toBeTruthy();
  
      //Input event test.
      const input = jest.fn();
      numericField.addEventListener('input', input);
  
      const inputField = numericField.shadowRoot.getElementById('inputField');
  
      await userEvent.type(inputField, 'Value{space}Update');
      await expect(inputField).toHaveValue('');
  
      await expect(input).toBeCalledTimes(0);
    }
  };