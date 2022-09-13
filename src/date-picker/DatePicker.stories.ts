import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { DatePicker } from './DatePicker';

import './DatePicker';

export default {
    title: 'UI Components/DatePicker',
    component: 'omni-date-picker',
    argTypes: {},
    parameters: {
      // cssprops: loadCssPropertiesRemote('omni-input-field'),
      actions: {
        handles: ['value-change'],
      },
    },
} as Meta;

interface ArgTypes {
  label: string;
  value: string;
  hint: string;
  error: string;
  focussed: boolean;
  disabled: boolean;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
      <omni-date-picker 
        data-testid="test-date-field" 
        label="${ifNotEmpty(args.label)}" 
        .value="${args.value}" 
        hint="${ifNotEmpty(args.hint)}" 
        error="${ifNotEmpty(args.error)}"
        ?focussed="${args.focussed}" 
        ?disabled="${args.disabled}"
        >
      </omni-date-picker>
    `,
    name: 'Interactive',
    parameters: {},
    args: {
      label: '',
      value: '',
      hint: '',
      error: '',
      focussed: false,
      disabled: false
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<DatePicker>('test-date-field');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);
  
    }
  };