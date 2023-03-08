import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
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
 * @cssprop --omni-currency-field-disabled-font-color -
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
     * Formatter provided to format the value.
     * @attr
     */
    @property({ type: String, reflect: true }) formatter: string = '\\B(?=(\\d{3})+(?!\\d))';

    override connectedCallback(): void {
        super.connectedCallback();
        /*
        this.addEventListener('focusin', this._onFocusInput.bind(this), {
            capture: true
        });*/
        this.addEventListener('click', this._clickInput.bind(this), {
            capture: true
        });
        this.addEventListener('focus', this._focusInput.bind(this), {
            capture: true
        });
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        /*
        this.addEventListener('blur', this._blur.bind(this), {
            capture: true
        });*/
        this.addEventListener('keydown', this._keyDown.bind(this), {
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

    // Check if the device is a Iphone or Ipad running IOS.
    _isIOS() {
        return (
            ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
            // iPad on iOS 13 detection
            navigator.userAgent.includes('Mac')
        );
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
                return Number(parseFloat(preFloatReplaceAll).toFixed(this.fractionalPrecision));
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
        console.log('focusin hit');

        const input = this._inputElement as HTMLInputElement;
        if(!this.value) {
            this.value = '0.00';
        }

        if(input){
            setTimeout(function(){ input.selectionStart = input.selectionEnd = 10000; }, 0);
        }

    }

    _clickInput() {
        console.log('click');

        const input = this._inputElement as HTMLInputElement;
        
        if(input){
            setTimeout(function(){ input.selectionStart = input.selectionEnd = 10000; }, 0);
        }
    }   

    // Format the currency value when the component loses focus
    async _blur(): Promise<void> {
        const inputValue = this._inputElement?.value;

        if (inputValue?.includes(this.fractionalSeparator)) {
            // Split out the amount and fraction (cents) parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.fractionalSeparator)));

            let fractionPart = this._parseFraction(inputValue.substring(inputValue.indexOf(this.fractionalSeparator) + 1));

            const fractionalDifference = this.fractionalPrecision - fractionPart.length;
            if (fractionalDifference > 0) {
                for (let index = 0; index < fractionalDifference; index++) {
                    fractionPart += '0';
                }
            }

            await this._formatToCurrency(amountPart as number).then((res) => {
                this._inputElement!.value = res + (this.fractionalPrecision > 0 ? this.fractionalSeparator + fractionPart : '');
            });
        } else {
            await this._formatToCurrency(this._parseAmount(inputValue as string) as number).then((res) => {
                this._inputElement!.value = res;
            });
        }
        this.value = this._formatToFloat(this._inputElement?.value as string);
    }

    //
    async _keyDown(e: KeyboardEvent): Promise<void> {
        const input = this._inputElement as HTMLInputElement;
        const selectionEnd = this._inputElement!.selectionEnd!;
        const selectionStart = this._inputElement!.selectionStart!;
        const caretPosition = input.selectionStart;
        const selection = selectionEnd - selectionStart;
        let valueFormatterCount = 0;

        console.log('keydown event', e);

        // Stop alpha keys from moving the caret position.
        if (e.key >= 'a' && e.key <= 'z') {
            e.preventDefault();
            return;
        }

        // Copy currency field selection to clipboard.
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            navigator.clipboard.writeText(input.value);
            return;
        }
        
        console.log('input value at keydown', input.value);

        //convert current value to cents
        //const centValue = input.value;

        /*
        if() {

        }*/

        // Check if the device is a Iphone or Ipad.
        /*
        if (this._isIOS()) {
            if (e.keyCode === 188) {
                // Check if caret is at end of the input.
                if (input.value.length === input.selectionEnd) {
                    input.value = input.value + this.fractionalSeparator;
                }
            }
        }*/

        // If the pointer is positioned after a currency separator remove the separator and the preceding number.
        if (
            input.value.charAt((caretPosition as number) - 1) === this.thousandsSeparator &&
            (e.key.toLowerCase() === 'backspace' || e.keyCode === 229)
        ) {
            // Count of the thousand separators of the component.
            valueFormatterCount = input.value.match(new RegExp(this.thousandsSeparator, 'g'))!.length;

            // If the value includes a fraction (cents) separator parse the fraction part and append it to the value.
            if (input.value.includes(this.fractionalSeparator)) {
                const fractionPart = this._parseFraction(input.value.substring(input.value.indexOf(this.fractionalSeparator) + 1));

                if (selection) {
                    await this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, caretPosition! - 1) +
                                input.value.substring(caretPosition! + selection, input.value.indexOf(this.fractionalSeparator))
                        ) as number
                    ).then((res) => {
                        input.value = res + this.fractionalSeparator + fractionPart;
                    });
                } else {
                    await this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, caretPosition! - 2) +
                                input.value.substring(caretPosition! + selection, input.value.indexOf(this.fractionalSeparator))
                        ) as number
                    ).then((res) => {
                        input.value = res + this.fractionalSeparator + fractionPart;
                    });
                }
            } else {
                if (selection) {
                    if (input.value.length === input.selectionEnd) {
                        await this._formatToCurrency(this._parseAmount(input.value.substring(0, caretPosition! - 1)) as number).then((res) => {
                            this._inputElement!.value = res;
                        });
                    } else {
                        await this._formatToCurrency(
                            this._parseAmount(
                                input.value.substring(0, caretPosition! - 1) +
                                    input.value.substring(input.selectionEnd as number, input.value.length + 1)
                            ) as number
                        ).then((res) => {
                            this._inputElement!.value = res;
                        });
                    }
                } else {
                    await this._formatToCurrency(
                        this._parseAmount(
                            input.value.substring(0, caretPosition! - 2) + input.value.substring(caretPosition! + selection, input.value.length + 1)
                        ) as number
                    ).then((res) => {
                        this._inputElement!.value = res;
                    });
                }
            }

            // Added so that the number before the separator is not removed.
            e.preventDefault();

            const floatValue = this._formatToFloat(input.value);
            this.value = floatValue;

            await this.updateComplete;

            // Set caret position after value is formatted.
            const postFormatterCount = input.value.match(new RegExp(this.thousandsSeparator, 'g'))!.length;
            const formatterDifference = valueFormatterCount - postFormatterCount;
            if (selection) {
                this._inputElement!.setSelectionRange(caretPosition! - 1, caretPosition! - 1);
            } else {
                this._inputElement!.setSelectionRange(caretPosition! - 1 - formatterDifference, caretPosition! - 1 - formatterDifference);
            }
        }

        // When the delete key is pressed and the caret is positioned at the thousand separator
        if (input.value.charAt(caretPosition!) === this.thousandsSeparator && this.thousandsSeparator !== '' && e.key.toLowerCase() === 'delete') {
            // Calculate the what values to remove from the input.
            const diff = selectionEnd - selectionStart > 0 ? selectionEnd - selectionStart : 2;

            if (input.value.includes(this.fractionalSeparator)) {
                const fractionPart = this._parseFraction(input.value.substring(input.value.indexOf(this.fractionalSeparator) + 1));

                await this._formatToCurrency(
                    this._parseAmount(
                        input.value.substring(0, caretPosition!) +
                            input.value.substring(caretPosition! + diff, input.value.indexOf(this.fractionalSeparator))
                    ) as number
                ).then((res) => {
                    input.value = res + this.fractionalSeparator + fractionPart;
                });
            } else {
                await this._formatToCurrency(
                    input.value.substring(0, caretPosition!) + input.value.substring(caretPosition! + diff, input.value.length + 1)
                ).then((res) => {
                    input.value = res;
                });
            }

            e.preventDefault();
            this.value = this._formatToFloat(input.value);

            await this.updateComplete;

            this._inputElement?.setSelectionRange(caretPosition, caretPosition);
        }

        // Delete fraction (cents) part if delete button is clicked.
        if (input.value.charAt(caretPosition!) === this.fractionalSeparator && e.key.toLowerCase() === 'delete') {
            input.value = input.value.substring(0, input.value.indexOf(this.fractionalSeparator));
            this.value = this._formatToFloat(input.value);
            return;
        }

    }

    async _keyInput(): Promise<void> {
        //console.log('keyinput event', e);
        const preValueLength = this._inputElement!.value.length;
        const caretPosition = this._inputElement!.selectionStart;
        const inputValue = this._inputElement!.value;

        if (inputValue.includes(this.fractionalSeparator)) {
            // Split out the amount and fraction (cents) parts of the input value
            const amountPart = this._parseAmount(inputValue.substring(0, inputValue.indexOf(this.fractionalSeparator)));

            let fractionPart = this._parseFraction(inputValue.substring(inputValue.indexOf(this.fractionalSeparator) + 1));

            if (fractionPart.length >= this.fractionalPrecision) {
                fractionPart = fractionPart.substring(0, this.fractionalPrecision);
            }
            // Format amount and fraction (cents) to currency string, ignoring fraction if still partially completed eg: just '.' is valid.
            await this._formatToCurrency(amountPart as number).then((res) => {
                this._inputElement!.value = res + this.fractionalSeparator + fractionPart;
            });
        } else {
            await this._formatToCurrency(this._parseAmount(inputValue) as number).then((res) => {
                this._inputElement!.value = res;
            });
        }

        // Set the value to a float value.
        this.value = this._formatToFloat(inputValue);

        await this.updateComplete;

        // Length of the input value after the input value is updated and formatted.
        const postValueLength = this._inputElement?.value.length;

        // Position the caret in the correct position.
        if ((postValueLength as number) > preValueLength) {
            this._inputElement!.setSelectionRange(caretPosition! + 1, caretPosition! + 1);
        } else if (preValueLength > postValueLength!) {
            this._inputElement!.setSelectionRange(caretPosition! - 1, caretPosition! - 1);
        } else {
            this._inputElement!.setSelectionRange(caretPosition, caretPosition);
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
                inputmode="decimal"
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
