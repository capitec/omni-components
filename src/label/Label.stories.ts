import { within } from '@testing-library/dom';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { Label } from './Label.js';
import './Label.js';

const labelOptions = ['default', 'title', 'subtitle', 'strong'] as const;

export default {
    title: 'UI Components/Label',
    component: 'omni-label',
    argTypes: {
        type: {
            control: {
                type: 'radio',
                options: labelOptions
            }
        }
    }
} as CSFIdentifier;

interface Args {
    label: string;
    type: typeof labelOptions[number];
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${ifNotEmpty(args.label)}" type="${args.type}"> </omni-label> `,
    name: 'Interactive',
    args: {
        label: 'Label',
        type: 'default'
    },
    play: async (context) => {
        const label = within(context.canvasElement).getByTestId<Label>('test-label');
        await expect(label.shadowRoot).toHaveTextContent(Interactive.args?.label as string);
    }
};

export const Title: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label> `,
    description: 'Set the text to display with the styles of a title.',
    args: {
        label: 'Title',
        type: 'title'
    },
    play: async (context) => {
        const label = within(context.canvasElement).getByTestId<Label>('test-label');
        await expect(label.shadowRoot).toHaveTextContent(Title.args?.label as string);
    }
};

export const Subtitle: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label> `,
    description: 'Set the text to display with the styles of a subtitle.',
    args: {
        label: 'Subtitle',
        type: 'subtitle'
    },
    play: async (context) => {
        const label = within(context.canvasElement).getByTestId<Label>('test-label');
        await expect(label.shadowRoot).toHaveTextContent(Subtitle.args?.label as string);
    }
};

export const Strong: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label> `,
    description: 'Set the text to display with a bold font style.',
    args: {
        label: 'Strong',
        type: 'strong'
    },
    play: async (context) => {
        const label = within(context.canvasElement).getByTestId<Label>('test-label');
        await expect(label.shadowRoot).toHaveTextContent(Strong.args?.label as string);
    }
};
