/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-invalid-html */
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM';
import { ComponentStoryFormat, raw } from '../utils/StoryUtils.js';
import { OmniFormElement } from './OmniFormElement.js';

export interface BaseArgs {
    label: string;
    value: string;
    data: object;
    hint: string;
    error: string;
    disabled: boolean;

    suffix: string;
    prefix: string;
}

export const LabelStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Label: ComponentStoryFormat<U> = {
        render: (args: U) => html`${unsafeHTML(`<${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}"></${tagName}>`)}`,
        name: 'Label',
        description: 'Set a text value to display as a label.',
        args: {
            label: 'The Label'
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');
            await expect(input.shadowRoot.querySelector<HTMLElement>('.label > span')).toHaveTextContent(Label.args.label);
        }
    };
    return Label;
};

export const HintStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Hint: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}" hint="${args.hint}"></${tagName}>`)}`,
        name: 'Hint',
        description: 'Set a text value to display as a hint.',
        args: {
            label: 'Hint',
            hint: 'The Hint label'
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');
            const hintElement = input.shadowRoot.querySelector<HTMLElement>('.hint-label');
            await expect(hintElement).toBeTruthy();
            await expect(hintElement).toHaveTextContent(Hint.args.hint);
        }
    };
    return Hint;
};

export const ErrorStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Error: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${args.label}" error="${ifNotEmpty(args.error)}"></${tagName}>`)}`,
        name: 'Error',
        description: 'Set a text value to display as an error.',
        args: {
            label: 'Error',
            error: 'The Error label'
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');
            const errorElement = input.shadowRoot.querySelector<HTMLElement>('.error-label');
            await expect(errorElement).toBeTruthy();
            await expect(errorElement).toHaveTextContent(Error.args.error);
        }
    };
    return Error;
};

export const ValueStory = <T extends HTMLElement, U extends BaseArgs>(
    tagName: string,
    inputValue: string | number | string[] = 'The input value'
) => {
    const Value: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}"></${tagName}>`)}`,
        name: 'Value',
        description: 'Set the current value of the component.',
        args: {
            label: 'Value',
            value: inputValue
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');

            const inputField = input.shadowRoot.getElementById('inputField');
            await expect(inputField).toHaveValue(Value.args.value);
        }
    };
    return Value;
};

export const PrefixStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Prefix: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" style="--omni-form-label-margin-left:40px;" label="${ifNotEmpty(args.label)}">
            ${args.prefix}
            </${tagName}>`)}`,
        name: 'Prefix',
        description:
            'Set html content to display as a prefix within the component. Important to note that for this example the prefix is styled and the --omni-form-label-margin-left css variable to overridden to position the label accordingly.',
        args: {
            label: 'Prefix',
            prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange; margin-left: 10px;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');

            const slotElement = input.shadowRoot.querySelector<HTMLSlotElement>('slot[name=prefix]');
            await expect(slotElement).toBeTruthy();

            const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
            await expect(foundSlottedSvgElement).toBeTruthy();
        }
    };
    return Prefix;
};

export const SuffixStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Suffix: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}">
            ${args.suffix}
            </${tagName}>`)}`,
        name: 'Suffix',
        description:
            'Set html content to display as a suffix within the component. Important to note this example has styles applied to the slotted content in the "suffix" slot',
        args: {
            label: 'Suffix',
            suffix: raw`<svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange; margin-right:10px;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');

            const slotElement = input.shadowRoot.querySelector<HTMLSlotElement>('slot[name=suffix]');
            await expect(slotElement).toBeTruthy();

            const foundSlottedSvgElement = slotElement.assignedElements().find((e) => e.tagName.toLocaleLowerCase() === 'svg');
            await expect(foundSlottedSvgElement).toBeTruthy();
        }
    };
    return Suffix;
};

export const DisabledStory = <T extends HTMLElement, U extends BaseArgs>(tagName: string) => {
    const Disabled: ComponentStoryFormat<U> = {
        render: (args: U) => html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" disabled></${tagName}>`)}`,
        name: 'Disabled',
        description: 'Prevent interaction (pointer/input events).',
        args: {
            label: 'Disabled',
            disabled: true
        } as U,
        play: async (context) => {
            const input = within(context.canvasElement).getByTestId<T>('test-field');

            //Disabled class test.
            const disabledAttribute = input.attributes.getNamedItem('disabled');
            await expect(disabledAttribute).toBeTruthy();

            //Input event test.
            const inputTest = jest.fn();
            input.addEventListener('input', inputTest);

            const inputField = input.shadowRoot.getElementById('inputField') as OmniFormElement;

            await userEvent.type(inputField, 'Value Update 3', {
                pointerEventsCheck: 0
            });
            await expect(inputField.value).toBeFalsy();

            await expect(inputTest).toBeCalledTimes(0);
        }
    };
    return Disabled;
};
