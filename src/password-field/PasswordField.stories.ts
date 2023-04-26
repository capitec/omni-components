import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
    LabelStory,
    BaseArgs,
    ClearableStory,
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
import { PasswordField } from './PasswordField.js';

import './PasswordField.js';
import '../icons/Check.icon.js';
import '../icons/LockOpen.icon.js';
import '../icons/LockClosed.icon.js';

export default {
    title: 'UI Components/Password Field',
    component: 'omni-password-field'
} as CSFIdentifier;

interface Args extends BaseArgs {
    hide: string;
    show: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-password-field
      data-testid="test-password-field"
      label="${ifNotEmpty(args.label)}"
      value="${args.value}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}"
      ?clearable="${args.clearable}">${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${
        args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing
    }${args.hide ? html`${'\r\n'}${unsafeHTML(assignToSlot('hide', args.hide))}` : nothing}${
        args.show ? html`${'\r\n'}${unsafeHTML(assignToSlot('show', args.show))}` : nothing
    }</omni-password-field>
  `,
    name: 'Interactive',
    args: {
        label: 'Label',
        value: '',
        hint: '',
        error: '',
        disabled: false,
        clearable: false,
        prefix: '',
        suffix: '',
        hide: '',
        show: ''
    },
    play: async (context) => {
        const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
        passwordField.value = '';

        const interactions = jest.fn();
        passwordField.addEventListener('input', interactions);
        passwordField.addEventListener('click', interactions);

        const inputField = passwordField.shadowRoot?.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);

        const showSlotElement = passwordField.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=show]');
        await expect(showSlotElement).toBeTruthy();
        await userEvent.click(showSlotElement as HTMLSlotElement, {
            pointerEventsCheck: 0
        });
        const hideSlotElement = passwordField.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=hide]');
        await expect(hideSlotElement).toBeTruthy();
        await userEvent.click(hideSlotElement as HTMLSlotElement, {
            pointerEventsCheck: 0
        });

        await userEvent.type(inputField, 'Value Update', {
            pointerEventsCheck: 0
        });
        const value = 'Value Update';

        await waitFor(() => expect(inputField).toHaveValue(value), {
            timeout: 3000
        });

        await waitFor(() => expect(interactions).toBeCalledTimes(value.length + 1), {
            timeout: 3000
        });
    }
};

export const Label = LabelStory<PasswordField, BaseArgs>('omni-password-field');

export const Hint = HintStory<PasswordField, BaseArgs>('omni-password-field');

export const Error_Label = ErrorStory<PasswordField, BaseArgs>('omni-password-field');

export const Value = ValueStory<PasswordField, BaseArgs>('omni-password-field', 'Password123');

export const Clear = ClearableStory<PasswordField, BaseArgs>('omni-password-field', 'Password123');

export const Prefix = PrefixStory<PasswordField, BaseArgs>('omni-password-field');

export const Suffix = SuffixStory<PasswordField, BaseArgs>('omni-password-field');

export const Disabled = DisabledStory<PasswordField, BaseArgs>('omni-password-field', 'Password123');

export const Custom_Icon_Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-password-field data-testid="test-password-field" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}">
      <omni-lock-open-icon style="fill: orange;" slot="show"></omni-lock-open-icon>
      <omni-lock-closed-icon style="fill: lightgreen;" slot="hide"></omni-lock-closed-icon>
    </omni-password-field>
  `,
    name: 'Custom Icon Slot',
    description: 'Set html content to display as the visibility indicators of the field.',
    args: {
        label: 'Custom Icon Slot'
    },
    play: async (context) => {
        const passwordField = within(context.canvasElement).getByTestId<PasswordField>('test-password-field');
        const slotElement = passwordField.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=show]');
        await expect(slotElement).toBeTruthy();

        const foundSlottedSvgElement = slotElement?.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'omni-lock-open-icon');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};
