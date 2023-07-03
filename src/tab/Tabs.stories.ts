import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, querySelectorAsync, raw, getSourceFromLit } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
import { Tabs } from './Tabs.js';
import '../label/Label.js';
import './TabHeader.js';
import './Tab.js';
import './Tabs.js';
import '../icon/Icon.js';

interface Args {
    header: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tabs data-testid="test-tabs">
        ${args.header ? html`${'\r\n'}${unsafeHTML(assignToSlot('header', args.header))}` : nothing}
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-tabs>
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
        The <code class="language-html">&lt;omni-tabs&gt;</code> component will display content based on the nested <code class="language-html">&lt;omni-tab&gt;</code> component(s). 
        </p>
        <p>
        Tab headers are rendered by either setting the <code>header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code> component or via slotted <code class="language-html">&lt;omni-tab-header&gt;</code> component(s) that targets the <code class="language-html">&lt;omni-tabs&gt;</code> header slot. 
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
    },
    play: async (context) => {
        const tabsElement = within(context.canvasElement).getByTestId<Tabs>('test-tabs');
        const tabSelect = jest.fn();
        tabsElement.addEventListener('tab-select', tabSelect);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tab headers in the tab bar
        const nestedTabHeaders = tabBar.querySelectorAll('omni-tab-header');
        const tabHeadersArray = [...nestedTabHeaders];
        // Get the active tab header.
        const activeTabHeader = tabHeadersArray.find((c) => c.hasAttribute('data-active'));
        // Confirm that the active tab header is the first one in the tab header array
        await expect(activeTabHeader).toEqual(tabHeadersArray[0]);
        // Click the second tab header.
        await userEvent.click(tabHeadersArray[1]);
        // Get the updated active tab and confirm that it is the one that was clicked.
        const nextActiveTab = tabHeadersArray.find((c) => c.hasAttribute('data-active'));
        await expect(nextActiveTab).toEqual(tabHeadersArray[1]);
        // Confirm that the tab select event was emitted.
        await expect(tabSelect).toBeCalledTimes(1);
        // Get the default slot for Tabs element and get the new active Tab
        const tabsSlotElement = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        const activeTabElement = tabsSlotElement.assignedElements().find((e) => e.hasAttribute('active')) as Tab;
        // Confirm that the active tabs header is equal to the expected value.
        await expect(activeTabElement.header).toEqual('Tab 2');
    }
};
