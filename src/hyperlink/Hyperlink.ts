import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control to indicate an action to be executed. Typically used for navigational purposes.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/hyperlink';
 * ```
 *
 * @example
 * ```html
 * <omni-hyperlink
 *   href="https://example.com"
 *   label="Click me">
 * </omni-hyperlink>
 * ```
 *
 * @element omni-hyperlink
 * 
 * @slot - Content to render inside the component.
 *
 * Registry of all properties defined by the component.
 *
 * @cssprop --omni-hyperlink-color-disabled - Hyperlink disabled color.
 *
 * @cssprop --omni-hyperlink-font-size - Hyperlink font size.
 * @cssprop --omni-hyperlink-font-family - Hyperlink font weight.
 * @cssprop --omni-hyperlink-font-weight - Hyperlink font weight.
 * @cssprop --omni-hyperlink-color - Hyperlink color.
 * @cssprop --omni-hyperlink-text-decorator - Hyperlink text decorator
 *
 * @cssprop --omni-hyperlink-font-size-small - Hyperlink small font size variation
 * @cssprop --omni-font-family-small - Hyperlink small font family variation
 * @cssprop --omni-hyperlink-font-weight-small - Hyperlink small font weight
 *
 * @cssprop --omni-hyperlink-color-active - Hyperlink color when in an active state.
 * @cssprop --omni-hyperlink-text-decorator-active Hyperlink text decorator in active state.
 *
 * @cssprop --omni-hyperlink-text-decorator-hover - Hyperlink text decorator when in hover state.
 *
 * @cssprop --omni-hyperlink-color-visited - Hyperlink color when visited
 * @cssprop --omni-hyperlink-text-decorator-visited - Hyperlink text decorator when visited.
 *
 */
@customElement('omni-hyperlink')
export class Hyperlink extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * URL to link to.
     * @attr
     */
    @property({ type: String, reflect: true }) href?: string;

    /**
     * Where to load the URL specified in "href"
     * @attr [target="_self"]
     */
    @property({ type: String, reflect: true }) target: '_self' | '_blank' | '_parent' | '_top' = '_self';

    /**
     * Indicator if the component is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    /**
     * Indicator if the link is used as part of a sentence.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) inline?: boolean;

    /**
     * Size of the Hyperlink text.
     * @attr
     */
    @property({ type: String, reflect: true }) size?: string;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._click.bind(this));
    }

    _click(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }
    }

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                display: inline-block;
                }

                :host([disabled]) a {
                pointer-events: none;
                color: var(--omni-hyperlink-color-disabled, var(--omni-disabled-background-color));
                }

                :host([inline]) {
                text-decoration: underline;
                }

                .hyperlink {
                font-size: var(--omni-hyperlink-font-size, var(--omni-font-size));
                font-family: var(--omni-hyperlink-font-family, var(--omni-font-family));
                font-weight: var(--omni-hyperlink-font-weight, var(--omni-font-weight));
                color: var(--omni-hyperlink-color, var(--omni-primary-color));
                text-decoration: var(--omni-hyperlink-text-decorator, none);
                outline: none;
                }

                :host([size='small']) .hyperlink {
                font-size: var(--omni-hyperlink-font-size-small, 0.87em);
                font-family: var(--omni-font-family-small, var(--omni-font-family));
                font-weight: var(--omni-hyperlink-font-weight-small, var(--omni-font-weight));
                }

                .hyperlink:active {
                color: var(--omni-hyperlink-color-active, #3a3a3a);
                text-decoration: var(--omni-hyperlink-text-decorator-active, underline);
                }

                .hyperlink:hover {
                text-decoration: var(--omni-hyperlink-text-decorator-hover, underline);
                }

                .hyperlink:visited {
                color: var(--omni-hyperlink-color-visited, #3a3a3a);
                text-decoration: var(--omni-hyperlink-text-decorator-visited, none);
                }
            `
        ];
    }

    protected override render(): TemplateResult {
        return html`
            <a class="hyperlink" href="${this.href ? this.href : 'javascript:void(0)'}" .target="${this.target}" tabindex="0">
                ${this.label}<slot></slot>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-hyperlink': Hyperlink;
    }
}
