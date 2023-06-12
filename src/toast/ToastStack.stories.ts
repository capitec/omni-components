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
    <p>The <code class="language-html">&lt;omni-toast-stack&gt;</code> component can be authored as an element or created via script.</p>
    <p>This example illustrates the component authored as an element. An important consideration to keep in mind when using this approach is that in order for the element to properly overlay all other content, it needs to be a root level element to avoid <code class="language-html">z-index</code> related issues.</p>
    <p>Creating the <code class="language-html">&lt;omni-toast-stack&gt;</code> via script can help avoid this issue as it by default parents the newly created instance to the document body. The parent can still be specified to be a different element, however the same considerations will then apply.</p>
</div>
    `,
    render: (args: Args) => {
        const parent = interactiveStack?.parentElement ?? document.createElement('div');
        if (interactiveStack) {
            renderToElement(
                renderStack(args, (el) => (interactiveStack = el as ToastStack)),
                parent
            );
        }
        return html`<omni-button @click="${() => {
            if (!interactiveStack) {
                parent.style.display = 'contents';
                document.body.appendChild(parent);
            } else {
                interactiveStack.innerHTML = args['[Default Slot]'];
            }
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
        }}">Show Toasts</omni-button>`;
    },
    frameworkSources: [
        {
            framework: 'HTML',
            load: (args) => getSourceFromLit(renderStack(args))
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(renderStack(args)).replaceAll(' closeable', ' :closeable="true"').replaceAll(' reverse', ' :reverse="true"')
        }
    ],
    name: 'Interactive',
    args: {
        reverse: false,
        position: 'bottom',
        '[Default Slot]': raw`<omni-toast
    data-toast-duration="4000"
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
    data-toast-duration="4500"
    detail="The toast description"
    header="The toast message"
    type="error"
    closeable>
</omni-toast>
<omni-toast
    data-toast-duration="2000"
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
        const toastRemove = jest.fn();
        toastStack.addEventListener('toast-remove', () => toastRemove());
        await toastStack.updateComplete;
        toastStack.focus();
        const shown = toastStack.showToast({ type: 'info', header: 'Test', detail: 'Test Info', closeable: true, duration: 2000 });
        const toastStackRemove = jest.fn();
        shown.addEventListener('toast-stack-remove', () => toastStackRemove());
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

        // Wait for toast removals
        await new Promise((resolve) => setTimeout(resolve, 6000));

        await expect(toastRemove).toBeCalledTimes(5);
        await expect(toastStackRemove).toBeCalled();

        await expect(toastStack.childElementCount).toBe(2);

        toastStack.innerHTML = '';
    }
};

let slottedStack: ToastStack | undefined = undefined;
export const Slotted_Toasts: ComponentStoryFormat<Args> = {
    description: () => html`
        <div>
            <p>Display slotted <code class="language-html">&lt;omni-toast&gt;</code> elements in order.<p>
            <p>Slotted toasts can be configured to auto-close after specified milliseconds with the <code class="language-js">data-toast-duration</code> attribute, after which they will be removed from the parent element.</p>
            <p>Slotted toasts with the <code class="language-js">closeable</code> attribute will be removed from the parent element when their <code class="language-js">close-click</code> event gets fired (usually via click of the close button).</p>    
        <div>`,
    render: (args: Args) => {
        return html`<omni-button @click="${() => {
            const parent = slottedStack?.parentElement ? slottedStack.parentElement : document.createElement('div');
            if (!slottedStack) {
                parent.style.display = 'contents';
                document.body.appendChild(parent);
            } else {
                slottedStack.innerHTML = args['[Default Slot]'];
            }
            renderToElement(
                renderStack(args, (el) => (slottedStack = el as ToastStack), 'test-toast-stack-slotted'),
                parent
            );
            slottedStack?.requestUpdate();
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
            load: (args) => getSourceFromLit(renderStack(args))
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(renderStack(args)).replaceAll(' closeable', ' :closeable="true"').replaceAll(' reverse', ' :reverse="true"')
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToast, OmniToastStack } from "@capitec/omni-components-react/toast";

