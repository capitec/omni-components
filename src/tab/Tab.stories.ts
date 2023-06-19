import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, getSourceFromLit, raw } from '../utils/StoryUtils.js';

import { Tab } from './Tab.js';
import { TabGroup } from './TabGroup.js';

import '../hyperlink/Hyperlink.js'
import '../label/Label.js';
import './Tab.js';
import './TabGroup.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Tab',
    component: 'omni-tab'
} as CSFIdentifier;

interface Args {
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args) => html`
        <omni-tab data-testid="test-tab">
            ${unsafeHTML(args['[Default Slot]'])}
        </omni-tab>
    `,
    name: 'Interactive',
    description: () => html`
    <div>
        Content rendered within a <code class="language-html">&lt;omni-tab&gt;</code> component which is typically used in the <omni-hyperlink href='../components/tab-group'><code class="language-html">&lt;omni-tab-group&gt;</code></omni-hyperlink>.
    <div>
    `,
    args: {
        '[Default Slot]': raw`<div>
    <omni-label label="Tab 1 content label"></omni-label>
    <omni-label label="Tab 1 content label"></omni-label>
    <omni-label label="Tab 1 content label"></omni-label>
</div>`
    },
    play: async (context) => {
        const tab = within(context.canvasElement).getByTestId<Tab>('test-tab');
    }
};
