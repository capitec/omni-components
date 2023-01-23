import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
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
 *  label="Enter currency value"
 *  value="100"
 *  hint="Required"
 *  error="Please enter the correct amount"
 *  currency-symbol="$"
 *  thousands-separator=","
 *  fractional-separator="."
 *  fractional-precision=2
 *  disabled>
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
 * @cssprop --omni-currency-field-symbol-font-size - Currency field symbol font size.
 * @cssprop --omni-currency-field-symbol-color - Currency field symbol font color.
 * @cssprop --omni-currency-field-symbol-left-padding - Currency field symbol left padding.
 * @cssprop --omni-currency-field-symbol-select - Currency field symbol selectable state.
 *
 */
@customElement('omni-currency-field')
export class CurrencyField extends OmniFormElement {
    @query('#inputField')
    private _inputElement: HTMLInputElement;

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
     * Formatter provided to format the value.
     * @attr
     */
    @property({ type: String, reflect: true }) formatter: string = '\\B(?=(\\d{3})+(?!\\d))';

    // Internal state properties
    @state() private _stringValue: string = '';

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('blur', this._blur.bind(this), {
            capture: true
        });
        this.addEventListener('keydown', this._keyDown.bind(this), {
            capture: true
        });
    }

    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);
        if (name === 'value') {
            // this._stringValue = this._formatToCurrency(value);
            await this._formatToCurrency(value).then((res) => {
                this._stringValue = res;
            });
            super._setLabelPosition();
        } else if (name === 'thousands-separator' || name === 'fractional-separator') {
            if (this.value) {
                await this._formatToCurrency(this.value.toString()).then((res) => {
                    this._stringValue = res;
                });
                super._setLabelPosition();
            }
        }
    }

    _parseAmount(value: string): number {
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

    // Format the numeric value to a currency formatted string value.
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
            this._stringValue = amountPart + this.fractionalSeparator + fractionPart;
            return amountPart + this.fractionalSeparator + fractionPart;
        } else if (formattedValue.includes('.')) {
            const amountPart = formattedValue.substring(0, formattedValue.indexOf('.'));

            let fractionPart = this._parseFraction(formattedValue.substring(formattedValue.indexOf('.') + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) part to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            this._stringValue = amountPart + this.fractionalSeparator + fractionPart;
            return amountPart + this.fractionalSeparator + fractionPart;
        }

        return formattedValue;
    }

    // Format the internal value to a float.
    _formatToFloat(formattedValue: string): string | number {
        if (formattedValue.length > 0) {
            let preFloatReplaceAll = '';
            if (formattedValue.includes(this.fractionalSeparator) && this.fractionalPrecision > 0) {
                preFloatReplaceAll = formattedValue.replaceAll(this.thousandsSeparator, '').replace(this.fractionalSeparator, '.');
                return parseFloat(preFloatReplaceAll).toFixed(this.fractionalPrecision);
            } else {
                preFloatReplaceAll = formattedValue.replaceAll(this.thousandsSeparator, '');
                return parseFloat(preFloatReplaceAll);
            }

            //const preFloatReplaceAll = formattedValue.replaceAll(this.thousandsSeparator, '').replace(this.fractionalSeparator, '.');
            //console.log('parsed float', parseFloat(preFloatReplaceAll));
            //return parseFloat(preFloatReplaceAll);
        } else {
            return '';
        }
    }

    async _blur(): Promise<void> {
        const inputValue = this._inputElement.value;

        if (inputValue.includes(this.fractionalSeparator)) {
            // Split out the amount and fraction (cents) parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.fractionalSeparator)));

            let fractionPart = this._parseFraction(inputValue.substring(inputValue.indexOf(this.fractionalSeparator) + 1));

            const fractionalDifference = this.fractionalPrecision - fractionPart.length;
            if (fractionalDifference > 0) {
                for (let index = 0; index < fractionalDifference; index++) {
                    fractionPart += '0';
                }
            }

            await this._formatToCurrency(amountPart).then((res) => {
                this._stringValue = res + (this.fractionalPrecision > 0 ? this.fractionalSeparator + fractionPart : '');
            });
        } else {
            await this._formatToCurrency(this._parseAmount(inputValue)).then((res) => {
                this._stringValue = res;
            });
        }
        this.value = this._formatToFloat(this._stringValue);
    }

    async _keyDown(e: KeyboardEvent): Promise<void> {
        const input = this._inputElement;
        const caretPosition = input.selectionStart;

        // If the pointer is positioned after a currency separator remove the separator and the preceding number.
        if (input.value.charAt(caretPosition - 1) === this.thousandsSeparator && (e.key.toLowerCase() === 'backspace' || e.keyCode === 229)) {
            // If the value includes a fraction (cents) separator parse the fraction part and append it to the value.
            if (input.value.includes(this.fractionalSeparator)) {
                const fractionPart = this._parseFraction(input.value.substring(input.value.indexOf(this.fractionalSeparator) + 1));

                await this._formatToCurrency(
                    this._parseAmount(
                        input.value.substring(0, caretPosition - 2) +
                            input.value.substring(caretPosition, input.value.indexOf(this.fractionalSeparator))
                    )
                ).then((res) => {
                    this._stringValue = res + this.fractionalSeparator + fractionPart;
                });
            } else {
                await this._formatToCurrency(
                    input.value.substring(0, caretPosition - 2) + input.value.substring(caretPosition, input.value.length + 1)
                ).then((res) => {
                    this._stringValue = res;
                });
            }

            // Added so that the number before the separator is not removed.
            e.preventDefault();
            this.value = this._formatToFloat(this._stringValue);

            await this.updateComplete;

            // Set caret position after value is formatted.
            if (input.value.length === this._stringValue.length) {
                this._inputElement.setSelectionRange(caretPosition - 1, caretPosition - 1);
            }
        }

        // When the delete key is pressed and the caret is positioned at the thousand separator
        if (input.value.charAt(caretPosition) === this.thousandsSeparator && this.thousandsSeparator !== '' && e.key.toLowerCase() === 'delete') {
            // Calculate the what values to remove from the input.
            const diff = input.selectionEnd - input.selectionStart > 0 ? input.selectionEnd - input.selectionStart : 2;

            if (input.value.includes(this.fractionalSeparator)) {
                const fractionPart = this._parseFraction(input.value.substring(input.value.indexOf(this.fractionalSeparator) + 1));

                await this._formatToCurrency(
                    this._parseAmount(
                        input.value.substring(0, caretPosition) +
                            input.value.substring(caretPosition + diff, input.value.indexOf(this.fractionalSeparator))
                    )
                ).then((res) => {
                    this._stringValue = res + this.fractionalSeparator + fractionPart;
                });
            } else {
                await this._formatToCurrency(
                    input.value.substring(0, caretPosition) + input.value.substring(caretPosition + diff, input.value.length + 1)
                ).then((res) => {
                    this._stringValue = res;
                });
            }

            e.preventDefault();
            this.value = this._formatToFloat(this._stringValue);

            await this.updateComplete;
            // Set caret position after value is formatted.
            if (input.value.length === this._stringValue.length) {
                this._inputElement.setSelectionRange(caretPosition, caretPosition);
            }
        }

        // If hitting backspace with the caret in the position of the first fractional (cents) separator then remove the entire fraction value.
        /*
        if (
            input.value.includes(this.fractionalSeparator) &&
            input.value.charAt(caretPosition - 2) === this.fractionalSeparator &&
            (e.key.toLowerCase() === 'backspace' || e.keyCode === 229)
        ) {
            this._stringValue = input.value.substring(0, input.value.indexOf(this.fractionalSeparator));
            e.preventDefault();
            // Set value prop to float value
            this.value = this._formatToFloat(this._stringValue);
            return;
        }

        // If hitting backspace when the caret is after the fraction (cents) separator remove the fraction value completely.
        if (input.value.charAt(caretPosition - 1) === this.fractionalSeparator && (e.key.toLowerCase() === 'backspace' || e.keyCode === 229)) {
            this._stringValue = input.value.substring(0, input.value.indexOf(this.fractionalSeparator));
            e.preventDefault();
            // Set value prop to float value
            this.value = this._formatToFloat(this._stringValue);
            return;
        }*/

        // Delete fraction (cents) part if delete button is clicked.
        if (input.value.charAt(caretPosition) === this.fractionalSeparator && e.key.toLowerCase() === 'delete') {
            this._stringValue = input.value.substring(0, input.value.indexOf(this.fractionalSeparator));
            this.value = this._formatToFloat(this._stringValue);
            return;
        }

        // Copy currency field selection to clipboard.
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            navigator.clipboard.writeText(this._stringValue);
            return;
        }

        // Stop alpha keys from moving the caret position.
        if (e.key >= 'a' && e.key <= 'z') {
            e.preventDefault();
            return;
        }
    }

    async _keyInput(): Promise<void> {
        let formatterCount = 0;
        let valueFormatterCount = 0;
        const valueLength = this._inputElement.value.length;
        const caretPosition = this._inputElement.selectionStart;
        const inputValue = this._inputElement.value;

        if (inputValue.includes(this.thousandsSeparator)) {
            formatterCount = this._inputElement.value.match(new RegExp(this.thousandsSeparator, 'g')).length;
        }

        if (inputValue.includes(this.fractionalSeparator)) {
            // Split out the amount and fraction (cents) parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.fractionalSeparator)));

            let fractionPart = this._parseFraction(inputValue.substring(inputValue.indexOf(this.fractionalSeparator) + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            await this._formatToCurrency(amountPart).then((res) => {
                this._stringValue = res + this.fractionalSeparator + fractionPart;
            });
        } else {
            await this._formatToCurrency(this._parseAmount(inputValue)).then((res) => {
                this._stringValue = res;
            });
        }

        this.requestUpdate();

        if (this._stringValue.includes(this.thousandsSeparator)) {
            valueFormatterCount = this._stringValue.match(new RegExp(this.thousandsSeparator, 'g')).length;
        }

        await this.updateComplete;

        // Set caret position after value is formatted into currency
        if (valueLength < this._stringValue.length) {
            const difference = this._stringValue.length - valueLength;
            this._inputElement.setSelectionRange(caretPosition + difference, caretPosition + difference);
        } else {
            this._inputElement.setSelectionRange(caretPosition, caretPosition);
        }

        if (valueFormatterCount < formatterCount) {
            this._inputElement.setSelectionRange(caretPosition - 1, caretPosition - 1);
        }

        // Set value prop to float value
        //this.value = this._formatToFloat(this._stringValue);
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
        return html`
            <input
                class="field"
                id="inputField"
                type="text"
                maxlength="21"
                inputmode="decimal"
                .value=${live(this._stringValue)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}
