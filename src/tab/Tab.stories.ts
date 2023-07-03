import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, querySelectorAsync, getSourceFromLit } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
import { TabGroup } from './TabGroup.js';
import { TabHeader } from './TabHeader.js';
import '../label/Label.js';
import './Tab.js';
import './TabGroup.js';

interface Args {
    header: string;
    active: boolean;
    disabled: boolean;
}

export const Basic = {
    render: () => html`
    <omni-tab-group data-testid="test-tab-group">
        <omni-tab header="Tab 1">
            <div>Tab 1 Content</div>
        </omni-tab>
     <omni-tab header="Tab 2">
        <div>Tab 2 Content</div>
    </omni-tab>
    <omni-tab header="Tab 3">
        <div>Tab 3 Content</div>
    </omni-tab>
    </omni-tab-group>
`,
    frameworkSources: [
        {
            framework: 'React',
            load: () => `import { OmniTabGroup, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabGroup>
 <OmniTab header="Tab 1">
    <OmniLabel label="Label of Tab 1"/>
 </OmniTab>
 <OmniTab header="Tab 2">
    <OmniLabel label="Label of Tab 2"/>
 </OmniTab>
 <OmniTab header="Tab 3">
    <OmniLabel label="Label of Tab 3"/>
 </OmniTab>
</OmniTabGroup>;`
        }
    ],
    name: 'Basic',
    description: () => html`
    <div>
        This is the recommended use of the <code class="language-html">&lt;omni-tab-group&gt;</code> with slotted <code class="language-html">&lt;omni-tab&gt;</code> component(s), headers for each tab are set by setting the <code>header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code>.
    <div>
    `,
    play: async (context) => {
        const tabGroupElement = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tab headers in the tab bar
        const nestedTabHeaders = tabBar.querySelectorAll('omni-tab-header');
        const tabHeadersArray = [...nestedTabHeaders];
        // Confirm that 3 Tab headers exist.
        await expect(tabHeadersArray.length).toBe(3);

        // Get the default slot of the Tab element.
        const tabsSlotElement = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        // Get the all the Tab elements in the default slot.
        const tabElements = tabsSlotElement.assignedElements();
        // Confirm that there is 3 tab elements in the default slot.
        await expect(tabElements.length).toBe(3);
    }
} as ComponentStoryFormat<Args>;

export const Active = {
    render: () => html`
    <omni-tab-group data-testid='test-tab-group'>
        <omni-tab header="Tab 1">
            <omni-label label="Label of Tab 1"></omni-label>
        </omni-tab>
        <omni-tab header="Tab 2" active>
            <omni-label label="Label of Tab 2"></omni-label>
        </omni-tab>
        <omni-tab header="Tab 3">
            <omni-label label="Label of Tab 3"></omni-label>
        </omni-tab>
    </omni-tab-group>
`,

    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Active?.render?.(args), undefined, (s) => s.replace(' active', ' :active="true"'))
        },
        {
            framework: 'React',
            load: () => `import { OmniTabGroup, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabGroup>
 <OmniTab header="Tab 1">
     <OmniLabel label='Label of Tab 1'/>
 </OmniTab>
 <OmniTab header="Tab 2" active>
     <OmniLabel label='Label of Tab 2'/>
 </OmniTab>
 <OmniTab header="Tab 3">
     <OmniLabel label='Label of Tab 3'/>
 </OmniTab>
</OmniTabGroup>;`
        }
    ],
    args: {},
    name: 'Active',
    description: () => html`
    <div>
        Set which <code class="language-html">&lt;omni-tab&gt;</code> slotted in the <code class="language-html">&lt;omni-tab-group&gt;</code> should be active by default. By setting the <code>active</code> attribute of one of the slotted <code class="language-html">&lt;omni-tab&gt;</code> component.
    <div>
    `,
    play: async (context) => {
        const tabGroupElement = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tab headers in the tab bar
        const nestedTabHeaders = tabBar.querySelectorAll('omni-tab-header');
        const tabHeadersArray = [...nestedTabHeaders];

        //Get the active tab header.
        const activeTabHeader = tabHeadersArray.find((c) => c.hasAttribute('data-active'));
        await expect(activeTabHeader).toBeTruthy();
        // Confirm that the active tab header is the second one in the tab header array
        await expect(activeTabHeader).toEqual(tabHeadersArray[1]);
        // Click on the first tab header
        await userEvent.click(tabHeadersArray[0]);

        // Get the default slot for all the Tabs
        const tabsSlotElement = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        // Get the active tab
        const tabElement = tabsSlotElement.assignedElements().find((e) => e.hasAttribute('active')) as Tab;
        // Get the active tab component slot
        const tabElementSlot = (await querySelectorAsync(tabElement.shadowRoot as ShadowRoot, 'slot')) as HTMLSlotElement;
        // Get the active tab label element based on the value of the label attribute and confirm that the label exists.
        const labelElement = tabElementSlot.assignedElements().find((e) => e.getAttribute('label') === 'Label of Tab 1') as Tab;
        await expect(labelElement).toBeTruthy();
    }
} as ComponentStoryFormat<Args>;

export const Disabled = {
    render: () => html`
    <omni-tab-group data-testid="test-tab-group">
        <omni-tab header="Tab 1">
            <omni-label label="Label of Tab 1"></omni-label>
        </omni-tab>
        <omni-tab header="Tab 2">
            <omni-label label="Label of Tab 2"></omni-label>
        </omni-tab>
        <omni-tab header="Tab 3" disabled>
            <omni-label label="Label of Tab 3"></omni-label>
        </omni-tab>
    </omni-tab-group>
`,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Disabled?.render?.(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        },
        {
            framework: 'React',
            load: () => `import { OmniTabGroup, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabGroup>
 <OmniTab header="Tab 1">
    <OmniLabel label="Label of Tab 1"/>
 </OmniTab>
 <OmniTab header="Tab 2">
    <OmniLabel label="Label of Tab 2"/>
 </OmniTab>
 <OmniTab header="Tab 3" disabled>
    <OmniLabel label="Label of Tab 3"/>
 </OmniTab>
</OmniTabGroup>;`
        }
    ],
    name: 'Disabled',
    description: () => html`
    <div>
        Set a <code class="language-html">&lt;omni-tab&gt;</code> slotted in the <code class="language-html">&lt;omni-tab-group&gt;</code> component to be disabled by setting <code>disabled</code> attribute.
    <div>
    `,
    args: {},
    play: async (context) => {
        const tabGroupElement = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');
        const tabSelect = jest.fn();
        tabGroupElement.addEventListener('tab-select', tabSelect);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroupElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;

        // Get all the tabs in the tab bar
        const tabHeaders = tabBar.querySelectorAll('omni-tab-header');
        const tabsHeadersArray = [...tabHeaders];

        //Get the disabled tab.
        const disabledTabHeader = tabsHeadersArray.find((c) => c.hasAttribute('data-disabled')) as TabHeader;
        // Confirm that the disabled tab the last tab in the tab header array.
        await expect(disabledTabHeader).toEqual(tabsHeadersArray[2]);

        //Click the disabled tab header twice
        await userEvent.click(disabledTabHeader);
        await userEvent.click(disabledTabHeader);
        // Confirm that the tab select event was emitted zero times.
        await expect(tabSelect).toBeCalledTimes(0);
        // Click the second tab header
        await userEvent.click(tabsHeadersArray[1]);
        // Confirm that the tab select event was emitted once.
        await expect(tabSelect).toBeCalledTimes(1);
    }
} as ComponentStoryFormat<Args>;
