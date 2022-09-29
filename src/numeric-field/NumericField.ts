import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InputBase } from '../internal/InputBase';

/**
 * An input control that allows a user to enter a single line of numbers.
 * 
 * ```js
 * import '@capitec/omni-components/numeric-field';
 * ```
 * @example
 * 
 * ```html
 * <omni-numeric-field
 *   label="Enter a value"
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
export class NumericField extends InputBase {

    constructor() {
        super();
        super.type = 'number';
    }

    
	_onAddClick() {
		// Ignore the click event if the item is disabled.
		if (this.disabled) {
			return;
		}
        if (!this.value || this.value === 'NaN' || this.value === '' || this.value === '0') {
			this.value = '1';
        } else {
            this.value = `${parseInt(this.value) + 1}`;
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
            this.value = `${parseInt(this.value) - 1}`;
        } 
	}

    static override get styles() {
        return [
            super.styles,
            css`
            .quantity {
                display: flex;
                height: 100%;
                cursor: pointer;
            }

            .sign {
                font-size: var(--omni-numeric-field-plus-minus-sign-font-size, 22px);
                width: var(--omni-numeric-field-plus-minus-sign-width, 48px);
                display: flex;
                justify-content: center;
                align-items: center;
                /*text-align: center;*/
            }

            .sign:hover {
                background-color: var(--omni-numeric-input-plus-minus-focussed-hover,purple);
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
            `
        ];
    }

    protected override renderPreSuffix() {
        return html`				
			<div class="quantity">
                <slot name="plus_icon"><div class="sign" @click="${this._onAddClick}">+</div></slot>
				<div class="divider"></div>
				<slot name="minus_icon"><div class="sign" @click="${this._onMinusClick}">-</div></slot>
            </div>
        `;
    }





}