import { html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control to switch a value on or off.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/switch';
 * ```
 *
 * @example
 * ```html
 * <omni-switch
 *   label="My Switch Value"
 *   hint="Required"
 *   error="Field level error message"
 *   checked>
 * </omni-switch>
 * ```
 *
 * @element omni-switch
 *
 * Registry of all properties defined by the component.
 *
 * @slot - Content to render inside the component.
 *
 * @fires {CustomEvent<{ old: Boolean; new: Boolean; }>} value-change - Dispatched when the switch checked state is changed.
 *
 * @cssprop --omni-switch-label-font-color - Label font color.
 * @cssprop --omni-switch-label-font-family - Label font family.
 * @cssprop --omni-switch-label-font-size - Label font size.
 * @cssprop --omni-switch-label-font-weight - Label font weight.
 * @cssprop --omni-switch-label-spacing - Label left margin spacing.
 *
 * @cssprop --omni-switch-input-hint-label-font-color - Hint text font color.
 * @cssprop --omni-switch-input-hint-label-font-family - Hint text font family.
 * @cssprop --omni-switch-input-hint-label-font-size - Hint text font size.
 * @cssprop --omni-switch-input-hint-label-font-weight - Hint text font weight.
 *
 * @cssprop --omni-switch-input-error-label-font-color - Error text font color.
 * @cssprop --omni-switch-input-error-label-font-family - Error text font family.
 * @cssprop --omni-switch-input-error-label-font-size - Error text font size.
 * @cssprop --omni-switch-input-error-label-font-weight - Error text font weight.
 *
 * @cssprop --omni-switch-track-width - Track width.
 * @cssprop --omni-switch-track-height - Track height.
 * @cssprop --omni-switch-track-background-color - Track background color.
 * @cssprop --omni-switch-track-border-radius - Track border radius.
 * @cssprop --omni-switch-track-inset - Track inset margins.
 *
 * @cssprop --omni-switch-knob-height - Knob height.
 * @cssprop --omni-switch-knob-width - Knob width.
 * @cssprop --omni-switch-knob-background-color - Knob background color.
 * @cssprop --omni-switch-knob-box-shadow - Knob box shadow.
 *
 * @cssprop --omni-switch-knob-hover-box-shadow - Knob hover box shadow.
 *
 * @cssprop --omni-switch-checked-track-background-color - Track checked background color.
 * @cssprop --omni-switch-checked-hover-knob-box-shadow - Knob checked hover box shadow.
 * @cssprop --omni-switch-disabled-track-background-color - Track disabled background color.
 * @cssprop --omni-switch-checked-knob-background-color - Knob checked background color.
 *
 * @cssprop --omni-switch-disabled-knob-background-color - Knob disabled background color..
 * @cssprop --omni-switch-disabled-knob-box-shadow - Knob disabled hover box shadow.
 *
 */
@customElement('omni-switch')
export class Switch extends OmniElement {
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
     * Hint message to assist the user.
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
        this.shadowRoot?.getElementById('track')?.focus();
    }

    _click(event: MouseEvent): void {
        // Ignore the event if the component is disabled.
        if (this.disabled) {
            return event.stopImmediatePropagation();
        }

        // Switch the component checked state.
        this._switchChecked();
    }

    _switchChecked(): void {
        // Record the previous state.
        const oldValue = this.checked;

        // Invert the checked state.
        this.checked = !oldValue;

        this.dispatchEvent(
            new CustomEvent('value-change', {
                detail: {
                    old: oldValue,
                    new: this.checked
                },
                bubbles: true
            })
        );
    }

    _keyDown(event: KeyboardEvent): void {
        // Ignore the event if the component is disabled.
        if (this.disabled) {
            return event.stopImmediatePropagation();
        }

        // Intercept space and enter key events to switch the component checked state.
        const keyCode = (event.code || '').toUpperCase();

        if (keyCode === 'SPACE' || keyCode === 'ENTER' || keyCode === 'NUMPADENTER') {
            // Switch the component checked state.
            this._switchChecked();

            // Prevent the key event from propagating further.
            return event.preventDefault();
        }
    }

    static override get styles() {
        return [
            super.styles,
            css`
        /* CONTAINER STYLES */
        .container {
          display: flex;
          align-items: center;
        }
        /* LABEL STYLES */

        .container > .label {
          color: var(--omni-switch-label-font-color, var(--omni-font-color));
          font-family: var(--omni-switch-label-font-family, var(--omni-font-family));
          font-size: var(--omni-switch-label-font-size, var(--omni-font-size));
          font-weight: var(--omni-switch-label-font-weight, var(--omni-font-weight));
          margin-left: var(--omni-switch-label-spacing, 8px);
          cursor: default;
        }
        .container > .label > .hint {
          color: var(--omni-switch-input-hint-label-font-color, var(--omni-hint-font-color));
          font-family: var(--omni-switch-input-hint-label-font-family, var(--omni-font-family));
          font-size: var(--omni-switch-input-hint-label-font-size, 0.86em);
          font-weight: var(--omni-switch-input-hint-label-font-weight, 300);
          padding-top: 4px;
        }
        .container > .label > .error {
          color: var(--omni-switch-input-error-label-font-color, var(--omni-error-font-color));
          font-family: var(--omni-switch-input-error-label-font-family, var(--omni-font-family));
          font-size: var(--omni-switch-input-error-label-font-size, 0.86em);
          font-weight: var(--omni-switch-input-error-label-font-weight, 300);
          padding-top: 4px;
        }
        /* SWITCH BUTTON STYLES */
        .container > #content {
          box-sizing: border-box;
          cursor: pointer;
          display: grid;
          align-items: center;
        }

        .container > #content > .track {
          width: var(--omni-switch-track-width, 23px);
          height: var(--omni-switch-track-height, 12px);
          grid-row: 1;
          grid-column: 1;

          background-color: var(--omni-switch-track-background-color, var(--omni-inactive-color));
          border-radius: var(--omni-switch-track-border-radius, 16px);
          margin-left: var(--omni-switch-track-inset, 8px);
          margin-right: var(--omni-switch-track-inset, 8px);
          outline: 0;
        }
        .container > #content > .knob {
          height: var(--omni-switch-knob-height, 14px);
          grid-row: 1;
          grid-column: 1;
          position: relative;
        }
        .container > #content > .knob > div {
          width: var(--omni-switch-knob-width, 14px);
          height: 100%;
          background-color: var(--omni-switch-knob-background-color, var(--omni-background-color));
          border-radius: 50%;
          box-shadow: var(--omni-switch-knob-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));

          position: absolute;
          left: 0px;
          margin-top: auto;
          margin-bottom: auto;
          transition: 0.15s left ease-in-out;
        }

        .container > #content:hover > .knob > div {
          box-shadow: var(--omni-switch-knob-hover-box-shadow, 0 0 3px 3px var(--omni-box-shadow-color));
        }

        /* CHECKED STATE STYLES */
        .container.checked > #content > .track {
          background-color: var(--omni-switch-checked-track-background-color, var(--omni-accent-color));
        }

        .container.checked > #content > .knob > div {
          background-color: var(--omni-switch-checked-knob-background-color, var(--omni-primary-color));
          left: calc(100% - var(--omni-switch-knob-width, 14px));
          box-shadow: none;
        }
        .container.checked > #content:hover > .knob > div {
          background-color: var(--omni-switch-checked-knob-background-color, var(--omni-primary-color));
          left: calc(100% - var(--omni-switch-knob-width, 14px));
          box-shadow: var(--omni-switch-checked-hover-knob-box-shadow, 0 0 3px 3px var(--omni-box-shadow-color));
        }
        /* DISABLED STATE STYLES */
        .container.disabled > #content {
          cursor: default;
        }
        .container.disabled > #content > .track,
        .container.disabled > #content:hover > .track {
          background-color: var(--omni-switch-disabled-track-background-color, var(--omni-disabled-background-color));
        }
        .container.disabled > #content:hover > .knob > div,
        .container.disabled > #content > .knob > div {
          background-color: var(--omni-switch-disabled-knob-background-color, var(--omni-disabled-background-color));
          box-shadow: var(--omni-switch-disabled-knob-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
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
                <div id="content" @click="${this._click}" @keydown="${this._keyDown}">
                    <div id="track" class="track" tabindex="${this.disabled ? '' : 0}"></div>
                    <div class="knob">
                        <div></div>
                    </div>
                </div>
                <label class="label" @click="${this._click}">
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
        'omni-switch': Switch;
    }
}
