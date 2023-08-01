import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';

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
        expandMode="${args.expandMode}"
    >
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-expander-group>
    `,
    name: 'Interactive',
    description: 'This is the Expander group component with a nest Expander component',
    args: {
        '[Default Slot]': raw`<omni-expander>
            <omni-label></omni-label>
        </omni-expander>
        <omni-expander>
            <omni-label></omni-label>
        </omni-expander>`
    }
};

export const Expand_Mode : ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-expander-group
    expandMode="${args.expandMode}"
    >
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-expander-group>
    `,
    name: 'Expand Mode',
    description: 'The expand mode of the Expand',
    args: {
        '[Default Slot]': raw`<omni-expander>
            <omni-label></omni-label>
        </omni-expander>
        <omni-expander>
            <omni-label></omni-label>
        </omni-expander>`
    }
};
