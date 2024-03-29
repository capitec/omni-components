import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { assignToSlot, ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';

import './Chip.js';
import '../icon/Icon.js';

export interface Args {
    label: string;
    closable: boolean;
    slot: string;
    disabled: boolean;
    chip_icon: string;
    close_icon: string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}" ?closable=${args.closable} ?disabled="${args.disabled}"
      >${args.chip_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('chip_icon', args.chip_icon))}` : nothing}${
        args.close_icon ? html`${'\r\n'}${unsafeHTML(assignToSlot('close_icon', args.close_icon))}` : nothing
    }
    </omni-chip>
  `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' closable', ' :closable="true"')
                )
        }
    ],
    name: 'Interactive',
    args: {
        label: 'Chip',
        closable: true,
        disabled: false,
        chip_icon: raw`<svg slot="chip_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: orange" width="100%" height="100%"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`,
        close_icon: ''
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}"> </omni-chip> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniChip } from "@capitec/omni-components-react/chip";

const App = () => <OmniChip${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    name: 'Label',
    description: 'Set a text value to display within.',
    args: {
        label: 'Label'
    }
};

export const Closable: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}" ?closable=${args.closable}> </omni-chip> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniChip } from "@capitec/omni-components-react/chip";

const App = () => <OmniChip${args.label ? ` label='${args.label}'` : ''}${args.closable ? ` closable` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Closable!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' closable', ' :closable="true"')
                )
        }
    ],
    name: 'Closable',
    description: 'Add a close icon to the component.',
    args: {
        label: 'Closable',
        closable: true
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}" ?disabled="${args.disabled}"> </omni-chip> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniChip } from "@capitec/omni-components-react/chip";

const App = () => <OmniChip${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' closable', ' :closable="true"')
                )
        }
    ],
    name: 'Disabled',
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true
    }
};

export const Chip_Slot_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}" ?closable=${args.closable}> ${unsafeHTML(args.chip_icon)} </omni-chip>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniChip } from "@capitec/omni-components-react/chip";

const App = () => <OmniChip${args.label ? ` label='${args.label}'` : ''}>
                    <svg slot="chip_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
                  </OmniChip>;`
        }
    ],
    name: 'Chip Icon',
    description: 'Set html content to display as an icon.',
    args: {
        label: 'Chip',
        closable: false,
        chip_icon: raw`<svg slot="chip_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" style="fill: orange"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
    }
};

export const Custom_Close_Icon: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-chip data-testid="test-chip" label="${ifNotEmpty(args.label)}" ?closable=${args.closable}>
      ${unsafeHTML(args.chip_icon)} ${unsafeHTML(args.close_icon)}
    </omni-chip>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniChip } from "@capitec/omni-components-react/chip";

const App = () => <OmniChip${args.label ? ` label='${args.label}'` : ''}${args.closable ? ` closable` : ''}>
                    <svg slot="close_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>
                  </OmniChip>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Custom_Close_Icon!.render!(args), undefined, (s) =>
                    s.replace(' disabled', ' :disabled="true"').replace(' closable', ' :closable="true"')
                )
        }
    ],
    name: 'Custom Close Icon',
    description: 'Set html content to display as the close icon.',
    args: {
        label: 'Close',
        closable: true,
        close_icon: raw`<svg slot="close_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m7.446 6.397.084.073L13 11.939l5.47-5.47a.75.75 0 0 1 1.133.977l-.073.084L14.061 13l5.47 5.47a.75.75 0 0 1-.977 1.133l-.084-.073L13 14.061l-5.47 5.47a.75.75 0 0 1-1.133-.977l.073-.084L11.939 13l-5.47-5.47a.75.75 0 0 1 .977-1.133Z"/></svg>`
    }
};
