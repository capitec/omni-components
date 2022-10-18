import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

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
 * @cssprop --omni-numeric-input-quantity-height - Numeric input quantity container height.
 * @cssprop --omni-numeric-input-slot-width - Numeric input slot width.
 * @cssprop --omni-numeric-input-slot-height -  Numeric input slot height.
 * 
 * @cssprop --omni-numeric-input-divider-color - Numeric input control divider color.
 * @cssprop --omni-numeric-input-divider-width - Numeric input control divider width.
 *
 * @cssprop --omni-numeric-field-text-align - Numeric input field text align.
 * @cssprop --omni-numeric-field-font-color - Numeric input field font color.
 * @cssprop --omni-numeric-field-font-family - Numeric input field font family.
 * @cssprop --omni-numeric-field-font-size - Numeric input field font size.
 * @cssprop --omni-numeric-field-font-weight - Numeric input field font weight.
 * @cssprop --omni-numeric-field-height - Numeric input field height.
 * @cssprop --omni-numeric-field-padding - Numeric input field padding.
 * 
 * @cssprop --omni-numeric-control-hover - Numeric input control hover color.
 *
 */
@customElement('omni-numeric-field')
export class NumericField extends OmniFormElement {
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
                    height: var(--omni-numeric-input-quantity-height, 100%);
                }

                .plus-icon,
                .minus-icon,
                ::slotted([slot='increase']),
                ::slotted([slot='decrease']) {
                    width: var(--omni-numeric-input-slot-width, 36px);
                    height: var(--omni-numeric-input-slot-height, 36px);
                    cursor: pointer;
                }

                .divider {
                    background-color: var(--omni-numeric-input-divider-color, var(--omni-primary-color));
                    width: var(--omni-numeric-input-divider-width, 1px);
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

                /*hover for numeric control*/
                .increase-container:hover,
                .decrease-container:hover { 
                    background-color: var(--omni-numeric-control-hover, var(--omni-accent-hover-color));
                }


                /* Used to not display default stepper */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    /* display: none; <- Crashes Chrome on hover */
                    -webkit-appearance: none;
                    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
                }

                input[type='number'] {
                    -moz-appearance: textfield; /* Firefox */
                }
            `
        ];
    }

    protected override renderControl() {
        return html`
            <span class="control">
                <div class="quantity">
                    <div class="increase-container" @click="${this._onAddClick}"
                        ><slot name="increase"><omni-plus-icon class="plus-icon"></omni-plus-icon></slot
                    ></div>
                    <div class="divider"></div>
                    <div class="decrease-container" @click="${this._onMinusClick}"
                        ><slot name="decrease"><omni-minus-icon class="minus-icon"></omni-minus-icon></slot
                    ></div>
                </div>
            </span>
        `;
    }

    protected override renderContent() {
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
