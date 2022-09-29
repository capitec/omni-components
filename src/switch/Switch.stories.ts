import { expect, jest } from '@storybook/jest';
import { userEvent, within, fireEvent } from '@storybook/testing-library';
import { Meta, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { ifNotEmpty } from '../utils/Directives.js';
import { loadCssPropertiesRemote } from '../utils/StoryUtils';
import { Switch } from './Switch.js';

import './Switch.js';

export default {
    title: 'UI Components/Switch',
    component: 'omni-switch',
    argTypes: {},
    parameters: {
        cssprops: loadCssPropertiesRemote('omni-switch'),
        actions: {
            handles: ['value-change']
        }
    }
} as Meta;

interface ArgTypes {
    label: string;
    data: object;
    hint: string;
    error: string;
    checked: boolean;
    disabled: boolean;
}

export const Interactive = {
    render: (args: ArgTypes) => html`
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
    parameters: {},
    args: {
        label: '',
        data: {},
        hint: '',
        error: '',
        checked: false,
        disabled: false
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const content = switchElement.shadowRoot.getElementById('content');
        await userEvent.click(content);
        await fireEvent.keyDown(content, {
            key: ' ',
            code: 'Space'
        });

        await expect(valueChange).toBeCalledTimes(2);
    }
};

export const Label = {
    render: (args: ArgTypes) => html` <omni-switch data-testid="test-switch" label="${args.label}"></omni-switch> `,
    args: {
        label: 'Label'
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const labelElement = switchElement.shadowRoot.querySelector<HTMLElement>('.label');
        await expect(labelElement).toHaveTextContent(Label.args.label);
    }
};

export const Hint = {
    render: (args: ArgTypes) => html` <omni-switch data-testid="test-switch" label="${args.label}" hint="${args.hint}"></omni-switch> `,
    args: {
        label: 'Hint',
        hint: 'This is a hint'
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot.querySelector<HTMLElement>('.hint');
        await expect(element).toHaveTextContent(Hint.args.hint);
    }
};

export const ErrorLabel = {
    name: 'Error', // Explicitly named as error, the exported name cannot be 'Error' as that is reserved
    render: (args: ArgTypes) => html` <omni-switch data-testid="test-switch" label="${args.label}" error="${args.error}"></omni-switch> `,
    args: {
        label: 'Error',
        error: 'This is an error state'
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const element = switchElement.shadowRoot.querySelector<HTMLElement>('.error');
        await expect(element).toHaveTextContent(ErrorLabel.args.error);
    }
};

export const Checked = {
    render: (args: ArgTypes) => html`
        <omni-switch data-testid="test-switch" label="${args.label}" ?checked="${args.checked}"></omni-switch>
    `,
    args: {
        label: 'Checked',
        checked: true
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const checkedElement = switchElement.shadowRoot.querySelector<HTMLElement>('.checked');
        await expect(checkedElement).toBeTruthy();
    }
};

export const Disabled = {
    render: (args: ArgTypes) => html`
        <omni-switch data-testid="test-switch" label="${args.label}" ?disabled="${args.disabled}"></omni-switch>
    `,
    args: {
        label: 'Disabled',
        disabled: true
    },
    play: async (context: StoryContext) => {
        const switchElement = within(context.canvasElement).getByTestId<Switch>('test-switch');
        const valueChange = jest.fn();
        switchElement.addEventListener('value-change', valueChange);

        const disabledElement = switchElement.shadowRoot.querySelector<HTMLElement>('.disabled');
        await expect(disabledElement).toBeTruthy();

        const content = switchElement.shadowRoot.getElementById('content');
        await userEvent.click(content);
        await fireEvent.keyDown(content, {
            key: ' ',
            code: 'Space'
        });
        await expect(valueChange).toBeCalledTimes(0);
    }
};
