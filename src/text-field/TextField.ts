import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Control to input text.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/text-field';
 * ```
 *
 * @example
 * ```html
 * <omni-text-field
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-text-field>
 * ```
 *
 * @element omni-text-field
 *
 * @cssprop --omni-text-field-text-align - Text field text align.
 * @cssprop --omni-text-field-font-color - Text field font color.
 * @cssprop --omni-text-field-font-family - Text field font family.
 * @cssprop --omni-text-field-font-size - Text field font size.
 * @cssprop --omni-text-field-font-weight - Text field font weight.
 * @cssprop --omni-text-field-height - Text field height.
 * @cssprop --omni-text-field-padding - Text field width.
 *
 */
@customElement('omni-text-field')
export class TextField extends OmniFormElement {
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

          text-align: var(--omni-text-field-text-align, left);

          color: var(--omni-text-field-font-color, var(--omni-font-color));
          font-family: var(--omni-text-field-font-family, var(--omni-font-family));
          font-size: var(--omni-text-field-font-size, var(--omni-font-size));
          font-weight: var(--omni-text-field-font-weight, var(--omni-font-weight));
          height: var(--omni-text-field-height, 100%);
          padding: var(--omni-text-field-padding, 10px);
        }
      `
        ];
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
