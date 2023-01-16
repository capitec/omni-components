import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LabelStory, BaseArgs, HintStory, ErrorStory, DisabledStory, ValueStory, PrefixStory, SuffixStory } from '../core/OmniInputStories.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { PinField } from './PinField.js';

import './PinField.js';
import '../icons/Check.icon.js';
import '../icons/LockOpen.icon.js';
import '../icons/LockClosed.icon.js';

export default {
    title: 'UI Components/Pin Field',
    component: 'omni-pin-field'
} as CSFIdentifier;

interface Args extends BaseArgs {
    hide: string;
    show: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-pin-field
      data-testid="test-pin-field"
      label="${ifNotEmpty(args.label)}"
      .value="${args.value}"
      .data="${args.data}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?disabled="${args.disabled}">
      ${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
      ${args.suffix ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}` : nothing}
      ${args.hide ? html`${'\r\n'}${unsafeHTML(assignToSlot('hide', args.hide))}` : nothing}
      ${args.show ? html`${'\r\n'}${unsafeHTML(assignToSlot('show', args.show))}` : nothing}</omni-pin-field
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
        hide: '',
        show: ''
    },
    play: async (context) => {
        const pinField = within(context.canvasElement).getByTestId<PinField>('test-pin-field');
        const interactions = jest.fn();
        pinField.addEventListener('input', interactions);
        pinField.addEventListener('click', interactions);

        const inputField = pinField.shadowRoot.getElementById('inputField');

        const showSlotElement = pinField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=show]');
        await expect(showSlotElement).toBeTruthy();
        await userEvent.click(showSlotElement, {
            pointerEventsCheck: 0
        });
        const hideSlotElement = pinField.shadowRoot.querySelector<HTMLSlotElement>('slot[name=hide]');
        await expect(hideSlotElement).toBeTruthy();
        await userEvent.click(hideSlotElement, {
            pointerEventsCheck: 0
        });

        await userEvent.type(inputField, '1234', {
            pointerEventsCheck: 0
        });
        const value = '1234';

        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
        } else {
            await waitFor(() => expect(inputField).toHaveValue(value), {
                timeout: 3000
            });

            await waitFor(() => expect(interactions).toBeCalledTimes(value.length + 1), {
                timeout: 3000
            });
        }
    }
};

export const Label = LabelStory<PinField, BaseArgs>('omni-pin-field');

export const Hint = HintStory<PinField, BaseArgs>('omni-pin-field');

export const Error_Label = ErrorStory<PinField, BaseArgs>('omni-pin-field');

export const Value = ValueStory<PinField, BaseArgs>('omni-pin-field');

export const Prefix = PrefixStory<PinField, BaseArgs>('omni-pin-field');

export const Suffix = SuffixStory<PinField, BaseArgs>('omni-pin-field');

export const Disabled = DisabledStory<PinField, BaseArgs>('omni-pin-field');