const App = () => <OmniToastStack position="${args.position}" >
                    <OmniToast
                        data-toast-duration="15000"
                        detail="The toast description"
                        header="The toast message"
                        type="success"
                        closeable>
                    </OmniToast>
                    <OmniToast
                        detail="The toast description"
                        header="The toast message"
                        type="warning"
                        closeable>
                    </OmniToast>
                    <OmniToast
                        data-toast-duration="3000"
                        detail="The toast description"
                        header="The toast message"
                        type="info"
                        >
                    </OmniToast>
                    <OmniToast
                        data-toast-duration="10000"
                        detail="The toast description"
                        header="The toast message"
                        type="error"
                        closeable>
                    </OmniToast>
                    <OmniToast
                        data-toast-duration="15000"
                        detail="The toast description"
                        header="The toast message">
                    </OmniToast>
                  </OmniToastStack>;`
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
            <p>Create new <code class="language-html">&lt;omni-toast&gt;</code> elements from script.<p>
            <p>Toasts can be configured to auto-close after specified milliseconds with the <code class="language-js">duration</code> property, after which they will be removed from the parent element.</p>
            <p>Toasts with the <code class="language-js">closeable</code> property will be removed from the parent element when their <code class="language-js">close-click</code> event gets fired (usually via click of the close button).</p>
            <p>All <code class="language-html">&lt;omni-toast&gt;</code> attributes can be configured as well as additional render functions that can bed provided for slotted content on the toasts.</p>    
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
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToastStack } from "@capitec/omni-components-react/toast";

const App = () => {
    let toastStack = null;
    const setRef = e => {
        toastStack = e;
        
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
    }
            
    return <OmniToastStack ref={setRef} position="${args.position}" />;                    
}`
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        renderStack(args),
                        (container) => container.firstElementChild?.setAttribute('data-replace-token', ''),
                        (s) => s.replace(' data-replace-token=""', ' ${ref(onRef)}')
                    ),
                jsFragment: `import { ref } from 'https://unpkg.com/lit-html/directives/ref.js?module';
                
const onRef = e => {
    const toastStack = e;
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
}`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(renderStack(args)).replaceAll(' closeable', ' :closeable="true"').replaceAll(' reverse', ' :reverse="true"') +
                    `
<!-- Execute function on Vue load -->
{{ (() =>  { run() })() }}
`,
                jsFragment: `window.vueData = {
    run: async () => {

        let toastStack = document.querySelector('omni-toast-stack');

        // Wait for Vue to complete loading and the Toast Stack to be available
        while (!toastStack) {
            await Promise.resolve();
            toastStack = document.querySelector('omni-toast-stack');
        }
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
        
    }
};`
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
            <p>Create an <code class="language-html">&lt;omni-toast-stack&gt;</code> instance from script.<p>
            <p>An important consideration to keep in mind when using authoring the element via html is that in order for the element to properly overlay all other content, it needs to be a root level element to avoid <code class="language-html">z-index</code> related issues.</p>
            <p>Creating the <code class="language-html">&lt;omni-toast-stack&gt;</code> via script as in this example can help avoid this issue as it by default parents the newly created instance to the document body. The parent can still be specified to be a different element, however the same considerations will then apply.</p>
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
});`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { ToastStack } from '@capitec/omni-components-react/toast';

const App = () => <div>HTML Content</div>;

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
});`
        },
        {
            framework: 'Vue',
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
});`
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
            <p>Position <code class="language-html">&lt;omni-toast&gt;</code> elements in the stack.<p>
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
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToastStack } from "@capitec/omni-components-react/toast";

const App = () => {
    let toastStack = null;
    const setRef = e => {
        toastStack = e;
        
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
    }
            
    return <OmniToastStack ref={setRef} position="${args.position}" />;                    
}`
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        renderStack(args),
                        (container) => container.firstElementChild?.setAttribute('data-replace-token', ''),
                        (s) => s.replace(' data-replace-token=""', ' ${ref(onRef)}')
                    ),
                jsFragment: `import { ref } from 'https://unpkg.com/lit-html/directives/ref.js?module';
                
const onRef = e => {
    const toastStack = e;
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
}`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(renderStack(args)).replaceAll(' closeable', ' :closeable="true"').replaceAll(' reverse', ' :reverse="true"') +
                    `
<!-- Execute function on Vue load -->
{{ (() =>  { run() })() }}
`,
                jsFragment: `window.vueData = {
    run: async () => {

        let toastStack = document.querySelector('omni-toast-stack');

        // Wait for Vue to complete loading and the Toast Stack to be available
        while (!toastStack) {
            await Promise.resolve();
            toastStack = document.querySelector('omni-toast-stack');
        }
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
        
    }
};`
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
            <p>Reverse <code class="language-html">&lt;omni-toast&gt;</code> elements in the stack.<p>
            <p>By default newest toasts are showed at the bottom of the stack. When reversed, newest toasts are showed on top of the stack.</p>
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
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToastStack } from "@capitec/omni-components-react/toast";

const App = () => {
    let toastStack = null;
    const setRef = e => {
        toastStack = e;
        
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
    }
            
    return <OmniToastStack ref={setRef} position="${args.position}" reverse/>;                    
}`
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(
                        renderStack(args),
                        (container) => container.firstElementChild?.setAttribute('data-replace-token', ''),
                        (s) => s.replace(' data-replace-token=""', ' ${ref(onRef)}')
                    ),
                jsFragment: `import { ref } from 'https://unpkg.com/lit-html/directives/ref.js?module';

const onRef = e => {
    const toastStack = e;
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
}`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: (args) =>
                    getSourceFromLit(renderStack(args)).replaceAll(' closeable', ' :closeable="true"').replaceAll(' reverse', ' :reverse="true"') +
                    `
<!-- Execute function on Vue load -->
{{ (() =>  { run() })() }}
`,
                jsFragment: `window.vueData = {
    run: async () => {

        let toastStack = document.querySelector('omni-toast-stack');

        // Wait for Vue to complete loading and the Toast Stack to be available
        while (!toastStack) {
            await Promise.resolve();
            toastStack = document.querySelector('omni-toast-stack');
        }
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
        
    }
};`
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
