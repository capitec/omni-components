import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';

import '../label/Label.js';
import './Expander.js';
import './ExpanderGroup.js';

interface Args {
    label: string;
    disabled: boolean;
    expanded: boolean;
    buttonAlignment: string;
    '[Default Slot]': string;
    
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
        '[Default Slot]': raw`<omni-label label="This is the interactive example of the Expander component"></omni-label>`,
        disabled: false,
        expanded: false,
        buttonAlignment: 'left'
    }
    
}

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
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"')
                )
        }
    ],
    description: 'This is the Expander component when disabled',
    args: {
        label: 'Disabled expander',
        disabled: true
    }
}

export const Button_Alignment: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander 
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        button-alignment="${args.buttonAlignment}"
    >
        <omni-label label='Expander button left aligned'></omni-label>
    </omni-expander>
    `,
    name: 'Button Alignment',
    description: 'This is the Expander component with button alignment set to opposite of the default.',
    args: {
        label: 'Left aligned button',
        buttonAlignment: 'left'
    }
}

export const Expanded: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander
        data-testid="test-expander"
        label="${ifNotEmpty(args.label)}"
        expanded="${args.expanded}"   
    >
        <omni-label label="Content expanded by default"></omni-label>
    </omni-expander>
    `,
    name: 'Expanded',
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"')
                )
        }
    ],
    description: 'This is the Expander component when expanded',
    args: {
        label: 'Expander expanded by default',
        expanded: true
    }
}