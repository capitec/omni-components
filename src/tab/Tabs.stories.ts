import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw, getSourceFromLit } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
import { TabHeader } from './TabHeader.js';
import { Tabs } from './Tabs.js';
import '../label/Label.js';
import './TabHeader.js';
import './Tab.js';
import './Tabs.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Tabs',
    component: 'omni-tabs',
    argTypes: {
        header: {
            control: 'text'
        }
    }
} as CSFIdentifier;

interface Args {
    header: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tabs data-testid='test-tabs'>
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
        '[Default Slot]': raw`<omni-tab header='Tab 1'>
    <div>Tab 1 Content</div>
</omni-tab>
<omni-tab header='Tab 2'>
    <div>Tab 2 Content</div>
</omni-tab>
<omni-tab header='Tab 3'>
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

export const Basic: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tabs data-testid='test-tabs'>
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-tabs>
`,
    frameworkSources: [
        {
            framework: 'React',
            load: () => `import { OmniTabs, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabs>
<OmniTab header="Tab 1">
    <OmniLabel label='Label of Tab 1'/>
</OmniTab>
<OmniTab header="Tab 2">
    <OmniLabel label='Label of Tab 2'/>
</OmniTab>
<OmniTab header="Tab 3">
    <OmniLabel label='Label of Tab 3'/>
</OmniTab>
</OmniTabs>;`
        }
    ],
    name: 'Basic',
    description: () => html`
    <div>
        This is the recommended use of the <code class="language-html">&lt;omni-tabs&gt;</code> with nested <code class="language-html">&lt;omni-tab&gt;</code> component(s), headers for each tab is set by setting the <code>header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code>.
    <div>
    `,
    args: {
        '[Default Slot]': raw`<omni-tab header='Tab 1'>
            <div>Tab 1 Content</div>
        </omni-tab>
        <omni-tab header='Tab 2'>
            <div>Tab 2 Content</div>
        </omni-tab>
        <omni-tab header="Tab 3">
            <div>Tab 3 Content</div>
        </omni-tab>
        `
    },
    play: async (context) => {
        const tabsElement = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tab headers in the tab bar
        const nestedTabHeaders = tabBar.querySelectorAll('omni-tab-header');
        const tabHeadersArray = [...nestedTabHeaders];
        // Confirm that 3 Tab headers exist.
        await expect(tabHeadersArray.length).toBe(3);

        // Get the default slot of the Tab element.
        const tabsSlotElement = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        // Get the all the Tab elements in the default slot.
        const tabElements = tabsSlotElement.assignedElements();
        // Confirm that there is 3 tab elements in the default slot.
        await expect(tabElements.length).toBe(3);
    }
};

export const Active: ComponentStoryFormat<Args> = {
    render: () => html`
    <omni-tabs data-testid='test-tabs'>
        <omni-tab header='Tab 1'>
            <omni-label label='Label of Tab 1'></omni-label>
        </omni-tab>
        <omni-tab header="Tab 2" active>
            <omni-label label='Label of Tab 2'></omni-label>
        </omni-tab>
        <omni-tab header="Tab 3">
            <omni-label label='Label of Tab 3'></omni-label>
        </omni-tab>
    </omni-tabs>

`,

    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Active?.render?.(args), undefined, (s) => s.replace(' active', ' :active="true"'))
        },
        {
            framework: 'React',
            load: () => `import { OmniTabs, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabs>
    <OmniTab header="Tab 1">
        <OmniLabel label='Label of Tab 1'/>
    </OmniTab>
    <OmniTab header="Tab 2" active>
        <OmniLabel label='Label of Tab 2'/>
    </OmniTab>
    <OmniTab header="Tab 3">
        <OmniLabel label='Label of Tab 3'/>
    </OmniTab>
</OmniTabs>;`
        }
    ],
    args: {},
    name: 'Active',
    description: () => html`
    <div>
        Set which <code class="language-html">&lt;omni-tab&gt;</code> nested in the <code class="language-html">&lt;omni-tabs&gt;</code> should be active by default. By setting the <code>active</code> attribute of one of the nested <code class="language-html">&lt;omni-tab&gt;</code> component.
    <div>
    `,
    play: async (context) => {
        const tabsElement = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
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
        const tabsSlotElement = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, 'slot:not([name])')) as HTMLSlotElement;
        // Get the active tab
        const tabElement = tabsSlotElement.assignedElements().find((e) => e.hasAttribute('active')) as Tab;
        // Get the active tab component slot
        const tabElementSlot = (await querySelectorAsync(tabElement.shadowRoot as ShadowRoot, 'slot')) as HTMLSlotElement;
        // Get the active tab label element based on the value of the label attribute and confirm that the label exists.
        const labelElement = tabElementSlot.assignedElements().find((e) => e.getAttribute('label') === 'Label of Tab 1') as Tab;
        await expect(labelElement).toBeTruthy();
    }
};

