/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-invalid-html */
import { nothing } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { assignToSlot, loadSlotForRemote, raw } from '../utils/StoryUtils';
import { html } from 'lit/static-html.js';

export const BaseArgTypeDefinitions = {
  suffix: {
    control: 'text',
    description: loadSlotForRemote('InputBase','suffix').description
  },
  prefix: {
    ...loadSlotForRemote('InputBase','prefix'),
    control: 'text'
  }
};

export interface BaseArgTypes {
  label: string;
  value: string;
  data: object;
  hint: string;
  error: string;
  disabled: boolean;

  suffix: string;
  prefix: string;
}

export const LabelStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Label = {
    render: (args: U) => unsafeHTML(`
    <${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}"></${tagName}>
  `),
    name: 'Label',
    args: {
      label: 'The Label',
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
      await expect(input.shadowRoot.querySelector('label')).toHaveTextContent(Label.args.label);
    }
  };
  return Label;
};

export const HintStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Hint = {
    render: (args: U) => unsafeHTML(`<${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}" hint="${args.hint}"></${tagName}>`),
    name: 'Hint',
    args: {
      label: 'Hint',
      hint: 'The Hint label'
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
      const hintElement = input.shadowRoot.querySelector<HTMLElement>('.hint');
      await expect(hintElement).toBeTruthy();
      await expect(hintElement).toHaveTextContent(Hint.args.hint);
  
    }
  };
  return Hint;
};

export const ErrorStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Error = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${args.label}" error="${ifNotEmpty(args.error)}"></${tagName}>`),
    name: 'Error',
    args: {
      label: 'Error',
      error: 'The Error label'
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
      const errorElement  = input.shadowRoot.querySelector<HTMLElement>('.error');
      await expect(errorElement).toBeTruthy();
      await expect(errorElement).toHaveTextContent(Error.args.error);  
    }
  };
  return Error;
};

export const ValueStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Value = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}"></${tagName}>`),
    name: 'Value',
    args: {
      label: 'Value',
      Value: 'The input value',
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
    }
  };
  return Value;
};

export const PrefixStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Prefix = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}">${unsafeHTML(args.prefix)}</${tagName}>`),
    name: 'Prefix',
    args: {
      label: 'Prefix',
      prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
    }
  };
  return Prefix;
};

export const SuffixStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Suffix = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}">${unsafeHTML(args.suffix)}</${tagName}>`),
    name: 'Suffix',
    args: {
      label: 'Suffix',
      suffix: raw`<svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
    },
    play: async (context: StoryContext) => {
      const input = within(context.canvasElement).getByTestId<T>('test-field');
    }
  };
  return Suffix;
};

export const PrefixAndSuffixStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const PrefixAndSuffix = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}">${unsafeHTML(args.suffix)}</${tagName}>`),
  };
  return PrefixAndSuffix;
};

export const DisabledStory = <T extends HTMLElement, U extends BaseArgTypes>(tagName: string) => {
  const Disabled = {
    render: (args: U) => unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}"></${tagName}>`),
    name: 'Disabled',
    args: {
      label: 'Disabled',
      disabled: true
    },
    play: async (context: StoryContext) => {
      const textField = within(context.canvasElement).getByTestId<T>('test-field');
  
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
  return Disabled;
};






