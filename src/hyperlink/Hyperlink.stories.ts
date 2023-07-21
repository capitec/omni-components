import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';
import './Hyperlink.js';

const linkTarget = ['_self', '_blank', '_parent', '_top'] as const;

export interface Args {
    label: string;
    href: string;
    target: (typeof linkTarget)[number];
    disabled: boolean;
    inline: boolean;
    size: string;
    '[Default Slot]': string;
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
      size="${args.size}">
      ${unsafeHTML(args['[Default Slot]'])}
    </omni-hyperlink>
  `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' inline', ' :inline="true"')
                )
        }
    ],
    name: 'Interactive',
    args: {
        label: 'Click',
        href: '',
        disabled: false,
        inline: false,
        size: '',
        '[Default Slot]': undefined
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}"></omni-hyperlink>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniHyperlink } from "@capitec/omni-components-react/hyperlink";

const App = () => <OmniHyperlink${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    name: 'Label',
    description: 'Set the text content of the component.',
    args: {
        label: 'Click'
    }
};

export const Size: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" size="${args.size}"></omni-hyperlink>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniHyperlink } from "@capitec/omni-components-react/hyperlink";

const App = () => <OmniHyperlink${args.label ? ` label='${args.label}'` : ''}${args.size ? ` size='${args.size}'` : ''}/>;`
        }
    ],
    name: 'Size',
    description: 'Set the component to a predefined size.',
    args: {
        label: 'Click',
        size: 'small'
    }
};

export const Href: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<omni-hyperlink data-testid="test-hyperlink" label="${args.label}" href="${args.href}" target="_blank"></omni-hyperlink>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniHyperlink } from "@capitec/omni-components-react/hyperlink";

const App = () => <OmniHyperlink${args.label ? ` label='${args.label}'` : ''}${args.href ? ` href='${args.href}'` : ''} target="_blank"/>;`
        }
    ],
    name: 'Href',
    description: 'Set the hypertext reference.',
    args: {
        label: 'Click',
        href: 'https://example.com'
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<omni-hyperlink
      data-testid="test-hyperlink"
      href="https://example.com"
      label="${args.label}"
      ?disabled="${args.disabled}"></omni-hyperlink>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniHyperlink } from "@capitec/omni-components-react/hyperlink";

const App = () => <OmniHyperlink href="https://example.com"${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' inline', ' :inline="true"')
                )
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Click',
        disabled: true
    }
};

export const Inline: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html`<p data-testid="test-paragraph"> Inline <omni-hyperlink label="${args.label}" ?inline="${args.inline}"></omni-hyperlink> example </p>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniHyperlink } from "@capitec/omni-components-react/hyperlink";

const App = () => <p> Inline <OmniHyperlink${args.label ? ` label='${args.label}'` : ''}${args.inline ? ` inline` : ''}/> example </p>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Inline!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' inline', ' :inline="true"')
                )
        }
    ],
    name: 'Inline',
    description: 'Render the component using its inline styles.',
    args: {
        label: 'click',
        inline: true
    }
};
