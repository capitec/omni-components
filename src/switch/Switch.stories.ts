import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
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
      ?disabled="${args.disabled}"></omni-switch>
  `,
    name: 'Interactive',
    args: {
        label: '',
        data: {},
        hint: '',
        error: '',
        checked: false,
        disabled: false
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const content = switchElement.shadowRoot.getElementById('content');
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
    args: {
        label: 'Label'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const labelElement = switchElement.shadowRoot.querySelector<HTMLElement>('.label');
        await expect(labelElement).toHaveTextContent(Label.args.label);
    }
};

export const Hint: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" hint="${args.hint}"></omni-switch> `,
    args: {
        label: 'Hint',
        hint: 'This is a hint'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot.querySelector<HTMLElement>('.hint');
        await expect(element).toHaveTextContent(Hint.args.hint);
    }
};

export const Error_Label: ComponentStoryFormat<Args> = {
    name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" error="${args.error}"></omni-switch> `,
    args: {
        label: 'Error',
        error: 'This is an error state'
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot.querySelector<HTMLElement>('.error');
        await expect(element).toHaveTextContent(Error_Label.args.error);
    }
};

export const Checked: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" ?checked="${args.checked}"></omni-switch> `,
    args: {
        label: 'Checked',
        checked: true
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const checkedElement = switchElement.shadowRoot.querySelector<HTMLElement>('.checked');
        await expect(checkedElement).toBeTruthy();
    }
};

export const Disabled: ComponentStoryFormat<Args> = {
    render: (args: Args) => html` <omni-switch data-testid="test-switch" label="${args.label}" ?disabled="${args.disabled}"></omni-switch> `,
    args: {
        label: 'Disabled',
        disabled: true
    },
    play: async (context) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const disabledElement = switchElement.shadowRoot.querySelector<HTMLElement>('.disabled');
        await expect(disabledElement).toBeTruthy();

        const content = switchElement.shadowRoot.getElementById('content');
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
