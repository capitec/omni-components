import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, querySelectorAsync, raw } from '../utils/StoryUtils.js';

import { Tabs } from './Tabs.js';
import '../label/Label.js';
import './TabHeader.js';
import './Tab.js';
import './Tabs.js';
import '../icon/Icon.js';

interface Args {
    '[Default Slot]': string;
}

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
