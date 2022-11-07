import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../label/Label.js';

/**
 * A currency input control.
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
 *
 * @element omni-currency-field
 *
 */
@customElement('omni-currency-field')
export class CurrencyField extends OmniFormElement {
    @query('#inputField')
    private _inputElement: HTMLInputElement;

    /**
     * The currency to for on the input.
     * @attr
     */
    @property({ type: String, reflect: true }) currency: string = 'USD';

    /**
     * The locale to used for the input.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = navigator.language;

    /*Internal state values set when component is loaded */
    @state() private _currencyFormat: Intl.NumberFormat;
    @state() private _currencySymbol: string;
    @state() private _currencyFormatSeparator: string;
    @state() private _currencyCentsSeparator: string;

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
        this.addEventListener('blur', this._blur.bind(this));
        this.addEventListener('keydown', this._keyDown.bind(this));
        this._currencyFormat = this._getCurrencyFormat();
        this._currencySymbol = this._getCurrencySymbol();
    }

    //Gets the currency format that will be used to format the input value.
    _getCurrencyFormat() {
        try {
            return new Intl.NumberFormat(this.locale, { currency: this.currency });
        } catch (e) {
            console.log('invalid locale or currency provided, falling back to default', e);
            return new Intl.NumberFormat('en-US', { currency: 'USD' });
        }
    }

    // Get the currency symbol and sets the currency separator and cent separator depending on locale
    _getCurrencySymbol() {
        // Get the currency parts providing a default value of 1000.00 to get the currency separator and cents separator.
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
            console.log('invalid locale or currency provided, fallback will be used', e);
            currencyPartsMap = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' })
                .formatToParts(1000.0)
                .map((c) => c.value);
        }
        // Get the currency symbol
        const currencySymbol = currencyPartsMap[0];

        if (parseInt(currencySymbol)) {
            this._currencyFormatSeparator = currencyPartsMap[1];
            this._currencyCentsSeparator = currencyPartsMap[3];
            return currencyPartsMap.pop();
        } else {
            this._currencyFormatSeparator = currencyPartsMap[2];
            this._currencyCentsSeparator = currencyPartsMap[4];
            return currencySymbol;
        }
    }

    _parseAmount(value: string) {
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

    _parseCents(value: string) {
        let cleanValue = '';
        for (let i = 0; i < value.length; i++) {
            const character = value.charAt(i);
            if (/\d/.test(character)) {
                cleanValue += character;
            }
        }
        return cleanValue;
    }

    _formatToCurrency(preFormattedValue: number) {
        if (!preFormattedValue) {
            return '';
        }
        return this._currencyFormat.format(preFormattedValue);
    }

    //Called when the input element loses focus.
    _blur() {
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
            this.value = this._formatToCurrency(amountPart) + this._currencyCentsSeparator + centsPart;
        } else {
            this.value = this._formatToCurrency(this._parseAmount(inputValue));
        }

        this.requestUpdate();
    }

    async _keyDown(e: KeyboardEvent) {
        const input = this._inputElement;
        const point = input.selectionStart;

        //If the pointer is positioned after a currency separator remove the separator and the preceding number.
        if (input.value.charAt(point - 1) === this._currencyFormatSeparator && e.key.toLowerCase() === 'backspace') {
            //If the value includes a cents separator parse the cents and append it to the value.
            if (input.value.includes(this._currencyCentsSeparator)) {
                const centsPart = this._parseCents(input.value.substring(input.value.indexOf(this._currencyCentsSeparator) + 1));
                this.value =
                    this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, point - 2) +
                                input.value.substring(point, input.value.indexOf(this._currencyCentsSeparator))
                        )
                    ) +
                    this._currencyCentsSeparator +
                    centsPart;
            } else {
                this.value = this._formatToCurrency(
                    this._parseAmount(input.value.substring(0, point - 2) + input.value.substring(point, input.value.length + 1))
                );
            }

            //Added so that the number before the separator is not removed.
            e.preventDefault();

            await this.updateComplete;

            //
            if (input.value.length === (this.value as string).length) {
                this._inputElement.setSelectionRange(point - 1, point - 1);
            }
        }

        // If hitting backspace when the caret is after the cent separator remove the cents value completely.
        if (input.value.charAt(point - 1) === this._currencyCentsSeparator && e.key.toLowerCase() === 'backspace') {
            this.value = input.value.substring(0, input.value.indexOf(this._currencyCentsSeparator));
            e.preventDefault();
            return;
        }

        // Copy currency field selection to clipboard if ctrl + c is pressed on the keyboard.
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            navigator.clipboard.writeText(this.value as string);
            return;
        }
    }

    async _keyInput() {
        const valueLength = this._inputElement.value.length;
        const caretPosition = this._inputElement.selectionStart;
        const inputValue = this._inputElement.value;

        if (inputValue.includes(this._currencyCentsSeparator)) {
            // Split out the amount and cents parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this._currencyCentsSeparator)));

            let centsPart = this._parseCents(inputValue.substring(inputValue.indexOf(this._currencyCentsSeparator) + 1));

            if (centsPart.length >= 2) {
                centsPart = centsPart.substring(0, 2);
            }
            // Format amount and cents to currency string, ignoring cents if still partially completed eg: just '.' is valid.
            this.value = this._formatToCurrency(amountPart) + this._currencyCentsSeparator + centsPart;
        } else {
            this.value = this._formatToCurrency(this._parseAmount(inputValue));
        }

        this.requestUpdate();
        await this.updateComplete;

        if (valueLength < (this.value as string).length) {
            const difference = (this.value as string).length - valueLength;
            this._inputElement.setSelectionRange(caretPosition + difference, caretPosition + difference);
        } else {
            this._inputElement.setSelectionRange(caretPosition, caretPosition);
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
                    padding: 0;
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
                    font-size: var(--omni-currency-field-symbol, var(--omni-font-size));
                    color: var(--omni-currency-field-symbol-color, var(--omni-font-color));
                    padding-left: var(--omni-currency-field-symbol-left-padding, 10px);
                    user-select: all;
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
                .value=${live(this.value as string)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}
