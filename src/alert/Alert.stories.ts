import { html, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import { Alert } from './Alert.js';

import './Alert.js';
import '../button/Button.js';

export default {
    title: 'UI Components/Alert',
    component: 'omni-alert'
} as CSFIdentifier;

interface Args {
    status?: 'success' | 'warning' | 'error' | 'info' | 'none';
    message?: string;
    headerAlign?: 'left' | 'center' | 'right';
    description?: string;
    primaryAction?: string;
    secondaryAction?: string;
    enableSecondary?: boolean;
    actionAlign?: 'left' | 'center' | 'right' | 'stretch';

    /* Slots */
    'status-indicator': string;
    header: string;
    '[Default Slot]': string;
    primary: string;
    secondary: string;

    /* Internal args used by story only. Not applicable to actual component */
    hide?: boolean;
}

const alertHtml = (args: Args) => html`
        <omni-alert
            ${ref((a) => (a as Alert)?.show())}
            @alert-close="${() => {
                args.hide = true;
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }}"
            data-testid="test-alert"
            status="${ifNotEmpty(args.status)}"
            message="${ifNotEmpty(args.message)}"
            header-align="${ifNotEmpty(args.headerAlign)}"
            description="${ifNotEmpty(args.description)}"
            primary-action="${ifNotEmpty(args.primaryAction)}"
            secondary-action="${ifNotEmpty(args.secondaryAction)}"
            ?enable-secondary=${args.enableSecondary}
            action-align="${ifNotEmpty(args.actionAlign)}"
            >${args['status-indicator'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('status-indicator', args['status-indicator']))}` : nothing}${
    args.header ? html`${'\r\n'}${unsafeHTML(assignToSlot('header', args.header))}` : nothing
}${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}${
    args.primary ? html`${'\r\n'}${unsafeHTML(assignToSlot('primary', args.primary))}` : nothing
}${args.secondary ? html`${'\r\n'}${unsafeHTML(assignToSlot('secondary', args.secondary))}` : nothing}
        </omni-alert>
`;

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Interactive',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Showing_Alerts: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        Alerts can be shown programmatically using the static <code class="language-js">Alert.show()</code> function. 
    <div>
    `,
    render: (args: Args) => html`
        <omni-button
            data-testid="test-alert-show"
            label="Show Alert"
            @click="${() => {
                Alert.show({
                    status: 'success',
                    message: 'Success!',
                    description: 'It was successful.'
                });
            }}"
            >
        </omni-button>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert"></omni-button>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

document.querySelector('omni-button').addEventListener('click', () => {    
    Alert.show({
        status: 'success',
        message: 'Success!',
        description: 'It was successful.',
    });
});`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert" @click="showAlert"></omni-button>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

window.vueData = {
    showAlert: () => {        
        Alert.show({
            status: 'success',
            message: 'Success!',
            description: 'It was successful.',
        });
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert" @click="\${showAlert}"></omni-button>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

const showAlert = () => {
    Alert.show({
        status: 'success',
        message: 'Success!',
        description: 'It was successful.',
    });
}`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";
import { Alert } from '@capitec/omni-components-react/alert';

const showAlert = () => {
    Alert.show({
        status: 'success',
        message: 'Success!',
        description: 'It was successful.',
    });
};

const App = () => <OmniButton label="Show Alert" onclick={showAlert}/>;`
        }
    ],
    name: 'Showing Alert Programmatically',
    args: {}
};

let reason = '';
export const Showing_Alerts_Async: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        Alerts can be asynchronously shown and awaited programmatically using the static <code class="language-js">Alert.showAsync()</code> function. 
    <div>
    `,
    render: (args: Args) => html`
        <omni-button
            data-testid="test-alert-show"
            label="Show Alert"
            @click="${() => {
                Alert.showAsync({
                    status: 'info',
                    message: 'Async Alert!',
                    description: `Click "Yes" for "primary" reason or "No" for "secondary" reason.
If closed from script via the "hide" function on the Alert instance, the reason would be "auto".`,
                    enableSecondary: true,
                    primaryAction: 'Yes',
                    secondaryAction: 'No'
                }).then((r) => {
                    reason = r;
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                });
            }}"
            >
        </omni-button>
        <div>${reason}</div>
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert"></omni-button>
<div id="reason"></div>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

