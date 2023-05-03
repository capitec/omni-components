/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier, raw, getSourceFromLit } from '../utils/StoryUtils.js';
import { Keyboard } from './Keyboard.js';

import './Keyboard.js';
import '../currency-field';
import '../email-field';
import '../number-field';
import '../password-field';
import '../pin-field';
import '../search-field';
import '../text-field';
import '../label';
import '../button';
import '../switch';

export default {
    title: 'UI Components/Keyboard',
    component: 'omni-keyboard'
} as CSFIdentifier;

interface Args {
    clearLabel: string;
    spaceLabel: string;
    actionLabel: string;
    closeLabel: string;
    attachMode: 'all' | 'attribute' | 'id';
    'caps-off': string;
    'caps-on': string;
    'caps-lock': string;
    close: string;
    clear: string;
    backspace: string;
    'action-done': string;
    'action-go': string;
    'action-next': string;
    'action-previous': string;
    'action-search': string;
    'action-send': string;
    'action-enter': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`

    <!-- Add the Keyboard once to the DOM -->    
    <omni-keyboard id="keyboard-interactive" 
        attach-mode="${args.attachMode}" 
        clear-label="${args.clearLabel}" 
        space-label="${args.spaceLabel}" 
        action-label="${args.actionLabel}" 
        close-label="${args.closeLabel}" >${args['caps-off'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-off', args['caps-off']))}` : nothing}${
        args['caps-on'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on', args['caps-on']))}` : nothing
    }${args['caps-lock'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-lock', args['caps-lock']))}` : nothing}${
        args['close'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('close', args['close']))}` : nothing
    }${args['clear'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args['clear']))}` : nothing}${
        args['backspace'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('backspace', args['backspace']))}` : nothing
    }${args['action-done'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-done', args['action-done']))}` : nothing}${
        args['action-go'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-go', args['action-go']))}` : nothing
    }${args['action-next'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-next', args['action-next']))}` : nothing}${
        args['action-previous'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-previous', args['action-previous']))}` : nothing
    }${args['action-search'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-search', args['action-search']))}` : nothing}${
        args['action-send'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-send', args['action-send']))}` : nothing
    }${args['action-enter'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-enter', args['action-enter']))}` : nothing}
    </omni-keyboard>
    
    <!-- Examples -->
    ${
        args.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-text-field label="Text Field" tabindex="1"></omni-text-field>  
            <omni-currency-field thousands-separator="," label="Currency Field"  tabindex="2"></omni-currency-field>
            <omni-number-field label="Number Field"  tabindex="3"></omni-number-field>
            <omni-password-field label="Password Field" tabindex="4"></omni-password-field>
            <omni-pin-field label="Pin Field" tabindex="5"></omni-pin-field>
            <omni-search-field label="Search Field" tabindex="6"></omni-search-field>
            <omni-email-field label="Email Field"  tabindex="7"></omni-email-field>
        </div>
        `
            : html`<span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>`
    }
     
  `,
    name: 'Interactive',
    description: () => html`
            <style>
                .desc-line-item {                    
                    display: inline-flex;
                    flex-direction: row;
                    align-items: center;
                }

                .desc-line-item > strong {
                    white-space: nowrap;
                }
                
                .keyboard-showcase {            
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                }

                .keyboard-showcase > * {
                    margin: 10px;
                }

                .center-inline {
                    height: 100%;
                    display: inline-flex;
                    align-items: center;
                }

                .example-icon-preview {
                    flex-direction: row !important;
                    width: 20px;
                    height: 20px;
                    display: inline-flex !important;
                    color: var(--omni-theme-primary-color);
                    fill: currentColor;
                }

                .experimental-warning {
                    font-size: 1.4em;
                    font-weight: 600;
                    color: white;
                    background: orangered;
                    border: 2px solid orangered;
                    border-radius: 14px;
                    padding: 6px;
                }
            </style>
            <h1 class="experimental-warning">The Keyboard is an experimental component and subject to breaking changes!</h1>
            <br/>
            <br/>
            <span>The Keyboard supports <strong>input</strong> and <strong>textarea</strong> elements as well as custom web components that internally utilise <strong>input</strong> or <strong>textarea</strong> elements.</span>
            <br/>
            <span>All Omni Components input fields are fully supported.</span>
        `,
    args: {
        clearLabel: 'Clear',
        actionLabel: 'Enter',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        attachMode: 'all',
        'caps-off': raw`<omni-caps-off-icon style="display: inherit;"></omni-caps-off-icon>`,
        'caps-on': raw`<omni-caps-on-icon style="display: inherit;"></omni-caps-on-icon>`,
        'caps-lock': raw`<omni-caps-lock-icon style="display: inherit;"></omni-caps-lock-icon>`,
        'action-done': raw`<omni-check-icon style="display: inherit;"></omni-check-icon>`,
        'action-enter': '',
        'action-go': raw`<omni-arrow-right-icon style="display: inherit;"></omni-arrow-right-icon>`,
        'action-next': raw`<omni-next-icon style="display: inherit;"></omni-next-icon>`,
        'action-previous': raw`<omni-previous-icon style="display: inherit;"></omni-previous-icon>`,
        'action-search': raw`<omni-search-icon style="display: inherit;"></omni-search-icon>`,
        'action-send': raw`<omni-send-icon style="display: inherit;"></omni-send-icon>`,
        backspace: raw`<omni-backspace-icon style="display: inherit;"></omni-backspace-icon>`,
        clear: '',
        close: raw`<omni-chevron-down-icon style="display: inherit;"></omni-chevron-down-icon>`
    }
};

const attachByAttribute = html`
<div class="keyboard-showcase">
    <omni-label type="subtitle" label="Opt In Attach (With attach-mode='attribute' on the Keyboard)"></omni-label>
    <!-- Opt In Attach -->
    <span>No data-omni-keyboard-attach attribute means the input field is not opted in for the Keyboard.</span>
    <omni-text-field label="Not Opted In" tabindex="7"></omni-text-field> 
    <span>Adding the data-omni-keyboard-attach attribute means the input field is opted in for the Keyboard.</span>
    <omni-text-field data-omni-keyboard-attach label="Opted In" tabindex="8"></omni-text-field> 
</div>
`;
export const Attach_By_Attribute: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>attach-mode</strong>' attribute is set to '<strong>attribute</strong>' on the Keyboard, then the Keyboard will only react to supported inputs with the '<strong>data-omni-keyboard-attach</strong>' attribute without a value.</span>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'attribute'
            ? attachByAttribute
            : html`
        <div class="keyboard-showcase">
            <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>attribute</strong>'.</span>
            <omni-button @click="${() => {
                Interactive.args!.attachMode = 'attribute';
                document.dispatchEvent(
                    new CustomEvent('story-renderer-interactive-update', {
                        bubbles: true,
                        composed: true
                    })
                );
            }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>attribute</strong></span></omni-button>
        </div>
        `,
    name: 'Attach By Attribute'
};

const attachById = html`
<div class="keyboard-showcase">

    <omni-label type="subtitle" label="Opt In Attach for specific Keyboard (With attach-mode='id' on the Keyboard)"></omni-label>
    <!-- Opt In Attach -->
    <span>No data-omni-keyboard-attach attribute means the input field is not opted in for the Keyboard.</span>
    <omni-text-field label="Not Opted In" tabindex="9"></omni-text-field> 
    <span>Adding the data-omni-keyboard-attach attribute but no specified id means the input field is not opted in for that specific Keyboard.</span>
    <omni-text-field data-omni-keyboard-attach label="Not Opted In" tabindex="10"></omni-text-field> 
    <span>Adding the data-omni-keyboard-attach for the interactive keyboard id means the input field is opted in for that specific Keyboard.</span>
    <omni-text-field data-omni-keyboard-attach="keyboard-interactive" label="Text Field" tabindex="11"></omni-text-field> 

</div>
`;
export const Attach_By_Id: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>attach-mode</strong>' attribute is set to '<strong>id</strong>' on the Keyboard, then the Keyboard will only react to supported inputs with the '<strong>data-omni-keyboard-attach</strong>' attribute set equal to the Keyboard id.</span>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'id'
            ? attachById
            : html`
    <div class="keyboard-showcase">
    <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>id</strong>'.</span>
        <omni-button @click="${() => {
            Interactive.args!.attachMode = 'id';
            document.dispatchEvent(
                new CustomEvent('story-renderer-interactive-update', {
                    bubbles: true,
                    composed: true
                })
            );
        }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>id</strong></span></omni-button>
    </div>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    name: 'Attach By Id'
};

export const Enter_Key_Hint_Variations: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>enterkeyhint</strong>' attribute is set on a supported input, the Keyboard's call to action button will react to it accordingly.</span>
    <br/>
    <span>The '<strong>enterkeyhint</strong>' attribute is supported as follows:
        <ul>
            <li><strong>enter</strong> (Default) - The '<strong>action-enter</strong>' slot will apply to the call to action button. If not provided, the value defined with the '<strong>action-label</strong>' attribute on the keyboard will be displayed on the call to action button.</li>
            <li><strong>go</strong> - The '<strong>action-go</strong>' slot will apply to the call to action button. If not provided, a right arrow icon <omni-arrow-right-icon class="example-icon-preview"></omni-arrow-right-icon> will be displayed by default.</li>
            <li><strong>done</strong> - The '<strong>action-done</strong>' slot will apply to the call to action button. If not provided, a checkmark icon <omni-check-icon class="example-icon-preview"></omni-check-icon> will be displayed by default.</li>
            <li><strong>next</strong> - The '<strong>action-next</strong>' slot will apply to the call to action button. If not provided, an icon of a right arrow within a circle <omni-next-icon class="example-icon-preview"></omni-next-icon> will be displayed by default.</li>
            <li><strong>previous</strong> - The '<strong>action-previous</strong>' slot will apply to the call to action button. If not provided, an icon of a left arrow within a circle <omni-previous-icon class="example-icon-preview"></omni-previous-icon> will be displayed by default. The Keyboard's default behaviour of focusing the next '<strong>tabIndex</strong>' will also reverse to focus the previous instead.</li>
            <li><strong>search</strong> - The '<strong>action-search</strong>' slot will apply to the call to action button. If not provided, a magnifying glass icon <omni-search-icon class="example-icon-preview"></omni-search-icon> will be displayed by default.</li>
            <li><strong>send</strong> - The '<strong>action-send</strong>' slot will apply to the call to action button. If not provided, a paper plane icon <omni-send-icon class="example-icon-preview"></omni-send-icon> will be displayed by default.</li>
        </ul>
    </span>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Enter Key Variations"></omni-label>
            <!-- Enter Key Variations -->
            <span>Text input with enterkeyhint="enter"</span>
            <omni-text-field enterkeyhint="enter" label="Enter" tabindex="12"></omni-text-field> 
            <span>Number input with enterkeyhint="enter"</span>
            <omni-number-field enterkeyhint="enter" label="Enter" tabindex="13"></omni-number-field> 
            <span>Text input with enterkeyhint="go"</span>
            <omni-text-field enterkeyhint="go" label="Go" tabindex="14"></omni-text-field> 
            <span>Number input with enterkeyhint="go"</span>
            <omni-number-field enterkeyhint="go" label="Go" tabindex="15"></omni-number-field> 
            <span>Text input with enterkeyhint="done"</span>
            <omni-text-field enterkeyhint="done" label="Done" tabindex="16"></omni-text-field> 
            <span>Number input with enterkeyhint="done"</span>
            <omni-number-field enterkeyhint="done" label="Done" tabindex="17"></omni-number-field> 
            <span>Text input with enterkeyhint="next"</span>
            <omni-text-field enterkeyhint="next" label="Next" tabindex="18"></omni-text-field> 
            <span>Number input with enterkeyhint="next"</span>
            <omni-number-field enterkeyhint="next" label="Next" tabindex="19"></omni-number-field>
            <span>Text input with enterkeyhint="previous"</span>
            <omni-text-field enterkeyhint="previous" label="Previous" tabindex="20"></omni-text-field> 
            <span>Number input with enterkeyhint="previous"</span>
            <omni-number-field enterkeyhint="previous" label="Previous" tabindex="21"></omni-number-field>
            <span>Text input with enterkeyhint="search"</span>
            <omni-text-field enterkeyhint="search" label="Search" tabindex="22"></omni-text-field> 
            <span>Number input with enterkeyhint="search"</span>
            <omni-number-field enterkeyhint="search" label="Search" tabindex="23"></omni-number-field> 
            <span>Text input with enterkeyhint="send"</span>
            <omni-text-field enterkeyhint="send" label="Send" tabindex="24"></omni-text-field> 
            <span>Number input with enterkeyhint="send"</span>
            <omni-number-field enterkeyhint="send" label="Send" tabindex="25"></omni-number-field> 
        </div>
  `
            : html`
            <div class="keyboard-showcase">
                <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>
                <omni-button @click="${() => {
                    Interactive.args!.attachMode = 'all';
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>all</strong></span></omni-button>
            </div>`,
    name: 'Enter Key Hint Variations'
};

export const Masked_Values: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard supports masking of the input value on the display preview.</span>
    <span>Masking will apply to the following:
        <ul>
            <li>Any elements with the '<strong>data-omni-keyboard-mask</strong>' attribute .</li>
            <li>Any supported web component with the '<strong>type</strong>' attribute set to '<strong>password</strong>' on their internal <strong>input</strong> elements.</li>
            <li>Any supported web component utilising '<strong>data-omni-keyboard-mask</strong>' on their internal <strong>input</strong> elements.</li>
        </ul>
    </span>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Masked Values"></omni-label>
            <!-- Masked Values -->
            <span>Text input with data-omni-keyboard-mask attribute</span>
            <omni-text-field data-omni-keyboard-mask label="Masked on Keyboard" value="Only visible in field" tabindex="26"></omni-text-field> 
            <span>Password input (Utilises type="password" internally)</span>
            <omni-password-field tabindex="27" value="Mask This"></omni-password-field>
            <span>Pin input (Utilises data-omni-keyboard-mask internally)</span>
            <omni-pin-field tabindex="28" value="1234"></omni-pin-field>
        </div>
  `
            : html`
            <div class="keyboard-showcase">
                <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>
                <omni-button @click="${() => {
                    Interactive.args!.attachMode = 'all';
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>all</strong></span></omni-button>
            </div>`,
    name: 'Masked Values'
};

export const Hide_Display_Value: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>data-omni-keyboard-no-display</strong>' attribute is set on a supported input, the display preview on the Keyboard header will not be visible.</span>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
    <div class="keyboard-showcase">
        <omni-label type="subtitle" label="Hide Display Value"></omni-label>
        <!-- Hide Display Value -->
        <span>Input field with a value and no data-omni-keyboard-no-display attribute</span>
        <omni-text-field label="Display not hidden" value="Visible on Keyboard" tabindex="29"></omni-text-field> 
        <span>Input field with a value and data-omni-keyboard-no-display attribute</span>
        <omni-text-field data-omni-keyboard-no-display value="Not visible on Keyboard" label="Display hidden" tabindex="30"></omni-text-field> 
    </div>  
  `
            : html`
            <div class="keyboard-showcase">
                <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>
                <omni-button @click="${() => {
                    Interactive.args!.attachMode = 'all';
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>all</strong></span></omni-button>
            </div>`,
    name: 'Hide Display Value'
};

export const Hide_Keyboard: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>data-omni-keyboard-hidden</strong>' attribute is set on a supported input, the Keyboard will not apply to that input.</span>
    
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) => html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Hide Keyboard"></omni-label>
            <!-- Hide Keyboard -->
            <span>Input field without data-omni-keyboard-hidden</span>
            <omni-text-field label="With Keyboard" tabindex="31"></omni-text-field>
            <span>Input field with data-omni-keyboard-hidden</span>
            <omni-text-field data-omni-keyboard-hidden label="No Keyboard" tabindex="32"></omni-text-field>
        </div>  
  `,
    name: 'Hide Keyboard'
};

export const Alternate_Modes: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard will react accordingly to the '<strong>data-omni-keyboard-mode</strong>' attribute on supported target elements.</span>
        
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Alternate Keyboard Modes"></omni-label>
            <!-- Alternate Keyboard Modes on Omni Components input fields -->
            <span>Search field with data-omni-keyboard-mode="numeric"</span>
            <omni-search-field label="Search Field" data-omni-keyboard-mode="numeric" no-native-keyboard tabindex="33"></omni-search-field>
            <span>Text field with data-omni-keyboard-mode="tel"</span>
            <omni-text-field label="Text Field" data-omni-keyboard-mode="tel" no-native-keyboard tabindex="34"></omni-text-field>
        </div>
  `
            : html`
            <div class="keyboard-showcase">
                <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>
                <omni-button @click="${() => {
                    Interactive.args!.attachMode = 'all';
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>all</strong></span></omni-button>
            </div>`,
    name: 'Alternate Modes'
};

export const Slotted_Content: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`

    <!-- Add the Keyboard with slots to the DOM -->    
    <omni-keyboard id="keyboard-slots" 
        attach-mode="${args.attachMode}" 
        clear-label="${args.clearLabel}" 
        space-label="${args.spaceLabel}" 
        action-label="${args.actionLabel}" 
        close-label="${args.closeLabel}" >${args['caps-off'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-off', args['caps-off']))}` : nothing}${
        args['caps-on'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on', args['caps-on']))}` : nothing
    }${args['caps-lock'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-lock', args['caps-lock']))}` : nothing}${
        args['close'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('close', args['close']))}` : nothing
    }${args['clear'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args['clear']))}` : nothing}${
        args['backspace'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('backspace', args['backspace']))}` : nothing
    }${args['action-done'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-done', args['action-done']))}` : nothing}${
        args['action-go'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-go', args['action-go']))}` : nothing
    }${args['action-next'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-next', args['action-next']))}` : nothing}${
        args['action-previous'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-previous', args['action-previous']))}` : nothing
    }${args['action-search'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-search', args['action-search']))}` : nothing}${
        args['action-send'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-send', args['action-send']))}` : nothing
    }${args['action-enter'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('action-enter', args['action-enter']))}` : nothing}
    </omni-keyboard>


    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Slotted Enter Key Variations"></omni-label>
        <!-- Enter Key Variations -->
        <span>Text input with enterkeyhint="enter"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="enter" label="Enter" tabindex="35"></omni-text-field> 
        <span>Number input with enterkeyhint="enter"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="enter" label="Enter" tabindex="36"></omni-number-field> 
        <span>Text input with enterkeyhint="go"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="go" label="Go" tabindex="37"></omni-text-field> 
        <span>Number input with enterkeyhint="go"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="go" label="Go" tabindex="38"></omni-number-field> 
        <span>Text input with enterkeyhint="done"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="done" label="Done" tabindex="39"></omni-text-field> 
        <span>Number input with enterkeyhint="done"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="done" label="Done" tabindex="40"></omni-number-field> 
        <span>Text input with enterkeyhint="next"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="next" label="Next" tabindex="41"></omni-text-field> 
        <span>Number input with enterkeyhint="next"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="next" label="Next" tabindex="42"></omni-number-field>
        <span>Text input with enterkeyhint="previous"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="previous" label="Previous" tabindex="43"></omni-text-field> 
        <span>Number input with enterkeyhint="previous"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="previous" label="Previous" tabindex="44"></omni-number-field>
        <span>Text input with enterkeyhint="search"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="search" label="Search" tabindex="45"></omni-text-field> 
        <span>Number input with enterkeyhint="search"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="search" label="Search" tabindex="46"></omni-number-field> 
        <span>Text input with enterkeyhint="send"</span>
        <omni-text-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="send" label="Send" tabindex="47"></omni-text-field> 
        <span>Number input with enterkeyhint="send"</span>
        <omni-number-field data-omni-keyboard-attach="keyboard-slots" enterkeyhint="send" label="Send" tabindex="48"></omni-number-field> 

    </div>

  `,
    name: 'Slotted Content',
    args: {
        clearLabel: 'Clear',
        actionLabel: 'Enter',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        attachMode: 'id',
        'caps-off': raw`<span class="center-inline">lower</span>`,
        'caps-on': raw`<span class="center-inline">upper</span>`,
        'caps-lock': raw`<span class="center-inline">UPPER</span>`,
        'action-done': raw`<span class="center-inline">Done</span>`,
        'action-enter': raw`<span class="center-inline">↵</span>`,
        'action-go': raw`<span class="center-inline">Go</span>`,
        'action-next': raw`<span class="center-inline">→</span>`,
        'action-previous': raw`<span class="center-inline">←</span>`,
        'action-search': raw`<span class="center-inline">Search</span>`,
        'action-send': raw`<span class="center-inline">Send</span>`,
        backspace: raw`<span class="center-inline">⌫</span>`,
        clear: raw`<span class="center-inline">(X)</span>`,
        close: raw`<span class="center-inline">^</span>`
    }
};

export const Via_Script: ComponentStoryFormat<Args> = {
    render: (args: Args) => {
        const id = 'keyboard-script-generated';
        if (!document.getElementById(id)) {
            Keyboard.create({
                id: id,
                attachMode: args.attachMode,
                clearLabel: args.clearLabel,
                actionLabel: args.actionLabel,
                closeLabel: args.closeLabel,
                spaceLabel: args.spaceLabel,
                backspace: () => {
                    const elm = document.createElement('span');
                    elm.textContent = '⌫';
                    elm.style.height = '100%';
                    elm.style.display = 'inline-flex';
                    elm.style.alignItems = 'center';
                    let color = elm.style.color;
                    elm.addEventListener('mouseenter', () => {
                        color = elm.style.color;
                        elm.style.color = 'lightgreen';
                    });
                    elm.addEventListener('mouseleave', () => {
                        elm.style.color = color;
                    });

                    return elm;
                }
            });
        }
        return html`
            <div class="keyboard-showcase">
                <span>Input field utilising Keyboard generated from script</span>
                <omni-text-field data-omni-keyboard-attach="keyboard-script-generated" label="Keyboard from script" tabindex="49"></omni-text-field> 
            </div> 
        `;
    },
    name: 'Via Script',
    args: {
        attachMode: 'id',
        clearLabel: 'Clear',
        actionLabel: '↵',
        closeLabel: 'Close',
        spaceLabel: 'Space'
    },
    frameworkSources: [
        {
            framework: 'HTML',
            disableCodePen: true,
            load: () => raw`
<!-- Add an input that targets the keyboard id created from script -->
<omni-text-field data-omni-keyboard-attach="keyboard-script-generated" label="Keyboard from script" tabindex="49"></omni-text-field> 

<!-- A script that creates a keyboard to its default parent container (document.body) with some custom button labels including a custom backspace via render function -->
<script defer>
    Keyboard.create({
        id: 'keyboard-script-generated',
        attachMode: 'id',
        clearLabel: 'Clear',
        actionLabel: '↵',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        backspace: () => {
            const elm = document.createElement('span');
            elm.textContent = '⌫';
            elm.style.height = '100%';
            elm.style.display = 'inline-flex';
            elm.style.alignItems = 'center';
            let color = elm.style.color;
            elm.addEventListener('mouseenter', () => {
                color = elm.style.color;
                elm.style.color = 'lightgreen';
            })
            elm.addEventListener('mouseleave', () => {
                elm.style.color = color;
            })

            return elm;
        }
    });
</script>
    `
        }
    ]
};

export const Vanilla_Inputs: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard supports vanilla native HTML <strong>input</strong> and <strong>textarea</strong> elements.</span>
    `,
    frameworkSources: [{ framework: 'HTML', load: () => getSourceFromLit(attachByAttribute), disableCodePen: true }],
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Vanilla Element Types"></omni-label>
            <!-- Vanilla Element Types -->
            <span>text</span>
            <input type="text" tabindex="50" />
            <span>tel</span>
            <input type="tel" tabindex="51" />
            <span>number</span>
            <input type="number" tabindex="52" />
            <span>email</span>
            <input type="email" tabindex="53" />
            <span>password</span>
            <input type="password" tabindex="54" />
            <span>search</span>
            <input type="search" tabindex="55" />
            <span>url</span>
            <input type="url" tabindex="56" />
            <span>textarea</span>
            <textarea tabindex="57"></textarea>
        </div>
  `
            : html`
            <div class="keyboard-showcase">
                <span>To illustrate this, update the <strong>Interactive</strong> Keyboard properties to have '<strong>attach-mode</strong>' attribute set to '<strong>all</strong>'.</span>
                <omni-button @click="${() => {
                    Interactive.args!.attachMode = 'all';
                    document.dispatchEvent(
                        new CustomEvent('story-renderer-interactive-update', {
                            bubbles: true,
                            composed: true
                        })
                    );
                }}" class="docs-omni-component"><span>Update <strong>attach-mode</strong> to <strong>all</strong></span></omni-button>
            </div>`,
    name: 'Vanilla Inputs'
};
