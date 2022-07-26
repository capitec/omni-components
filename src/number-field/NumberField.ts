import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Input control to enter a single line of numbers.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/number-field';
 * ```
 * @example
 * ```html
 * <omni-number-field
 *   label="Enter a value"
 *   value=12345
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-number-field>
 * ```
 *
 * @element omni-number-field
 *
 * @cssprop --omni-number-field-text-align - Number field text align.
 * @cssprop --omni-number-field-font-color - Number field font color.
 * @cssprop --omni-number-field-font-family - Number field font family.
 * @cssprop --omni-number-field-font-size - Number field font size.
 * @cssprop --omni-number-field-font-weight - Number field font weight.
 * @cssprop --omni-number-field-height - Number field height.
 * @cssprop --omni-number-field-padding - Number field width.
 * @cssprop --omni-number-field-width - Number field width.
 *
 */
@customElement('omni-number-field')
export class NumberField extends OmniFormElement {
    @query('#inputField')
    private _inputElement: HTMLInputElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
    }

    _keyInput() {
        const input = this._inputElement;
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

          text-align: var(--omni-number-field-text-align, left);

          color: var(--omni-number-field-font-color, var(--omni-font-color));
          font-family: var(--omni-number-field-font-family, var(--omni-font-family));
          font-size: var(--omni-number-field-font-size, var(--omni-font-size));
          font-weight: var(--omni-number-field-font-weight, var(--omni-font-weight));
          height: var(--omni-number-field-height, 100%);
          padding: var(--omni-number-field-padding, 10px);
          width: var(--omni-number-field-width);
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
        type="number"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}
