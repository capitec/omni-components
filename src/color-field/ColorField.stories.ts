import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
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
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { ColorField } from './ColorField.js';

import './ColorField.js';

export default {
    title: 'UI Components/Color Field',
    component: 'omni-color-field',
    argTypes: BaseArgTypeDefinitions
} as CSFIdentifier;

export const Interactive: ComponentStoryFormat<BaseArgTypes> = {
    render: (args: BaseArgTypes) => html`
    <omni-color-field
      data-testid="test-color-field"
      label="${ifNotEmpty(args.label)}"
      .value="${args.value}"
      .data="${args.data}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.prefix || args.suffix ? '\r\n' : nothing}</omni-color-field
    >
  `,
    name: 'Interactive',
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
    play: async (context) => {
        const field = within(context.canvasElement).getByTestId<ColorField>('test-color-field');

        const inputField = field.shadowRoot.getElementById('inputField') as HTMLInputElement;

        await expect(inputField.type).toBe('color');
    }
};

export const Label = LabelStory<ColorField, BaseArgTypes>('omni-color-field');

export const Hint = HintStory<ColorField, BaseArgTypes>('omni-color-field');

export const Error_Label = ErrorStory<ColorField, BaseArgTypes>('omni-color-field');

export const Value = ValueStory<ColorField, BaseArgTypes>('omni-color-field', '#f6b73c');

export const Prefix = PrefixStory<ColorField, BaseArgTypes>('omni-color-field');

export const Suffix = SuffixStory<ColorField, BaseArgTypes>('omni-color-field');

export const Disabled: ComponentStoryFormat<BaseArgTypes> = {
    render: (args: BaseArgTypes) => html`<omni-color-field data-testid="test-field" label="${ifNotEmpty(args.label)}" disabled></omni-color-field>`,
    name: 'Disabled',
    args: {
        label: 'Disabled',
        disabled: true
    } as BaseArgTypes,
    play: async (context) => {
        const input = within(context.canvasElement).getByTestId<ColorField>('test-field');

        //Disabled class test.
        const disabledAttribute = input.attributes.getNamedItem('disabled');
        await expect(disabledAttribute).toBeTruthy();

        //Input event test.
        const inputTest = jest.fn();
        input.addEventListener('input', inputTest);

        const inputField = input.shadowRoot.getElementById('inputField') as OmniFormElement;

        await userEvent.type(inputField, 'Value Update 3', {
            pointerEventsCheck: 0
        });
        await expect(input.value).toBeFalsy();

        await expect(inputTest).toBeCalledTimes(0);
    }
};
