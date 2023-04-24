import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Label component that renders styled text.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/label';
 * ```
 *
 * @example
 * ```html
 * <omni-label
 *   label="Hello World"
 *   type="strong">
 * </omni-label>
 * ```
 *
 * @element omni-label
 *
 * @slot - Content to render inside the component.
 *
 * Registry of all properties defined by the component.
 *
 * @cssprop --omni-label-font-color - Label font color.
 * @cssprop --omni-label-font-family - Label font family.
 * @cssprop --omni-label-font-size - Label font size.
 * @cssprop --omni-label-font-weight - Label font weight.
 *
 * @cssprop --omni-label-cursor - Label cursor.
 *
 * @cssprop --omni-label-title-font-size - Title label font size.
 * @cssprop --omni-label-title-font-weight - Title label font weight.
 *
 * @cssprop --omni-label-subtitle-font-size - Subtitle label font size.
 * @cssprop --omni-label-subtitle-font-weight - Subtitle label font weight.
 *
 * @cssprop --omni-label-strong-font-size - Strong label font size.
 * @cssprop --omni-label-strong-font-weight - Strong label font weight.
 *
 * @cssprop --omni-label-default-font-size - Default label font size.
 * @cssprop --omni-label-default-font-weight - Default label font weight.
 */
@customElement('omni-label')
export class Label extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Type of label to display.
     * @attr [type="default"]
     */
    @property({ type: String, reflect: true }) type: 'default' | 'title' | 'subtitle' | 'strong' = 'default';

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    color: var(--omni-label-font-color, var(--omni-font-color));
                    font-family: var(--omni-label-font-family, var(--omni-font-family));
                    font-size: var(--omni-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-label-font-weight, var(--omni-font-weight));
                    cursor: var(--omni-label-cursor, default);
                    flex-direction: row;
                }
                :host([type='title']) {
                    font-size: var(--omni-label-title-font-size, 1.42em);
                    font-weight: var(--omni-label-title-font-weight, bold);
                }
                :host([type='subtitle']) {
                    font-size: var(--omni-label-subtitle-font-size, 1.14em);
                    font-weight: var(--omni-label-subtitle-font-weight, bold);
                }
                :host([type='strong']) {
                    font-size: var(--omni-label-strong-font-size, var(--omni-font-size));
                    font-weight: var(--omni-label-strong-font-weight, bold);
                }
                :host([type='default']) {
                    font-size: var(--omni-label-default-font-size, var(--omni-font-size));
                    font-weight: var(--omni-label-default-font-weight, var(--omni-font-weight));
                }
            `
        ];
    }

    override render(): TemplateResult {
        return html`${this.label}<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-label': Label;
    }
}
