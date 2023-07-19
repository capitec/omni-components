import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';

import './Radio.js';
export interface Args {
    label: string;
    data: object;
    hint: string;
    error: string;
    checked: boolean;
    disabled: boolean;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
        <omni-radio
            data-testid="test-radio"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?checked="${args.checked}"
            ?disabled="${args.disabled}">${unsafeHTML(args['[Default Slot]'])}</omni-radio>
    `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' checked', ' :checked="true"')
                )
        }
    ],
    name: 'Interactive',
    args: {
        label: '',
        data: {},
        hint: '',
        error: '',
        checked: false,
        disabled: false,
        '[Default Slot]': undefined
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    description: 'Set a text value to display next to the component.',
    args: {
        label: 'Label'
    }
};

export const Hint: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" hint="${args.hint}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.hint ? ` hint='${args.hint}'` : ''}/>;`
        }
    ],
    description: 'Set a text value to as a hint.',
    args: {
        label: 'Hint',
        hint: 'This is a hint'
    }
};

export const Error_Label: ComponentStoryFormat<Args> = {
    name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" error="${args.error}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.error ? ` error='${args.error}'` : ''}/>;`
        }
    ],
    description: 'Set a text value to display as an error.',
    args: {
        label: 'Error',
        error: 'This is an error state'
    }
};

export const Checked: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" ?checked="${args.checked}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.checked ? ` checked` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Error_Label!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Set the component to a checked state.',
    args: {
        label: 'Checked',
        checked: true
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" ?disabled="${args.disabled}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true
    }
};

export const Slot = {
    render: () => html`
        <omni-radio data-testid="test-radio">Slotted</omni-radio>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio>
                    Slotted
                  </OmniRadio>;`
        }
    ],
    name: 'Slot',
    description: 'Set content to display within.',
    args: {}
} as ComponentStoryFormat<Args>;
