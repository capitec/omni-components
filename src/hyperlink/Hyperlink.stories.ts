import { expect, jest } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import './Hyperlink.js';

const linkTarget = ['_self', '_blank', '_parent', '_top'] as const;

export default {
    title: 'UI Components/Hyperlink',
    component: 'omni-hyperlink',
    argTypes: {
        size: { control: 'radio', options: ['default', 'small'] },
        target: { control: 'radio', options: linkTarget }
    },
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-hyperlink'),
        actions: {
            handles: ['click']
        }
    }
} as Meta;

interface ArgTypes {
    label: string;
    href: string;
    target: typeof linkTarget[number];
    disabled: boolean;
    inline: boolean;
    size: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-hyperlink
            data-testid="test-hyperlink"
            label="${ifNotEmpty(args.label)}"
            href="${ifNotEmpty(args.href)}"
            target="${ifNotEmpty(args.target)}"
            ?disabled="${args.disabled}"
            ?inline="${args.inline}"
            size="${args.size}"></omni-hyperlink>
    `,
    name: 'Interactive',
    args: {
        label: 'Click',
        href: '',
        target: '',
        disabled: false,
        inline: false,
        size: ''
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        const click = jest.fn();
        Hyperlink.addEventListener('click', () => click());
        await userEvent.click(Hyperlink);
        await userEvent.click(Hyperlink);
        await expect(click).toBeCalledTimes(2);
    }
};

export const Label = {
    render: (args: ArgTypes) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}"></omni-hyperlink>`,
    name: 'Label',
    args: {
        label: 'Click'
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink.shadowRoot.querySelector('a')).toHaveTextContent(Label.args.label);
    }
};

export const Size = {
    render: (args: ArgTypes) =>
        html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" size="${args.size}"></omni-hyperlink>`,
    name: 'Size',
    args: {
        label: 'Click',
        size: 'small'
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink).toHaveAttribute('size', Size.args.size);
    }
};

export const Href = {
    render: (args: ArgTypes) =>
        html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" href="${args.href}" target="_blank"></omni-hyperlink>`,
    name: 'Href',
    args: {
        label: 'Click',
        href: 'https://example.com'
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink).toHaveAttribute('href', Href.args.href);
    }
};

export const Disabled = {
    render: (args: ArgTypes) =>
        html`<omni-hyperlink
            data-testid="test-hyperlink"
            href="https://example.com"
            label="${args.label}"
            ?disabled="${args.disabled}"></omni-hyperlink>`,
    name: 'Disabled',
    args: {
        label: 'Click',
        disabled: true
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);

        const Hyperlink = canvas.getByTestId('test-hyperlink');

        const click = jest.fn();
        Hyperlink.addEventListener('click', () => click());

        await userEvent.click(Hyperlink);
        await userEvent.click(Hyperlink);
        await expect(click).toBeCalledTimes(0);
    }
};

export const Inline = {
    render: (args: ArgTypes) =>
        html`<p data-testid="test-paragraph">
            Inline <omni-hyperlink label="${args.label}" ?inline="${args.inline}"></omni-hyperlink> example
        </p>`,
    name: 'Inline',
    args: {
        label: 'click',
        inline: true
    },
    play: async (context: { canvasElement: HTMLElement }) => {
        const canvas = within(context.canvasElement);

        const paragraph = canvas.getByTestId('test-paragraph');
        const hyperlinkElement = paragraph.querySelector<HTMLElement>('omni-hyperlink');

        await expect(paragraph).toContainElement(hyperlinkElement);
    }
};
