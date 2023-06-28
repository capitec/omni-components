import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw, getSourceFromLit } from '../utils/StoryUtils.js';

import { Tabs } from './Tabs.js';

import '../label/Label.js';
import './TabHeader.js';
import './Tab.js';
import './Tabs.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Tabs',
    component: 'omni-tabs'
} as CSFIdentifier;

interface Args {
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tabs data-testid='test-tabs'>
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
        This results in dynamically generated tab headers for each tab based on the value of the <code class="language-js">header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code> component and displays the slotted content of the <code class="language-html">&lt;omni-tab&gt;</code> with the <code class="language-js">active</code> attribute. 
        </p>
        <p>
        The active attribute is applied to the first nested tab, if the active attribute is not specified on a nested <code class="language-html">&lt;omni-tab&gt;</code>. Clicking on one of the tab headers will result in its associated tab being active and the tab's slotted content being displayed.
        </p>
    `,
    args: {
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
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');
        const click = jest.fn();
        tabs.addEventListener('click', click);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabs.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tabs in the tab bar
        const nestedTabs = tabBar.querySelectorAll('omni-tab-header');
        await expect(nestedTabs).toBeTruthy();
        const tabsArray = [...nestedTabs];

        //Get the active tab.
        const activeTab = tabsArray.find((c) => c.hasAttribute('data-active'));
        await expect(activeTab).toBeTruthy;

        //Click the second tab.
        await userEvent.click(tabsArray[1]);

        const nextActiveTab = tabsArray.find((c) => c.hasAttribute('data-active'));

        await expect(nextActiveTab).toBeTruthy;
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
        This is the recommended use of the <code class="language-html">&lt;omni-tabs&gt;</code> with nested <code class="language-html">&lt;omni-tab&gt;</code> component(s), this results in dynamically generated headers for each tab based on the value of the <code class="language-js">header</code> attribute of the <code class="language-html">&lt;omni-tab&gt;</code>.
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
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabs.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tab headers in the tab bar
        const nestedTabHeaders = tabBar.querySelectorAll('omni-tab-header');
        await expect(nestedTabHeaders).toBeTruthy();
        const tabsArray = [...nestedTabHeaders];
        await expect(tabsArray.length).toBe(3);
        //Get the active tab header.
        const activeTab = tabsArray.find((c) => c.hasAttribute('data-active'));
        await expect(activeTab).toBeTruthy;
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
        Set which <code class="language-html">&lt;omni-tab&gt;</code> in the <code class="language-html">&lt;omni-tabs&gt;</code> should be active by default. This is based on setting the <code class="language-js">active</code> attribute of one of the nested <code class="language-html">&lt;omni-tab&gt;</code> components.
    <div>
    `,
    play: async (context) => {
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabs.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tabs in the tab bar
        const nestedTabs = tabBar.querySelectorAll('omni-tab-header');
        await expect(nestedTabs).toBeTruthy();
        const tabsArray = [...nestedTabs];

        //Get the active tab.
        const activeTab = tabsArray.find((c) => c.hasAttribute('data-active'));
        await expect(activeTab).toBeTruthy;
        await expect(activeTab).toEqual(tabsArray[1]);
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
        Set which <code class="language-html">&lt;omni-tab&gt;</code> in the <code class="language-html">&lt;omni-tabs&gt;</code> component should be disabled. This is based on setting the <code class="language-js">disabled</code> attribute.
    <div>
    `,
    args: {},
    play: async (context) => {
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabs.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tabs in the tab bar
        const nestedTabs = tabBar.querySelectorAll('omni-tab-header');
        await expect(nestedTabs).toBeTruthy();
        const tabsArray = [...nestedTabs];

        //Get the active tab.
        const disabledTab = tabsArray.find((c) => c.hasAttribute('data-disabled'));
        await expect(disabledTab).toBeTruthy;
        await expect(disabledTab).toEqual(tabsArray[2]);
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
   <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="20px" height="20px"><path d="M5.47 8.47a.75.75 0 0 0 1.06 1.06l4.72-4.72V21c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .75-.75V4.81l4.72 4.72a.75.75 0 0 0 .976.073l.084-.073a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.06 0Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="down">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg"  fill="green" width="20px" height="20px"><path d="M18.53 15.53a.75.75 0 0 0-1.06-1.06l-4.72 4.72V3a.75.75 0 0 0-.648-.743L12 2.25a.75.75 0 0 0-.75.75v16.19l-4.72-4.72a.75.75 0 0 0-.976-.073l-.084.073a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="left">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" fill="purple" width="20px" height="20px"><path d="M8.47 5.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72H21a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.75.75H4.81l4.72 4.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06Z"/></svg>
  </OmniIcon>
 </OmniTabHeader>
 <OmniTabHeader slot="header" for="right">
  <OmniIcon size="default">
   <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="20px" height="20px"><path d="M15.53 5.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H3a.75.75 0 0 0-.743.648L2.25 12c0 .414.336.75.75.75h16.19l-4.72 4.72a.75.75 0 0 0-.073.976l.073.084a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"/></svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="20px" height="20px"><path d="M5.47 8.47a.75.75 0 0 0 1.06 1.06l4.72-4.72V21c0 .38.282.693.648.743l.102.007a.75.75 0 0 0 .75-.75V4.81l4.72 4.72a.75.75 0 0 0 .976.073l.084-.073a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.06 0Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="down">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="green" width="20px" height="20px"><path d="M18.53 15.53a.75.75 0 0 0-1.06-1.06l-4.72 4.72V3a.75.75 0 0 0-.648-.743L12 2.25a.75.75 0 0 0-.75.75v16.19l-4.72-4.72a.75.75 0 0 0-.976-.073l-.084.073a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="left">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="purple" width="20px" height="20px"><path d="M8.47 5.47a.75.75 0 0 1 1.06 1.06l-4.72 4.72H21a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.75.75H4.81l4.72 4.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06Z"/></svg>
            </omni-icon>
        </omni-tab-header>
        <omni-tab-header slot="header" for="right">
            <omni-icon size="default">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="20px" height="20px"><path d="M15.53 5.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H3a.75.75 0 0 0-.743.648L2.25 12c0 .414.336.75.75.75h16.19l-4.72 4.72a.75.75 0 0 0-.073.976l.073.084a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"/></svg>
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
        For slotting custom content into the header use the <code class="language-html">&lt;omni-tab-header&gt;</code> component in the <code class="language-html">&lt;omni-tabs&gt;</code> component and ensure you have a <code class="language-html">&lt;omni-tab&gt;</code> component which has a <code class="language-js">for</code> attribute that matches the <code class="language-html">&lt;omni-tab-header&gt;</code> <code class="language-js">id</code> attribute to display slotted content.
    <div>
    `,
    play: async (context) => {
        const tabs = within(context.canvasElement).getByTestId<Tabs>('test-tabs');

        const click = jest.fn();
        tabs.addEventListener('click', click);
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
        await expect(nextActiveTab).toBeTruthy;
    }
};
