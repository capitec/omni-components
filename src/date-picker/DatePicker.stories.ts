
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { LabelStory, BaseArgs, HintStory, ErrorStory, PrefixStory, SuffixStory } from '../core/OmniInputStories.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw } from '../utils/StoryUtils.js';
import { DatePicker } from './DatePicker';

import './DatePicker.js';

export default {
    title: 'UI Components/Select',
    component: 'omni-select'
} as CSFIdentifier;

interface Args extends BaseArgs {
    locale: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-date-picker
            data-testid="test-date-picker"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            locale="${args.locale}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-date-picker
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
        locale: 'en-us'
    } as Args,
    play: async (context) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
    }
};

export const Value: ComponentStoryFormat<Args>= {
    render: (args: Args) => html`
    <omni-date-picker
        data-testid="test-date-picker"
        label="${ifNotEmpty(args.label)}"
        .value="${args.value}"
        locale="${args.locale}"
    >

    </omni-date-picker>
    `,
    name: 'Value',
    args: {
        label: 'Value',
        value: '',
        locale: ''
    } as Args,
    play: async (content) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
    }
}

export const Locale: ComponentStoryFormat<Args>= {
    render: (args: Args) => html`
    `,
    name: 'Locale',
    args: {
        label: 'Locale',
        locale: 'ja'
    }
}