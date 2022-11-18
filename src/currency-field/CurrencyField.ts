import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { debounce } from 'lodash';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../label/Label.js';

export const CURRENCY_SEPARATOR = {
    AMOUNT: 1,
    INVERSE_AMOUNT: 2,
    CENTS: 3,
    INVERSE_CENTS: 4
};

/**
 * A currency input control that formats input based on currency and locale.
 *
 * ```js
 *
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
 *  locale="en-US"
 *  currency="USD"
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
     * The currency for the input.
     * @attr
     */
    @property({ type: String, reflect: true }) currency: string = 'USD';

    /**
     * The locale for the input.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = navigator.language;

    // Internal state properties
    @state() private _currencyFormat: Intl.NumberFormat;
    @state() private _currencySymbol: string;
    @state() private _currencyFormatSeparator: string;
    @state() private _currencyCentsSeparator: string;
    @state() private _stringValue: string = '';

    private _symbolAndFormateUpdate = debounce(() => this._updateSymbolAndFormat(), 800);

    constructor() {
        super();
        this._updateSymbolAndFormat();
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
        this.addEventListener('blur', this._blur.bind(this));
        this.addEventListener('keydown', this._keyDown.bind(this));
    }

    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);

        if (name === 'currency' || name === 'locale') {
            await this.updateComplete;
            this._symbolAndFormateUpdate();
        }

        if (name === 'value') {
            if (typeof value === 'string') {
                this._stringValue = this._formatToCurrency(parseFloat(value));
            } else {
                this._stringValue = this._formatToCurrency(value);
            }
        }
    }

    _updateSymbolAndFormat(): void {
        this._setSymbolAndSeparators();
        this._setCurrencyFormat();
    }

    // Set the currency format that will be used to format the input value.
    _setCurrencyFormat(): void {
        try {
            this._currencyFormat = new Intl.NumberFormat(this.locale, { currency: this.currency });
        } catch (e) {
            console.error('invalid locale or currency provided, falling back to default', e);
            this._currencyFormat = new Intl.NumberFormat('en-US', { currency: 'USD' });
        }
    }

    // Set the currency symbol and sets the currency format separator and cent separator depending on locale.
    _setSymbolAndSeparators(): void {
        /*
         * Set the currency parts providing a default value of 1000.0 to return an array to get the currency separator and cents separator.
         * Results can be the following based on the locale provided.
         * ["$", "1", ",", "000", ".", "00"]
         * ["1", ".", "000", ",", "00", " ", "$"]
         */
        let currencyPartsMap = [];
        try {
            currencyPartsMap = new Intl.NumberFormat(this.locale, {
                style: 'currency',
                currency: this.currency,
                currencyDisplay: 'narrowSymbol'
            })
                .formatToParts(1000.0)
                .map((c) => c.value);
        } catch (e) {
            console.error('invalid locale or currency provided, fallback will be used', e);
            currencyPartsMap = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' })
                .formatToParts(1000.0)
                .map((c) => c.value);
        }
        // Get the currency symbol assuming it is the value at the first index of the array.
        const currencySymbol = currencyPartsMap[0];

        // Check to see if value at first index of the array is a number Some locales will have the currency symbol at the last index.
        if (parseInt(currencySymbol)) {
            this._currencyFormatSeparator = currencyPartsMap[CURRENCY_SEPARATOR.AMOUNT];
            this._currencyCentsSeparator = currencyPartsMap[CURRENCY_SEPARATOR.CENTS];
            this._currencySymbol = currencyPartsMap[currencyPartsMap.length - 1];
        } else {
            this._currencyFormatSeparator = currencyPartsMap[CURRENCY_SEPARATOR.INVERSE_AMOUNT];
            this._currencyCentsSeparator = currencyPartsMap[CURRENCY_SEPARATOR.INVERSE_CENTS];
            this._currencySymbol = currencySymbol;
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

    _formatToCurrency(preFormattedValue: number): string {
        if (!preFormattedValue) {
            return '';
        }
        return this._currencyFormat.format(preFormattedValue);
    }

    // Format the internal value to a float.
    _formatToFloat(formattedValue: string): string | number {
        if (formattedValue.length > 0) {
            const preFloatReplaceAll = formattedValue
                .replaceAll(this._currencyFormatSeparator, '')
                .replace(this._currencyCentsSeparator, '.');
            return parseFloat(preFloatReplaceAll);
        } else {
            return '';
        }
    }

    _blur(): void {
        const inputValue = this._inputElement.value;

        if (inputValue.includes(this._currencyCentsSeparator)) {
            // Split out the amount and cents parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this._currencyCentsSeparator)));

            let centsPart = this._parseCents(inputValue.substring(inputValue.indexOf(this._currencyCentsSeparator) + 1));
            if (centsPart.length === 0) {
                centsPart = '00';
            } else if (centsPart.length === 1) {
                centsPart += '0';
            }

            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this._stringValue = this._formatToCurrency(amountPart) + this._currencyCentsSeparator + centsPart;
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
        if (input.value.charAt(caretPosition - 1) === this._currencyFormatSeparator && e.key.toLowerCase() === 'backspace') {
            // If the value includes a cents separator parse the cents and append it to the value.
            if (input.value.includes(this._currencyCentsSeparator)) {
                const centsPart = this._parseCents(input.value.substring(input.value.indexOf(this._currencyCentsSeparator) + 1));
                this._stringValue =
                    this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, caretPosition - 2) +
                                input.value.substring(caretPosition, input.value.indexOf(this._currencyCentsSeparator))
                        )
                    ) +
                    this._currencyCentsSeparator +
                    centsPart;
            } else {
                this._stringValue = this._formatToCurrency(
                    this._parseAmount(
                        input.value.substring(0, caretPosition - 2) + input.value.substring(caretPosition, input.value.length + 1)
                    )
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

        // If hitting backspace when the caret is after the cent separator remove the cents value completely.
        if (input.value.charAt(caretPosition - 1) === this._currencyCentsSeparator && e.key.toLowerCase() === 'backspace') {
            this._stringValue = input.value.substring(0, input.value.indexOf(this._currencyCentsSeparator));
            e.preventDefault();
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

        if (inputValue.includes(this._currencyFormatSeparator)) {
            formatterCount = this._inputElement.value.match(new RegExp(this._currencyFormatSeparator, 'g')).length;
        }

        if (inputValue.includes(this._currencyCentsSeparator)) {
            // Split out the amount and cents parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this._currencyCentsSeparator)));

            let centsPart = this._parseCents(inputValue.substring(inputValue.indexOf(this._currencyCentsSeparator) + 1));

            if (centsPart.length >= 2) {
                centsPart = centsPart.substring(0, 2);
            }
            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this._stringValue = this._formatToCurrency(amountPart) + this._currencyCentsSeparator + centsPart;
        } else {
            this._stringValue = this._formatToCurrency(this._parseAmount(inputValue));
        }

        this.requestUpdate();

        if (this._stringValue.includes(this._currencyFormatSeparator)) {
            valueFormatterCount = this._stringValue.match(new RegExp(this._currencyFormatSeparator, 'g')).length;
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
        return html`<omni-label class="currency-symbol">${this._currencySymbol}</omni-label>`;
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
