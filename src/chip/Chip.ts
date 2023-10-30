import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { OmniElement } from '../core/OmniElement.js';

import '../icons/Close.icon.js';

/**
 * Control that can be used for input, setting attributes, or performing actions.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/chip';
 * ```
 *
 * @example
 * ```html
 * <omni-chip
 *   label="Chip title"
 *   closable>
 * </omni-chip>
 * ```
 *
 * @element omni-chip
 *
 * Registry of all properties defined by the component.
 *
 * @slot chip_icon - Replaces the icon for the chip slot
 * @slot close_icon - Replaces the icon for the closed slot
 *
 * @fires {CustomEvent<{}>} remove - Dispatched when the close icon is clicked.
 *
 * @cssprop --omni-chip-height - Component height.
 * @cssprop --omni-chip-max-height - Component maximum height.
 * @cssprop --omni-chip-border - Component border.
 * @cssprop --omni-chip-border-radius - Component border radius.
 * @cssprop --omni-chip-background-color - Component background color.
 * @cssprop --omni-chip-padding - Component padding.
 *
 * @cssprop --omni-chip-hover-border - Component hover border.
 * @cssprop --omni-chip-hover-shadow - Component hover shadow.
 *
 * @cssprop --omni-chip-label-padding-left - Component label left padding.
 * @cssprop --omni-chip-label-padding-right - Component label right padding.
 * @cssprop --omni-chip-label-color - Component label color.
 * @cssprop --omni-chip-label-font-family - Component label font family.
 * @cssprop --omni-chip-label-font-size - Component label font size.
 * @cssprop --omni-chip-label-font-weight - Component label font weight.
 * @cssprop --omni-chip-label-line-height - Component label line height.
 *
 * @cssprop --omni-chip-icon-width - Component slotted icon width.
 *
 * @cssprop --omni-chip-close-icon-width - Component close icon width.
 * @cssprop --omni-chip-close-icon-color - Component close icon color.
 *
 * @cssprop --omni-chip-disabled-border-color - Component disabled border color.
 * @cssprop --omni-chip-disabled-background-color - Component disabled background color.
 * @cssprop --omni-chip-disabled-hover-background-color - Component icon left padding.
 *
 */
@customElement('omni-chip')
export class Chip extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Sets if the chip has a close button.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) closable?: boolean;

    /**
     * Indicator if the component is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    _removeClicked(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        // Notify any subscribers that the link was clicked.
        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: {}
            })
        );

        // Prevent the event from bubbling up.
        e.stopPropagation();
    }

    static override get styles() {
        return [
            super.styles,
            css`
        :host {
          box-sizing: border-box;
          display: inline-flex;
        }

        :host([disabled]),
        :host([disabled]) > * {
          pointer-events: none;
        }

        :host(:not([closable])) .icon {
          display: none;
        }

        .chip {
          cursor: pointer;
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;

          height: var(--omni-chip-height, 32px);
          max-height: var(--omni-chip-max-height, 32px);

          border: var(--omni-chip-border, 1px solid #e1e1e1);
          border-radius: var(--omni-chip-border-radius, 16px);
          background-color: var(--omni-chip-background-color, var(--omni-background-color));
          padding: var(--omni-chip-padding, 4px);

        }

        .chip:hover {
          border: var(--omni-chip-hover-border, 1px solid var(--omni-primary-color));
          box-shadow: var(--omni-chip-hover-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px 0 rgba(0, 0, 0, 0.15));
        }

        .label {
          display: inline-block;
          padding-left: var(--omni-chip-label-padding-left, 8px);
          padding-right: var(--omni-chip-label-padding-right, 8px);
          color: var(--omni-chip-label-color, var(--omni-primary-color));
          font-family: var(--omni-chip-label-font-family, var(--omni-font-family));
          font-size: var(--omni-chip-label-font-size, var(--omni-font-size));
          font-weight: var(--omni-chip-label-font-weight, var(--omni-font-weight));
          line-height: var(--omni-chip-label-line-height, 20px);
        }

        ::slotted([slot='chip_icon']) {
          width: var(--omni-chip-icon-width, 24px);
        }

        .close-icon,
        ::slotted([slot='close_icon']) {
          width: var(--omni-chip-close-icon-width, 24px);
          fill: var(--omni-chip-close-icon-color, var(--omni-primary-color));
        }

        .chip.disabled {
          cursor: default;
          border-color: var(--omni-chip-disabled-border-color, var(--omni-disabled-border-color));
          background-color: var(--omni-chip-disabled-background-color, var(--omni-disabled-background-color));
        }

        .chip.disabled:hover,
        .chip.disabled:active {
          box-shadow: none;
          background-color: var(--omni-chip-disabled-hover-background-color, var(--omni-disabled-background-color));
        }

        .chip.disabled:focus {
          outline: 0;
        }

        .chip:focus {
          outline: none;
        }
      `
        ];
    }

    protected override render(): TemplateResult {
        return html`
      <button
        id="chip"
        class=${classMap({
            chip: true,
            disabled: this.disabled ?? false
        })}
        ?disabled=${this.disabled}
        aria-label="${this.label}"
        aria-disabled=${this.disabled ? 'true' : 'false'}>
        <slot name="chip_icon"></slot>
        <div id="label" class="label">${this.label}</div>
        <div id="closeButton" class="icon" @click="${(e: MouseEvent) => this._removeClicked(e)}">
          ${this.closable ? html`<slot name="close_icon"><omni-close-icon class="close-icon"></omni-close-icon></slot>` : nothing}
        </div>
      </button>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-chip': Chip;
    }
}
