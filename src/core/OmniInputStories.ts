/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable lit/binding-positions */
/* eslint-disable lit/no-invalid-html */
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import { ComponentStoryFormat, getSourceFromLit, raw } from '../utils/StoryUtils.js';

export interface BaseArgs {
    label: string;
    value: string;
    data: object;
    hint: string;
    error: string;
    disabled: boolean;
    clearable: boolean;

    suffix: string;
    prefix: string;
    clear: string;
}

function toPascalCase(text: string) {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
    return text.replace(/-/, '').toUpperCase();
}

function asDirectoryName(omniElementTag: string) {
    return omniElementTag.replace('omni-', '');
}

export const LabelStory = <U extends BaseArgs>(tagName: string) => {
    const Label: ComponentStoryFormat<U> = {
        render: (args: U) => html`${unsafeHTML(`<${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}"></${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}/>;`
            }
        ],
        name: 'Label',
        description: 'Set a text value to display as a label.',
        args: {
            label: 'The Label'
        } as U
    };
    return Label;
};

export const HintStory = <U extends BaseArgs>(tagName: string) => {
    const Hint: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName}  data-testid="test-field" label="${ifNotEmpty(args.label)}" hint="${args.hint}"></${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.hint ? ` hint='${args.hint}'` : ''}/>;`
            }
        ],
        name: 'Hint',
        description: 'Set a text value to display as a hint.',
        args: {
            label: 'Hint',
            hint: 'The Hint label'
        } as U
    };
    return Hint;
};

export const ErrorStory = <U extends BaseArgs>(tagName: string) => {
    const Error: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${args.label}" error="${ifNotEmpty(args.error)}"></${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.error ? ` error='${args.error}'` : ''}/>;`
            }
        ],
        name: 'Error',
        description: 'Set a text value to display as an error.',
        args: {
            label: 'Error',
            error: 'The Error label'
        } as U
    };
    return Error;
};

export const ValueStory = <U extends BaseArgs>(tagName: string, inputValue: string | number | string[] = 'The input value') => {
    const Value: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}"></${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''}/>;`
            }
        ],
        name: 'Value',
        description: 'Set the current value of the component.',
        args: {
            label: 'Value',
            value: inputValue
        } as U
    };
    return Value;
};

export const PrefixStory = <U extends BaseArgs>(tagName: string) => {
    const Prefix: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`
            <!-- Note that styles are applied to the slotted content via the style attribute and the --omni-form-label-margin-left css variable is overridden -->
            <${tagName} data-testid="test-field" style="--omni-form-label-margin-left:40px;" label="${ifNotEmpty(args.label)}">
            ${args.prefix}
            </${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
// Note that styles are applied to the slotted content via the style property and the --omni-form-label-margin-left css variable is overridden
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''} style={{'--omni-form-label-margin-left':'40px'}}>
                    <svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange', marginLeft: '10px'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
                  </${toPascalCase(tagName)}>;`
            }
        ],
        name: 'Prefix',
        description: 'Set html content to display as a prefix within the component.',
        args: {
            label: 'Prefix',
            prefix: raw`<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange; margin-left: 10px;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
        } as U
    };
    return Prefix;
};

export const SuffixStory = <U extends BaseArgs>(tagName: string) => {
    const Suffix: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(`
            <!-- Note that styles are applied to the slotted content via the style attribute -->
            <${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}">
            ${args.suffix}
            </${tagName}>`)}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
// Note that styles are applied to the slotted content via the style property
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}>
                    <svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange', marginRight: '10px'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>
                  </${toPascalCase(tagName)}>;`
            }
        ],
        name: 'Suffix',
        description: 'Set html content to display as a suffix within the component.',
        args: {
            label: 'Suffix',
            suffix: raw`<svg slot="suffix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style="fill: orange; margin-right:10px;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM12 7a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 .743.648L17 12a.75.75 0 0 1-.75.75h-3.5v3.5a.75.75 0 0 1-.648.743L12 17a.75.75 0 0 1-.75-.75v-3.5h-3.5a.75.75 0 0 1-.743-.648L7 12a.75.75 0 0 1 .75-.75h3.5v-3.5a.75.75 0 0 1 .648-.743Z"/></svg>`
        } as U
    };
    return Suffix;
};

export const ClearableStory = <U extends BaseArgs>(tagName: string, inputValue: string | number | string[] = 'The input value') => {
    const Clearable: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(
                `<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}" clearable></${tagName}>`
            )}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''} clearable/>;`
            },
            {
                framework: 'Vue',
                load: (args) =>
                    getSourceFromLit(Clearable!.render!(args), undefined, (s) =>
                        s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                    )
            }
        ],
        name: 'Clearable',
        description: 'Clear the value of the component.',
        args: {
            label: 'Clearable',
            clearable: true,
            value: inputValue
        } as U
    };
    return Clearable;
};

export const CustomClearableSlot = <U extends BaseArgs>(tagName: string, inputValue: string | number | string[] = 'The input value') => {
    const Clearable: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(
                `<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}" clearable>
                ${args.clear}
                </${tagName}>`
            )}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''} clearable>
<svg slot="clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" style={{fill: 'orange'}}><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>
</${toPascalCase(tagName)}>`
            },
            {
                framework: 'Vue',
                load: (args) =>
                    getSourceFromLit(Clearable!.render!(args), undefined, (s) =>
                        s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                    )
            }
        ],
        name: 'Custom Clearable Slot',
        description: 'Component with custom clear slot icon.',
        args: {
            label: 'Custom Clearable Slot',
            clearable: true,
            value: inputValue,
            clear: raw`<svg slot="clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="24px" height="24px" style="fill: orange;"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" /></svg>`
        } as U
    };
    return Clearable;
};

export const DisabledStory = <U extends BaseArgs>(tagName: string, inputValue: string | number | string[] = 'The input value') => {
    const Disabled: ComponentStoryFormat<U> = {
        render: (args: U) =>
            html`${unsafeHTML(
                `<${tagName} data-testid="test-field" label="${ifNotEmpty(args.label)}" value="${args.value}" disabled></${tagName}>`
            )}`,
        frameworkSources: [
            {
                framework: 'React',
                load: (args) => `import { ${toPascalCase(tagName)} } from "@capitec/omni-components-react/${asDirectoryName(tagName)}";
    
const App = () => <${toPascalCase(tagName)}${args.label ? ` label='${args.label}'` : ''}${args.value ? ` value='${args.value}'` : ''} disabled/>;`
            },
            {
                framework: 'Vue',
                load: (args) =>
                    getSourceFromLit(Disabled!.render!(args), undefined, (s) =>
                        s.replace(' disabled', ' :disabled="true"').replace(' clearable', ' :clearable="true"')
                    )
            }
        ],
        name: 'Disabled',
        description: 'Prevent interaction (pointer/input events).',
        args: {
            label: 'Disabled',
            disabled: true,
            value: inputValue
        } as U
    };
    return Disabled;
};
