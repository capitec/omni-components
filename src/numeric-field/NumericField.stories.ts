import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgTypes,
    BaseArgTypeDefinitions,
    HintStory,
    ErrorStory,
    DisabledStory,
    ValueStory,
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote } from '../utils/StoryUtils';
import { NumericField } from './NumericField';

import './NumericField';

export default {
    title: 'UI Components/Numeric Field',
    component: 'omni-numeric-field',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-numeric-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

export const Interactive = {
    render: (args: BaseArgTypes) => html`
        <omni-numeric-field
            data-testid="test-numeric-field"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-numeric-field
        >
    `,
    name: 'Interactive',
    parameters: {},
    args: {
        label: 'Label',
        value: '',
        data: {},
        hint: '',
        error: '',
        disabled: false,
        prefix: '',
        suffix: ''
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

export const Label = LabelStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Hint = HintStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const ErrorLabel = ErrorStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Value = ValueStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Prefix = PrefixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Suffix = SuffixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Disabled = DisabledStory<NumericField, BaseArgTypes>('omni-numeric-field');

/*
export const Label = {
    render: (args: BaseArgTypes) => html`
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
    render: (args: BaseArgTypes) => html`
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
    render: (args: BaseArgTypes) => html`
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
    render: (args: BaseArgTypes) => html`
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
    render: (args: BaseArgTypes) => html`
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
*/
