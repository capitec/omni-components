import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
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
import { NumericField } from './NumericField.js';

import '../icons/LockOpen.icon.js';
import '../icons/LockClosed.icon.js';

import './NumericField.js';

export default {
    title: 'UI Components/Numeric Field',
    component: 'omni-numeric-field',
    argTypes: {
        ...BaseArgTypeDefinitions,
        increase: {
            control: 'text'
        },
        decrease: {
            control: 'text'
        }
    }
} as CSFIdentifier;

interface Args extends BaseArgs {
    increase: string;
    decrease: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-numeric-field
      data-testid="test-numeric-field"
      label="${ifNotEmpty(args.label)}"
      .value="${args.value}"
      .data="${args.data}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.increase ? html`${'\r\n'}${unsafeHTML(assignToSlot('increase', args.increase))}` : nothing}${
        args.decrease ? html`${'\r\n'}${unsafeHTML(assignToSlot('decrease', args.decrease))}` : nothing
    }${args.prefix || args.suffix || args.increase || args.decrease ? '\r\n' : nothing}</omni-numeric-field
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
        suffix: '',
        increase: '',
        decrease: ''
    },
    play: async (context) => {
        const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
        const interaction = jest.fn();
        numericField.addEventListener('input', interaction);
        numericField.addEventListener('click', interaction);

        const increaseSlotElement = numericField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=increase]');
        const decreaseSlotElement = numericField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=decrease]');

        await expect(increaseSlotElement).toBeTruthy();
        await expect(decreaseSlotElement).toBeTruthy();

        await userEvent.click(decreaseSlotElement, {
            pointerEventsCheck: 0
        });
        await userEvent.click(increaseSlotElement, {
            pointerEventsCheck: 0
        });
        await userEvent.click(decreaseSlotElement, {
            pointerEventsCheck: 0
        });
        await userEvent.click(increaseSlotElement, {
            pointerEventsCheck: 0
        });
        await userEvent.click(increaseSlotElement, {
            pointerEventsCheck: 0
        });

        const inputField = numericField.shadowRoot.getElementById('inputField');
        const value = '12345';
        await userEvent.type(inputField, value, {
            pointerEventsCheck: 0
        });

        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
        } else {
            await waitFor(() => expect(inputField).toHaveValue(212345), {
                timeout: 10000
            });

            await waitFor(() => expect(interaction).toBeCalledTimes(11), {
                timeout: 10000
            });
        }
    }
};

export const Label = LabelStory<NumericField, BaseArgs>('omni-numeric-field');

export const Hint = HintStory<NumericField, BaseArgs>('omni-numeric-field');

export const Error_Label = ErrorStory<NumericField, BaseArgs>('omni-numeric-field');

export const Value = ValueStory<NumericField, BaseArgs>('omni-numeric-field', 123);

export const Prefix = PrefixStory<NumericField, BaseArgs>('omni-numeric-field');

export const Suffix = SuffixStory<NumericField, BaseArgs>('omni-numeric-field');

export const Disabled = DisabledStory<NumericField, BaseArgs>('omni-numeric-field');

export const Custom_Icon_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-numeric-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
      <omni-lock-open-icon slot="increase"></omni-lock-open-icon>
      <omni-lock-closed-icon slot="decrease"></omni-lock-closed-icon>
    </omni-numeric-field>
  `,
    name: 'Custom Icon Slot',
    args: {
        label: 'Custom Icon Slot'
    },
    play: async (context) => {
        const passwordField = within(context.canvasElement).getByTestId<NumericField>('test-password-field');
        const increaseElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=increase]');
        const decreaseElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=decrease]');
        await expect(increaseElement).toBeTruthy();
        await expect(decreaseElement).toBeTruthy();

        const foundSlottedIncreaseElement = increaseElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-open-icon');
        const foundSlottedDecreaseElement = decreaseElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-closed-icon');
        await expect(foundSlottedIncreaseElement).toBeTruthy();
        await expect(foundSlottedDecreaseElement).toBeTruthy();
    }
};
