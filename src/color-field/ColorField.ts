import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Color input control.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/color-field';
 * ```
 * @example
 *
 * ```html
 * <omni-color-field
 *   label="Enter a value"
 *   value="#F6B73C"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-color-field>
 * ```
 *
 * @element omni-color-field
 *
 * @cssprop --omni-color-field-text-align - Color field text align.
 * @cssprop --omni-color-field-font-color - Color field font color.
 * @cssprop --omni-color-field-font-family - Color field font family.
 * @cssprop --omni-color-field-font-size - Color field font size.
 * @cssprop --omni-color-field-font-weight - Color field font weight.
 * @cssprop --omni-color-field-picker-height - Color field picker height.
 * @cssprop --omni-color-field-picker-width - Color field picker width.
 * @cssprop --omni-color-field-height - Color field height.
 * @cssprop --omni-color-field-padding - Color field width.
 * @cssprop --omni-color-field-min-height - Color field min height.
 * @cssprop --omni-color-field-min-width - Color field min width.
 * @cssprop --omni-color-field-text-select - Color field text selection.
 *
 */
@customElement('omni-color-field')
export class ColorField extends OmniFormElement {
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
          display: flex;
          justify-content: center;
          align-items: center;

          flex: 1 1 auto;

          border: none;
          background: none;
          box-shadow: none;
          outline: 0;
          padding: 0;
          margin: 0;

          text-align: var(--omni-color-field-text-align, left);

          color: var(--omni-color-field-font-color, var(--omni-font-color));
          font-family: var(--omni-color-field-font-family, var(--omni-font-family));
          font-size: var(--omni-color-field-font-size, var(--omni-font-size));
          font-weight: var(--omni-color-field-font-weight, var(--omni-font-weight));
          height: var(--omni-color-field-height, 100%);
          min-height: var(--omni-color-field-min-height, 20px);
          min-width: var(--omni-color-field-min-width, 100px);
          padding: var(--omni-color-field-padding, 10px);

          -webkit-touch-callout: var(--omni-color-field-text-select, text);
          -webkit-user-select: var(--omni-color-field-text-select, text);
          -khtml-user-select: var(--omni-color-field-text-select, text);
          -moz-user-select: var(--omni-color-field-text-select, text);
          -ms-user-select: var(--omni-color-field-text-select, text);
          user-select: var(--omni-color-field-text-select, text);
        }

        .color-input {
          flex: 1 1 auto;

          border: none;
          background: none;
          box-shadow: none;
          outline: 0;
          padding: 0;
          margin: 0;

          text-align: var(--omni-color-field-text-align, left);

          color: var(--omni-color-field-font-color, var(--omni-font-color));
          font-family: var(--omni-color-field-font-family, var(--omni-font-family));
          font-size: var(--omni-color-field-font-size, var(--omni-font-size));
          font-weight: var(--omni-color-field-font-weight, var(--omni-font-weight));
          height: var(--omni-color-field-picker-height, 50px);
          width: var(--omni-color-field-picker-width, 50px);
          padding: var(--omni-color-field-padding, 10px);
        }

        :host(:not([value])) input[type='color']::-webkit-color-swatch,
        :host([value='']) input[type='color']::-webkit-color-swatch {
          background-color: transparent !important;
        }
      `
        ];
    }

    protected override renderContent() {
        return html` <label for="inputField" class="field"> ${this.value?.toString()?.toUpperCase()} </label> `;
    }

    protected override renderControl() {
        return html`
      <input
        class="color-input"
        id="inputField"
        type="color"
        .value=${live(this.value as string)}
        ?disabled=${this.disabled}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-color-field': ColorField;
    }
}