document.querySelector('omni-button').addEventListener('click', async () => {    
    const reason = await Alert.showAsync({
        status: 'info',
        message: 'Async Alert!',
        description: \`Click "Yes" for "primary" reason or "No" for "secondary" reason.
If closed from script via the "hide" function on the Alert instance, the reason would be "auto".\`,
        enableSecondary: true,
        primaryAction: 'Yes',
        secondaryAction: 'No'
    });
    document.getElementById('reason').innerHTML = reason;
});`
            }
        },
        {
            framework: 'Vue',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert" @click="showAlert"></omni-button>
<div id="reason"></div>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

window.vueData = {
    showAlert: async () => {   
        const reason = await Alert.showAsync({
            status: 'info',
            message: 'Async Alert!',
            description: \`Click "Yes" for "primary" reason or "No" for "secondary" reason.
    If closed from script via the "hide" function on the Alert instance, the reason would be "auto".\`,
            enableSecondary: true,
            primaryAction: 'Yes',
            secondaryAction: 'No'
        });
        document.getElementById('reason').innerHTML = reason;
    }
};`
            }
        },
        {
            framework: 'Lit',
            sourceParts: {
                htmlFragment: raw`<omni-button label="Show Alert" @click="\${showAlert}"></omni-button>
<div id="reason"></div>`,
                jsFragment: `import { Alert } from '@capitec/omni-components/alert';

const showAlert = async () => {   
    const reason = await Alert.showAsync({
        status: 'info',
        message: 'Async Alert!',
        description: \`Click "Yes" for "primary" reason or "No" for "secondary" reason.
If closed from script via the "hide" function on the Alert instance, the reason would be "auto".\`,
        enableSecondary: true,
        primaryAction: 'Yes',
        secondaryAction: 'No'
    });
    document.getElementById('reason').innerHTML = reason;
};`
            }
        },
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";
import { Alert } from '@capitec/omni-components-react/alert';

const showAlert = async () => {   
    const reason = await Alert.showAsync({
        status: 'info',
        message: 'Async Alert!',
        description: \`Click "Yes" for "primary" reason or "No" for "secondary" reason.
If closed from script via the "hide" function on the Alert instance, the reason would be "auto".\`,
        enableSecondary: true,
        primaryAction: 'Yes',
        secondaryAction: 'No'
    });
    document.getElementById('reason').innerHTML = reason;
};

const App = () => <>
                    <OmniButton label="Show Alert" onclick={showAlert}/>
                    <div id="reason"></div>
                  </>;`
        }
    ],
    name: 'Showing Async Alert Programmatically',
    args: {}
};

export const Status: ComponentStoryFormat<Args> = {
    description: () => html`
    <div>
        <p>Set the display status of the <code class="language-html">&lt;omni-alert&gt;</code>.<p>
        <br/>
        <span>The <code>status</code> attribute supports the following options:
            <ul>
                <li><code class="language-javascript">'success'</code> - Checkmark icon to indicate success.</li>
                <li><code class="language-javascript">'warning'</code> - Yield icon to indicate warning.</li>
                <li><code class="language-javascript">'error'</code> - Exclamation icon to indicate error.</li>
                <li><code class="language-javascript">'info'</code> - Information icon to indicate info.</li>
                <li><code class="language-javascript">'none'</code> - No icon. (Default)</li>
            </ul>
        </span>
    <div>
    `,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Status',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: 'success',
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Header_Align: ComponentStoryFormat<Args> = {
    description: 'Align header content horizontally.',
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Header Align',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: 'left',
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Primary_Action: ComponentStoryFormat<Args> = {
    description: 'Set the label for the primary action button.',
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Primary Action',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: 'Acknowledge',
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Secondary_Action: ComponentStoryFormat<Args> = {
    description: () => html`
        <span>
            <ul>
                <li>Set the label for the secondary action button with the <code>secondary-action</code> attribute.</li>
                <li>Enable the secondary action button with the <code>enable-secondary</code> attribute.</li>
            </ul>
        </span>
        
        `,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Secondary Action',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: true,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: 'Back',
        actionAlign: undefined
    }
};

export const Action_Align: ComponentStoryFormat<Args> = {
    description: 'Align the action button(s) horizontally.',
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Action Align',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: true,

        status: undefined,
        headerAlign: undefined,
        primaryAction: 'Accept',
        secondaryAction: 'Decline',
        actionAlign: 'center'
    }
};

export const Custom_Status_Indicator: ComponentStoryFormat<Args> = {
    description: 'Render content as the status indicator instead of default status icons.',
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Custom Status Indicator',
    args: {
        'status-indicator': raw`<span style="padding-right: 4px;">🔓</span>`,
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Custom_Header: ComponentStoryFormat<Args> = {
    description: () => html`Render content as the header message area. This overrides any text specified via the <code>message</code> attribute.`,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Custom Header',
    args: {
        'status-indicator': '',
        header: raw`<span>Alert using the <code>header</code> slot</span>`,
        '[Default Slot]': '',
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Custom_Body: ComponentStoryFormat<Args> = {
    description: () => html`Render rich html content in the description. This appends to text specified via the <code>description</code> attribute.`,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Custom Body',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': raw`<span>Alert using the default slot and the <code>description</code> attribute.</span>`,
        primary: '',
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Custom_Primary_Action: ComponentStoryFormat<Args> = {
    description: () =>
        html`Render rich html content as the primary action. This replaces any text specified via the <code>primary-action</code> attribute.`,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Custom Primary Action',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: raw`<button style="margin: 6px;">My Button</button>`,
        secondary: '',

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: undefined,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};

export const Custom_Secondary_Action: ComponentStoryFormat<Args> = {
    description: () =>
        html`Render rich html content as the secondary action. This replaces any text specified via the <code>secondary-action</code> attribute.`,
    render: (args: Args) => html`
        <omni-button data-testid="test-alert-btn" @click="${() => {
            args.hide = false;
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" label="Show Alert" ></omni-button>
        ${args.hide ? nothing : alertHtml(args)}
    `,
    frameworkSources: [
        {
            framework: 'HTML',
            sourceParts: {
                htmlFragment: (args) => raw`
                ${getSourceFromLit(alertHtml(args))}            
                `,
                jsFragment: `document.querySelector('omni-alert').show();`
            }
        }
    ],
    name: 'Custom Secondary Action',
    args: {
        'status-indicator': '',
        header: '',
        '[Default Slot]': '',
        primary: '',
        secondary: raw`<span style="padding: 6px;">↩</span>`,

        hide: true,

        message: 'Message Alert',
        description: 'Additional context for the alert.',

        enableSecondary: true,

        status: undefined,
        headerAlign: undefined,
        primaryAction: undefined,
        secondaryAction: undefined,
        actionAlign: undefined
    }
};
