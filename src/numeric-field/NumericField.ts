import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js'; 
import { OmniInputElement } from '../core/OmniInputElement.js';

import '../icons/Plus.icon';
import '../icons/Minus.icon';

/**
 * An input control that allows a user to enter a single line of numbers.
 * 
 * ```js
 * 
 * import '@capitec/omni-components/numeric-field';
 * ```
 * @example
 * 
 * ```html
 * <omni-numeric-field
 *   label="Enter a numeric value"
 *   value="12345"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-numeric-field>
 * ``` 
 * 
 * @element omni-numeric-field
 * 
 * @slot increase - Slot for the increase icon.
 * @slot decrease - Slot for the decrease icon.
 * 
 * @cssprop --omni-numeric-input-quantity-right - Numeric input quantity div right. 
 * @cssprop --omni-numeric-input-quantity-top - Numeric input quantity div top. 
 * 
 * @cssprop --omni-numeric-field-plus-line-height - Numeric input stepper plus icon line height.
 * @cssprop --omni-numeric-field-minus-line-height - Numeric input stepper minus icon line height. 
 * 
 * @cssprop --omni-numeric-field-plus-minus-sign-font-size - Numeric input plus and minus sign font size. 
 * @cssprop --omni-numeric-field-plus-minus-sign-height - Numeric input plus and minus sign height. 
 * @cssprop --omni-numeric-field-plus-minus-sign-height - Numeric input plus and minus sign width. 
 * @cssprop --omni-numeric-field-plus-minus-sign-padding-top - Numeric input plus and minus top padding.
 * 
 * @cssprop --omni-numeric-input-plus-minus-focussed-hover - Numeric input plus and minus focussed hover.
 * 
 * @cssprop --omni-numeric-input-plus-minus-focussed-color - Numeric input plus and minus icon focussed color.
 * 
 * @cssprop --omni-numeric-input-divider-height - Numeric input divider height.
 * @cssprop --omni-numeric-input-divider-margin-top - Numeric input divider top margin.
 * @cssprop --omni-numeric-input-divider-width - Numeric input divider width.
 * 
 */
@customElement('omni-numeric-field')
export class NumericField extends OmniInputElement {

    @query('#inputField')
    private _inputElement: HTMLInputElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
    }

    _keyInput() {
        const input = this._inputElement;
        this.value = input.value;
    }
    
    _onAddClick() {
        // Ignore the click event if the item is disabled.
        if (this.disabled) {
            return;
        }
        if (!this.value || this.value === 'NaN' || this.value === '' || this.value === '0') {
            this.value = '1';
        } else {
            this.value = `${parseInt(this.value as string) + 1}`;
        }
    }

    _onMinusClick() {
        // Ignore the click event if the item is disabled.
        if (this.disabled) {
            return;
        }        
        if (!this.value || this.value === 'NaN' || this.value === '' || this.value === '0') {
            this.value = '0';
        } else {
            this.value = `${parseInt(this.value as string) - 1}`;
        } 
    }

    static override get styles() {
        return [
            super.styles,
            css`
            .quantity {
                display: flex;
                height: 100%;
            }


            .plus-icon,
            .minus-icon,
            ::slotted([slot=increase]),
            ::slotted([slot=decrease]) {
                width: 36px;
                cursor: pointer;
            }

            .divider {
                background-color: black;
                width: var(--omni-numeric-input-divider-width, 1px);
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            input[type=number] {
                -moz-appearance:textfield; /* Firefox */
            }
            
            .field {
                flex: 1 1 auto;

                border: none;
                background: none;
                box-shadow: none;
                outline: 0;
                padding: 0;
                margin: 0;

                text-align: var(--omni-numeric-field-text-align, left);

                color: var(--omni-numeric-field-font-color, var(--omni-font-color));
                font-family: var(--omni-numeric-field-font-family, var(--omni-font-family));
                font-size: var(--omni-numeric-field-font-size, var(--omni-font-size));
                font-weight: var(--omni-numeric-field-font-weight, var(--omni-font-weight));
                height: var(--omni-numeric-field-height, 100%);
                padding: var(--omni-numeric-field-padding, 10px);
            }

            .control {
                display: inline-flex;
                flex: 0 0 auto;
                align-items: center;
                cursor: default;
            }
            `
        ];
    }

    protected override renderControl() {
        return html`
        <span class="control">				
            <div class="quantity">
                <div @click="${this._onAddClick}"><slot name="increase"><omni-plus-icon class="plus-icon"></omni-plus-icon></slot></div>
                <div class="divider"></div>
                <div @click="${this._onMinusClick}"><slot name="decrease"><omni-minus-icon class="minus-icon"></omni-minus-icon></slot></div>
            </div>
        </span>
    `;
    }

    protected override renderInput() {
        return html`
        <input
            class="field"
            id="inputField"
            type="number"
            .value=${live(this.value as string)}
            ?readOnly=${this.disabled}
            tabindex="${this.disabled ? -1 : 0}" />
    `;
    }

}