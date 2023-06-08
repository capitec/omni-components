import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing, render as renderToElement } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import { Toast } from './Toast.js';
import { ToastStack } from './ToastStack.js';

import './Toast.js';
import './ToastStack.js';
import '../button/Button.js';

export default {
    title: 'UI Components/Toast Stack',
    component: 'omni-toast-stack'
} as CSFIdentifier;

interface Args {
    '[Default Slot]': string;
    reverse: boolean;
    position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const renderStack = (args: Args, getRef: (el?: Element) => void) => html`
<omni-toast-stack
        ${ref(getRef)}
        data-testid="test-toast-stack" 
        position="${ifNotEmpty(args.position)}"
        ?reverse="${args.reverse}">
    ${unsafeHTML(args['[Default Slot]'])}
</omni-toast-stack>
`;

let interactiveStack: ToastStack | undefined = undefined;
export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => {
        if (interactiveStack) {
            return html`Toast Stack added to document.`;
        }

        return html`<omni-button @click="${() => {
            renderToElement(
                renderStack(args, (el) => (interactiveStack = el as ToastStack)),
                document.body
            );
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) =>
                getSourceFromLit(
                    renderStack(args, () => {
                        /* */
                    })
                )
        }
    ],
    name: 'Interactive',
    args: {
        reverse: false,
        position: 'bottom',
        '[Default Slot]': raw`<omni-toast
    data-toast-duration="15000"
    detail="The toast description"
    header="The toast message"
    type="success"
    closeable>
</omni-toast>
<omni-toast
    detail="The toast description"
    header="The toast message"
    type="warning"
    closeable>
</omni-toast>
<omni-toast
    data-toast-duration="3000"
    detail="The toast description"
    header="The toast message"
    type="info"
    >
</omni-toast>
<omni-toast
    data-toast-duration="10000"
    detail="The toast description"
    header="The toast message"
    type="error"
    closeable>
</omni-toast>
<omni-toast
    data-toast-duration="15000"
    detail="The toast description"
    header="The toast message">
</omni-toast>`
    },
    play: async (context) => {
        const btn = context.canvasElement.querySelector('omni-button');
        if (btn) {
            btn.click();
        }
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack');
        await toastStack.updateComplete;
        toastStack.focus();
        toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
        toastStack.showToast({
            type: 'info',
            header: 'Test',
            detail: 'Test Info',
            closeable: true,
            // duration: 15000,
            prefix: html`✅`,
            close: html`❎`,
            content: html`<span>My Extra <strong>Content</strong></span>`
        });
    }
};
