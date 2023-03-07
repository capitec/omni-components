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
    ctaLabel: string;
    closeLabel: string;
    inputModeNone: 'hide' | 'show';
    attachMode: 'all' | 'attribute' | 'id';
    'caps-off': string;
    'caps-on': string;
    'caps-on-permanent': string;
    close: string;
    clear: string;
    backspace: string;
    'cta-done': string;
    'cta-go': string;
    'cta-next': string;
    'cta-previous': string;
    'cta-search': string;
    'cta-send': string;
    'cta-enter': string;
}

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`

    <!-- Add the Keyboard once to the DOM -->    
    <omni-keyboard id="keyboard-interactive" 
        attach-mode="${args.attachMode}" 
        clear-label="${args.clearLabel}" 
        space-label="${args.spaceLabel}" 
        cta-label="${args.ctaLabel}" 
        close-label="${args.closeLabel}" 
        input-mode-none="${args.inputModeNone}">${
        args['caps-off'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-off', args['caps-off']))}` : nothing
    }${args['caps-on'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on', args['caps-on']))}` : nothing}${
        args['caps-on-permanent'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on-permanent', args['caps-on-permanent']))}` : nothing
    }${args['close'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('close', args['close']))}` : nothing}${
        args['clear'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args['clear']))}` : nothing
    }${args['backspace'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('backspace', args['backspace']))}` : nothing}${
        args['cta-done'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-done', args['cta-done']))}` : nothing
    }${args['cta-go'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-go', args['cta-go']))}` : nothing}${
        args['cta-next'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-next', args['cta-next']))}` : nothing
    }${args['cta-previous'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-previous', args['cta-previous']))}` : nothing}${
        args['cta-search'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-search', args['cta-search']))}` : nothing
    }${args['cta-send'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-send', args['cta-send']))}` : nothing}${
        args['cta-enter'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-enter', args['cta-enter']))}` : nothing
    }
    </omni-keyboard>
    
    <!-- Examples -->
    ${
        args.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
    
            <omni-label type="subtitle" label="Vanilla Element Types"></omni-label>
            <!-- Vanilla Element Types -->
            <span>text</span>
            <input type="text" tabindex="1" />
            <span>tel</span>
            <input type="tel" tabindex="2" />
            <span>number</span>
            <input type="number" tabindex="3" />
            <span>email</span>
            <input type="email" tabindex="4" />
            <span>password</span>
            <input type="password" tabindex="5" />
            <span>search</span>
            <input type="search" tabindex="6" />
            <span>url</span>
            <input type="url" tabindex="7" />
            <span>textarea</span>
            <textarea tabindex="8"></textarea>
    
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
            </style>
            <span>The Keyboard supports <strong>input</strong> and <strong>textarea</strong> elements as well as custom web components that internally utilise those elements.</span>
        `,
    args: {
        clearLabel: 'Clear',
        ctaLabel: 'Enter',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        inputModeNone: 'hide',
        attachMode: 'all',
        'caps-off': raw`<omni-caps-off-icon style="display: inherit;"></omni-caps-off-icon>`,
        'caps-on': raw`<omni-caps-on-icon style="display: inherit;"></omni-caps-on-icon>`,
        'caps-on-permanent': raw`<omni-caps-on-permanent-icon style="display: inherit;"></omni-caps-on-permanent-icon>`,
        'cta-done': raw`<omni-check-icon style="display: inherit;"></omni-check-icon>`,
        'cta-enter': '',
        'cta-go': raw`<omni-arrow-right-icon style="display: inherit;"></omni-arrow-right-icon>`,
        'cta-next': raw`<omni-next-icon style="display: inherit;"></omni-next-icon>`,
        'cta-previous': raw`<omni-previous-icon style="display: inherit;"></omni-previous-icon>`,
        'cta-search': raw`<omni-search-icon style="display: inherit;"></omni-search-icon>`,
        'cta-send': raw`<omni-send-icon style="display: inherit;"></omni-send-icon>`,
        backspace: raw`<omni-backspace-icon style="display: inherit;"></omni-backspace-icon>`,
        clear: '',
        close: raw`<omni-chevron-down-icon style="display: inherit;"></omni-chevron-down-icon>`
    }
};

export const Input_Modes: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard will react accordingly to the '<strong>inputmode</strong>' attribute on supported inputs.</span>
    <br/>
    <span>When the '<strong>input-mode</strong>' attribute is set to '<strong>none</strong>' on a supported input, the Keyboard will not apply to that input unless '<strong>input-mode-none</strong>' is set to '<strong>show</strong>' on the Keyboard.</span>
    <br/>
    <span>To illustrate this, update the <strong>Interactive</strong> Keyboard to have the '<strong>input-mode-none</strong>' attribute toggled between '<strong>show</strong>' and '<strong>hide</strong>'.</span>
    <omni-switch class="docs-omni-component" label="Show Keyboard when 'inputmode' attribute is set to 'none'." ?checked="${Interactive.args!.inputModeNone === 'show'}" @value-change="${() => {
        Interactive.args!.inputModeNone = Interactive.args!.inputModeNone === 'hide' ? 'show' : 'hide';
        document.dispatchEvent(
            new CustomEvent('story-renderer-interactive-update', {
                bubbles: true,
                composed: true
            })
        );
    }}"></omni-switch>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Input Modes"></omni-label>
            <!-- Vanilla Input Modes -->
            <span>input with type="text" and inputmode="numeric"</span>
            <input type="text" inputmode="numeric" tabindex="9" />
            <span>input with type="text" and inputmode="decimal"</span>
            <input type="text" inputmode="decimal" tabindex="10" />
            <span>input with type="text" and inputmode="tel"</span>
            <input type="text" inputmode="tel" tabindex="11" />
            <span>input with type="text" and inputmode="none" </span>
            <input type="text" inputmode="none" tabindex="12" />
            <span>input with type="number" and inputmode="none"</span>
            <input type="number" inputmode="none" tabindex="13" />
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
    name: 'Input Modes'
};

export const Masked_Values: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard supports masking of the input value on the display preview.</span>
    <span>Masking will apply to the following:
        <ul>
            <li><strong>input</strong> elements with the '<strong>type</strong>' attribute set to '<strong>password</strong>'.</li>
            <li>Any elements with the '<strong>data-omni-keyboard-mask</strong>' attribute .</li>
            <li>Any supported web component with the '<strong>type</strong>' attribute set to '<strong>password</strong>' on their internal <strong>input</strong> elements.</li>
            <li>Any supported web component utilising '<strong>data-omni-keyboard-mask</strong>' on their internal <strong>input</strong> elements.</li>
        </ul>
    </span>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Masked Values"></omni-label>
            <!-- Masked Values -->
            <span>input with type="password"</span>
            <input type="password" tabindex="14" value="Mask This" />
            <span>input with type="text" and data-omni-keyboard-mask attribute</span>
            <input type="text" data-omni-keyboard-mask tabindex="15" value="Mask This" />
            <span>omni-password-field (Utilises type="password" internally)</span>
            <omni-password-field tabindex="16" value="Mask This"></omni-password-field>
            <span>omni-pin-field (Utilises data-omni-keyboard-mask internally)</span>
            <omni-pin-field tabindex="17" value="1234"></omni-pin-field>
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

export const Web_Components: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>The Keyboard supports custom web components that internally utilises <strong>input</strong> or <strong>textarea</strong> elements.</span>
    <br/>
    <span>All Omni Components input fields are fully supported.</span>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">

            <omni-label type="subtitle" label="Omni Component Input Fields"></omni-label>
            <!-- Omni Component Input Fields -->
            <omni-currency-field thousands-separator="," label="Currency Field"  tabindex="18"></omni-currency-field>
            <omni-email-field label="Email Field"  tabindex="19"></omni-email-field>
            <omni-number-field label="Number Field"  tabindex="20"></omni-number-field>
            <omni-password-field label="Password Field" tabindex="21"></omni-password-field>
            <omni-pin-field label="Pin Field" tabindex="22"></omni-pin-field>
            <omni-search-field label="Search Field" tabindex="23"></omni-search-field>
            <omni-text-field label="Text Field" tabindex="24"></omni-text-field>

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
    name: 'Web Components'
};

export const Enter_Key_Hint_Variations: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>enterkeyhint</strong>' attribute is set on a supported input, the Keyboard's call to action button will react to it accordingly.</span>
    <br/>
    <span>The '<strong>enterkeyhint</strong>' attribute is supported as follows:
        <ul>
            <li><strong>enter</strong> (Default) - The '<strong>cta-enter</strong>' slot will apply to the call to action button. If not provided, the value defined with the '<strong>cta-label</strong>' attribute on the keyboard will be displayed on the call to action button.</li>
            <li><strong>go</strong> - The '<strong>cta-go</strong>' slot will apply to the call to action button. If not provided, a right arrow icon <omni-arrow-right-icon class="example-icon-preview"></omni-arrow-right-icon> will be displayed by default.</li>
            <li><strong>done</strong> - The '<strong>cta-done</strong>' slot will apply to the call to action button. If not provided, a checkmark icon <omni-check-icon class="example-icon-preview"></omni-check-icon> will be displayed by default.</li>
            <li><strong>next</strong> - The '<strong>cta-next</strong>' slot will apply to the call to action button. If not provided, an icon of a right arrow within a circle <omni-next-icon class="example-icon-preview"></omni-next-icon> will be displayed by default.</li>
            <li><strong>previous</strong> - The '<strong>cta-previous</strong>' slot will apply to the call to action button. If not provided, an icon of a left arrow within a circle <omni-previous-icon class="example-icon-preview"></omni-previous-icon> will be displayed by default. The Keyboard's default behaviour of focusing the next '<strong>tabIndex</strong>' will also reverse to focus the previous instead.</li>
            <li><strong>search</strong> - The '<strong>cta-search</strong>' slot will apply to the call to action button. If not provided, a magnifying glass icon <omni-search-icon class="example-icon-preview"></omni-search-icon> will be displayed by default.</li>
            <li><strong>send</strong> - The '<strong>cta-send</strong>' slot will apply to the call to action button. If not provided, a paper plane icon <omni-send-icon class="example-icon-preview"></omni-send-icon> will be displayed by default.</li>
        </ul>
    </span>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Enter Key Variations"></omni-label>
            <!-- Enter Key Variations -->
            <span>input with type="text" and enterkeyhint="enter"</span>
            <input type="text" enterkeyhint="enter" tabindex="25" />
            <span>input with type="text" and enterkeyhint="go"</span>
            <input type="text" enterkeyhint="go" tabindex="26" />
            <span>input with type="number" and enterkeyhint="go"</span>
            <input type="number" enterkeyhint="go" tabindex="27" />
            <span>input with type="text" and enterkeyhint="done"</span>
            <input type="text" enterkeyhint="done" tabindex="28" />
            <span>input with type="number" and enterkeyhint="done"</span>
            <input type="number" enterkeyhint="done" tabindex="29" />
            <span>input with type="text" and enterkeyhint="next"</span>
            <input type="text" enterkeyhint="next" tabindex="30" />
            <span>input with type="number" and enterkeyhint="next"</span>
            <input type="number" enterkeyhint="next" tabindex="31" />
            <span>input with type="text" and enterkeyhint="previous"</span>
            <input type="text" enterkeyhint="previous" tabindex="32" />
            <span>input with type="number" and enterkeyhint="previous"</span>
            <input type="number" enterkeyhint="previous" tabindex="33" />
            <span>input with type="text" and enterkeyhint="search"</span>
            <input type="text" enterkeyhint="search" tabindex="34" />
            <span>input with type="number" and enterkeyhint="search"</span>
            <input type="number" enterkeyhint="search" tabindex="35" />
            <span>input with type="text" and enterkeyhint="send"</span>
            <input type="text" enterkeyhint="send" tabindex="36" />
            <span>input with type="number" and enterkeyhint="send"</span>
            <input type="number" enterkeyhint="send" tabindex="37" />
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

export const Hide_Keyboard: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>data-omni-keyboard-hidden</strong>' attribute is set on a supported input, the Keyboard will not apply to that input.</span>
    <br/>
    <span>When the '<strong>input-mode</strong>' attribute is set to '<strong>none</strong>' on a supported input, the Keyboard will not apply to that input unless '<strong>input-mode-none</strong>' is set to '<strong>show</strong>' on the Keyboard.</span>
    <br/>
    <span>To illustrate this, update the <strong>Interactive</strong> Keyboard to have the '<strong>input-mode-none</strong>' attribute toggled between '<strong>show</strong>' and '<strong>hide</strong>'.</span>
    <omni-switch class="docs-omni-component" label="Show Keyboard when 'inputmode' attribute is set to 'none'." ?checked="${Interactive.args!.inputModeNone === 'show'}" @value-change="${() => {
        Interactive.args!.inputModeNone = Interactive.args!.inputModeNone === 'hide' ? 'show' : 'hide';
        document.dispatchEvent(
            new CustomEvent('story-renderer-interactive-update', {
                bubbles: true,
                composed: true
            })
        );
    }}"></omni-switch>
    `,
    render: (args: Args) => html`
        <div class="keyboard-showcase">
            <omni-label type="subtitle" label="Hide Keyboard"></omni-label>
            <!-- Hide Keyboard -->
            <span>input with type="text" and data-omni-keyboard-hidden</span>
            <input data-omni-keyboard-hidden type="text" tabindex="38" />
            <span>input with type="text" and inputmode="none" (See variation when Keyboard input-mode-none="show")</span>
            <input type="text" inputmode="none" tabindex="39" />
            <span>input with type="text", data-omni-keyboard-hidden and inputmode="none" (See variation when Keyboard input-mode-none="show")</span>
            <input data-omni-keyboard-hidden type="text" inputmode="none" tabindex="40" />
        </div>  
  `,
    name: 'Hide Keyboard'
};

export const Hide_Display_Value: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>data-omni-keyboard-no-display</strong>' attribute is set on a supported input, the display preview on the Keyboard header will not be visible.</span>
    `,
    render: (args: Args) =>
        Interactive.args!.attachMode === 'all'
            ? html`
    <div class="keyboard-showcase">
        <omni-label type="subtitle" label="Hide Display Value"></omni-label>
        <!-- Hide Display Value -->
        <span>input with type="text" with a value and no data-omni-keyboard-no-display attribute</span>
        <input  value="Some Value" type="text" tabindex="41" />
        <span>input with type="text" with a value and data-omni-keyboard-no-display attribute</span>
        <input data-omni-keyboard-no-display  value="Some Value" type="text" tabindex="42" />
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

const attachByAttribute = html`
<div class="keyboard-showcase">
    <omni-label type="subtitle" label="Opt In Attach (Test with attach-mode='attribute' on Keyboard)"></omni-label>
    <!-- Opt In Attach -->
    <span>input with type="text" with no data-omni-keyboard-attach attribute</span>
    <input type="text" tabindex="43" />
    <span>input with type="text" with data-omni-keyboard-attach attribute</span>
    <input data-omni-keyboard-attach type="text" tabindex="44" />
</div>
`;
export const Attach_By_Attribute: ComponentStoryFormat<Args> = {
    ...Interactive,
    description: () => html`
    <span>When the '<strong>attach-mode</strong>' attribute is set to '<strong>attribute</strong>' on the Keyboard, then the Keyboard will only react to supported inputs with the '<strong>data-omni-keyboard-attach</strong>' attribute without a value.</span>
    `,
    source: () => getSourceFromLit(attachByAttribute),
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

    <omni-label type="subtitle" label="Opt In Attach for specific Keyboard (Test with attach-mode='id' on the Interactive Keyboard)"></omni-label>
    <!-- Opt In Attach -->
    <span>input with type="text" with no attach opt in attribute</span>
    <input type="text" tabindex="45" />
    <span>input with type="text" and data-omni-keyboard-attach but no specified id</span>
    <input data-omni-keyboard-attach type="text" tabindex="46" />
    <span>input with type="text" and data-omni-keyboard-attach for interactive keyboard id</span>
    <input data-omni-keyboard-attach="keyboard-interactive" type="text" tabindex="47" />

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
    source: () => getSourceFromLit(attachById),
    name: 'Attach By Id'
};

export const Slotted_Content: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`

    <!-- Add the Keyboard with slots to the DOM -->    
    <omni-keyboard id="keyboard-slots" 
        attach-mode="${args.attachMode}" 
        clear-label="${args.clearLabel}" 
        space-label="${args.spaceLabel}" 
        cta-label="${args.ctaLabel}" 
        close-label="${args.closeLabel}" 
        input-mode-none="${args.inputModeNone}">${
        args['caps-off'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-off', args['caps-off']))}` : nothing
    }${args['caps-on'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on', args['caps-on']))}` : nothing}${
        args['caps-on-permanent'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('caps-on-permanent', args['caps-on-permanent']))}` : nothing
    }${args['close'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('close', args['close']))}` : nothing}${
        args['clear'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('clear', args['clear']))}` : nothing
    }${args['backspace'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('backspace', args['backspace']))}` : nothing}${
        args['cta-done'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-done', args['cta-done']))}` : nothing
    }${args['cta-go'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-go', args['cta-go']))}` : nothing}${
        args['cta-next'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-next', args['cta-next']))}` : nothing
    }${args['cta-previous'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-previous', args['cta-previous']))}` : nothing}${
        args['cta-search'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-search', args['cta-search']))}` : nothing
    }${args['cta-send'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-send', args['cta-send']))}` : nothing}${
        args['cta-enter'] ? html`${'\r\n'}${unsafeHTML(assignToSlot('cta-enter', args['cta-enter']))}` : nothing
    }
    </omni-keyboard>


    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Slotted Enter Key Variations"></omni-label>
        <!-- Enter Key Variations -->
        <span>input with type="text" and enterkeyhint="enter"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="enter" tabindex="48" />
        <span>input with type="text" and enterkeyhint="go"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="go" tabindex="49" />
        <span>input with type="number" and enterkeyhint="go"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="go" tabindex="50" />
        <span>input with type="text" and enterkeyhint="done"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="done" tabindex="51" />
        <span>input with type="number" and enterkeyhint="done"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="done" tabindex="52" />
        <span>input with type="text" and enterkeyhint="next"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="next" tabindex="53" />
        <span>input with type="number" and enterkeyhint="next"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="next" tabindex="54" />
        <span>input with type="text" and enterkeyhint="previous"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="previous" tabindex="55" />
        <span>input with type="number" and enterkeyhint="previous"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="previous" tabindex="56" />
        <span>input with type="text" and enterkeyhint="search"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="search" tabindex="57" />
        <span>input with type="number" and enterkeyhint="search"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="search" tabindex="58" />
        <span>input with type="text" and enterkeyhint="send"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="text" enterkeyhint="send" tabindex="59" />
        <span>input with type="number" and enterkeyhint="send"</span>
        <input data-omni-keyboard-attach="keyboard-slots" type="number" enterkeyhint="send" tabindex="60" />

    </div>

  `,
    name: 'Slotted Content',
    args: {
        clearLabel: 'Clear',
        ctaLabel: 'Enter',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        inputModeNone: 'hide',
        attachMode: 'id',
        'caps-off': raw`<span class="center-inline">lower</span>`,
        'caps-on': raw`<span class="center-inline">upper</span>`,
        'caps-on-permanent': raw`<span class="center-inline">UPPER</span>`,
        'cta-done': raw`<span class="center-inline">Done</span>`,
        'cta-enter': raw`<span class="center-inline">↵</span>`,
        'cta-go': raw`<span class="center-inline">Go</span>`,
        'cta-next': raw`<span class="center-inline">→</span>`,
        'cta-previous': raw`<span class="center-inline">←</span>`,
        'cta-search': raw`<span class="center-inline">Search</span>`,
        'cta-send': raw`<span class="center-inline">Send</span>`,
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
                ctaLabel: args.ctaLabel,
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
            <input data-omni-keyboard-attach="keyboard-script-generated"  type="text" tabindex="61" />
        `;
    },
    name: 'Via Script',
    args: {
        attachMode: 'id',
        clearLabel: 'Clear',
        ctaLabel: '↵',
        closeLabel: 'Close',
        spaceLabel: 'Space'
    },
    source: () => raw`
<!-- Add an input that targets the keyboard id created from script -->
<input data-omni-keyboard-attach="keyboard-script-generated"  type="text" tabindex="61" />

<!-- A script that creates a keyboard to its default parent container (document.body) with some custom button labels including a custom backspace via render function -->
<script defer>
    Keyboard.create({
        id: 'keyboard-script-generated',
        attachMode: 'id',
        clearLabel: 'Clear',
        ctaLabel: '↵',
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
};
