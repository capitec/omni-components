import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import { Toast } from './Toast.js';

import './Toast.js';
import '../button/Button.js';

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
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Interactive!.render!(args)).replaceAll(' closeable', ' :closeable="true"')
        }
    ],
    name: 'Interactive',
    args: {
        closeable: false,
        detail: 'The toast description',
        header: 'The toast header',
        type: 'success',
        prefix: undefined,
        '[Default Slot]': undefined,
        close: undefined
    }
};

export const Showing_Toasts: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        Toasts can be shown programmatically using the static <code class="language-js">Toast.show()</code> function. 
    <div>
    `,
    render: (args: Args) => html`
        <omni-button
            data-testid="test-toast-show"
            label="Show Toast"
            @click="${() => {
                Toast.configure({
                    position: 'bottom',
                    reverse: false,
                    stack: true,
                    closeable: undefined,
                    duration: undefined
                });
                Toast.show({
                    type: 'success',
                    header: 'Success!',
                    detail: 'It was successful.'
                });
            }}"
            >
        </omni-button>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

document.querySelector('omni-button').addEventListener('click', () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
});`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="showToast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

window.vueData = {
    showToast: () => {
        Toast.show({
            type: 'success',
            header: 'Success!',
            detail: 'It was successful.'
        });
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="\${showToast}"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
}`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";
import { Toast } from '@capitec/omni-components-react/toast';

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
};

const App = () => <OmniButton label="Show Toast" onclick={showToast}/>;`
        }
    ],
    name: 'Showing Toast Programmatically',
    args: {}
};

export const Configure_Toast: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
       Programmatically shown Toasts can be configured using the static <code class="language-js">Toast.configure()</code> function. 
    <div>
    `,
    render: (args: Args) => html`
        <omni-button
            data-testid="test-toast-configure"
            label="Show Toast"
            @click="${() => {
                Toast.configure({
                    position: 'left',
                    reverse: true,
                    stack: true,
                    closeable: undefined,
                    // Defaults to 3000ms when not specified. If set to 0 will be infinite (or until close clicked)
                    duration: undefined
                });
                Toast.show({
                    type: 'success',
                    header: 'Success!',
                    detail: 'It was successful.'
                });
            }}"
            >
        </omni-button>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({
    position: 'left',
    reverse: true,
    stack: true,
    closeable: undefined,
    // Defaults to 3000ms when not specified. If set to 0 will be infinite (or until close clicked)
    duration: undefined
});

document.querySelector('omni-button').addEventListener('click', () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
});`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="showToast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({
    position: 'left',
    reverse: true,
    stack: true,
    closeable: undefined,
    // Defaults to 3000ms when not specified. If set to 0 will be infinite (or until close clicked)
    duration: undefined
});

window.vueData = {
    showToast: () => {
        Toast.show({
            type: 'success',
            header: 'Success!',
            detail: 'It was successful.'
        });
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="\${showToast}"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({
    position: 'left',
    reverse: true,
    stack: true,
    closeable: undefined,
    // Defaults to 3000ms when not specified. If set to 0 will be infinite (or until close clicked)
    duration: undefined
});

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
}`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";
import { Toast } from '@capitec/omni-components-react/toast';

Toast.configure({
    position: 'left',
    reverse: true,
    stack: true,
    closeable: undefined,
    // Defaults to 3000ms when not specified. If set to 0 will be infinite (or until close clicked)
    duration: undefined
});

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.'
    });
};

const App = () => <OmniButton label="Show Toast" onclick={showToast}/>;`
        }
    ],
    name: 'Configure Toast Programmatically',
    args: {}
};

export const Replacing_Toasts: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        Toasts can be replaced instead of stacked when shown programmatically via the static <code class="language-js">Toast.show()</code> function by using the static <code class="language-js">Toast.configure()</code> function to set <code>stack</code> to <code class="language-js">false</code>. 
    <div>
    `,
    render: (args: Args) => html`
        <omni-button
            data-testid="test-toast-show"
            label="Show Toast"
            @click="${() => {
                Toast.configure({
                    position: 'bottom',
                    reverse: false,
                    stack: false,
                    closeable: undefined,
                    duration: undefined
                });
                Toast.show({
                    type: 'success',
                    header: 'Success!',
                    detail: 'It was successful.',
                    closeable: true,
                    // Defaults to 3000ms (or configured duration via Toast.configure function) when not specified. If set to 0 will be infinite (or until close clicked)
                    duration: 0
                });
            }}"
            >
        </omni-button>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({ stack: false });

