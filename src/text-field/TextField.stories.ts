import { html } from 'lit';
import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { TextField } from './TextField.js';

import './TextField.js';

export default {
    title: 'UI Components/TextField',
    component: 'omni-text-field',
    argTypes: {},
    parameters: {
      cssprops: loadCssPropertiesRemote('omni-text-field'),
      actions: {
        handles: ['value-change'],
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
      <omni-text-field 
        data-testid="test-text-field" 
        label="${ifNotEmpty(args.label)}" 
        .value="${args.value}" 
        .data="${args.data}" 
        hint="${ifNotEmpty(args.hint)}" 
        error="${ifNotEmpty(args.error)}"
        ?focussed="${args.focussed}" 
        ?disabled="${args.disabled}"
        >
      </omni-text-field>
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
        const switchElement = within(context.canvasElement).getByTestId<TextField>('test-text-field');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        /*
        const content = switchElement.shadowRoot.getElementById('content');

        await userEvent.click(content);    
        await fireEvent.keyDown(content, {
          key: ' ',
          code: 'Space',
        });
  
        await expect(valueChange).toBeCalledTimes(2);
        */
  
    }
  };