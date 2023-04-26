import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
import { Radio } from './Radio.js';

import './Radio.js';

export default {
    title: 'UI Components/Radio',
    component: 'omni-radio'
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
        <omni-radio
            data-testid="test-radio"
            label="${ifNotEmpty(args.label)}"
            .data="${args.data}"
            hint="${ifNotEmpty(args.hint)}"
            error="${ifNotEmpty(args.error)}"
            ?checked="${args.checked}"
            ?disabled="${args.disabled}">${unsafeHTML(args['[Default Slot]'])}</omni-radio>
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
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        radio.focus();

        const content = radio.shadowRoot?.getElementById('content') as HTMLElement;
        const valueChange = jest.fn();
        radio.addEventListener('value-change', valueChange);

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
    },
    play: async (context) => {
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const labelElement = radio.shadowRoot?.getElementById('label') as HTMLElement;
        await expect(labelElement).toHaveTextContent(Label.args?.label as string);
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
    },
    play: async (context) => {
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const element = radio.shadowRoot?.querySelector<HTMLElement>('.hint');
        await expect(element).toHaveTextContent(Hint.args?.hint as string);
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
    },
    play: async (context) => {
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const element = radio.shadowRoot?.querySelector<HTMLElement>('.error');
        await expect(element).toHaveTextContent(Error_Label.args?.error as string);
    }
};

export const Checked: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" ?checked="${args.checked}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.checked ? ` checked` : ''}/>;`
        }
    ],
    description: 'Set the component to a checked state.',
    args: {
        label: 'Checked',
        checked: true
    },
    play: async (context) => {
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const checkedElement = radio.shadowRoot?.querySelector<HTMLElement>('.checked');
        await expect(checkedElement).toBeTruthy();
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-radio data-testid="test-radio" label="${args.label}" ?disabled="${args.disabled}"></omni-radio> `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadio${args.label ? ` label='${args.label}'` : ''}${args.disabled ? ` disabled` : ''}/>;`
        }
    ],
    description: 'Prevent interaction (pointer events).',
    args: {
        label: 'Disabled',
        disabled: true
    },
    play: async (context) => {
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const valueChange = jest.fn();
        radio.addEventListener('value-change', valueChange);

        const disabledElement = radio.shadowRoot?.querySelector<HTMLElement>('.disabled');
        await expect(disabledElement).toBeTruthy();

        const content = radio.shadowRoot?.getElementById('content') as HTMLElement;
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
    args: {},
    play: async (context) => {
        const radioElement = within(context.canvasElement).getByTestId<Radio>('test-radio');
        const slottedText = radioElement.innerHTML;
        await expect(slottedText).toEqual('Slotted');
    }
} as ComponentStoryFormat<Args>;
