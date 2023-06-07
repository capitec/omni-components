import { within, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as jest from 'jest-mock';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Label as OmniLabel } from '../label/Label.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { ComponentStoryFormat, CSFIdentifier, raw, getSourceFromLit } from '../utils/StoryUtils.js';
import { CheckableElement, Radio, RadioChangeEventDetail, RadioGroup } from './index.js';

import './Radio.js';
import './RadioGroup.js';
import '../switch';

export default {
    title: 'UI Components/Radio Group',
    component: 'omni-radio-group'
} as CSFIdentifier;

interface Args {
    label: string;
    'allow-deselect': boolean;
    horizontal: boolean;
    '[Default Slot]': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-radio-group data-testid="test-radio-group" label="${ifNotEmpty(args.label)}" ?allow-deselect="${args['allow-deselect']}" ?horizontal="${
        args.horizontal
    }">
      ${unsafeHTML(args['[Default Slot]'])}
    </omni-radio-group>
  `,
    frameworkSources: [
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Interactive!.render!(args), undefined, (s) =>
                    s.replace(' horizontal', ' :horizontal="true"').replace(' allow-deselect', ' :allow-deselect="true"')
                )
        }
    ],
    name: 'Interactive',
    args: {
        label: 'Radio Group',
        'allow-deselect': false,
        horizontal: false,
        '[Default Slot]': raw`<omni-radio label="One" data-testid="test-radio"></omni-radio> 
<omni-radio label="Two" disabled></omni-radio> 
<omni-radio label="Three"></omni-radio>`
    },
    play: async (context) => {
        const radioGroup = within(context.canvasElement).getByTestId<RadioGroup>('test-radio-group');
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        radioGroup.focus();

        const content = radio.shadowRoot?.getElementById('content') as HTMLElement;
        if (radio.checked) {
            await userEvent.click(content, {
                pointerEventsCheck: 0
            });
        }

        const radioChangeCounter = jest.fn();
        let selected: CheckableElement | undefined = undefined;
        const radioChange = (e: CustomEvent<RadioChangeEventDetail>) => {
            selected = e.detail.current;
            radioChangeCounter();
        };
        radioGroup.addEventListener('radio-change', (e: Event) => radioChange(e as CustomEvent<RadioChangeEventDetail>));

        await userEvent.click(content, {
            pointerEventsCheck: 0
        });

        await expect(radioChangeCounter).toBeCalledTimes(1);
        await expect(selected).toBe(radio);

        radioGroup.allowDeselect = true;
        await userEvent.click(content, {
            pointerEventsCheck: 0
        });
        radioGroup.allowDeselect = false;
    }
};

export const Label: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-radio-group data-testid="test-radio-group" label="${args.label}" >
        <omni-radio label="One" ></omni-radio> 
        <omni-radio label="Two" ></omni-radio> 
        <omni-radio label="Three"></omni-radio> 
    </omni-radio-group>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio, OmniRadioGroup } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadioGroup label="${args.label}">
                    <OmniRadio label="One" /> 
                    <OmniRadio label="Two" /> 
                    <OmniRadio label="Three"/> 
                  </OmniRadioGroup>;`
        }
    ],
    description: 'Set a text value to display for the component.',
    args: {
        label: 'Label'
    },
    play: async (context) => {
        const radioGroup = within(context.canvasElement).getByTestId<RadioGroup>('test-radio-group');
        const labelElement = radioGroup.shadowRoot?.querySelector('.label') as OmniLabel;
        await expect(labelElement.label).toBe(context.args?.label as string);
    }
};

export const Horizontal: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-radio-group data-testid="test-radio-group" label="${args.label}" ?horizontal="${args.horizontal}">
        <omni-radio label="One" ></omni-radio> 
        <omni-radio label="Two" ></omni-radio> 
        <omni-radio label="Three"></omni-radio> 
    </omni-radio-group>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio, OmniRadioGroup } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadioGroup label="${args.label}" horizontal>
                    <OmniRadio label="One" /> 
                    <OmniRadio label="Two" /> 
                    <OmniRadio label="Three"/> 
                  </OmniRadioGroup>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Horizontal!.render!(args), undefined, (s) =>
                    s.replace(' horizontal', ' :horizontal="true"').replace(' allow-deselect', ' :allow-deselect="true"')
                )
        }
    ],
    description: 'Arrange radio elements horizontally.',
    args: {
        label: 'Horizontal',
        horizontal: true
    },
    play: async (context) => {
        const radioGroup = within(context.canvasElement).getByTestId<RadioGroup>('test-radio-group');
        const radiosElement = radioGroup.shadowRoot?.querySelector('.radios') as HTMLDivElement;
        await expect(radiosElement).toHaveAttribute('data-horizontal');
    }
};

