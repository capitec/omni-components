import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import './Hyperlink.js';

const linkTarget = ['_self', '_blank', '_parent', '_top'] as const;

export default {
    title: 'UI Components/Hyperlink',
    component: 'omni-hyperlink',
    argTypes: {
        size: { control: 'radio', options: ['default', 'small'] },
        target: { control: 'radio', options: linkTarget }
    }
} as CSFIdentifier;

interface Args {
    label: string;
    href: string;
    target: typeof linkTarget[number];
    disabled: boolean;
    inline: boolean;
    size: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
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
        disabled: false,
        inline: false,
        size: ''
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        const click = jest.fn();
        Hyperlink.addEventListener('click', () => click());
        await userEvent.click(Hyperlink, {
            pointerEventsCheck: 0
        });
        await userEvent.click(Hyperlink, {
            pointerEventsCheck: 0
        });
        await expect(click).toBeCalledTimes(2);
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}"></omni-hyperlink>`,
    name: 'Label',
    description: 'Set the text content of the component.',
    args: {
        label: 'Click'
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink.shadowRoot.querySelector('a')).toHaveTextContent(Label.args.label);
    }
};

export const Size: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" size="${args.size}"></omni-hyperlink>`,
    name: 'Size',
    description: 'Set the component to a predefined size.',
    args: {
        label: 'Click',
        size: 'small'
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink).toHaveAttribute('size', Size.args.size);
    }
};

export const Href: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" href="${args.href}" target="_blank"></omni-hyperlink>`,
    name: 'Href',
    description: 'Set the hypertext reference.',
    args: {
        label: 'Click',
        href: 'https://example.com'
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);
        const Hyperlink = canvas.getByTestId('test-hyperlink');
        await expect(Hyperlink).toHaveAttribute('href', Href.args.href);
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<omni-hyperlink
      data-testid="test-hyperlink"
      href="https://example.com"
      label="${args.label}"
      ?disabled="${args.disabled}"></omni-hyperlink>`,
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Click',
        disabled: true
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);

        const Hyperlink = canvas.getByTestId('test-hyperlink');

        const click = jest.fn();
        Hyperlink.addEventListener('click', () => click());

        await userEvent.click(Hyperlink, {
            pointerEventsCheck: 0
        });
        await userEvent.click(Hyperlink, {
            pointerEventsCheck: 0
        });
        await expect(click).toBeCalledTimes(0);
    }
};

export const Inline: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<p data-testid="test-paragraph"> Inline <omni-hyperlink label="${args.label}" ?inline="${args.inline}"></omni-hyperlink> example </p>`,
    name: 'Inline',
    description: 'Render the component using its inline styles.',
    args: {
        label: 'click',
        inline: true
    },
    play: async (context) => {
        const canvas = within(context.canvasElement);

        const paragraph = canvas.getByTestId('test-paragraph');
        const hyperlinkElement = paragraph.querySelector<HTMLElement>('omni-hyperlink');

        await expect(paragraph).toContainElement(hyperlinkElement);
    }
};
