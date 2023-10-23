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
 * Registry of all properties defined by the component.
 *
 * @fires {CustomEvent<{}>} change - Dispatched when the component value changes.
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
        this.addEventListener('click', this._onClickInput.bind(this), {
            capture: true
        });
        this.addEventListener('focus', this._onFocusInput.bind(this), {
            capture: true
        });
        this.addEventListener('blur', this._onBlur.bind(this), {
            capture: true
        });
        // Used instead of keydown to catch inputs for mobile devices.
        this.addEventListener('beforeinput', this._beforeInput.bind(this), {
            capture: true
        });
        // Used to catch and format paste actions.
        this.addEventListener('paste', this._onPaste.bind(this), {
            capture: true
        });
        // Used to make the component blur when enter key is pressed on a mobile keyboard
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
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
            await this._formatToCurrency(value as string).then((res) => {
                this._inputElement!.value = res;
            });
        } else if ((name === 'thousands-separator' || name === 'fractional-separator') && this._inputElement) {
            if (this.value) {
                await this._formatToCurrency(this.value.toString()).then((res) => {
                    this._inputElement!.value = res;
                });
            }
        }
    }

    // Dispatch a custom change event required as we manipulate and format the value of the input.
    _dispatchChange(amount: number) {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: amount
                }
            })
        );
    }

    // Used to check if the value provided in a valid numeric value.
    _isNumber(number: string) {
        return /\d/.test(number);
    }

    // Used to check if the value consists of only zeroes.
    _isAllZeros(centValue: string) {
        return /^0*$/.test(centValue);
    }

    // Convert given value to cents.
    _convertToCents(currencyValue: string) {
        return currencyValue.replace(this.fractionalSeparator, '').replaceAll(this.thousandsSeparator, '');
    }

    // Format to a full currency value with whole amount and cents.
    _formatToCurrencyValue(value: string): string {
        value += '.';

        for (let index = 0; index < this.fractionalPrecision; index++) {
            value += '0';
        }
        return value;
    }

    // Parse the amount part (Whole value without cents).
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

    _setValue(value: string) {
        const floatValue = this._formatToFloat(value);
        this.value = floatValue;
        this._dispatchChange(this.value as number);
    }

    // Parse the cents portion of the currency value.
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

    // Blur when the enter key is pressed on a virtual keyboard.
    _blurOnEnter(e: KeyboardEvent) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            (e.currentTarget as HTMLElement).blur();
        }
    }

    // Format the value to a currency formatted string value.
    async _formatToCurrency(preFormattedValue: number | string): Promise<string> {
        if (preFormattedValue === 0) {
            return preFormattedValue.toString();
        }

        if (!preFormattedValue) {
            return '';
        }

        let formattedValue = preFormattedValue.toString();
        await this.updateComplete;

        // Decimal separator has to be resolved here.
        if (formattedValue.includes(this.fractionalSeparator)) {
            const amountPart = this._parseAmount(formattedValue.substring(0, formattedValue.indexOf(this.fractionalSeparator)))
                ?.toString()
                .replace(new RegExp(this.formatter, 'g'), this.thousandsSeparator || '');

            let fractionPart = this._parseFraction(formattedValue.substring(formattedValue.indexOf(this.fractionalSeparator) + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            } else if (fractionPart.length < this.fractionalPrecision) {
                const difference = this.fractionalPrecision - fractionPart.length;
                for (let index = 0; index < difference; index++) {
                    fractionPart += '0';
                }
            }

            // Format amount and fraction (cents) part to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            this._setValue(amountPart + this.fractionalSeparator + fractionPart);
            return amountPart + this.fractionalSeparator + fractionPart;
        } else if (formattedValue.includes('.')) {
            const amountPart = this._parseAmount(formattedValue.substring(0, formattedValue.indexOf('.')))
                ?.toString()
                .replace(new RegExp(this.formatter, 'g'), this.thousandsSeparator || '');

            let fractionPart = this._parseFraction(formattedValue.substring(formattedValue.indexOf('.') + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) part to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            this._setValue(amountPart + this.fractionalSeparator + fractionPart);
            return amountPart + this.fractionalSeparator + fractionPart;
        }
        formattedValue = this._parseAmount(formattedValue)
            ?.toString()
            .replace(new RegExp(this.formatter, 'g'), this.thousandsSeparator || '') as string;
        this._setValue(formattedValue);
        return this._formatToCurrencyValue(formattedValue);
    }

    // Format the internal value to a float which will be used to set the value of the component.
    _formatToFloat(formattedValue: string): string | number {
        if (formattedValue.length > 0) {
            let preFloatReplaceAll = '';
            if (formattedValue.includes(this.fractionalSeparator) && this.fractionalPrecision > 0) {
                preFloatReplaceAll = formattedValue.replace(new RegExp(this.thousandsSeparator, 'g'), '').replace(this.fractionalSeparator, '.');
                return Number(parseFloat(preFloatReplaceAll).toFixed(this.fractionalPrecision)).toFixed(this.fractionalPrecision);
            } else {
                preFloatReplaceAll = formattedValue.replace(new RegExp(this.thousandsSeparator, 'g'), '');
                return Number(parseFloat(preFloatReplaceAll).toFixed(0));
            }
        } else {
            return '';
        }
    }

    // When the input is focussed set the default value to zero with the amount of cents dependent on the fractional precision.
    _onFocusInput() {
        const input = this._inputElement as HTMLInputElement;
        if (!this.value) {
            this.value = this._formatToCurrencyValue('0');
        }

        if (input) {
            /*
             * Added to position the caret at the end of the input.
             * Chrome has an odd quirk where the focus event fires before the cursor is moved into the field.
             * Added a timeout of 0 ms to defer the operation until the stack is clear.
             */
            setTimeout(() => {
                input.selectionStart = input.selectionEnd = input.value?.length ?? 0;
            }, 0);
        }
    }

    // When clicking in the input position the caret at the end of the input unless there is a valid highlighted selection.
    _onClickInput() {
        const input = this._inputElement as HTMLInputElement;

        if (input) {
            if (input.selectionStart === input.selectionEnd) {
                //
                setTimeout(() => {
                    input.selectionStart = input.selectionEnd = input.value?.length ?? 0;
                }, 0);
            }
        }
    }

    // On blur if the component has the default value set the input value to a empty string and value property to undefined so the label can transform back into its original position.
    async _onBlur(): Promise<void> {
        if (this._inputElement) {
            const inputCentValue = this._convertToCents(this._inputElement.value);

            if (this._isAllZeros(inputCentValue)) {
                this._inputElement.value = '';
                this.value = undefined;
            }
        }
    }

    // When a value is pasted in the input.
    _onPaste(e: ClipboardEvent) {
        const input = this._inputElement as HTMLInputElement;
        const clipboardData = e.clipboardData;
        const pastedData = clipboardData?.getData('Text');
        let centValue = '';

        // Try to parse the value pasted into a valid numeric amount.
        const numericPastedData = this._parseAmount(pastedData as string);

        // Check if the numeric pasted data is not null then update the value in the input.
        if (input && numericPastedData) {
            e.preventDefault();

            // Check if selection is the entire value.
            if (input.value.length === input.selectionEnd && input.selectionStart !== input.selectionEnd) {
                // Added for cases where the pasted data can be a value that is less than the fractional precision it should be treated as cents.
                let preNumericValue = '0';
                if (numericPastedData.toString().length < this.fractionalPrecision + 1) {
                    const difference = this.fractionalPrecision + 1 - numericPastedData.toString().length;
                    for (let index = 0; index < difference; index++) {
                        preNumericValue += '0';
                    }
                    centValue = this._convertToCents(preNumericValue + numericPastedData.toString());
                } else {
                    centValue = this._convertToCents(numericPastedData.toString());
                }
            }
            // Check if the content being pasted is at the end of the input.
            else if (input.selectionStart === input.value.length) {
                centValue = this._convertToCents(input.value + numericPastedData);
            } else {
                centValue = this._convertToCents(
                    input.value.slice(0, input.selectionStart as number) + numericPastedData + input.value.slice(input.selectionEnd as number)
                );
            }

            // Required to ensure that input value length does not exceed maxlength attribute value.
            if (centValue.length > input.maxLength) {
                centValue = centValue.substring(0, input.maxLength);
            }

            // Extract the amount part of the cent value.
            const amountPart = centValue.substring(0, centValue.length - this.fractionalPrecision);
            // Extract the cents part of the cent value.
            const fractionPart = centValue.slice(-this.fractionalPrecision);

            const parsedAmountPart = this._parseAmount(amountPart);
            input.value = parsedAmountPart + this.fractionalSeparator + fractionPart;

            this._setValue(input.value);
            return;
        } else {
            // If pasted value is not valid position the caret to the end of the input.
            e.preventDefault();
            setTimeout(() => {
                input.selectionStart = input.selectionEnd = input.value?.length ?? 0;
            }, 0);
            return;
        }
    }

    _beforeInput(e: InputEvent) {
        const input = this._inputElement as HTMLInputElement;
        let centValue = this._convertToCents(this._inputElement?.value ? this._inputElement?.value : '0');

        if (centValue && input) {
            e.preventDefault();
            /**
             * Check if the input elements converted cent value is all zeros.
             * Check if the data of the input event is zero
             */
            if (this._isAllZeros(centValue as string) && e.data === '0') {
                return;
            } else if (this._isNumber(e.data as string)) {
                //If the entire input value is selected and has to be replaced with the character provided
                if (input.value.length === input.selectionEnd && input.selectionStart !== input.selectionEnd) {
                    let preNumericValue = '0';
                    for (let index = 0; index < this.fractionalPrecision; index++) {
                        preNumericValue += '0';
                    }
                    centValue = this._convertToCents(preNumericValue + e.data);
                }
                // If the caret is positioned at the end of the input
                else if (input.selectionStart === input.value.length) {
                    centValue = centValue += e.data;
                } else {
                    centValue = this._convertToCents(
                        input.value.slice(0, input.selectionStart as number) + e.data + input.value.slice(input.selectionEnd as number)
                    );
                }

                // Required to ensure that input value length does not exceed maxlength attribute value.
                if (centValue.length > input.maxLength) {
                    centValue = centValue.substring(0, input.maxLength);
                }

                // Extract the amount part of the cent value.
                let amountPart = centValue.substring(0, centValue.length - this.fractionalPrecision);
                // Extract the cents part of the cent value.
                const fractionPart = centValue.slice(-this.fractionalPrecision);

                if (this._isAllZeros(amountPart)) {
                    amountPart = '0';
                }
                input.value = amountPart + this.fractionalSeparator + fractionPart;
                this._setValue(input.value);
                return;
            } else if (!this._isNumber(e.data as string) && !(e.inputType as InputEventTypes)) {
                input.value = centValue;
                this._setValue(input.value);
                return;
            }

            // Check if inputType prop is populated and value of input is not all zeros.
            if ((e.inputType as InputEventTypes) && !this._isAllZeros(centValue as string)) {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const that = this;

                setTimeout(() => {
                    // Condition if the backspace key is hit works on virtual and desktop keyboards
                    if (e.inputType === 'deleteContentBackward') {
                        centValue = centValue?.substring(0, centValue.length - 1);

                        if (that._isAllZeros(centValue as string)) {
                            input.value = that._formatToCurrencyValue('0');
                            const floatValue = that._formatToFloat(input.value);
                            that.value = floatValue;
                            that._dispatchChange(that.value as number);
                        } else {
                            if (input.value.length === input.selectionEnd && input.selectionStart !== input.selectionEnd) {
                                let preNumericValue = '0';
                                for (let index = 0; index < that.fractionalPrecision; index++) {
                                    preNumericValue += '0';
                                }
                                centValue = that._convertToCents(preNumericValue);
                            } else if (input.selectionStart !== input.selectionEnd) {
                                centValue = that._convertToCents(
                                    input.value.slice(0, input.selectionStart as number) + input.value.slice(input.selectionEnd as number)
                                );
                            }
                        }
                    }
                    // Condition if the delete key is pressed on a desktop keyboard check if the entire value of the input is selected or a portion and update accordingly.
                    else if (e.inputType === 'deleteContentForward') {
                        if (input.value.length === input.selectionEnd && input.selectionStart !== input.selectionEnd) {
                            let preNumericValue = '0';
                            for (let index = 0; index < that.fractionalPrecision; index++) {
                                preNumericValue += '0';
                            }
                            centValue = that._convertToCents(preNumericValue);
                        } else if (input.selectionStart !== input.selectionEnd) {
                            centValue = that._convertToCents(
                                input.value.slice(0, input.selectionStart as number) + input.value.slice(input.selectionEnd as number)
                            );
                        }
                    }
                    const amountPart = centValue?.substring(0, centValue.length - that.fractionalPrecision) as string;

                    const fractionPart = centValue?.slice(-that.fractionalPrecision);

                    const parsedAmountPart = amountPart ? that._parseAmount(amountPart) : '0';
                    input.value = parsedAmountPart + that.fractionalSeparator + fractionPart;
                    this._setValue(input.value);
                    input.selectionStart = input.selectionEnd = input.value?.length ?? 0;
                    return;
                }, 0);
            }
            //Ensuring on older devices that the caret doesn't jump when hitting the delete key on a virtual keyboard.
            else {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const that = this;

                setTimeout(() => {
                    input.value = that._formatToCurrencyValue('0');
                    this._setValue(input.value);
                    input.selectionStart = input.selectionEnd = input.value?.length ?? 0;
                }, 0);

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
                    color: var(--omni-currency-field-error-font-color, var(--omni-font-color));
                }

                .label {
                    margin-left: var(--omni-currency-field-label-left-margin, var(--omni-form-label-margin-left, 25px));
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
                aria-label="${this.label}"
                inputmode="${this.noNativeKeyboard ? 'none' : 'decimal'}"
                data-omni-keyboard-mode="decimal"
                maxlength="15"
                aria-disabled="${this.disabled}"
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
