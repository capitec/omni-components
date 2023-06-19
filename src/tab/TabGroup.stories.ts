import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, querySelectorAsync, raw } from '../utils/StoryUtils.js';

import { TabGroup } from './TabGroup.js';

import '../label/Label.js';
import './Tab.js';
import './TabGroup.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Tab Group',
    component: 'omni-tab-group'
} as CSFIdentifier;

interface Args {
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <div style="height: 200px;">
    <omni-tab-group
        data-testid='test-tab-group'
        >
        ${unsafeHTML(args['[Default Slot]'])}
    </omni-tab-group>
    </div>
`,
    name: 'Interactive',
    args: {
        '[Default Slot]': raw`<omni-tab data-omni-tab-label="Tab-1">
    <omni-label label="Tab 1 content label"></omni-label>
</omni-tab>
<omni-tab data-omni-tab-label="Tab-2">
    <omni-label label="Tab 2 content label"></omni-label>
</omni-tab>
<omni-tab data-omni-tab-label="Tab-3">
    <omni-label label="Tab 3 content label"></omni-label>
</omni-tab>`
    },
    play: async (context) => {
        const tabGroup = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');
        const click = jest.fn();
        tabGroup.addEventListener('click', click);

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroup.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tabs in the tab bar
        const tabs = tabBar.querySelectorAll('.tab');
        await expect(tabs).toBeTruthy();
        const tabsArray = [...tabs];
        // Get the active tab
        const activeTab = tabsArray.find((tab) => tab.children.length > 1);

        await userEvent.click(tabsArray[1]);
    }
};

export const Active: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tab-group
        data-testid='test-tab-group'>
        <omni-tab             
        data-omni-tab-label="Tab 1">
            <omni-label label='Label of Tab 1'></omni-label>
        </omni-tab>
        <omni-tab 
        data-omni-tab-active            
        data-omni-tab-label="Tab 2">
            <omni-label label='Label of Tab 2'></omni-label>
        </omni-tab>
        <omni-tab             
        data-omni-tab-label="Tab 3">
            <omni-label label='Label of Tab 3'></omni-label>
        </omni-tab>
    </omni-tab-group>

`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniTabGroup, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () =>
<OmniTabGroup>
    <OmniTab data-omni-tab-label="Tab 1">
        <OmniLabel label='Label of Tab 1'/>
    </OmniTab>
    <OmniTab data-omni-tab-active  data-omni-tab-label="Tab 2">
        <OmniLabel label='Label of Tab 2'/>
    </OmniTab>
    <OmniTab data-omni-tab-label="Tab 3">
        <OmniLabel label='Label of Tab 3'/>
    </OmniTab>
</OmniTabGroup>;`
        }
    ],
    args: {},
    name: 'Active',
    description: () => html`
    <div>
        Set which <code class="language-html">&lt;omni-tab&gt;</code> component in the <code class="language-html">&lt;omni-tab-group&gt;</code> component should be selected on initial render. This is based on setting the <code class="language-js">data-omni-tab-active</code> attribute.
    <div>
    `,
    play: async (context) => {
        const tabGroup = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');
        const click = jest.fn();
        tabGroup.addEventListener('click', click);

        const tabBar = (await querySelectorAsync(tabGroup.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();
        const tabs = tabBar.querySelectorAll('.tab');
        await expect(tabs).toBeTruthy();
        const tabsArray = [...tabs];
        const activeTab = tabsArray[1];

        await expect(tabs).toBeTruthy();
        await expect(activeTab).toBeTruthy();

        await userEvent.click(tabsArray[0]);

        const newActiveTab = tabsArray[0] as HTMLElement;
        await expect(newActiveTab.children[1].className === 'indicator').toBeTruthy();
    }
};

export const Tabs: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tab-group
        data-testid='test-tab-group'>
        ${unsafeHTML(args['[Default Slot]'])}
    </omni-tab-group>
`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniTabGroup, OmniTab } from "@capitec/omni-components-react/tab";
import { OmniLabel } from "@capitec/omni-components-react/label";

// Note that styles are applied to the slotted content via the style property
const App = () => 
<OmniTabGroup>
    <OmniTab data-omni-tab-label="Tab 1">
        <OmniLabel label='Label of Tab 1'/>
    </OmniTab>
    <OmniTab data-omni-tab-label="Tab 2">
        <OmniLabel label='Label of Tab 2'/>
    </OmniTab>
    <OmniTab data-omni-tab-label="Tab 3">
        <OmniLabel label='Label of Tab 3'/>
    </OmniTab>
</OmniTabGroup>;`
        }
    ],
    name: 'Tabs',
    description: () => html`
    <div>
        Render a <code class="language-html">&lt;omni-tab-group&gt;</code> component with nested <code class="language-html">&lt;omni-tab&gt;</code> components.
    <div>
    `,
    args: {
        '[Default Slot]': raw`<omni-tab 
        data-omni-tab-label="Tab 1"            
        data-testid="test-tab-1">
        <div>
            <omni-label label="Label of Tab 1"></omni-label>
        </div>
    </omni-tab>
    <omni-tab           
        data-omni-tab-label="Tab 2">
        <div>
            <omni-label label="Label of Tab 2"></omni-label>
        </div>
    </omni-tab>
    <omni-tab            
        data-omni-tab-label="Tab 3">
        <div>
            <omni-label label="Label of Tab 3"></omni-label>
        </div>
    </omni-tab>`
    },
    play: async (context) => {
        const tabGroup = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');

        // Get the tab bar element
        const tabBar = (await querySelectorAsync(tabGroup.shadowRoot as ShadowRoot, '.tab-bar')) as HTMLElement;
        await expect(tabBar).toBeTruthy();

        // Get all the tabs in the tab bar
        const tabs = tabBar.querySelectorAll('.tab');
        await expect(tabs).toBeTruthy();
    }
};
