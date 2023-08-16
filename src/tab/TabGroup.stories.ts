import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { assignToSlot, ComponentStoryFormat, raw, getSourceFromLit } from '../utils/StoryUtils.js';

import '../label/Label.js';
import './TabHeader.js';
import './Tab.js';
import './TabGroup.js';
import '../icon/Icon.js';

interface Args {
    header: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tab-group class="tab-group-story-component" data-testid="test-tab-group">
        ${args.header ? html`${'\r\n'}${unsafeHTML(assignToSlot('header', args.header))}` : nothing}
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-tab-group>
`,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' active', ' :active="true"').replace(' disabled', ' :disabled="true"')
                )
        }
    ],
    name: 'Interactive',
    description: () => html`
        <p>
        The <code class="language-html">&lt;omni-tab-group&gt;</code> component will display content based on the slotted <code class="language-html">&lt;omni-tab&gt;</code> component(s). 
        </p>
        <p>
        For an advanced use case check the <omni-hyperlink href='./components/tab-header'><code class="language-html">&lt;omni-tab-header&gt;</code></omni-hyperlink> example.
        </p>
    `,
    args: {
        header: '',
        '[Default Slot]': raw`<omni-tab header="Tab 1">
    <div>Tab 1 Content</div>
</omni-tab>
<omni-tab header="Tab 2">
    <div>Tab 2 Content</div>
</omni-tab>
<omni-tab header="Tab 3">
    <div>Tab 3 Content</div>
</omni-tab>`
    }
};
