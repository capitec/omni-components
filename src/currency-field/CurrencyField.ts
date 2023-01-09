import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../label/Label.js';

/**
 * A currency input control that formats input based on currency and locale.
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
 *  data="{id: 123, name: 'Debit'}"
 *  hint="Required"
 *  error="Please enter the correct amount"
 *  currency-symbol="$"
 *  thousands-separator=","
 *  decimalSeparator="."
 *  decimal-precision=2
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
 * @cssprop --omni-currency-field-height - Currency field height.
 * @cssprop --omni-currency-field-padding - Currency field padding.
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
     * The currency symbol.
     * @attr [currency-symbol]
     */
    @property({type: String, reflect: true, attribute: 'currency-symbol'}) currencySymbol: string = '$';

    /**
     * The thousands separator.
     * @attr [thousands-separator]
     */
    @property({ type: String, reflect: true, attribute: 'thousands-separator'  }) thousandsSeparator: string = ',';

    /**
     * The decimal separator. 
     * @attr [decimal-separator]
     */
    @property({type: String, reflect: true, attribute: 'decimal-separator' }) decimalSeparator: string = '.';

    /**
     * The decimal precision.
     * @attr [decimal-precision]
     */
    @property({type: Number, reflect: true, attribute: 'decimal-precision'})  decimalPrecision: number = 2; 

    /**
     * The formatter provided to format the value.
     * @attr 
     */
    // eslint-disable-next-line no-useless-escape
    @property({type: String, reflect: true}) formatter: string = '\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))';

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
            this._stringValue = this._formatToCurrency(value);
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

    _parseCents(value: string): string {
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
    _formatToCurrency(preFormattedValue: number | string): string {

        if(preFormattedValue === 0){
            return preFormattedValue.toString();
        }

        if (!preFormattedValue) {
            console.log('No value provided')
            return '';
        }

        const formattedValue = preFormattedValue.toString().replace(new RegExp(this.formatter, 'g'), this.thousandsSeparator);

        if(formattedValue.includes(this.decimalSeparator)) {
            const amountPart = formattedValue.substring(0, formattedValue.indexOf(this.decimalSeparator));

            let centsPart = this._parseCents(formattedValue.substring(formattedValue.indexOf(this.decimalSeparator) + 1));
            
            if (centsPart.length >= this.decimalPrecision) {
                centsPart = centsPart.substring(0, this.decimalPrecision);
            }
            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this._stringValue = amountPart + this.decimalSeparator + centsPart;
            return amountPart + this.decimalSeparator + centsPart;
        }
        return formattedValue;
    }

    // Format the internal value to a float.
    _formatToFloat(formattedValue: string): string | number {
        if (formattedValue.length > 0) {
            const preFloatReplaceAll = formattedValue.replaceAll(this.thousandsSeparator, '').replace(this.decimalSeparator, '.');
            return parseFloat(preFloatReplaceAll);
        } else {
            return '';
        }
    }

    _blur(): void {
        const inputValue = this._inputElement.value;

        if (inputValue.includes(this.decimalSeparator)) {
            // Split out the amount and cents parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.decimalSeparator)));

            let centsPart = this._parseCents(inputValue.substring(inputValue.indexOf(this.decimalSeparator) + 1));
            if (centsPart.length === 0) {
                centsPart = '00';
            } else if (centsPart.length === 1) {
                centsPart += '0';
            }

            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this._stringValue = this._formatToCurrency(amountPart) + this.decimalSeparator + centsPart;
        } else {
            this._stringValue = this._formatToCurrency(this._parseAmount(inputValue));
        }
        this._formatToFloat(this._stringValue);
        this.requestUpdate();
    }

    async _keyDown(e: KeyboardEvent): Promise<void> {
        const input = this._inputElement;
        const caretPosition = input.selectionStart;

        // If the pointer is positioned after a currency separator remove the separator and the preceding number.
        if (input.value.charAt(caretPosition - 1) === this.thousandsSeparator && e.key.toLowerCase() === 'backspace') {
            // If the value includes a cents separator parse the cents and append it to the value.
            if (input.value.includes(this.decimalSeparator)) {
                const centsPart = this._parseCents(input.value.substring(input.value.indexOf(this.decimalSeparator) + 1));
                this._stringValue =
                    this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, caretPosition - 2) +
                                input.value.substring(caretPosition, input.value.indexOf(this.decimalSeparator))
                        )
                    ) +
                    this.decimalSeparator +
                    centsPart;
            } else {
                this._stringValue = this._formatToCurrency(
                    this._parseAmount(input.value.substring(0, caretPosition - 2) + input.value.substring(caretPosition, input.value.length + 1))
                );
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

        // If hitting backspace with the carat in the position of the first decimal then remove the entire cent value.
        if(input.value.includes(this.decimalSeparator) && input.value.charAt(caretPosition - 2) === this.decimalSeparator && e.key.toLowerCase() === 'backspace') {
            this._stringValue = input.value.substring(0, input.value.indexOf(this.decimalSeparator));
            e.preventDefault();
            // Set value prop to float value
            this.value = this._formatToFloat(this._stringValue);
            return;
        }

        // If hitting backspace when the caret is after the cent separator remove the cents value completely.
        if (input.value.charAt(caretPosition - 1) === this.decimalSeparator && e.key.toLowerCase() === 'backspace') {
            this._stringValue = input.value.substring(0, input.value.indexOf(this.decimalSeparator));
            e.preventDefault();
            // Set value prop to float value
            this.value = this._formatToFloat(this._stringValue);
            return;
        }

        // Copy currency field selection to clipboard if ctrl + c is pressed on the keyboard.
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            navigator.clipboard.writeText(this._stringValue);
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

        if (inputValue.includes(this.decimalSeparator)) {
            // Split out the amount and cents parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.decimalSeparator)));

            let centsPart = this._parseCents(inputValue.substring(inputValue.indexOf(this.decimalSeparator) + 1));
            
            if (centsPart.length >= this.decimalPrecision) {
                centsPart = centsPart.substring(0, this.decimalPrecision);
            }
            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this._stringValue = this._formatToCurrency(amountPart) + this.decimalSeparator + centsPart;
        } else {
            this._stringValue = this._formatToCurrency(this._parseAmount(inputValue));
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
        this.value = this._formatToFloat(this._stringValue);
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
                    height: var(--omni-currency-field-height, 100%);
                    padding: var(--omni-currency-field-padding, 10px);
                    width: var(--omni-currency-field-width);
                }

                .currency-symbol {
                    font-size: var(--omni-currency-field-symbol-font-size, var(--omni-font-size));
                    color: var(--omni-currency-field-symbol-color, var(--omni-font-color));
                    padding-left: var(--omni-currency-field-symbol-left-padding, 10px);
                    user-select: var(--omni-currency-field-symbol-select, text);
                }
            `
        ];
    }

    protected override renderPrefix() {
        return html`<omni-label class="currency-symbol">${this.currencySymbol}</omni-label>`;
    }

    protected override renderContent() {
        return html`
            <input
                class="field"
                id="inputField"
                type="text"
                maxlength="21"
                .value=${live(this._stringValue)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}