export const Allow_Deselect: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`
    <omni-radio-group data-testid="test-radio-group" label="${args.label}" ?allow-deselect="${args['allow-deselect']}">
        <omni-radio label="One" ></omni-radio> 
        <omni-radio label="Two" checked  data-testid="test-radio"></omni-radio>  
        <input type="radio" id="native_radio_2" />
        <label for="native_radio_2">Three</label><br>
    </omni-radio-group>`,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio, OmniRadioGroup } from "@capitec/omni-components-react/radio";

const App = () => <OmniRadioGroup label="${args.label}" allow-deselect>
                    <OmniRadio label="One" /> 
                    <OmniRadio label="Two" checked/> 
                    <input type="radio" id="native_radio_2" />
                    <label for="native_radio_2">Three</label><br/>
                  </OmniRadioGroup>;`
        },
        {
            framework: 'Vue',
            load: (args) =>
                getSourceFromLit(Allow_Deselect!.render!(args), undefined, (s) =>
                    s.replace(' horizontal', ' :horizontal="true"').replace(' allow-deselect', ' :allow-deselect="true"')
                )
        }
    ],
    description: 'Allow radios in the group to be deselected.',
    args: {
        label: 'Allow Deselect',
        'allow-deselect': true
    },
    play: async (context) => {
        const radioGroup = within(context.canvasElement).getByTestId<RadioGroup>('test-radio-group');
        const radio = within(context.canvasElement).getByTestId<Radio>('test-radio');
        radioGroup.focus();

        const content = radio.shadowRoot?.getElementById('content') as HTMLElement;
        if (!radio.checked) {
            await userEvent.click(content, {
                pointerEventsCheck: 0
            });
        }

        const radioChangeCounter = jest.fn();
        let selected: CheckableElement | undefined = undefined;
        let previous: CheckableElement | undefined = undefined;
        const radioChange = (e: CustomEvent<RadioChangeEventDetail>) => {
            selected = e.detail.current;
            previous = e.detail.previous;
            radioChangeCounter();
        };
        radioGroup.addEventListener('radio-change', (e: Event) => radioChange(e as CustomEvent<RadioChangeEventDetail>));

        await userEvent.click(content, {
            pointerEventsCheck: 0
        });

        await expect(radioChangeCounter).toBeCalledTimes(1);
        await expect(selected).toBeFalsy();
        await expect(previous).toBe(radio);

        await userEvent.click(content, {
            pointerEventsCheck: 0
        });
    }
};

export const Native_Radio_Input: ComponentStoryFormat<Args> = {
    render: (args: Args) =>
        html` 
            <omni-radio-group label="${args.label}">
                <omni-radio label="One"></omni-radio> 
                <input type="radio" id="native_radio" />
                <label for="native_radio">Two</label><br>
                <omni-switch label="Three"></omni-switch> 
                <omni-radio label="Four"></omni-radio> 
            </omni-radio-group>
        `,
    frameworkSources: [
        {
            framework: 'React',
            load: (args) => `import { OmniRadio, OmniRadioGroup } from "@capitec/omni-components-react/radio";
import { OmniSwitch } from "@capitec/omni-components-react/switch";

const App = () => <OmniRadioGroup label="${args.label}">
                    <OmniRadio label="One" /> 
                    <input type="radio" id="native_radio" />
                    <label for="native_radio">Two</label><br/>
                    <OmniSwitch label="Three"/> 
                    <OmniRadio label="Four"/> 
                  </OmniRadioGroup>;`
        }
    ],
    description:
        'Grouping supports native input with type="radio" as well as omni-radio (and any other element that is driven by a checked attribute).',
    args: {
        label: 'Group with alternate elements'
    },
    play: async (context) => {
        /* Nothing to test */
    }
};
