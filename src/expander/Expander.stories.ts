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
    description: 'This is the Expander group component with a nest Expander component',
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
            load: (args) => getSourceFromLit(Interactive!.render!(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        }
    ],
    description: 'This is the Expander component when disabled',
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
    name: 'Button Alignment',
    description: 'This is the Expander component with button alignment set to opposite of the default.',
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
            load: (args) => getSourceFromLit(Interactive!.render!(args), undefined, (s) => s.replace(' expanded', ' :expanded="true"'))
        }
    ],
    description: 'Expander component can be expanded by default via setting the expanded attribute',
    args: {
        label: 'Expanded expander state',
        expanded: true
    }
};

export const Expand_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander data-testid="test-expander" label="${ifNotEmpty(args.label)}">
    <svg slot="expand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
        <omni-label label="The content of the expander"></omni-label>
    </omni-expander>
    `,
    name: 'Slotted Expand Icon',
    description: 'Expander with custom slotted icon in the expand icon slot',
    args: {
        label: 'Slotted Expand Icon'
    }
};

export const Header_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander data-testid="test-expander" label="${ifNotEmpty(args.label)}">
        <svg slot="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
        <omni-label label="The content of the expander"></omni-label>
    </omni-expander>
    `,
    name: 'Slotted Header Icon',
    description: 'The content of the expander',
    args: {
        label: 'Slotted Header Icon'
    }
};
