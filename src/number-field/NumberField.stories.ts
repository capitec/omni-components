import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
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
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { NumberField } from './NumberField.js';

import './NumberField.js';

export default {
    title: 'UI Components/Number Field',
    component: 'omni-number-field',
    argTypes: BaseArgTypeDefinitions
} as CSFIdentifier;

export const Interactive: ComponentStoryFormat<BaseArgTypes> = {
    render: (args: BaseArgTypes) => html`
        <omni-number-field
            data-testid="test-number-field"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}
        </omni-number-field>
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
        const numberField = within(context.canvasElement).getByTestId<NumberField>('test-number-field');
        numberField.value = '';

        const input = jest.fn();
        numberField.addEventListener('input', input);

        const inputField = numberField.shadowRoot.getElementById('inputField') as HTMLInputElement;
        // Required to clear userEvent Symbol that keeps hidden state of previously typed values via userEvent. If not cleared this cannot be run multiple times with the same results
        setUIValueClean(inputField);

        const value = '12345';
        await userEvent.type(inputField, value, {
            pointerEventsCheck: 0
        });

        // TODO: Fix race conditions in tests
        if (navigator.userAgent === 'Test Runner') {
            console.log('CICD Test - Not Visual');
        } else {
            await waitFor(() => expect(inputField).toHaveValue(parseInt(value)), {
                timeout: 3000
            });
            await waitFor(() => expect(input).toBeCalledTimes(value.length), {
                timeout: 3000
            });
        }
        
    }
};

export const Label = LabelStory<NumberField, BaseArgTypes>('omni-number-field');

export const Hint = HintStory<NumberField, BaseArgTypes>('omni-number-field');

export const ErrorLabel = ErrorStory<NumberField, BaseArgTypes>('omni-number-field');

export const Value = ValueStory<NumberField, BaseArgTypes>('omni-number-field', 123);

export const Prefix = PrefixStory<NumberField, BaseArgTypes>('omni-number-field');

export const Suffix = SuffixStory<NumberField, BaseArgTypes>('omni-number-field');

export const Disabled = DisabledStory<NumberField, BaseArgTypes>('omni-number-field');
