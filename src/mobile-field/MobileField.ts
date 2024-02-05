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
    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);
        if (name === 'value') {
            if (new RegExp('^[0-9]+$').test(value as string) === false) {
                return;
            }
        }
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    _keyDown(e: KeyboardEvent) {
        const input = this._inputElement as HTMLInputElement;
        // Stop alpha keys
        if (e.key >= 'a' && e.key <= 'z') {
            e.preventDefault();
            return;
        }

        console.log('event', e);
        console.log('event key', e.key);
        console.log('is number', this._isNumber(e.key as string));

        if (input && e.key) {
            if (this._isValid(e.key)) {
            } else {
                e.preventDefault();
                return;
            }

            // console.log('selectionStart', input.selectionStart);
            // console.log('selectionEnd',input.selectionEnd);
            // if(this.countryCode){
            //     if(input.selectionStart === 0 && input.selectionEnd === 0){
            //         if(e.shiftKey === true && e.key !== '+'){
            //             e.preventDefault();
            //             return;
            //         }
            //     } else if (!this._isNumber(e.key as string) && e.key !== 'Backspace') {
            //         e.preventDefault();
            //         return;
            //     }
            // } else {
            //     if (!this._isNumber(e.key as string) && e.key !== 'Backspace') {
            //         e.preventDefault();
            //         return;
            //     }
            // }

            // if (input.selectionStart === 0 && input.selectionEnd === 0) {

            //     if(this.countryCode && ( e.key !== '+' || !this._isNumber(e.key as string))){
            //          e.preventDefault();
            //          return;
            //     }
            // }

            // if(!this._isNumber(e.key as string)){
            //     e.preventDefault();
            //     return;
            // }
        }
    }

    _keyInput() {
        const input = this._inputElement as HTMLInputElement;
        this.value = input?.value;
    }

    // Check if the value provided is valid, if there is invalid alpha characters they are removed.
    _sanitiseMobileValue() {
        this.value = this.value?.toString()?.replace(/^([+]\d{2})?\d{10}$/gi, '');

        if (this._inputElement) {
            this._inputElement.value = this.value as string;
        }
    }

    // Used to check if the value provided in a valid mobile number value.
    _isMobileNumber(number: string) {
        return /^([+]\d{2})?\d{10}$/.test(number);
    }

    _isNumber(number: string) {
        return /\d/.test(number);
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
