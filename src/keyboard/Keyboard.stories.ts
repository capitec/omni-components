import { waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUIValueClean } from '@testing-library/user-event/dist/esm/document/UI.js';
import * as jest from 'jest-mock';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifNotEmpty } from '../utils/Directives.js';
import expect from '../utils/ExpectDOM.js';
import { assignToSlot, ComponentStoryFormat, CSFIdentifier } from '../utils/StoryUtils.js';
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
    attachMode: 'all' | 'attribute';
} 

export const Interactive: ComponentStoryFormat<Args> = {
    render: (args: Args) => html`

    <!-- Add the Keyboard once to the DOM -->    
    <omni-keyboard attach-mode="${args.attachMode}" clear-label="${args.clearLabel}" space-label="${args.spaceLabel}" cta-label="${args.ctaLabel}" close-label="${args.closeLabel}" input-mode-none="${args.inputModeNone}"></omni-keyboard>



    <!-- See below examples for global attribute usage and supported components -->
    <style>
        .keyboard-showcase {            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
        }

        .keyboard-showcase > * {
            margin: 10px;
        }
    </style>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Vanilla Element Types"></omni-label>
        <!-- Vanilla Element Types -->
        text
        <input type="text" tabindex="1" />
        tel
        <input type="tel" tabindex="2" />
        number
        <input type="number" tabindex="3" />
        email
        <input type="email" tabindex="4" />
        password
        <input type="password" tabindex="5" />
        search
        <input type="search" tabindex="6" />
        url
        <input type="url" tabindex="7" />
        textarea
        <textarea tabindex="8"></textarea>

    </div>
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Vanilla Input Modes"></omni-label>
        <!-- Vanilla Input Modes -->
        input with type="text" and inputmode="numeric"
        <input type="text" inputmode="numeric" tabindex="9" />
        input with type="text" and inputmode="decimal"
        <input type="text" inputmode="decimal" tabindex="10" />
        input with type="text" and inputmode="tel"
        <input type="text" inputmode="tel" tabindex="11" />
        input with type="text" and inputmode="none"
        <input type="text" inputmode="none" tabindex="12" />
        input with type="number" and inputmode="none"
        <input type="number" inputmode="none" tabindex="13" />

    </div>
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Masked Input"></omni-label>
        <!-- Masked Input -->
        input with type="password"
        <input type="password" tabindex="14" />
        input with type="text" and data-omni-keyboard-mask attribute
        <input type="text" data-omni-keyboard-mask tabindex="15" />
        omni-password-field
        <omni-password-field tabindex="16"></omni-password-field>
        omni-pin-field
        <omni-pin-field tabindex="17"></omni-pin-field>

    </div>
    <br/>
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
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Enter Key Variations"></omni-label>
        <!-- Enter Key Variations -->
        input with type="text" and enterkeyhint="enter"
        <input type="text" enterkeyhint="enter" tabindex="25" />
        input with type="text" and enterkeyhint="go"
        <input type="text" enterkeyhint="go" tabindex="26" />
        input with type="number" and enterkeyhint="go"
        <input type="number" enterkeyhint="go" tabindex="27" />
        input with type="text" and enterkeyhint="done"
        <input type="text" enterkeyhint="done" tabindex="28" />
        input with type="number" and enterkeyhint="done"
        <input type="number" enterkeyhint="done" tabindex="29" />
        input with type="text" and enterkeyhint="next"
        <input type="text" enterkeyhint="next" tabindex="30" />
        input with type="number" and enterkeyhint="next"
        <input type="number" enterkeyhint="next" tabindex="31" />
        input with type="text" and enterkeyhint="previous"
        <input type="text" enterkeyhint="previous" tabindex="32" />
        input with type="number" and enterkeyhint="previous"
        <input type="number" enterkeyhint="previous" tabindex="33" />
        input with type="text" and enterkeyhint="search"
        <input type="text" enterkeyhint="search" tabindex="34" />
        input with type="number" and enterkeyhint="search"
        <input type="number" enterkeyhint="search" tabindex="35" />

    </div>
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Hide Keyboard"></omni-label>
        <!-- Hide Keyboard -->
        input with type="text" and data-omni-keyboard-hidden
        <input data-omni-keyboard-hidden type="text" tabindex="36" />
        input with type="text", data-omni-keyboard-hidden and inputmode="none" (See variation when Keyboard input-mode-none="show")
        <input data-omni-keyboard-hidden type="text" inputmode="none" tabindex="37" />
        Omni Example with data-omni-keyboard-hidden
        <omni-text-field data-omni-keyboard-hidden label="Text Field" tabindex="38" ></omni-text-field>

    </div>
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Hide Display Value"></omni-label>
        <!-- Hide Display Value -->
        input with type="text" and data-omni-keyboard-no-display
        <input data-omni-keyboard-no-display type="text" tabindex="39" />
        Omni Example with data-omni-keyboard-no-display
        <omni-text-field data-omni-keyboard-no-display label="Text Field" tabindex="40" ></omni-text-field>

    </div>
    <br/>
    <div class="keyboard-showcase">

        <omni-label type="subtitle" label="Opt In Attach (Test with attach-mode='attribute' on Keyboard)"></omni-label>
        <!-- Opt In Attach -->
        input with type="text" and data-omni-keyboard-attach
        <input data-omni-keyboard-attach type="text" tabindex="41" />
        Omni Example with data-omni-keyboard-attach
        <omni-text-field data-omni-keyboard-attach label="Text Field" tabindex="42" ></omni-text-field>

    </div>

  `,
    name: 'Interactive',
    description: () => html`
            <style>
                .desc-line-item {                    
                    display: inline-flex;
                    flex-direction: row;
                    align-items: center;
                }
            </style>
            <span>Vanilla HTML text input elements and custom components utilising them are supported by the Keyboard.</span> 
            <br/>
            <span>Also note the supported global attributes on supported components as follows:</span>
            <ul>
                <li><span class="desc-line-item"><strong>tabindex</strong><omni-label label=": Focus relevant tabindex when closing the Keyboard with the call to action button ('Enter' by default)."></omni-label></span></li>
                <li><span class="desc-line-item"><strong>inputmode="none"</strong><omni-label label=": Disables the Keyboard for that component unless input-mode-none='show' on the Keyboard."></omni-label></span></li>
                <li><span class="desc-line-item"><strong>data-omni-keyboard-hidden</strong><omni-label label=": Disables the Keyboard for that component unless input-mode-none='show' on the Keyboard."></omni-label></span></li>
                <li><span class="desc-line-item"><strong>data-omni-keyboard-mask</strong><omni-label label=": Indicates that the display label on the Keyboard may only display a masked value."></omni-label></span></li>
                <li><span class="desc-line-item"><strong>data-omni-keyboard-multi-line</strong><omni-label label=": Indicates that call to action button ('Enter') should insert a new line instead of closing the Keyboard. This is the default behaviour for &lt;textarea&gt;."></omni-label></span></li>
            </ul>
        `,
    args: {
        clearLabel: 'Clear',
        ctaLabel: 'Enter',
        closeLabel: 'Close',
        spaceLabel: 'Space',
        inputModeNone: 'hide',
        attachMode: 'all'
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    play: async (context) => {}
};
