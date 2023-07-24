import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { raw, ComponentStoryFormat, getSourceFromLit } from '../utils/StoryUtils.js';

import './Button.js';
import '../icon/Icon.js';

const buttonOptions = ['primary', 'secondary', 'clear', 'white'] as const;
const slotPositionOptions = ['left', 'top', 'right', 'bottom'] as const;

interface Args {
    type: (typeof buttonOptions)[number];
    label: string;
    slotPosition: (typeof slotPositionOptions)[number];
    disabled: boolean;
    '[Default Slot]': string;
}

export const Interactive = {
    render: (args: Args) => html`
    <omni-button
      data-testid="test-button"
      type="${args.type}"
      label="${ifNotEmpty(args.label)}"
      slot-position="${args.slotPosition}"
      ?disabled=${args.disabled}>
      ${unsafeHTML(args['[Default Slot]'])}
    </omni-button>
  `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Interactive?.render?.(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        }
    ],
    name: 'Interactive',
    args: {
        type: 'secondary',
        label: 'Button',
        slotPosition: 'top',
        disabled: false,
        '[Default Slot]': raw`<omni-icon icon="@material/thumb_up"></omni-icon>`
    }
} as ComponentStoryFormat<Args>;

export const Type = {
    render: (args: Args) => html` <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";

const App = () => <OmniButton${args.label ? ` label='${args.label}'` : ''}${args.type ? ` type='${args.type}'` : ''}/>;`
        }
    ],
    name: 'Type',
    description: 'Set the type of button to render using different combinations of primary and alternate colours.',
    args: {
        type: 'primary',
        label: 'Click'
    }
} as ComponentStoryFormat<Args>;

export const Label = {
    render: (args: Args) => html` <omni-button label="${args.label}" data-testid="test-button"></omni-button> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";

const App = () => <OmniButton${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    name: 'Label',
    description: 'Set a text value to display within.',
    args: {
        label: 'Click'
    }
} as ComponentStoryFormat<Args>;

export const Slot = {
    render: () => html`
    <omni-button data-testid="test-button">
      <omni-icon size="default" icon="./assets/images/direction.svg"></omni-icon>
    </omni-button>
  `,
    frameworkSources: [
        {
            framework: 'React',
            load: () => `import { OmniButton } from "@capitec/omni-components-react/button";
import { OmniIcon } from "@capitec/omni-components-react/icon";

const App = () => <OmniButton>
                    <OmniIcon size="default" icon="./assets/images/direction.svg" />
                  </OmniButton>;`
        }
    ],
    name: 'Slot',
    description: 'Set html content to display within.',
    args: {}
} as ComponentStoryFormat<Args>;

export const Disabled = {
    render: (args: Args) => html` <omni-button disabled label="${args.label}" data-testid="test-button"></omni-button> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniButton } from "@capitec/omni-components-react/button";

const App = () => <OmniButton${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        },
        {
            framework: 'Vue',
            load: (args) => getSourceFromLit(Disabled?.render?.(args), undefined, (s) => s.replace(' disabled', ' :disabled="true"'))
        }
    ],
    name: 'Disabled',
    description: () =>
        html`<span>Set this in order to prevent interaction. Done internally via <code class="language-css">pointer-events: none</code></span>.`,
    args: {
        label: 'Disabled',
        disabled: true
    }
} as ComponentStoryFormat<Args>;
