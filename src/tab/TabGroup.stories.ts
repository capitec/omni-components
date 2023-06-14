import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit, raw } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
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
    <div style="height: 200px; width: 250px;">
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
    }
};

export const Active: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-tab-group
        data-testid='test-tab-group'>
        <omni-tab             
        data-omni-tab-label="Tab 1">
        </omni-tab>
        <omni-tab 
        data-omni-tab-active            
        data-omni-tab-label="Tab 2">
        </omni-tab>
        <omni-tab             
        data-omni-tab-label="Tab 3">
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
    <OmniLabel label='Label of Tab 1' type='title'/>;
</OmniTab>
<OmniTab data-omni-tab-active  data-omni-tab-label="Tab 2">
    <OmniLabel label='Label of Tab 2' type='title'/>;
</OmniTab>
<OmniTab data-omni-tab-label="Tab 3">
    <OmniLabel label='Label of Tab 3' type='title'/>;
</OmniTab>
</OmniTabGroup>;`
        }
    ],
    args: {},
    name: 'Active',
    description: 'Set a slotted tab that should be active.',
    play: async (context) => {
        const tabGroup = within(context.canvasElement).getByTestId<TabGroup>('test-tab-group');
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
        <OmniLabel label='Label of Tab 1' type='title'/>;
    </OmniTab>
    <OmniTab data-omni-tab-label="Tab 2">
        <OmniLabel label='Label of Tab 2' type='title'/>;
    </OmniTab>
    <OmniTab data-omni-tab-label="Tab 3">
        <OmniLabel label='Label of Tab 3' type='title'/>;
    </OmniTab>
</OmniTabGroup>;`
        }
    ],
    name: 'Tabs',
    description: 'Render a omni-tab-group component with nested omni-tab components',
    args: {
        '[Default Slot]': raw`<omni-tab 
        data-omni-tab-label="Tab 1"            
        data-testid="test-tab-1">
        <div>
            <omni-label label="Tab 1 content label"></omni-label>
        </div>
    </omni-tab>
    <omni-tab           
        data-omni-tab-label="Tab 2">
        <div>
            <omni-label label="Tab 2 content label"></omni-label>
        </div>
    </omni-tab>
    <omni-tab            
        data-omni-tab-label="Tab 3">
        <div>
            <omni-label label="Tab 3 content label"></omni-label>
        </div>
    </omni-tab>`
    },
    play: async (context) => {
        const tabGroup = within(context.canvasElement).getByTestId<TabGroup>('test-tab');
    }
};
