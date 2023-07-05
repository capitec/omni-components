import { within } from '@testing-library/dom';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
            },
            '[Default Slot]': {
                control: 'text'
            }
        }
    }
} as CSFIdentifier;

export interface Args {
    label: string;
    type: (typeof labelOptions)[number];
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<omni-label data-testid="test-label" label="${ifNotEmpty(args.label)}" type="${args.type}">${unsafeHTML(
            args['[Default Slot]']
        )}</omni-label> `,
    name: 'Interactive',
    args: {
        label: 'Label',
        type: 'default',
        '[Default Slot]': undefined
    },
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => <OmniLabel${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}${
                !args['[Default Slot]']
                    ? '/>'
                    : `>
                      ${args['[Default Slot]']}
                  </OmniLabel>`
            };`
        }
    ]
};

export const Title: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label> `,
    description: 'Set the text to display with the styles of a title.',
    args: {
        label: 'Title',
        type: 'title'
    },
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => <OmniLabel${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}/>;`
        }
    ]
};

export const Subtitle: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"> </omni-label> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => <OmniLabel${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}${
                !args['[Default Slot]']
                    ? '/>'
                    : `>
                      ${args['[Default Slot]']}
                  </OmniLabel>`
            };`
        }
    ],
    description: 'Set the text to display with the styles of a subtitle.',
    args: {
        label: 'Subtitle',
        type: 'subtitle'
    }
};

export const Strong: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-label data-testid="test-label" label="${args.label}" type="${args.type}"></omni-label>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => <OmniLabel${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}${
                !args['[Default Slot]']
                    ? '/>'
                    : `>
                      ${args['[Default Slot]']}
                  </OmniLabel>`
            };`
        }
    ],
    description: 'Set the text to display with a bold font style.',
    args: {
        label: 'Strong',
        type: 'strong'
    }
};

export const Slot: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-label data-testid="test-label" type="${args.type}">
            <span>This is <span style="text-decoration: underline;">underlined</span> text inside a paragraph.</span>
        </omni-label>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniLabel } from "@capitec/omni-components-react/label";

const App = () => <OmniLabel${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}>
                    <span>This is <span style={{textDecoration: 'underline'}}>underlined</span> text inside a paragraph.</span>
                  </OmniLabel>;`
        }
    ],
    description: 'Set html content to display within.',
    args: {
        label: 'Slot',
        type: 'strong'
    }
};