document.querySelector('omni-button').addEventListener('click', () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.',
        closeable: true,
        // Defaults to 3000ms (or configured duration via Toast.configure function) when not specified. If set to 0 will be infinite (or until close clicked)
        duration: 0
    });
});`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="showToast"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({ stack: false });

window.vueData = {
    showToast: () => {
        Toast.show({
            stack: true,
            type: 'success',
            header: 'Success!',
            detail: 'It was successful.',
            closeable: true,
            // Defaults to 3000ms (or configured duration via Toast.configure function) when not specified. If set to 0 will be infinite (or until close clicked)
            duration: 0
        });
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Toast" @click="\${showToast}"></omni-button>`,
                jsFragment: `import { Toast } from '@capitec/omni-components/toast';

Toast.configure({ stack: false });

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.',
        closeable: true,
        // Defaults to 3000ms (or configured duration via Toast.configure function) when not specified. If set to 0 will be infinite (or until close clicked)
        duration: 0
    });
}`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";
import { Toast } from '@capitec/omni-components-react/toast';

Toast.configure({ stack: false });

const showToast = () => {
    Toast.show({
        type: 'success',
        header: 'Success!',
        detail: 'It was successful.',
        closeable: true,
        // Defaults to 3000ms (or configured duration via Toast.configure function) when not specified. If set to 0 will be infinite (or until close clicked)
        duration: 0
    });
};

const App = () => <OmniButton label="Show Toast" onclick={showToast}/>;`
        }
    ],
    name: 'Replacing Toast Programmatically',
    args: {}
};

export const Custom_Slotted_Content: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        Custom rich html can be slotted to fully customize the contents displayed within the <code class="language-html">&lt;omni-toast&gt;</code>. This can be used to apply extra styling and functionality.
    <div>
    `,
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
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniToast } from "@capitec/omni-components-react/toast";

const App = () =>   <OmniToast${args.detail ? ` detail="${args.detail}"` : ''}${args.header ? ` header="${args.header}"` : ''}${
                args.type ? ` type="${args.type}"` : ''
            }${args.closeable ? ` closeable` : ''}>
                        <span>Custom Slotted Toast <strong>Content</strong></span>
                    </OmniToast>;`
        }
    ],
    name: 'Custom Slotted Content',
    args: {
        closeable: false,
        detail: '',
        header: 'The toast header',
        type: 'none',
        prefix: undefined,
        '[Default Slot]': raw`<span>Custom Slotted Toast <strong>Content</strong></span>`,
        close: undefined
    }
};

export const Custom_Slotted_Prefix: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        <p>Custom rich html can be slotted in the <code class="language-js">'prefix'</code> slot to customize the contents before the <code class="language-html">&lt;omni-toast&gt;</code> content.</p>
        <p> For any specific <code class="language-js">'type'</code> this will replace its icon that is shown.</p>
    <div>
    `,
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
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniToast } from "@capitec/omni-components-react/toast";

const App = () =>   <OmniToast${args.detail ? ` detail="${args.detail}"` : ''}${args.header ? ` header="${args.header}"` : ''}${
                args.type ? ` type="${args.type}"` : ''
            }${args.closeable ? ` closeable` : ''}>
                        <svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ marginRight: '10px' }}>
                            <path d="M8.138 5.035c5.173-2.112 10.332.032 15.368 6.273a1.12 1.12 0 0 1-.002 1.398c-1.735 2.136-3.489 3.796-5.252 4.966a13.433 13.433 0 0 1-2.846 1.46A9.952 9.952 0 0 1 12 19.75c-3.859 0-7.724-2.391-11.504-7.044a1.119 1.119 0 0 1-.002-1.398C2.002 9.44 3.519 7.938 5.045 6.81A14.573 14.573 0 0 1 7.86 5.153Zm13.684 6.59c-4.56-5.382-8.973-7.018-13.36-5.098-.836.365-1.677.861-2.524 1.488-1.417 1.048-2.845 2.46-4.276 4.234l.2-.244.394.467c3.12 3.629 6.205 5.542 9.179 5.757l.287.016.278.005c.956 0 1.92-.175 2.895-.528a11.942 11.942 0 0 0 2.527-1.3c1.628-1.08 3.273-2.637 4.917-4.66l-.044.05-.158.192ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
                        </svg>
                    </OmniToast>;`
        }
    ],
    name: 'Custom Slotted Prefix',
    args: {
        closeable: false,
        detail: 'The toast description',
        header: 'The toast header',
        type: 'info',
        prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="margin-right: 10px;">
    <path d="M8.138 5.035c5.173-2.112 10.332.032 15.368 6.273a1.12 1.12 0 0 1-.002 1.398c-1.735 2.136-3.489 3.796-5.252 4.966a13.433 13.433 0 0 1-2.846 1.46A9.952 9.952 0 0 1 12 19.75c-3.859 0-7.724-2.391-11.504-7.044a1.119 1.119 0 0 1-.002-1.398C2.002 9.44 3.519 7.938 5.045 6.81A14.573 14.573 0 0 1 7.86 5.153Zm13.684 6.59c-4.56-5.382-8.973-7.018-13.36-5.098-.836.365-1.677.861-2.524 1.488-1.417 1.048-2.845 2.46-4.276 4.234l.2-.244.394.467c3.12 3.629 6.205 5.542 9.179 5.757l.287.016.278.005c.956 0 1.92-.175 2.895-.528a11.942 11.942 0 0 0 2.527-1.3c1.628-1.08 3.273-2.637 4.917-4.66l-.044.05-.158.192ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
</svg>`,
        '[Default Slot]': undefined,
        close: undefined
    }
};

