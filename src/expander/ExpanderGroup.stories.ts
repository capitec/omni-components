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
    description: () => html`<p>
    The <code class="language-html">&lt;omni-expander-group&gt;</code> should be used if grouping multiple <code class="language-html">&lt;omni-expander&gt;</code> components together. 
    </p>`,
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
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniExpanderGroup, OmniExpander } from "@capitec/omni-components-react/expander";
            import { OmniLabel } from "@capitec/omni-components-react/label";
        
            const App = () => <OmniExpanderGroup ${args.expandMode ? ` expand-mode='${args.expandMode}'` : ''}>
            <OmniExpander label="First Expander">
             <OmniLabel label="First expander content"></OmniLabel>
            </OmniExpander>
            <OmniExpander label="Second Expander">
             <OmniLabel label="Second expander content"></OmniLabel>
            </OmniExpander>
            </OmniExpanderGroup>;`
        }
    ],
    description: () => html`<p>
    The <code class="language-html">&lt;omni-expander-group&gt;</code> opens one <code class="language-html">&lt;omni-expander&gt;</code> by default, to expand mutiple set the attribute <code class="language-js">expand-mode="multiple"</code>. 
    </p>`,
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
