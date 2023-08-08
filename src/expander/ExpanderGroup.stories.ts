import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ComponentStoryFormat, raw } from '../utils/StoryUtils.js';

import '../label/Label.js';
import './Expander.js';
import './ExpanderGroup.js';

interface Args {
    expandMode: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander-group
        data-testid="test-expander-group"
        expand-mode="${args.expandMode}"
    >
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-expander-group>
    `,
    name: 'Interactive',
    description: 'This is the Expander group component with a nest Expander component',
    args: {
        expandMode: 'single',
        '[Default Slot]': raw`<omni-expander label="First Expander">
            <omni-label label="First expander content"></omni-label>
        </omni-expander>
        <omni-expander label="Second Expander">
            <omni-label label="Second expander content"></omni-label>
        </omni-expander>`
    }
};

export const Expand_Mode: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander-group
    data-testid="test-expander-group"
    expand-mode="${args.expandMode}"
    >
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-expander-group>
    `,
    name: 'Expand Mode',
    description:
        'The expand mode of the Expander Group components give you the ability to toggle if you can have multiple expanders opened or only a single one at a time',
    args: {
        expandMode: 'multiple',
        '[Default Slot]': raw`<omni-expander label="First Expander">
            <omni-label label="First expander content"></omni-label>
        </omni-expander>
        <omni-expander label="Second Expander">
            <omni-label label="Second expander content"></omni-label>
        </omni-expander>`
    }
};
