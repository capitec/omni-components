import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement, ifDefined } from '../core/OmniFormElement.js';

/**
 * Input control to enter a mobile number.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/mobile-field';
 * ```
 * @example
 * ```html
 * <omni-mobile-field
 *   label="Enter a mobile number"
 *   value=5555555
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-mobile-field>
 * ```
 *
 * @element omni-mobile-field
 *
 * @cssprop --omni-mobile-field-text-align - Mobile field text align.
 * @cssprop --omni-mobile-field-font-color - Mobile field font color.
 * @cssprop --omni-mobile-field-font-family - Mobile field font family.
 * @cssprop --omni-mobile-field-font-size - Mobile field font size.
 * @cssprop --omni-mobile-field-font-weight - Mobile field font weight.
 * @cssprop --omni-mobile-field-padding - Mobile field padding.
 * @cssprop --omni-mobile-field-height - Mobile field height.
 * @cssprop --omni-mobile-field-width - Mobile field width.
 *
 * @cssprop --omni-mobile-field-disabled-font-color - Mobile field disabled font color.
 * @cssprop --omni-mobile-field-error-font-color - Mobile field error font color.
 */
@customElement('omni-mobile-field')
export class MobileField extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;

    /**
     * Indicator if the component should allow the entry of a country code ie: +21 .
     * @attr [country-code]
     */
    @property({ type: Boolean, reflect: true, attribute: 'country-code' }) countryCode?: boolean;

    /**
     * Formatter provided to format the value.
     * @attr
     */
    @property({ type: String, reflect: true }) formatter: string = '^+27[0-9]{9}$';

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('keydown', this._keyDown.bind(this), {
            capture: true
        });
    }

    // Added for browsers that allow text values entered into a input when type is set to number.
    // Format the bound value.
    protected override async firstUpdated(): Promise<void> {
        if (this.value !== null && this.value !== undefined) {
            await this._sanitiseMobileValue(this.value.toString()).then((res) => {
                this._inputElement!.value = res;
            });
        }
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);
        if (name === 'value') {
            await this._sanitiseMobileValue(value as string).then((res) => {
                this._inputElement!.value = res;
            });
        }
    }

    _keyDown(e: KeyboardEvent) {
        const input = this._inputElement as HTMLInputElement;
        // Stop alpha keys
        if (e.key >= 'a' && e.key <= 'z') {
            e.preventDefault();
            return;
        }

        if (input && e.key) {
            if (this._isValid(e.key)) {
            } else {
                e.preventDefault();
                return;
            }
        }
    }

    _keyInput() {
        const input = this._inputElement as HTMLInputElement;

        if (input?.value && input?.value.includes('+') && input?.value.replace(/\D/g, '').length > 11) {
            // Restrict the input characters to the length of specified in the args.
            input.value = String(input?.value).slice(0, input?.value.length - 1);
        } else if (input?.value && input?.value.replace(/\D/g, '').length > 10 && !input?.value.includes('+')) {
            // Restrict the input characters to the length of specified in the args.
            input.value = String(input?.value).slice(0, input?.value.length - 1);
        }

        this.value = input?.value;
        this._sanitiseMobileValue(input?.value);
    }

    // Check if the value provided is valid, if there is invalid alpha characters they are removed.
    async _sanitiseMobileValue(preFormattedValue: number | string) {
        const rawMobileNumber = preFormattedValue.toString().replace(/\D/g, '');
        const mobileLength = rawMobileNumber.length;

        if (preFormattedValue.toString().includes('+')) {
            if (mobileLength > 7) {
                return (
                    '+' +
                    rawMobileNumber.slice(0, 2) +
                    ' ' +
                    rawMobileNumber.slice(2, 4) +
                    ' ' +
                    rawMobileNumber.slice(4, 7) +
                    ' ' +
                    rawMobileNumber.slice(7, 12)
                );
            }
            if (mobileLength > 4) {
                return '+' + rawMobileNumber.slice(0, 2) + ' ' + rawMobileNumber.slice(2, 4) + ' ' + rawMobileNumber.slice(4, 10);
            }
            if (mobileLength > 2) {
                return '+' + rawMobileNumber.slice(0, 2) + ' ' + rawMobileNumber.slice(2, 10);
            }
            return preFormattedValue.toString();
        }

        if (mobileLength > 6) {
            return rawMobileNumber.slice(0, 3) + ' ' + rawMobileNumber.slice(3, 6) + ' ' + rawMobileNumber.slice(6, 10);
        }
        if (mobileLength > 3) {
            return rawMobileNumber.slice(0, 3) + ' ' + rawMobileNumber.slice(3, 10);
        }

        return rawMobileNumber;
    }

    _isValid(keyValue: string) {
        const input = this._inputElement as HTMLInputElement;

        if (keyValue === 'Backspace') {
            return true;
        }

        if (/\d/.test(keyValue)) {
            return true;
        }

        if (input.selectionStart === 0 && input.selectionEnd === 0) {
            if (keyValue === '+') {
                return true;
            }
        }

        if (input.value.toString().replace(/\D/g, '').length >= 10) {
            return false;
        }

        return false;
    }

    static override get styles() {
        return [
            super.styles,
            css`
                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-mobile-field-text-align, left);

                    color: var(--omni-mobile-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-mobile-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-mobile-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-mobile-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-mobile-field-padding, 10px);

                    height: var(--omni-mobile-field-height, 100%);
                    width: var(--omni-mobile-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-mobile-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-mobile-field-error-font-color, var(--omni-font-color));
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

    protected override renderContent() {
        const field: ClassInfo = {
            field: true,
            disabled: this.disabled,
            error: this.error as string
        };
        return html`
      <input
        class=${classMap(field)}
        id="inputField"
        data-omni-keyboard-mode="tel"
        type="tel"
        inputmode="${ifDefined(this.noNativeKeyboard ? 'none' : undefined)}"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-mobile-field': MobileField;
    }
}
