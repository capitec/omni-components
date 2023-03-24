import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import type { InputEventTypes } from '../keyboard/Keyboard.js';
import '../label/Label.js';

/**
 * Control to enter a formatted currency value.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/currency-field';
 * ```
 * @example
 *
 * ```html
 * <omni-currency-field
 *   label="Enter currency value"
 *   value="100"
 *   hint="Required"
 *   error="Please enter the correct amount"
 *   currency-symbol="$"
 *   thousands-separator=","
 *   fractional-separator="."
 *   fractional-precision=2
 *   disabled>
 * </omni-currency-field>
 * ```
 *
 * @element omni-currency-field
 *
 * @cssprop --omni-currency-field-text-align - Currency field text align.
 * @cssprop --omni-currency-field-font-color - Currency field font color.
 * @cssprop --omni-currency-field-font-family - Currency field font family.
 * @cssprop --omni-currency-field-font-size - Currency field font size.
 * @cssprop --omni-currency-field-font-weight - Currency field font weight.
 * @cssprop --omni-currency-field-padding - Currency field padding.
 * @cssprop --omni-currency-field-height - Currency field height.
 * @cssprop --omni-currency-field-width - Currency field width.
 *
 * @cssprop --omni-currency-field-disabled-font-color - Currency field disabled font color.
 *
 * @cssprop --omni-currency-field-label-left-margin - Currency field label left margin.
 *
 * @cssprop --omni-currency-field-symbol-font-size - Currency field symbol font size.
 * @cssprop --omni-currency-field-symbol-color - Currency field symbol font color.
 * @cssprop --omni-currency-field-symbol-left-padding - Currency field symbol left padding.
 * @cssprop --omni-currency-field-symbol-select - Currency field symbol selectable state.
 *
 */