export const Closeable: ComponentStoryFormat<Args> = {
    description: () => html`Add a close button to the <code class="language-html">&lt;omni-toast&gt;</code>.`,
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
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Closeable!.render!(args)).replaceAll(' closeable', ' :closeable="true"')
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToast } from "@capitec/omni-components-react/toast";

const App = () => <OmniToast${args.detail ? ` detail="${args.detail}"` : ''}${args.header ? ` header="${args.header}"` : ''}${
                args.type ? ` type="${args.type}"` : ''
            }${args.closeable ? ` closeable` : ''}/>;`
        }
    ],
    name: 'Closeable',
    args: {
        closeable: true,
        detail: 'The toast description',
        header: 'The toast header',
        type: 'none',
        prefix: undefined,
        '[Default Slot]': undefined,
        close: undefined
    }
};

export const Custom_Slotted_Close: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        <p>Custom rich html can be slotted in the <code class="language-js">'close'</code> slot to customize the close button for the <code class="language-html">&lt;omni-toast&gt;</code>.</p>
    </div>
    `,
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
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Custom_Slotted_Close!.render!(args)).replaceAll(' closeable', ' :closeable="true"')
        },
        {
            framework: 'React',
            load: (args) => `import { OmniToast } from "@capitec/omni-components-react/toast";

const App = () =>   <OmniToast${args.detail ? ` detail="${args.detail}"` : ''}${args.header ? ` header="${args.header}"` : ''}${
                args.type ? ` type="${args.type}"` : ''
            }${args.closeable ? ` closeable` : ''}>
                        <svg slot="close" version="1.1" viewBox="0 0 16 16" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(-2,-1.5)">
                                <path d="M5 10.75v-1.5h10v1.5Z"></path>
                            </g>
                        </svg>
                    </OmniToast>;`
        }
    ],
    name: 'Custom Slotted Close',
    args: {
        closeable: true,
        detail: 'The toast description',
        header: 'The toast header',
        type: 'none',
        prefix: undefined,
        '[Default Slot]': undefined,
        close: raw`<svg slot="close" version="1.1" viewBox="0 0 16 16" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-2,-1.5)">
        <path d="M5 10.75v-1.5h10v1.5Z"></path>
    </g>
</svg>`
    }
};

export const Type: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        <p>Set the display type of the <code class="language-html">&lt;omni-toast&gt;</code>.<p>
        <br/>
        <span>The <code class="language-javascript">'type'</code> attribute supports the following options:
            <ul>
                <li><code class="language-javascript">'success'</code> - Green themed toast with a checkmark icon to indicate success.</li>
                <li><code class="language-javascript">'warning'</code> - Orange themed toast with a yield icon to indicate warning.</li>
                <li><code class="language-javascript">'error'</code> - Red themed toast with an exclamation icon to indicate error.</li>
                <li><code class="language-javascript">'info'</code> - Blue themed toast with an information icon to indicate info.</li>
                <li><code class="language-javascript">'none'</code> - Default themed toast with no icon. (Default)</li>
            </ul>
        </span>
    <div>
    `,
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
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniToast } from "@capitec/omni-components-react/toast";

const App = () => <OmniToast${args.detail ? ` detail="${args.detail}"` : ''}${args.header ? ` header="${args.header}"` : ''}${
                args.type ? ` type="${args.type}"` : ''
            }${args.closeable ? ` closeable` : ''}/>;`
        }
    ],
    name: 'Type',
    args: {
        closeable: false,
        detail: 'The toast description',
        header: 'The toast header',
        type: 'warning',
        prefix: undefined,
        '[Default Slot]': undefined,
        close: undefined
    }
};