export const Disabled = {
    render: () => html`
    <omni-tabs data-testid='test-tabs'>
        <omni-tab header='Tab 1'>
            <omni-label label='Label of Tab 1'></omni-label>
        </omni-tab>
        <omni-tab header="Tab 2">
            <omni-label label='Label of Tab 2'></omni-label>
        </omni-tab>
        <omni-tab header="Tab 3" disabled>
            <omni-label label='Label of Tab 3'></omni-label>
        </omni-tab>
    </omni-tabs>

`,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Disabled?.render?.(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        },
        {
            framework: 'React',
            load: () => `import { OmniTabs, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabs>
    <OmniTab header="Tab 1">
        <OmniLabel label='Label of Tab 1'/>
    </OmniTab>
    <OmniTab header="Tab 2">
        <OmniLabel label='Label of Tab 2'/>
    </OmniTab>
    <OmniTab header="Tab 3" disabled>
        <OmniLabel label='Label of Tab 3'/>
    </OmniTab>
</OmniTabs>;`
        }
    ],
    name: 'Disabled',
    description: () => html`
    <div>
        Set a <code class="language-html">&lt;omni-tab&gt;</code> nested in the <code class="language-html">&lt;omni-tabs&gt;</code> component to be disabled by setting <code>disabled</code> attribute.
    <div>
    `,
    args: {},
    play: async (context) => {
        const tabsElement = within(context.canvasElement).getByTestId<Tabs>('test-tabs');
        const tabSelect = jest.fn();
        tabsElement.addEventListener('tab-select', tabSelect);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabsElement.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;

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

export const Advanced: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tabs data-testid='test-tabs'>
        ${args['[Default Slot]'] ? html`${'\r\n'}${unsafeHTML(args['[Default Slot]'])}` : nothing}
    </omni-tabs>
`,
    frameworkSources: [
        {
            framework: 'React',
            load: () => `import { OmniTabs, OmniTab, OmniTabHeader } from "@capitec/omni-components-react/tab";
import { OmniIcon } from "@capitec/omni-components-react/icon";

const App = () =>
<OmniTabs>
 <OmniTabHeader slot="header" for="up">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="orange"><path d="M5.47 8.47a.75.75 0 0 0 1.06 1.06l4.72-4.72V21c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .75-.75V4.81l4.72 4.72a.75.75 0 0 0 .976.073l.084-.073a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.06 0Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="down">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="green"><path d="M18.53 15.53a.75.75 0 0 0-1.06-1.06l-4.72 4.72V3a.75.75 0 0 0-.648-.743L12 2.25a.75.75 0 0 0-.75.75v16.19l-4.72-4.72a.75.75 0 0 0-.976-.073l-.084.073a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="left">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="purple"><path d="M8.47 5.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72H21a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.75.75H4.81l4.72 4.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="right">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="red"><path d="M15.53 5.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H3a.75.75 0 0 0-.743.648L2.25 12c0 .414.336.75.75.75h16.19l-4.72 4.72a.75.75 0 0 0-.073.976l.073.084a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTab id="up">
 <div>Up</div>
</OmniTab>
<OmniTab id="down">
 <div>Down</div>
</OmniTab>
<OmniTab id="left">
 <div>Left</div>
</OmniTab>
<OmniTab id="right">
 <div>Right</div>
</OmniTab>
</OmniTabs>;`
        }
    ],
    name: 'Advanced',
    args: {
        '[Default Slot]': raw`
        <omni-tab-header slot="header" for="up">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="orange"><path d="M5.47 8.47a.75.75 0 0 0 1.06 1.06l4.72-4.72V21c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .75-.75V4.81l4.72 4.72a.75.75 0 0 0 .976.073l.084-.073a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.06 0Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="down">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="green"><path d="M18.53 15.53a.75.75 0 0 0-1.06-1.06l-4.72 4.72V3a.75.75 0 0 0-.648-.743L12 2.25a.75.75 0 0 0-.75.75v16.19l-4.72-4.72a.75.75 0 0 0-.976-.073l-.084.073a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="left">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="purple"><path d="M8.47 5.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72H21a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.75.75H4.81l4.72 4.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="right">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="100%" height="100%" fill="red"><path d="M15.53 5.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H3a.75.75 0 0 0-.743.648L2.25 12c0 .414.336.75.75.75h16.19l-4.72 4.72a.75.75 0 0 0-.073.976l.073.084a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab id="up">
            <div>Up</div>
        </omni-tab>
        <omni-tab id="down">
            <div>Down</div>
        </omni-tab>
        <omni-tab id="left">
            <div>Left</div>
        </omni-tab>
        <omni-tab id="right">
            <div>Right</div>
        </omni-tab>
        `
    },
    description: () => html`
    <div>
        For slotting custom content into the header use the <code class="language-html">&lt;omni-tab-header&gt;</code> component that targets the header slot of the <code class="language-html">&lt;omni-tabs&gt;</code> component and ensure you have a <code class="language-html">&lt;omni-tab&gt;</code> component which has an <code>id</code> attribute that matches the <code class="language-html">&lt;omni-tab-header&gt;</code> <code>for</code> attribute to display slotted content.
    <div>
    `,
    play: async (context) => {
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');
        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabs.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Check for the slot then check the content of the slot
        const slotElement = tabBar.querySelector<HTMLSlotElement>('slot[name="header"]');
        await expect(slotElement).toBeTruthy();

        //Get all the tab headers in the header slot.
        const tabHeaders = slotElement?.assignedElements().filter((e) => e.tagName.toLowerCase() === 'omni-tab-header') as HTMLElement[];
        await expect(tabHeaders).toBeTruthy();

        //Get the active tab header.
        const activeTabHeader = tabHeaders?.find((c) => c.hasAttribute('data-active'));
        await expect(activeTabHeader).toBeTruthy();

        //Get nested omni-icon.
        const omniIcon = activeTabHeader?.querySelector<HTMLElement>('omni-icon');
        await expect(omniIcon).toBeTruthy();

        //Get nested svg
        const svgElement = activeTabHeader?.querySelector<HTMLElement>('svg');
        await expect(svgElement).toBeTruthy();

        //Click the second tab.
        await userEvent.click(tabHeaders[1]);
        const nextActiveTab = tabHeaders.find((c) => c.hasAttribute('data-active'));
        await expect(nextActiveTab).toBeTruthy();
    }
};
