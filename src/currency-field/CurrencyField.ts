import getSymbolFromCurrency from 'currency-symbol-map';
import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

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
 *  disabled>
 * </omni-currency-field>
 * 
 * @element omni-currency-field
 * 
 * 
 * 
 */
@customElement('omni-currency-field')
export class CurrencyField extends OmniFormElement {
    @query('#inputField')
    private _inputElement: HTMLInputElement;

    /*
    * List of currency symbols supported
    * https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml
    * */

    /**
     * The currency to for on the input.
     * @attr
     */
     @property({ type: String, reflect: true }) currency: string = 'EUR';

     /**
      * The locale to use for the input
      * @attr
      */
     @property({type: String, reflect: true}) locale: string = navigator.language;

     private _currencyFormat = new Intl.NumberFormat(this.locale, {style: 'currency', currency: this.currency});
     private _currencySymbol = getSymbolFromCurrency(this.currency);

     override connectedCallback(): void {
         super.connectedCallback();
         this.addEventListener('input', this._keyInput.bind(this));
     }

     _keyInput() {
         //const number = 123456.789;
         const input = this._inputElement;
         const formattedValue = this._currencyFormat.format(parseInt(input.value));
         console.log(formattedValue);
         //this.value = formattedValue;
         this.value = input.value;
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
         return html`
        <input
            class="field"
            id="inputField"
            type="tel"
            .value=${live(this.value as string)}
            ?readOnly=${this.disabled}
            tabindex="${this.disabled ? -1 : 0}" />
        `; 
     }
}