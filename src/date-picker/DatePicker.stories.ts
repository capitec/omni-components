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
    PrefixStory,
    SuffixStory
} from '../core/OmniInputStories.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, loadCssPropertiesRemote} from '../utils/StoryUtils';
import { DatePicker } from './DatePicker';

import './DatePicker.js';

export default {
    title: 'UI Components/DatePicker',
    component: 'omni-date-picker',
    argTypes: BaseArgTypeDefinitions,
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-date-picker'),
        actions: {
            handles: ['input']
        }
    }
} as Meta;

interface ArgTypes extends BaseArgTypes {
    loading_indicator: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-date-picker
            data-testid="test-date-picker"
            label="${ifNotEmpty(args.label)}"
            .value="${args.value}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?disabled="${args.disabled}"
            >${args.prefix ? html`${'\r\n'}${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}${args.suffix
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('suffix', args.suffix))}`
                : nothing}
            ${args.loading_indicator
                ? html`${'\r\n'}${unsafeHTML(assignToSlot('loading_indicator', args.loading_indicator))}${'\r\n'}`
                : nothing}${args.prefix || args.suffix ? '\r\n' : nothing}</omni-date-picker
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
    } as ArgTypes,
    play: async (context: StoryContext) => {
        const datePicker = within(context.canvasElement).getByTestId<DatePicker>('test-date-picker');
        const click = jest.fn();
        datePicker.addEventListener('click', click);

        await userEvent.click(datePicker);
    }
};