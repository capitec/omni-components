import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, querySelectorAsync, raw, getSourceFromLit } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
import { TabGroup } from './TabGroup.js';
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
    <omni-tab-group data-testid="test-tab-group">
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
        Tab headers are rendered by either setting the <code>header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code> component or via slotted <code class="language-html">&lt;omni-tab-header&gt;</code> component(s) that targets the <code class="language-html">&lt;omni-tab-group&gt;</code> header slot. 
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
        const tabGroupElement = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');
        const tabSelect = jest.fn();
        tabGroupElement.addEventListener('tab-select', tabSelect);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
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
        const tabsSlotElement = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        const activeTabElement = tabsSlotElement.assignedElements().find((e) => e.hasAttribute('active')) as Tab;
        // Confirm that the active tabs header is equal to the expected value.
        await expect(activeTabElement.header).toEqual('Tab 2');
    }
};
