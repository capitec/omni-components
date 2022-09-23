import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { Code } from './Code.js';

import './Code.js';

export default {
    title: 'UI Components/Code',
    component: 'omni-code',
    argTypes: {},
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-code')
    }
} as Meta;

interface ArgTypes {
    header: string;
    content: string;
    language: string;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
        <omni-code
            data-testid="test-code"
            language="${ifNotEmpty(args.language)}"
            header="${ifNotEmpty(args.header)}"
            content="${ifNotEmpty(args.content)}"></omni-code>
    `,
    name: 'Interactive',
    parameters: {},
    args: {
        header: '',
        content: 'Hello',
        language: 'html'
    },
    play: async (context: StoryContext) => {
        const code = within(context.canvasElement).getByTestId<Code>('test-code');
        await expect(code).toBeTruthy();

        const htmlCodeBlock = code.shadowRoot.querySelector('.language-html');
        await expect(htmlCodeBlock).toBeTruthy();
    }
};

export const HTML_as_content = {
    render: (args: ArgTypes) => html`
        <omni-code language="${args.language}" data-testid="test-code" header="${args.header}" content="${args.content}"> </omni-code>
    `,
    args: {
        header: 'HTML',
        content: `
<div>
    <h1>Hello World</h1>
</div>
	`,
        language: 'html'
    },
    play: async (context: StoryContext) => {
        const code = within(context.canvasElement).getByTestId<Code>('test-code');
        await expect(code).toBeTruthy();

        const htmlCodeBlock = code.shadowRoot.querySelector('.language-html');
        await expect(htmlCodeBlock).toBeTruthy();
    }
};

export const HTML_as_child_element = {
    render: (args: ArgTypes) => html`
        <omni-code language="${args.language}" data-testid="test-code" header="${args.header}" content="${args.content}">
            <div>
                <h1>Hello World</h1>
            </div>
        </omni-code>
    `,
    args: {
        header: 'HTML as child element',
        language: 'html'
    },
    play: async (context: StoryContext) => {
        const code = within(context.canvasElement).getByTestId<Code>('test-code');
        await expect(code).toBeTruthy();

        const htmlCodeBlock = code.shadowRoot.querySelector('.language-html');
        await expect(htmlCodeBlock).toBeTruthy();
    }
};

export const JavaScript = {
    render: (args: ArgTypes) => html`
        <omni-code language="${args.language}" data-testid="test-code" header="${args.header}" content="${args.content}"> </omni-code>
    `,
    name: 'JavaScript',
    args: {
        header: 'JavaScript',
        content: 'alert("This is JavaScript");',
        language: 'javascript'
    },
    play: async (context: StoryContext) => {
        const code = within(context.canvasElement).getByTestId<Code>('test-code');
        await expect(code).toBeTruthy();

        const jsCodeBlock = code.shadowRoot.querySelector('.language-javascript');
        await expect(jsCodeBlock).toBeTruthy();
    }
};
