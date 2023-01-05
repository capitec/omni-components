import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Control to input an email address.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/email-field';
 * ```
 *
 * @example
 * ```html
 * <omni-email-field
 *   label="Enter a value"
 *   value="JohnDoe@mail.com"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-email-field>
 * ```
 *
 * @element omni-email-field
 *
 * @cssprop --omni-email-field-email-align - email field email align.
 * @cssprop --omni-email-field-font-color - email field font color.
 * @cssprop --omni-email-field-font-family - email field font family.
 * @cssprop --omni-email-field-font-size - email field font size.
 * @cssprop --omni-email-field-font-weight - email field font weight.
 * @cssprop --omni-email-field-height - email field height.
 * @cssprop --omni-email-field-padding - email field width.
 *
 */
@customElement('omni-email-field')
export class EmailField extends OmniFormElement {
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

          text-align: var(--omni-email-field-text-align, left);

          color: var(--omni-email-field-font-color, var(--omni-font-color));
          font-family: var(--omni-email-field-font-family, var(--omni-font-family));
          font-size: var(--omni-email-field-font-size, var(--omni-font-size));
          font-weight: var(--omni-email-field-font-weight, var(--omni-font-weight));
          height: var(--omni-email-field-height, 100%);
          padding: var(--omni-email-field-padding, 10px);
          width: var(--omni-email-field-width);
        }
      `
        ];
    }

    protected override renderContent() {
        return html`
      <input
        class="field"
        id="inputField"
        inputmode="email"
        type="email"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}