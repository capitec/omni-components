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
    selectedIndex?: number;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <div style="height: 400px; width: 400px;">
    <omni-tab-group
        data-testid='test-tab-group'
        selected-index="${ifDefined(args.selectedIndex)}"
        >
        ${unsafeHTML(args['[Default Slot]'])}
    </omni-tab-group></div>
`,
    name: 'Interactive',
    args: {
        selectedIndex: undefined,
        '[Default Slot]': raw`<omni-tab data-omni-tab-label="Tab-1">
    <div>
        <omni-label label="Tab 1 content label"></omni-label>
        <omni-label label="Tab 1 content label"></omni-label>
        <omni-label label="Tab 1 content label"></omni-label>
    </div>
</omni-tab>
<omni-tab data-omni-tab-label="Tab-2">
    <omni-label label="Tab 2 content label"></omni-label>
</omni-tab>
<omni-tab data-omni-tab-label="Tab-3">
    <omni-label label="Tab 3 content label"></omni-label>
</omni-tab>`
    },
    play: async (context) => {
        const tab = within(context.canvasElement).getByTestId<Tab>('test-tab');
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
        data-omni-tab-label="Tab 2">
        </omni-tab>
        <omni-tab             
        data-omni-tab-label="Tab 3">
        </omni-tab>
    </omni-tab-group>

`,
    name: 'Active',
    description: 'Set a text value to display within the omni-tab.',
    args: {
        selectedIndex: 0
    },
    play: async (context) => {
        const tab = within(context.canvasElement).getByTestId<Tab>('test-tab');
    }
};

export const Tabs: ComponentStoryFormat<Args> = {
    render: (args) => html`
    <omni-tab-group
        data-testid='test-tab-group'>
        ${unsafeHTML(args['[Default Slot]'])}

    </omni-tab-group>
`,
    name: 'Tabs',
    description: 'Render a omni-tab-group component with nested omni-tab components',
    args: {
        '[Default Slot]': raw`<omni-tab 
        data-omni-tab-label="Tab 1"            
        data-testid="test-tab-1">
        <div>
            <omni-label label="Tab 1 content label"></omni-label>
            <omni-label label="Tab 1 content label"></omni-label>
            <omni-label label="Tab 1 content label"></omni-label>
        </div>
    </omni-tab>
    <omni-tab           
        data-omni-tab-label="Tab 2">
        <div>
            <omni-label label="Tab 2 content label"></omni-label>
            <omni-label label="Tab 2 content label"></omni-label>
            <omni-label label="Tab 2 content label"></omni-label>
        </div>
    </omni-tab>
    <omni-tab            
        data-omni-tab-label="Tab 3">
        <div>
            <omni-label label="Tab 3 content label"></omni-label>
            <omni-label label="Tab 3 content label"></omni-label>
            <omni-label label="Tab 3 content label"></omni-label>
        </div>
    </omni-tab>`
    },
    play: async (context) => {
        const tab = within(context.canvasElement).getByTestId<Tab>('test-tab');
    }
};
