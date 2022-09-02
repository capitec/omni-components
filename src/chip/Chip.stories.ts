import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { html } from 'lit';
import { loadCssPropertiesRemote, loadDefaultSlotForRemote, raw } from '../utils/StoryUtils.js';
import { Chip } from './Chip.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import './Chip.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Chip',
    component: 'omni-chip',
    parameters: {
        actions: {
            handles: ['click', 'remove'],
            
        },
        cssprops: loadCssPropertiesRemote('omni-chip'),
    },
} as Meta;

interface Args {
    label: string;
    closable: boolean;
    slot: string
}


export const Interactive = {
    render: (args: Args) => html`
    <omni-chip
        data-testid="test-chip"
        label="${ifNotEmpty(args.label)}"
        ?closable=${args.closable}
        >
        ${unsafeHTML(args.slot)}
    </omni-chip>
  `,
    name: 'Interactive',
    args: {
        label: 'Chip',
        closable: false,
        slot: raw`<omni-icon icon="@material/thumb_up"></omni-icon>`
    }
};

export const Closable = {
    render: (args: Args) => html`
    <omni-chip
        data-testid="test-chip"
        label="${ifNotEmpty(args.label)}"
        ?closable=${args.closable}>
    </omni-chip>
  `,
    name: 'Closable',
    args: {
        label: 'Chip',
        closable: true
    }
};


export const Label = {
    render: (args: Args) => html`
    <omni-chip
        data-testid="test-chip"
        label="${ifNotEmpty(args.label)}"
        ?closable=${args.closable}>
    </omni-chip>
  `,
    name: 'Label',
    args: {
        label: 'Chip',
        closable: false
    }
};


export const Slot = {
    render: (args: Args) => html`
    <omni-chip
        data-testid="test-chip"
        label="${ifNotEmpty(args.label)}"
        ?closable=${args.closable}>
        <omni-icon size="default" icon="/assets/direction.svg"></omni-icon>
    </omni-chip>
  `,
    name: 'Slot',
    args: {
        label: 'Chip',
        closable: true
    }
};