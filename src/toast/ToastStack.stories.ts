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

const renderStack = (args: Args, getRef?: (el?: Element) => void, testId?: string) => html`
<omni-toast-stack
        ${getRef ? ref(getRef) : nothing}
        data-testid="${testId ?? 'test-toast-stack'}" 
        position="${ifNotEmpty(args.position)}"
        ?reverse="${args.reverse}">
    ${unsafeHTML(args['[Default Slot]'])}
</omni-toast-stack>
`;

let interactiveStack: ToastStack | undefined = undefined;
export const Interactive: ComponentStoryFormat<Args> = {
    description: () => html`
<div>
    <span>The <code class="language-html">&lt;omni-toast-stack&gt;</code> component can be authored as an element or created via script.</span>
    <br/>
    <span>This example illustrates the component authored as an element. An important consideration to keep in mind when using this approach is that in order for the element to properly overlay all other content, it needs to be a root level element to avoid <code class="language-html">z-index</code> related issues.</span>
    <br/>
    <span>Creating the <code class="language-html">&lt;omni-toast-stack&gt;</code> via script can help avoid this issue as it by default parents the newly created instance to the document body. The parent can still be specified to be a different element, however the same considerations will then apply.</span>
</div>
    `,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            if (!interactiveStack) {
                const parent = document.createElement('div');
                parent.style.display = 'contents';
                document.body.appendChild(parent);
                renderToElement(
                    renderStack(args, (el) => (interactiveStack = el as ToastStack)),
                    parent
                );
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            } else {
                interactiveStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
                interactiveStack.showToast({
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
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args))
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

let slottedStack: ToastStack | undefined = undefined;
export const Slotted_Toasts: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <span>Display slotted <code class="language-html">&lt;omni-toast&gt;</code> elements in order.<span>
            <br/>
            <span>Slotted toasts can be configured to auto-close after specified milliseconds with the <code class="language-js">data-toast-duration</code> attribute, after which they will be removed from the parent element.</span>    
            <br/>
            <span>Slotted toasts with the <code class="language-js">closeable</code> attribute will be removed from the parent element when their <code class="language-js">close-click</code> event gets fired (usually via click of the close button).</span>    
        <div>`,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            if (!slottedStack) {
                const parent = document.createElement('div');
                parent.style.display = 'contents';
                document.body.appendChild(parent);
                renderToElement(
                    renderStack(args, (el) => (slottedStack = el as ToastStack), 'test-toast-stack-slotted'),
                    parent
                );
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args))
        }
    ],
    name: 'Slotted Toasts',
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
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack-slotted');
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

let addedStack: ToastStack | undefined = undefined;
export const Show_From_Script: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <span>Create new <code class="language-html">&lt;omni-toast&gt;</code> elements from script.<span>
            <br/>
            <span>Toasts can be configured to auto-close after specified milliseconds with the <code class="language-js">duration</code> property, after which they will be removed from the parent element.</span>    
            <br/>
            <span>Toasts with the <code class="language-js">closeable</code> property will be removed from the parent element when their <code class="language-js">close-click</code> event gets fired (usually via click of the close button).</span>    
            <br/>
            <span>All <code class="language-html">&lt;omni-toast&gt;</code> attributes can be configured as well as additional render functions that can bed provided for slotted content on the toasts.</span>    
        <div>`,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            if (!addedStack) {
                const parent = document.createElement('div');
                parent.style.display = 'contents';
                document.body.appendChild(parent);
                renderToElement(
                    renderStack(args, (el) => (addedStack = el as ToastStack), 'test-toast-stack-added'),
                    parent
                );
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }
            addedStack!.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
            addedStack!.showToast({
                type: 'info',
                header: 'Test',
                detail: 'Test Info',
                closeable: true,
                // duration: 15000,
                prefix: `✅`,
                close: `❎`,
                content: raw`<span>My Extra <strong>Content</strong></span>`
            });
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args)),
            sourceParts: {
                htmlFragment: (args) => getSourceFromLit(renderStack(args)),
                jsFragment: `const toastStack = document.querySelector('omni-toast-stack');
toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
toastStack.showToast({
    type: 'info',
    header: 'Test',
    detail: 'Test Info',
    closeable: true,
    // duration: 15000, // Do not set duration to keep toast until closed by user.
    prefix: '✅',
    close: '❎',
    content: '<span>My Extra <strong>Content</strong></span>'
});
                `
            }
        }
    ],
    name: 'Show from script',
    args: {
        reverse: false,
        position: 'bottom',
        '[Default Slot]': undefined
    },
    play: async (context) => {
        const btn = context.canvasElement.querySelector('omni-button');
        if (btn) {
            btn.click();
        }
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack-added');
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

let createdStack: ToastStack | undefined = undefined;
export const Create_From_Script: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <span>Create an <code class="language-html">&lt;omni-toast-stack&gt;</code> instance from script.<span>
            <br/>
            <span>An important consideration to keep in mind when using authoring the element via html is that in order for the element to properly overlay all other content, it needs to be a root level element to avoid <code class="language-html">z-index</code> related issues.</span>
            <br/>
            <span>Creating the <code class="language-html">&lt;omni-toast-stack&gt;</code> via script as in this example can help avoid this issue as it by default parents the newly created instance to the document body. The parent can still be specified to be a different element, however the same considerations will then apply.</span>
        <div>`,
    render: (args: Args) => {
        if (!createdStack) {
            createdStack = ToastStack.create({
                position: 'top',
                reverse: true
            });
            createdStack?.setAttribute('data-testid', 'test-toast-stack-created');
        }
        return html`<omni-button @click="${() => {
            createdStack!.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
            createdStack!.showToast({
                type: 'info',
                header: 'Test',
                detail: 'Test Info',
                closeable: true,
                // duration: 15000,
                prefix: `✅`,
                close: `❎`,
                content: raw`<span>My Extra <strong>Content</strong></span>`
            });
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args)),
            sourceParts: {
                htmlFragment: raw`<div>HTML Content</div>`,
                jsFragment: `import { ToastStack } from '@capitec/omni-components/toast';
const toastStack = ToastStack.create({
    position: 'top',
    reverse: true
});

toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
toastStack.showToast({
    type: 'info',
    header: 'Test',
    detail: 'Test Info',
    closeable: true,
    // duration: 15000, // Do not set duration to keep toast until closed by user.
    prefix: '✅',
    close: '❎',
    content: '<span>My Extra <strong>Content</strong></span>'
});
                `
            }
        }
    ],
    name: 'Create from script',
    args: {
        reverse: false,
        position: 'bottom',
        '[Default Slot]': undefined
    },
    play: async (context) => {
        const btn = context.canvasElement.querySelector('omni-button');
        if (btn) {
            btn.click();
        }
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack-created');
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

let positionStack: ToastStack | undefined = undefined;
export const Position: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <span>Position <code class="language-html">&lt;omni-toast&gt;</code> elements in the stack.<span>
            <br/>
            <span>The <code class="language-javascript">'position'</code> attribute supports the following options:
                <ul>
                    <li><code class="language-javascript">'top'</code></li>
                    <li><code class="language-javascript">'bottom'</code> (Default)</li>
                    <li><code class="language-javascript">'left'</code></li>
                    <li><code class="language-javascript">'right'</code></li>
                    <li><code class="language-javascript">'top-left'</code></li>
                    <li><code class="language-javascript">'top-right'</code></li>
                    <li><code class="language-javascript">'bottom-left'</code></li>
                    <li><code class="language-javascript">'bottom-right'</code></li>
                </ul>
            </span>
        <div>`,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            if (!positionStack) {
                const parent = document.createElement('div');
                parent.style.display = 'contents';
                document.body.appendChild(parent);
                renderToElement(
                    renderStack(args, (el) => (positionStack = el as ToastStack), 'test-toast-stack-position'),
                    parent
                );
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }
            positionStack!.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
            positionStack!.showToast({
                type: 'info',
                header: 'Test',
                detail: 'Test Info',
                closeable: true,
                // duration: 15000,
                prefix: `✅`,
                close: `❎`,
                content: raw`<span>My Extra <strong>Content</strong></span>`
            });
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args)),
            sourceParts: {
                htmlFragment: (args) => getSourceFromLit(renderStack(args)),
                jsFragment: `const toastStack = document.querySelector('omni-toast-stack');
toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
toastStack.showToast({
    type: 'info',
    header: 'Test',
    detail: 'Test Info',
    closeable: true,
    // duration: 15000, // Do not set duration to keep toast until closed by user.
    prefix: '✅',
    close: '❎',
    content: '<span>My Extra <strong>Content</strong></span>'
});
                `
            }
        }
    ],
    name: 'Position',
    args: {
        reverse: false,
        position: 'right',
        '[Default Slot]': undefined
    },
    play: async (context) => {
        const btn = context.canvasElement.querySelector('omni-button');
        if (btn) {
            btn.click();
        }
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack-position');
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

let reverseStack: ToastStack | undefined = undefined;
export const Reverse: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <span>Reverse <code class="language-html">&lt;omni-toast&gt;</code> elements in the stack.<span>
            <br/>
            <span>By default newest toasts are showed at the bottom of the stack. When reversed, newest toasts are showed on top of the stack.</span>
        <div>`,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            if (!reverseStack) {
                renderToElement(
                    renderStack(args, (el) => (reverseStack = el as ToastStack), 'test-toast-stack-reverse'),
                    document.body
                );
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }
            reverseStack!.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
            reverseStack!.showToast({
                type: 'info',
                header: 'Test',
                detail: 'Test Info',
                closeable: true,
                // duration: 15000,
                prefix: `✅`,
                close: `❎`,
                content: raw`<span>My Extra <strong>Content</strong></span>`
            });
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args)),
            sourceParts: {
                htmlFragment: (args) => getSourceFromLit(renderStack(args)),
                jsFragment: `const toastStack = document.querySelector('omni-toast-stack');
toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 15000 });
toastStack.showToast({
    type: 'info',
    header: 'Test',
    detail: 'Test Info',
    closeable: true,
    // duration: 15000, // Do not set duration to keep toast until closed by user.
    prefix: '✅',
    close: '❎',
    content: '<span>My Extra <strong>Content</strong></span>'
});
                `
            }
        }
    ],
    name: 'Reverse',
    args: {
        reverse: true,
        position: 'bottom',
        '[Default Slot]': undefined
    },
    play: async (context) => {
        const btn = context.canvasElement.querySelector('omni-button');
        if (btn) {
            btn.click();
        }
        const toastStack = within(document.body).getByTestId<ToastStack>('test-toast-stack-reverse');
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
