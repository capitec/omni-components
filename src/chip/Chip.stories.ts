import { Meta, StoryContext } from '@storybook/web-components';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { html } from 'lit';
import { loadCssPropertiesRemote, loadDefaultSlotForRemote, raw } from '../utils/StoryUtils.js';
import { Chip } from './Chip.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';


import './Chip.js';

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
}


export const Interactive = {
    render: (args: Args) => html`
    <omni-chip
        data-testid="test-chip"
        label="${ifNotEmpty(args.label)}"
        ?closable=${args.closable}>
    </omni-chip>
  `,
    name: 'Interactive',
    args: {
        label: 'Chip',
        closable: false
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
    name: 'Closable',
    args: {
        label: 'Chip',
        closable: false
    }
};


export const Avatar = {
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
        closable: false
    }
};