import { html, nothing } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote, loadDefaultSlotFor, loadSlotForRemote, raw } from '../utils/StoryUtils';
import { PasswordField } from './PasswordField.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import './PasswordField.js';
import { Conditional } from '@storybook/csf';

export default {
  title: 'UI Components/Password Field',
  component: 'omni-password-field',
  argTypes: {
    hide_icon: {
      control: 'text',
    },
    visible_icon: {
      control: 'text',
    },
    suffix: {
      ...loadSlotForRemote('InputBase','suffix'),
      control: 'text'
    }
  },
  parameters: {
    cssprops: loadCssPropertiesRemote('omni-password-field'),
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

  suffix: string;
  prefix: string;
  hide_icon: string;
  visible_icon: string;
}

export const Interactive = {
  render: (args: ArgTypes) => html`
    <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" .value="${(args.value)}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?disabled="${args.disabled}">
    ${(args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing)}
    ${(args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing)}
    </omni-password-field>
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
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
    const input = jest.fn();
    passwordField.addEventListener('input', input);

    const inputField = passwordField.shadowRoot.getElementById('inputField');

    await userEvent.type(inputField, 'Value{space}Update');
    const value = 'Value Update';
    await expect(inputField).toHaveValue(value);

    await expect(input).toBeCalledTimes(value.length);
  }
};

export const Label = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}"></omni-password-field>
 `,
  name: 'Label',
  args: {
    label: 'The field Label',
  },
  play: async (context: StoryContext) => {
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
    await expect(passwordField.shadowRoot.querySelector('label')).toHaveTextContent(Label.args.label);
  }
};

export const Value = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" .value="${(args.value)}"></omni-password-field>
 `,
  name: 'Value',
  args: {
    value: 'The field value',
  },
  play: async (context: StoryContext) => {
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-text-field');
    const inputEvent = jest.fn();
    passwordField.addEventListener('input', inputEvent);
  }
};

export const Hint = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" hint="${ifNotEmpty(args.hint)}" label="${ifNotEmpty(args.label)}"></omni-password-field>
 `,
  name: 'Hint',
  args: {
    label: 'The Text Label',
    hint: 'The Field hint'
  },
  play: async (context: StoryContext) => {
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-text-field');
    const hintElement = passwordField.shadowRoot.querySelector<HTMLElement>('.hint');
    await expect(hintElement).toBeTruthy();
    await expect(hintElement).toHaveTextContent(Hint.args.hint);
  }
};


export const Error = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" .value="${args.value}" error="${ifNotEmpty(args.error)}"></omni-password-field>
 `,
  name: 'Error',
  args: {
    value: 'The invalid value',
    error: 'The error label to inform you',
  },
  play: async (context: StoryContext) => {
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
    const errorElement = passwordField.shadowRoot.querySelector<HTMLElement>('.error');
    await expect(errorElement).toBeTruthy();
    await expect(errorElement).toHaveTextContent(Error.args.error);
  }
};

export const Disabled = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}"></omni-password-field>
 `,
  name: 'Disabled',
  args: {
    label: 'The disabled field',
    disabled: true,
  },
  play: async (context: StoryContext) => {
    const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-text-field');
    //Disabled class test.
    const divElement = passwordField.shadowRoot.querySelector<HTMLElement>('div');
    const disabledClass = divElement.classList.contains('disabled');
    await expect(disabledClass).toBeTruthy();
    //Input event test.
    const input = jest.fn();
    passwordField.addEventListener('input', input);
    const inputField = passwordField.shadowRoot.getElementById('inputField');
    await userEvent.type(inputField, 'Value{space}Update');
    await expect(inputField).toHaveValue('');
    await expect(input).toBeCalledTimes(0);
  }
};

export const CustomHideSlot = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
    ${unsafeHTML(args.hide_icon)}
  </omni-password-field>
  `,
  name: 'Custom Hide Slot',
  args: {
    label: 'Slot',
    hide_icon: raw`<svg slot="hide_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
  }
};

export const CustomVisibleSlot = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
  ${unsafeHTML(args.visible_icon)}
  </omni-password-field>
  `,
  name: 'Custom Visible Slot',
  args: {
    label: 'Slot',
    visible_icon: raw`<svg slot="visible_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
  }
};

export const PrefixSlot = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
  ${unsafeHTML(args.hide_icon)}
  </omni-password-field>
  `,
  name: 'Prefix Slot',
  args: {
    label: 'Slot',
    hide_icon: raw`<svg slot="hide_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
  }
};


export const SuffixSlot = {
  render: (args: ArgTypes) => html`
  <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
  ${unsafeHTML(args.hide_icon)}
  </omni-password-field>
  `,
  name: 'Suffix Slot',
  args: {
    label: 'Slot',
    hide_icon: raw`<svg slot="hide_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
  }
};


