import { html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control to select a single value from a group of values.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/radio';
 * ```
 *
 * @example
 * ```html
 * <omni-radio
 *   label="My Toggle Value"
 *   hint="Required"
 *   error="Field level error message"
 *   checked
 *   disabled>
 * </omni-radio>
 * ```
 *
 * @element omni-radio
 *
 * Registry of all properties defined by the component.
 *
 * @slot - Content to render inside the component.
 *
 * @fires {CustomEvent<{ old: Boolean; new: Boolean; }>} value-change - Dispatched when the control value is changed to either on or off.
 *
 * @cssprop --omni-radio-width - Width.
 * @cssprop --omni-radio-height - Height.
 * @cssprop --omni-radio-padding - Padding.
 *
 * @cssprop --omni-radio-label-font-color - Label Font Color.
 * @cssprop --omni-radio-label-font-family - Label Font Family.
 * @cssprop --omni-radio-label-font-size - Label Font Size.
 * @cssprop --omni-radio-label-font-weight - Label Font Weight.
 * @cssprop --omni-radio-label-line-height - Label Line Height.
 * @cssprop --omni-radio-label-spacing - Label Spacing.
 *
 * @cssprop --omni-input-hint-label-font-color - Hint Font Color.
 * @cssprop --omni-input-hint-label-font-family - Hint Font Family.
 * @cssprop --omni-input-hint-label-font-size - Hint Font Size.
 * @cssprop --omni-input-hint-label-font-weight - Hint Font Weight.
 *
 * @cssprop --omni-input-error-label-font-color - Error Font Color.
 * @cssprop --omni-input-error-label-font-family - Error Font Family.
 * @cssprop --omni-input-error-label-font-size - Error Font Size.
 * @cssprop --omni-input-error-label-font-weight - Error Font Weight.
 *
 * @cssprop --omni-radio-background-color - Background Color.
 * @cssprop --omni-radio-border-width - Border Width.
 * @cssprop --omni-radio-border-style - Border Style.
 * @cssprop --omni-radio-border-color - Border Color.
 * @cssprop --omni-radio-border-radius - Border Radius.
 *
 * @cssprop --omni-radio-indicator-border-width - Indicator Border Width.
 * @cssprop --omni-radio-indicator-border-color - Indicator Border Color.
 * @cssprop --omni-radio-border-radius - Indicator Border Radius.
 * @cssprop --omni-radio-indicator-color - Indicator Color.
 *
 * @cssprop --omni-radio-checked-background-color - Checked Background color.
 *
 * @cssprop --omni-radio-hover-box-shadow - Hover Box Shadow.
 * @cssprop --omni-radio-hover-background-color - Hover Background Color.
 *
 * @cssprop --omni-radio-disabled-border-color - Disabled Border Color.
 * @cssprop --omni-radio-disabled-background-color - Disabled Background Color.
 *
 */
@customElement('omni-radio')
export class Radio extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Data associated with the component.
     * @attr
     */
    @property({ type: Object, reflect: true }) data?: object;

    /**
     * A hint message to assist the user.
     * @attr
     */
    @property({ type: String, reflect: true }) hint?: string;

    /**
     * An error message to guide users to correct a mistake.
     * @attr
     */
    @property({ type: String, reflect: true }) error?: string;

    /**
     * Indicator if the component is checked or not.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) checked?: boolean;

    /**
     * Indicator if the component is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    override focus() {
        this.shadowRoot?.getElementById('content')?.focus();
    }

    _click(event: MouseEvent): void {
        // Ignore the event if the component is disabled.
        if (this.disabled) {
            return event.stopImmediatePropagation();
        }

        // Toggle the component checked state.
        this._toggleChecked();
    }

    _keyDown(event: KeyboardEvent): void {
        // Ignore the event if the component is disabled.
        if (this.disabled) {
            return event.stopImmediatePropagation();
        }

        // Intercept space and enter key events to toggle the component checked state.
        const keyCode = (event.code || '').toUpperCase();

        if (keyCode === 'SPACE' || keyCode === 'ENTER') {
            // Toggle the component checked state.
            this._toggleChecked();

            // Prevent the key event from propagating further.
            return event.preventDefault();
        }
    }

    _toggleChecked(): void {
        const oldValue = this.checked;
        this.checked = !oldValue;

        this.dispatchEvent(
            new CustomEvent('value-change', {
                detail: {
                    old: oldValue,
                    new: this.checked
                }
            })
        );
    }

    static override get styles() {
        return [
            super.styles,
            css`
        :host {
          --omni-radio-width: 24px;
          --omni-radio-height: 24px;

          --omni-radio-padding: 2px;
        }

        /* CONTAINER STYLES */

        .container {
          display: flex;
          align-items: center;
        }

        .container > .label {
          color: var(--omni-radio-label-font-color, var(--omni-font-color));
          font-family: var(--omni-radio-label-font-family, var(--omni-font-family));
          font-size: var(--omni-radio-label-font-size, var(--omni-font-size));
          font-weight: var(--omni-radio-label-font-weight, var(--omni-font-weight));
          line-height: var(--omni-radio-label-line-height, 20px);

          margin-left: var(--omni-radio-label-spacing, 8px);

          cursor: default;
        }

        .container > .label > .hint {
          color: var(--omni-input-hint-label-font-color, var(--omni-hint-font-color));
          font-family: var(--omni-input-hint-label-font-family, var(--omni-font-family));
          font-size: var(--omni-input-hint-label-font-size, 0.86em);
          font-weight: var(--omni-input-hint-label-font-weight, 300);

          padding-top: 4px;
        }

        .container > .label > .error {
          color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
          font-family: var(--omni-input-error-label-font-family, var(--omni-font-family));
          font-size: var(--omni-input-error-label-font-size, 0.86em);
          font-weight: var(--omni-input-error-label-font-weight, 300);

          padding-top: 4px;
        }

        /* RADIO BUTTON STYLES */

        .container > #content {
          box-sizing: border-box;
          cursor: pointer;

          display: flex;
          align-items: center;
          align-self: flex-start;
          justify-content: center;

          min-width: var(--omni-radio-width, 24px);
          min-height: var(--omni-radio-height, 24px);
          max-width: var(--omni-radio-width, 24px);
          max-height: var(--omni-radio-height, 24px);

          margin: var(--omni-radio-padding, 2px);

          background-color: var(--omni-radio-background-color, var(--omni-background-color));

          border-width: var(--omni-radio-border-width, var(--omni-border-width));
          border-style: var(--omni-radio-border-style, solid);
          border-color: var(--omni-radio-border-color, var(--omni-primary-color));
          border-radius: var(--omni-radio-border-radius, 50%);

          outline: 0;
        }

        .container.checked > #content > .indicator {
          width: calc(var(--omni-radio-width) - var(--omni-radio-padding) * 2);
          height: calc(var(--omni-radio-height) - var(--omni-radio-padding) * 2);

          border-width: var(--omni-radio-indicator-border-width, var(--omni-border-width));
          border-style: solid;
          border-color: var(--omni-radio-indicator-border-color, var(--omni-background-color));
          border-radius: var(--omni-radio-border-radius, 50%);

          color: var(--omni-radio-indicator-color, var(--omni-background-color));
        }

        /* CHECKED STATE STYLES */

        .container.checked > #content {
          background-color: var(--omni-radio-checked-background-color, var(--omni-primary-color));
        }

        /* HOVER STATE STYLES */

        .container > #content:hover {
          box-shadow: var(--omni-radio-hover-box-shadow, var(--omni-box-shadow));
          background-color: var(--omni-radio-hover-background-color, var(--omni-box-shadow-color));
        }

        .container.checked:hover > #content {
          background-color: var(--omni-radio-checked-background-color, var(--omni-primary-color));
        }
        /* DISABLED STATE STYLES */

        .container.disabled > #content {
          cursor: default;
          border-color: var(--omni-radio-disabled-border-color, var(--omni-disabled-border-color));
          background-color: var(--omni-radio-disabled-background-color, var(--omni-disabled-background-color));
        }

        .container.disabled.checked > #content {
          background-color: var(--omni-radio-disabled-background-color, var(--omni-disabled-background-color));
        }

        .container.disabled:hover > #content {
          box-shadow: none;
        }

        :host(:not([disabled])) .container > #label {
          cursor: pointer;
        }
      `
        ];
    }

    override render(): TemplateResult {
        return html`
        <div
            class=${classMap({
                container: true,
                checked: this.checked ?? false,
                disabled: this.disabled ?? false
            })}>
            <div id="content" tabindex="${this.disabled ? '' : 0}" @click="${this._click}" @keydown="${this._keyDown}">
                ${this.checked ? html`<div class="indicator"></div>` : nothing}
            </div>
            <label id="label" class="label" @click="${this._click}">
                <slot></slot>
                ${this.label} ${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : nothing}
                ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
                </label>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-radio': Radio;
    }
}
