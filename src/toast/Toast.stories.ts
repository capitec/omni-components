import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { Toast } from './Toast.js';

import './Toast.js';

export default {
    title: 'UI Components/Toast',
    component: 'omni-toast'
} as CSFIdentifier;

interface Args {
    type: 'success' | 'warning' | 'error' | 'info' | 'none';
    header?: string;
    detail?: string;
    closeable?: boolean;
    prefix: string;
    '[Default Slot]': string;
    close: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-toast
            data-testid="test-toast"
            detail="${ifNotEmpty(args.detail)}"
            header="${ifNotEmpty(args.header)}"
            type="${ifNotEmpty(args.type)}"
            ?closeable="${args.closeable}">
            ${args.prefix ? html`${unsafeHTML(assignToSlot('prefix', args.prefix))}` : nothing}
            ${unsafeHTML(args['[Default Slot]'])}
            ${args.close ? html`${unsafeHTML(assignToSlot('close', args.close))}` : nothing}
        </omni-toast>
    `,
    name: 'Interactive',
    args: {
        closeable: false,
        detail: 'The toast description',
        header: 'The toast message',
        type: 'success',
        prefix: undefined,
        '[Default Slot]': undefined,
        close: undefined
    },
    play: async (context) => {
        const toast = within(context.canvasElement).getByTestId<Toast>('test-toast');
        toast.focus();
    }
};
