import { Meta, StoryContext } from '@storybook/web-components';
import { findAllByDisplayValue, userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { html, nothing } from 'lit';
import { assignToSlot, loadCssPropertiesRemote, loadDefaultSlotFor, raw } from '../utils/StoryUtils.js';
import { Chip } from './Chip.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import './Chip.js';
import '../icon/Icon.js';

export default {
    title: 'UI Components/Chip',
    component: 'omni-chip',
    argTypes: {
        chip_icon: {
          control: 'text',
        },
        close_icon: {
          control: 'text',
        },
      },
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
    slot: string;
    disabled: boolean;

    chip_icon: string;
    close_icon: string;
}

export const Interactive = {
    render: (args: Args) => html`
        <omni-chip
            data-testid="test-chip"
            label="${ifNotEmpty(args.label)}"
            ?closable=${args.closable}
            ?disabled="${args.disabled}"
            >${(args.chip_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('chip_icon', args.chip_icon))}` : nothing)}${(args.close_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('close_icon', args.close_icon))}` : nothing)}
        </omni-chip>
    `,
    name: 'Interactive',
    args: {
        label: 'Chip',
        closable: true,
        disabled: false,
        chip_icon: raw`<svg slot="chip_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`,
        close_icon: '',
    },
    play: async (context: StoryContext) => {
        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        const click = jest.fn();

        chip.addEventListener('click', click);
        await userEvent.click(chip);
        await userEvent.click(chip);

        await expect(click).toBeCalledTimes(2);
  
    }
};

export const Label = {
    render: (args: Args) => html`
        <omni-chip
            data-testid="test-chip"
            label="${ifNotEmpty(args.label)}">
        </omni-chip>
    `,
    name: 'Label',
    args: {
        label: 'Label'
    },
    play: async (context: StoryContext) => {
        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        await expect(chip.shadowRoot.getElementById('label')).toHaveTextContent(Label.args.label);
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
        label: 'Closable',
        closable: true
    },
    play: async (context: StoryContext) => {
        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        const remove = jest.fn();
        chip.addEventListener('remove', remove);

        const closeButton = chip.shadowRoot.getElementById('closeButton');

        await userEvent.click(closeButton);
        await userEvent.click(closeButton);
        await expect(remove).toBeCalledTimes(2);
  
    }
};

export const Disabled = {
    render: (args: Args) => html`
        <omni-chip
            data-testid="test-chip"
            label="${ifNotEmpty(args.label)}"
            ?disabled="${args.disabled}">
        </omni-chip>
    `,
    name: 'Disabled',
    args: {
        label: 'Disabled',
        disabled: true
    },
    play: async (context: StoryContext) => {

        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        const chipElement = chip.shadowRoot.getElementById('chip');
        const foundDisabledClass = chipElement.classList.contains('disabled');
        await expect(foundDisabledClass).toBeTruthy(); // Test for not clickable.

        const click = jest.fn();
        chip.addEventListener('click', click);
        await userEvent.click(chip);
        await userEvent.click(chip);

        await expect(click).toBeCalledTimes(0);
  
    }
};

export const ChipSlotIcon = {
    render: (args: Args) => html`
        <omni-chip
            data-testid="test-chip"
            label="${ifNotEmpty(args.label)}"
            ?closable=${args.closable}>
            ${unsafeHTML(args.chip_icon)} 
        </omni-chip>
    `,
    name: 'Chip Icon',
    args: {
        label: 'Chip',
        closable: false,
        chip_icon: raw`<svg slot="chip_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
    },
    play: async (context: StoryContext) => {
        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        const slotElement = chip.shadowRoot.querySelector<HTMLSlotElement>('slot[name="chip_icon"]');
        await expect(slotElement).toBeTruthy();

        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
  
    }
};

export const CustomCloseIcon = {
    render: (args: Args) => html`
        <omni-chip
            data-testid="test-chip"
            label="${ifNotEmpty(args.label)}"
            ?closable=${args.closable}>
            ${unsafeHTML(args.chip_icon)} 
            ${unsafeHTML(args.close_icon)} 
        </omni-chip>
    `,
    name: 'Custom Close Icon',
    args: {
        label: 'Close',
        closable: true,
        close_icon: raw`<svg slot="close_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>`
    },
    play: async (context: StoryContext) => {
        const chip = within(context.canvasElement).getByTestId<Chip>('test-chip');
        const slotElement = chip.shadowRoot.querySelector<HTMLSlotElement>('slot[name=close_icon]');
        await expect(slotElement).toBeTruthy();

        const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
        await expect(foundSlottedSvgElement).toBeTruthy();
    }
};