@customElement('omni-currency-field')
export class CurrencyField extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;

    /**
     * Currency symbol.
     * @attr [currency-symbol]
     */
    @property({ type: String, reflect: true, attribute: 'currency-symbol' }) currencySymbol: string = '$';

    /**
     * Thousands separator.
     * @attr [thousands-separator]
     */
    @property({ type: String, reflect: true, attribute: 'thousands-separator' }) thousandsSeparator: string = '';

    /**
     * Fractional separator.
     * @attr [fractional-separator]
     */
    @property({ type: String, reflect: true, attribute: 'fractional-separator' }) fractionalSeparator: string = '.';

    /**
     * Fractional precision.
     * @attr [fractional-precision]
     */
    @property({ type: Number, reflect: true, attribute: 'fractional-precision' }) fractionalPrecision: number = 2;

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    /**
     * Formatter provided to format the value.
     * @attr
     */
    @property({ type: String, reflect: true }) formatter: string = '\\B(?=(\\d{3})+(?!\\d))';

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('click', this._clickInput.bind(this), {
            capture: true
        });
        this.addEventListener('focus', this._focusInput.bind(this), {
            capture: true
        });
        this.addEventListener('blur', this._blur.bind(this), {
            capture: true
        });
        // Used instead of keydown to catch inputs for mobile devices.
        this.addEventListener('beforeinput', this._beforeInput.bind(this), {
            capture: true
        });
        this.addEventListener('paste', this._onPaste.bind(this), {
            capture: true
        });
    }

    // Format the bound value.
    protected override async firstUpdated(): Promise<void> {
        if (this.value !== null && this.value !== undefined) {
            await this._formatToCurrency(this.value.toString()).then((res) => {
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
            if (typeof value === 'string' && this._inputElement) {
                await this._formatToCurrency(value).then((res) => {
                    this._inputElement!.value = res;
                });
            } else if (typeof value === 'number' && this._inputElement) {
                await this._formatToCurrency(value).then((res) => {
                    this._inputElement!.value = res;
                });
            }
        } else if ((name === 'thousands-separator' || name === 'fractional-separator') && this._inputElement) {
            if (this.value) {
                await this._formatToCurrency(this.value.toString()).then((res) => {
                    this._inputElement!.value = res;
                });
            }
        }
    }

    // Function used to check if the key entered is a numeric value
    _isNumber(number: string) {
        return /\d/.test(number);
    }

    // Function used to check if the cent value provided is all zeros
    _isAllZeros(centValue: string) {
        return /^0*$/.test(centValue);
    }

    _parseAmount(value: string): number | null {
        let cleanValue = '';

        for (let i = 0; i < value.length; i++) {
            const character = value.charAt(i);
            if (/\d/.test(character)) {
                cleanValue += character;
            }
        }

        if (cleanValue) {
            return parseInt(cleanValue);
        } else {
            return null;
        }
    }

    _parseFraction(value: string): string {
        let cleanValue = '';
        for (let i = 0; i < value.length; i++) {
            const character = value.charAt(i);
            if (/\d/.test(character)) {
                cleanValue += character;
            }
        }
        return cleanValue;
    }

    // Format the value to a currency formatted string value.
    async _formatToCurrency(preFormattedValue: number | string): Promise<string> {
        if (preFormattedValue === 0) {
            return preFormattedValue.toString();
        }

        if (!preFormattedValue) {
            return '';
        }

        const formattedValue = preFormattedValue.toString().replace(new RegExp(this.formatter, 'g'), this.thousandsSeparator || '');
        await this.updateComplete;

        // decimal separator has to be resolved here.
        if (formattedValue.includes(this.fractionalSeparator)) {
            const amountPart = formattedValue.substring(0, formattedValue.indexOf(this.fractionalSeparator));

            let fractionPart = this._parseFraction(formattedValue.substring(formattedValue.indexOf(this.fractionalSeparator) + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) part to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            return amountPart + this.fractionalSeparator + fractionPart;
        } else if (formattedValue.includes('.')) {
            const amountPart = formattedValue.substring(0, formattedValue.indexOf('.'));

            let fractionPart = this._parseFraction(formattedValue.substring(formattedValue.indexOf('.') + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) part to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            return amountPart + this.fractionalSeparator + fractionPart;
        }

        return formattedValue;
    }

    // Format the internal value to a float.
    _formatToFloat(formattedValue: string): string | number {
        if (formattedValue.length > 0) {
            let preFloatReplaceAll = '';
            if (formattedValue.includes(this.fractionalSeparator) && this.fractionalPrecision > 0) {
                preFloatReplaceAll = formattedValue.replace(new RegExp(this.thousandsSeparator, 'g'), '').replace(this.fractionalSeparator, '.');
                console.log('Formatted float', Number(parseFloat(preFloatReplaceAll).toFixed(this.fractionalPrecision)).toFixed(this.fractionalPrecision));
                return Number(parseFloat(preFloatReplaceAll).toFixed(this.fractionalPrecision)).toFixed(this.fractionalPrecision);                
            } else {
                preFloatReplaceAll = formattedValue.replace(new RegExp(this.thousandsSeparator, 'g'), '');
                return Number(parseFloat(preFloatReplaceAll).toFixed(0));
            }
        } else {
            return '';
        }
    }

    /* When the component is focussed */
    _focusInput() {
        const input = this._inputElement as HTMLInputElement;
        if (!this.value) {
            let startValue = '0.';
            //Dynamically build up what the cents should be based on the fractional precision.
            for (let index = 0; index < this.fractionalPrecision; index++) {
                startValue += '0';
            }
            this.value = startValue;
        }

        if (input) {
            setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000;
            }, 0);
        }
    }

    // When clicking in the input position the caret at the end of the input unless there is a valid highlighted selection.
    _clickInput() {
        const input = this._inputElement as HTMLInputElement;

        if (input) {
            if (input.selectionStart === input.selectionEnd) {
                setTimeout(function () {
                    input.selectionStart = input.selectionEnd = 10000;
                }, 0);
            }
        }
    }

    // Format the currency value when the component loses focus
    async _blur(): Promise<void> {
        if (this._inputElement) {
            //Do not hard code here update this dynamically.
            if (this._inputElement.value === '0.00') {
                this._inputElement.value = '';
                this.value = undefined;
            }
        }
    }

    _onPaste(e: ClipboardEvent) {
        const clipboardData = e.clipboardData;
        const pastedData = clipboardData?.getData('Text');

        //Try to parse the value pasted into a valid numeric amount.
        const numericPastedData = this._parseAmount(pastedData!);

        // Check if the numeric pasted data is not null then update the value in the input
        if (this._inputElement && numericPastedData) {
            e.preventDefault();

            //Check if selection is the entire value
            if (
                this._inputElement.value.length === this._inputElement.selectionEnd! ||
                this._inputElement.selectionStart === this._inputElement.value.length
            ) {
                const centValue = (this._inputElement.value + numericPastedData).replace(this.fractionalSeparator, '');

                // Extract the amount part of the cent value.
                const amountPart = centValue.substring(0, centValue.length - this.fractionalPrecision);
                //Extract the cents part of the cent value
                const fractionPart = centValue.slice(-this.fractionalPrecision);

                const parsedAmountPart = this._parseAmount(amountPart);
                this._inputElement!.value = parsedAmountPart + this.fractionalSeparator + fractionPart;
            } else {
                const newInputValue =
                    this._inputElement.value.slice(0, this._inputElement.selectionStart!) +
                    numericPastedData +
                    this._inputElement.value.slice(this._inputElement.selectionEnd!);

                const centValue = newInputValue.replace(this.fractionalSeparator, '');

                // Extract the amount part of the cent value.
                const amountPart = centValue.substring(0, centValue.length - this.fractionalPrecision);
                //Extract the cents part of the cent value
                const fractionPart = centValue.slice(-this.fractionalPrecision);

                const parsedAmountPart = this._parseAmount(amountPart);
                this._inputElement!.value = parsedAmountPart + this.fractionalSeparator + fractionPart;
            }

            const floatValue = this._formatToFloat(this._inputElement!.value);
            this.value = floatValue;

            return;
        } else {
            e.preventDefault();
            //Set caret position to the end of the component.
            return;
        }
    }

    _beforeInput(e: InputEvent) {
        let centValue = this._inputElement?.value.replace(this.fractionalSeparator, '');

        if (centValue) {
            /**
             * Check if the input elements converted cent value is all zeros.
             * Check if the data of the input event is zero
             */
            if (this._isAllZeros(centValue!) && e.data === '0') {
                e.preventDefault();
                return;
            } else if (this._isNumber(e.data as string)) {
                e.preventDefault();
                centValue = centValue += e.data;

                // Extract the amount part of the cent value.
                let amountPart = centValue.substring(0, centValue.length - this.fractionalPrecision);
                //Extract the cents part of the cent value
                const fractionPart = centValue.slice(-this.fractionalPrecision);

                if (this._isAllZeros(amountPart)) {
                    amountPart = '0';
                    this._inputElement!.value = amountPart + this.fractionalSeparator + fractionPart;

                    //Format the value to be a float value
                    const floatValue = this._formatToFloat(this._inputElement!.value);
                    this.value = floatValue;
                } else {
                    //Format the amount part
                    this._inputElement!.value = amountPart + this.fractionalSeparator + fractionPart;
                    const floatValue = this._formatToFloat(this._inputElement!.value);
                    this.value = floatValue;
                }

                return;
            }

            // Remove only the value at the end if backspace key is hit and value of input is not all zeros.
            if ((e.inputType as InputEventTypes) === 'deleteContentBackward' && !this._isAllZeros(centValue!)) {
                e.preventDefault();
                centValue = centValue?.substring(0, centValue.length - 1);

                // Check if cent value is all zeroes if true set the value of the input to 0.00
                if (this._isAllZeros(centValue!)) {
                    this._inputElement!.value = '0.00';
                } else {
                    const amountPart = centValue?.substring(0, centValue.length - this.fractionalPrecision) as string;

                    const fractionPart = centValue?.slice(-this.fractionalPrecision);

                    const parsedAmountPart = amountPart ? this._parseAmount(amountPart) : '0';
                    this._inputElement!.value = parsedAmountPart + this.fractionalSeparator + fractionPart;
                    const floatValue = this._formatToFloat(this._inputElement!.value);
                    this.value = floatValue;
                }

                return;
            } else {
                e.preventDefault();
                return;
            }
        }
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
                    margin: 0;

                    text-align: var(--omni-currency-field-text-align, left);

                    color: var(--omni-currency-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-currency-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-currency-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-currency-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-currency-field-padding, 10px);
                    height: var(--omni-currency-field-height, 100%);
                    width: var(--omni-currency-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-currency-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-currency-field-error-font-color);
                }

                .label {
                    margin-left: var(--omni-currency-field-label-left-margin, 25px);
                }

                .currency-symbol {
                    font-size: var(--omni-currency-field-symbol-font-size, 16px);
                    color: var(--omni-currency-field-symbol-color, var(--omni-font-color));
                    padding-left: var(--omni-currency-field-symbol-left-padding, 10px);
                    user-select: var(--omni-currency-field-symbol-select, text);
                }
            `
        ];
    }

    protected override renderPrefix() {
        return html`<omni-label class="currency-symbol" label="${this.currencySymbol}"></omni-label>`;
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
                type="text"
                maxlength="21"
                inputmode="${this.noNativeKeyboard ? 'none' : 'decimal'}"
                data-omni-keyboard-mode="decimal"
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-currency-field': CurrencyField;
    }
}
