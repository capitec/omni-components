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
import { assignToSlot, loadCssPropertiesRemote, raw } from '../utils/StoryUtils';
import { PasswordField } from './PasswordField.js';

import './PasswordField.js';
import '../icons/Check.icon';
import '../icons/LockOpen.icon';
import '../icons/LockClosed.icon';

export default {
    title: 'UI Components/Password Field',
    component: 'omni-password-field',
    argTypes: {
        ...BaseArgTypeDefinitions,
        hide: {
            control: 'text'
        },
        show: {
            control: 'text'
        }
    },
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-password-field'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

interface ArgTypes extends BaseArgTypes {
    hide: string;
    show: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" .value="${args.value}" .data="${args.data}" hint="${ifNotEmpty(args.hint)}" error="${ifNotEmpty(args.error)}" ?disabled="${args.disabled}"> ${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing} ${args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing} ${args.hide ? html`${'\r\n'}${unsafeHTML(assignToSlot('hide', args.hide))}` : nothing} ${args.show ? html`${'\r\n'}${unsafeHTML(assignToSlot('show', args.show))}` : nothing}</omni-password-field>
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
        hide: '',
        show: ''
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

export const Label = LabelStory<PasswordField, BaseArgTypes>('omni-password-field');

export const Hint = HintStory<PasswordField, BaseArgTypes>('omni-password-field');

export const ErrorLabel = ErrorStory<PasswordField, BaseArgTypes>('omni-password-field');

export const Value = ValueStory<PasswordField, BaseArgTypes>('omni-password-field');

export const Prefix = PrefixStory<PasswordField, BaseArgTypes>('omni-password-field');

export const Suffix = SuffixStory<PasswordField, BaseArgTypes>('omni-password-field');

export const Disabled = DisabledStory<PasswordField, BaseArgTypes>('omni-password-field');

export const CustomIconSlot = {
    render: (args: ArgTypes) => html`
        <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
            <omni-lock-open-icon slot="show"></omni-lock-open-icon>
            <omni-lock-closed-icon slot="hide"></omni-lock-closed-icon>
        </omni-password-field>
    `,
    name: 'Custom Icon Slot',
    args: {
        label: 'Custom Icon Slot'
    },
    play: async (context: StoryContext) => {
        const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
        const slotElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=show]');
        await expect(slotElement).toBeTruthy();

        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};

export const CustomSlotTest = {
    render: (args: ArgTypes) => html`
        <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
            ${unsafeHTML(args.show)}
        </omni-password-field>
    `,
    name: 'Custom Slot Div Test',
    args: {
        label: ' Div Slot',
        show: raw`<omni-check-icon slot="show"></omni-check-icon>`
    },
    play: async (context: StoryContext) => {
        const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
        const slotElement = passwordField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=show]');
        await expect(slotElement).toBeTruthy();

        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};