import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';

import '../label/Label.js';
import '../icon/Icon.js';
import './Expander.js';
import './ExpanderGroup.js';

const buttonAlignment = ['left', 'right'] as const;

interface Args {
    label: string;
    disabled: boolean;
    expanded: boolean;
    buttonAlignment: (typeof buttonAlignment)[number];
    '[Default Slot]': string;
    expand_icon: string;
    header_icon: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        ?disabled="${args.disabled}"
        ?expanded="${args.expanded}"
        button-alignment="${args.buttonAlignment}"
    >
        ${args.expand_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('expand-icon', args.expand_icon))}` : nothing}
        ${args.header_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('header-icon', args.header_icon))}` : nothing}
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-expander>
    `,
    name: 'Interactive',
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' expanded', ' :expanded="true"')
                )
        }
    ],
    args: {
        label: 'Interactive Expander',
        '[Default Slot]': raw`<omni-label label="The content of the expander"></omni-label>`,
        disabled: false,
        expanded: false,
        buttonAlignment: 'right',
        expand_icon: '',
        header_icon: ''
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        ?disabled="${args.disabled}"
    >
        <omni-label label="I shall not be seen"></omni-label>
    </omni-expander>
    `,
    name: 'Disabled',
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Disabled!.render!(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        },
        {
            framework: 'React',
            load: (args) => `import { OmniExpander } from "@capitec/omni-components-react/expander";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => 
<OmniExpander ${args.label ? ` label='${args.label}'` : ''} ${args.disabled ? ` disabled='${args.disabled}'` : ''}>
    <OmniLabel label="I shall not be seen"></OmniLabel>
</OmniExpander>;`
        }
    ],
    description: 'Prevent interaction (expanding/collapsing).',
    args: {
        label: 'Disabled expander',
        disabled: true
    }
};

export const Button_Alignment: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander 
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        button-alignment="${args.buttonAlignment}"
    >
        <omni-label label='The content of the expander'></omni-label>
    </omni-expander>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniExpander } from "@capitec/omni-components-react/expander";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => 
<OmniExpander ${args.label ? ` label='${args.label}'` : ''} ${args.buttonAlignment ? ` button-alignment='${args.buttonAlignment}'` : ''}>
    <OmniLabel label="The content of the expander"></OmniLabel>
</OmniExpander>;`
        }
    ],
    name: 'Button Alignment',
    description: 'Toggle where the expand button should be oriented.',
    args: {
        label: 'Left aligned button',
        buttonAlignment: 'left'
    }
};

export const Expanded: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        expanded="${args.expanded}"   
    >
        <omni-label label="The content of the expander"></omni-label>
    </omni-expander>
    `,
    name: 'Expanded',
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Expanded!.render!(args), undefined, (s) => s.replace(' expanded', ' :expanded="true"'))
        },
        {
            framework: 'React',
            load: (args) => `import { OmniExpander } from "@capitec/omni-components-react/expander";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => 
<OmniExpander ${args.label ? ` label='${args.label}'` : ''} ${args.expanded ? ` expanded='${args.expanded}'` : ''}>
    <OmniLabel label="The content of the expander"></OmniLabel>
</OmniExpander>;`
        }
    ],
    description: 'Toggle expander expanded state',
    args: {
        label: 'Expanded expander state',
        expanded: true
    }
};

export const Expand_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander data-testid="test-expander" label="${ifNotEmpty(args.label)}">
        <svg slot="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>
        <omni-label label="The content of the expander"></omni-label>
    </omni-expander>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniExpander } from "@capitec/omni-components-react/expander";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => 
<OmniExpander${args.label ? ` label='${args.label}'` : ''}>
    <svg slot="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>
    <OmniLabel label="The content of the expander"></OmniLabel>
</OmniExpander>;`
        }
    ],
    name: 'Slotted Expand Icon',
    description: 'Custom slotted expand icon',
    args: {
        label: 'Slotted Expand Icon'
    }
};

export const Header_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander data-testid="test-expander" label="${ifNotEmpty(args.label)}">
        <svg slot="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>
        <omni-label label="The content of the expander"></omni-label>
    </omni-expander>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniExpander } from "@capitec/omni-components-react/expander";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => 
<OmniExpander${args.label ? ` label='${args.label}'` : ''}>
    <svg slot="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>
    <OmniLabel label="The content of the expander"></OmniLabel>
</OmniExpander>;`
        }
    ],
    name: 'Slotted Header Icon',
    description: 'Custom slotted header icon',
    args: {
        label: 'Slotted Header Icon'
    }
};
