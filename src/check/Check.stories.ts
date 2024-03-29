import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';
import './Check.js';

export interface Args {
    label: string;
    data: object;
    hint: string;
    error: string;
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;

    check_icon: string;
    indeterminate_icon: string;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args) => html`
        <omni-check
            data-testid="test-check"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?checked="${args.checked}"
            ?disabled="${args.disabled}"
            ?indeterminate="${args.indeterminate}">${
        args.indeterminate_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('indeterminate_icon', args.indeterminate_icon))}` : nothing
    }${args.check_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('check_icon', args.check_icon))}` : nothing}${
        args.check_icon || args.indeterminate_icon ? '\r\n' : nothing
    }${unsafeHTML(args['[Default Slot]'])}</omni-check>
    `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
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
        indeterminate: false,
        check_icon: '',
        indeterminate_icon: '',
        '[Default Slot]': undefined
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    description: 'Set text value to display next to the check box.',
    args: {
        label: 'Label'
    }
};

export const Hint: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}" hint="${args.hint}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.hint ? ` hint='${args.hint}'` : ''}/>;`
        }
    ],
    description: 'Set text value to display as hint.',
    args: {
        label: 'Hint',
        hint: 'This is a hint'
    }
};

export const Error_Label: ComponentStoryFormat<Args> = {
    name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}" error="${args.error}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.error ? ` error='${args.error}'` : ''}/>;`
        }
    ],
    description: 'Set text value to display as error.',
    args: {
        label: 'Error',
        error: 'This is an error state'
    }
};

export const Checked: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}" ?checked="${args.checked}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.checked ? ` checked` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Checked!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Set the component to a checked state.',
    args: {
        label: 'Checked',
        checked: true
    }
};

export const Indeterminate: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}" ?indeterminate="${args.indeterminate}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.indeterminate ? ` indeterminate` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Indeterminate!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Set the component to an indeterminate/partial state.',
    args: {
        label: 'Indeterminate',
        indeterminate: true
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-check data-testid="test-check" label="${args.label}" ?disabled="${args.disabled}"></omni-check> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
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
        <omni-check data-testid="test-check">Slotted</omni-check>
    `,
    frameworkSources: [
        {
            framework: 'React',
            load: () => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck>
                    Slotted
                  </OmniCheck>;`
        }
    ],
    name: 'Slot',
    description: 'Set content to display within.',
    args: {}
} as ComponentStoryFormat<Args>;

export const Custom_Check_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-check data-testid="test-check" label="${args.label}" ?checked="${args.checked}"> ${unsafeHTML(args.check_icon)} </omni-check>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.checked ? ` checked` : ''}>
                    <svg slot="check_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.79 410.38" version="1.0" width="100%" height="100%">
                        <path style={{stroke: '#000', strokeWidth: '19.892', fill: 'lightgreen'}}
                            d="m-1747.2-549.3 287.72 333.9c146.6-298.83 326.06-573.74 614.52-834.75-215.89 121.82-453.86 353.14-657.14 639.38l-245.1-138.53z"
                            transform="translate(843.77 509.04) scale(.48018)" />
                    </svg>
                </OmniCheck>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Custom_Check_Icon!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Set html content to render when the component is in a checked state.',
    args: {
        label: 'Custom Check Icon',
        checked: true,
        check_icon: raw`
            <svg slot="check_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442.79 410.38" version="1.0" width="100%"
                height="100%">
                <path style="stroke:#000;stroke-width:19.892;fill:lightgreen"
                d="m-1747.2-549.3 287.72 333.9c146.6-298.83 326.06-573.74 614.52-834.75-215.89 121.82-453.86 353.14-657.14 639.38l-245.1-138.53z"
                transform="translate(843.77 509.04) scale(.48018)" />
            </svg>
        `
    }
};

export const Custom_Indeterminate_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-check data-testid="test-check" label="${args.label}" ?indeterminate="${args.indeterminate}">
      ${unsafeHTML(args.indeterminate_icon)}
    </omni-check>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniCheck } from "@capitec/omni-components-react/check";

const App = () => <OmniCheck${args.label ? ` label='${args.label}'` : ''}${args.indeterminate ? ` indeterminate` : ''}>
                    <svg slot="indeterminate_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
                        <defs>
                        <linearGradient id="b" y2="28.275" gradientUnits="userSpaceOnUse" x2="20.07" y1="3.976" x1="12.113">
                            <stop style={{stopColor: '#ffffff'}} offset="0" />
                            <stop style={{stopColor: '#ffffff'}} offset="1" />
                        </linearGradient>
                        <linearGradient id="a" y2="30" gradientUnits="userSpaceOnUse" x2="20.214" y1="2" x1="12.031">
                            <stop style={{stopColor: '#ffffff'}} offset="0" />
                            <stop style={{stopColor: '#ffffff'}} offset="1" />
                        </linearGradient>
                        </defs>
                        <path d="M2.875 13C1.281 13 0 14.338 0 16s1.28 3 2.875 3h26.25C30.719 19 32 17.662 32 16s-1.281-3-2.875-3H2.875z" />
                        <path style={{fill:'url(#b)'}} transform="translate(-.063 .063)"
                        d="M2.875 13.938c-1.067 0-1.938.884-1.938 2.062s.87 2.062 1.938 2.062h26.25c1.067 0 1.937-.884 1.937-2.062s-.87-2.062-1.937-2.062H2.875z" />
                    </svg>
                </OmniCheck>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Custom_Indeterminate_Icon!.render!(args), undefined, (s) =>
                    s
                        .replace(' disabled', ' :disabled="true"')
                        .replace(' indeterminate', ' :indeterminate="true"')
                        .replace(' checked', ' :checked="true"')
                )
        }
    ],
    description: 'Set html content to render when the component is in an indeterminate state.',
    args: {
        label: 'Custom Indeterminate Icon',
        indeterminate: true,
        indeterminate_icon: raw`
			<svg slot="indeterminate_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
				<defs>
				<linearGradient id="b" y2="28.275" gradientUnits="userSpaceOnUse" x2="20.07" y1="3.976" x1="12.113">
					<stop style="stop-color:#ffffff" offset="0" />
					<stop style="stop-color:#ffffff" offset="1" />
				</linearGradient>
				<linearGradient id="a" y2="30" gradientUnits="userSpaceOnUse" x2="20.214" y1="2" x1="12.031">
					<stop style="stop-color:#ffffff" offset="0" />
					<stop style="stop-color:#ffffff" offset="1" />
				</linearGradient>
				</defs>
				<path d="M2.875 13C1.281 13 0 14.338 0 16s1.28 3 2.875 3h26.25C30.719 19 32 17.662 32 16s-1.281-3-2.875-3H2.875z" />
				<path style="fill:url(#b)" transform="translate(-.063 .063)"
				d="M2.875 13.938c-1.067 0-1.938.884-1.938 2.062s.87 2.062 1.938 2.062h26.25c1.067 0 1.937-.884 1.937-2.062s-.87-2.062-1.937-2.062H2.875z" />
			</svg>
		`
    }
};
