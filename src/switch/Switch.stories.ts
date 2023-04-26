import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { Switch } from './Switch.js';

import './Switch.js';

export default {
    title: 'UI Components/Switch',
    component: 'omni-switch'
} as CSFIdentifier;

interface Args {
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
    <omni-switch
      data-testid="test-switch"
      label="${ifNotEmpty(args.label)}"
      .data="${args.data}"
      hint="${ifNotEmpty(args.hint)}"
      error="${ifNotEmpty(args.error)}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}">${unsafeHTML(args['[Default Slot]'])}</omni-switch>
  `,
    name: 'Interactive',
    args: {
        label: '',
        data: {},
        hint: '',
        error: '',
        checked: false,
        disabled: false,
        '[Default Slot]': undefined
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const content = switchElement.shadowRoot?.getElementById('content') as HTMLElement;
        await userEvent.click(content, {
            pointerEventsCheck: 0
        });
        await fireEvent.keyDown(content, {
            key: ' ',
            code: 'Space'
        });

        await expect(valueChange).toBeCalledTimes(2);
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}"></omni-switch> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniSwitch${args.label ? ` label='${args.label}'` : ''}/>;`
        }
    ],
    description: 'Set text content to display next to the component.',
    args: {
        label: 'Label'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const labelElement = switchElement.shadowRoot?.querySelector<HTMLElement>('.label');
        await expect(labelElement).toHaveTextContent(Label.args?.label as string);
    }
};

export const Hint: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" hint="${args.hint}"></omni-switch> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniSwitch${args.label ? ` label='${args.label}'` : ''}${args.hint ? ` hint='${args.hint}'` : ''}/>;`
        }
    ],
    description: 'Set text content to display as a hint.',
    args: {
        label: 'Hint',
        hint: 'This is a hint'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot?.querySelector<HTMLElement>('.hint');
        await expect(element).toHaveTextContent(Hint.args?.hint as string);
    }
};

export const Error_Label: ComponentStoryFormat<Args> = {
    name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" error="${args.error}"></omni-switch> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniSwitch${args.label ? ` label='${args.label}'` : ''}${args.error ? ` error='${args.error}'` : ''}/>;`
        }
    ],
    description: 'Set text content to display as an error.',
    args: {
        label: 'Error',
        error: 'This is an error state'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot?.querySelector<HTMLElement>('.error');
        await expect(element).toHaveTextContent(Error_Label.args?.error as string);
    }
};

export const Checked: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" ?checked="${args.checked}"></omni-switch> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniSwitch${args.label ? ` label='${args.label}'` : ''}${args.checked ? ` checked` : ''}/>;`
        }
    ],
    description: 'Set the component to a checked state.',
    args: {
        label: 'Checked',
        checked: true
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const checkedElement = switchElement.shadowRoot?.querySelector<HTMLElement>('.checked');
        await expect(checkedElement).toBeTruthy();
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" ?disabled="${args.disabled}"></omni-switch> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniSwitch${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        }
    ],
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const disabledElement = switchElement.shadowRoot?.querySelector<HTMLElement>('.disabled');
        await expect(disabledElement).toBeTruthy();

        const content = switchElement.shadowRoot?.getElementById('content') as HTMLElement;
        await userEvent.click(content, {
            pointerEventsCheck: 0
        });
        await fireEvent.keyDown(content, {
            key: ' ',
            code: 'Space'
        });
        await expect(valueChange).toBeCalledTimes(0);
    }
};

export const Slot = {
    render: () => html`
        <omni-switch data-testid="test-switch">Slotted</omni-switch>
    `,
    name: 'Slot',
    description: 'Set content to display within.',
    args: {},
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const slottedText = switchElement.innerHTML;
        await expect(slottedText).toEqual('Slotted');
    }
} as ComponentStoryFormat<Args>;
