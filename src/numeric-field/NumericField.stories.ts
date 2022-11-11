import { expect, jest } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
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
import { NumericField } from './NumericField.js';

import '../icons/LockOpen.icon';
import '../icons/LockClosed.icon';

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
    },
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-numeric-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

interface ArgTypes extends BaseArgTypes {
    increase: string;
    decrease: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
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
                : nothing}${args.increase ? html`${'\r\n'}${unsafeHTML(assignToSlot('increase', args.increase))}` : nothing}${args.decrease
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('decrease', args.decrease))}`
                : nothing}${args.prefix || args.suffix || args.increase || args.decrease ? '\r\n' : nothing}</omni-numeric-field
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
        suffix: '',
        increase: '',
        decrease: ''
    },
    play: async (context: StoryContext) => {
        const numericField = within(context.canvasElement).getByTestId<NumericField>('test-numeric-field');
        const interaction = jest.fn();
        numericField.addEventListener('input', interaction);
        numericField.addEventListener('click', interaction);

        const increaseSlotElement = numericField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=increase]');
        const decreaseSlotElement = numericField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=decrease]');

        await expect(increaseSlotElement).toBeTruthy();
        await expect(decreaseSlotElement).toBeTruthy();

        await userEvent.click(decreaseSlotElement);
        await userEvent.click(increaseSlotElement);
        await userEvent.click(decreaseSlotElement);
        await userEvent.click(increaseSlotElement);
        await userEvent.click(increaseSlotElement);

        const inputField = numericField.shadowRoot.getElementById('inputField');
        const value = '12345';
        await userEvent.type(inputField, value);

        await expect(inputField).toHaveValue(12345);

        await expect(interaction).toBeCalledTimes(11);
    }
};

export const Label = LabelStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Hint = HintStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const ErrorLabel = ErrorStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Value = ValueStory<NumericField, BaseArgTypes>('omni-numeric-field', 123);

export const Prefix = PrefixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Suffix = SuffixStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const Disabled = DisabledStory<NumericField, BaseArgTypes>('omni-numeric-field');

export const CustomIconSlot = {
    render: (args: ArgTypes) => html`
        <omni-numeric-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
            <omni-lock-open-icon slot="increase"></omni-lock-open-icon>
            <omni-lock-closed-icon slot="decrease"></omni-lock-closed-icon>
        </omni-numeric-field>
    `,
    name: 'Custom Icon Slot',
    args: {
        label: 'Custom Icon Slot'
    },
    play: async (context: StoryContext) => {
        const passwordField = within(context.canvasElement).getByTestId<NumericField>('test-password-field');
        const increaseElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=increase]');
        const decreaseElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=decrease]');
        await expect(increaseElement).toBeTruthy();
        await expect(decreaseElement).toBeTruthy();

        const foundSlottedIncreaseElement = increaseElement
            .assignedElements()
            .find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-open-icon');
        const foundSlottedDecreaseElement = decreaseElement
            .assignedElements()
            .find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-closed-icon');
        await expect(foundSlottedIncreaseElement).toBeTruthy();
        await expect(foundSlottedDecreaseElement).toBeTruthy();
    }
};
