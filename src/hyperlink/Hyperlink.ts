import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A link control that allows a user to indicate an action to be executed. Typically used for navigational purposes.
 * 
 * ```js 
 * import '@capitec/omni-components/hyperlink'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-hyperlink 
 *   href="https://example.com"
 *   label="Click me">
 * </omni-hyperlink>
 * ```
 * 
 * @element omni-hyperlink
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
 * @cssprop --omni-hyperlink-color-active - Hyperlink colour when in an active state.
 * @cssprop --omni-hyperlink-text-decorator-active Hyperlink text decorator in active state.
 * 
 * @cssprop --omni-hyperlink-text-decorator-hover - Hyperlink text decorator when in hover state.
 * 
 * @cssprop --omni-hyperlink-color-visited - Hyperlink color when visited
 * @cssprop --omni-hyperlink-text-decorator-visited - Hyperlink text decorator when visited.
 * 
*/
@customElement('omni-hyperlink')
export class Hyperlink extends LitElement {

    /**
	 * Text label.
	 * @attr
     */
    @property({ type: String, reflect: true }) label: string;

    /**
     * URL to link to.
     * @attr
     */
    @property({ type: String, reflect: true}) href: string;

    /**
     * Where to load the URL specified in "href"
     * @attr [target="_self"]
     */
    @property({ type: String, reflect: true}) target: '_self' | '_blank' | '_parent' | '_top' = '_self';

	/**
	 * Indicator if the component is disabled.
	 * @attr
	 */
    @property({ type: Boolean, reflect: true}) disabled: boolean;

    /**
     * Indicator if the link is used as part of a sentence.
     * @attr
     */
    @property({ type: Boolean, reflect: true}) inline: boolean;

    /**
     * Size of the Hyperlink text.
     * @attr
     */
    @property({ type: String, reflect: true}) size: string;

	// -------------------
	// RENDERING TEMPLATES
	// -------------------

	static override get styles() {

		return [
			ComponentStyles,
			css`
            :host {
                display: inline-block;
            }

            :host([disabled]) a {
                pointer-events: none;
				color: var(--omni-hyperlink-color-disabled, var(--omni-disabled-background-color))
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

            :host([size="small"]) .hyperlink {
                font-size: var(--omni-hyperlink-font-size-small, 0.87em);
                font-family: var(--omni-font-family-small, var(--omni-font-family));
                font-weight: var(--omni-hyperlink-font-weight-small, var(--omni-font-weight));
            }

            .hyperlink:active {
                color: var(--omni-hyperlink-color-active, #3A3A3A);
                text-decoration: var(--omni-hyperlink-text-decorator-active, underline);;
            }
            
            .hyperlink:hover {
                text-decoration: var(--omni-hyperlink-text-decorator-hover, underline);;
            }
            
            .hyperlink:visited {
                color: var(--omni-hyperlink-color-visited, #3A3A3A);
                text-decoration: var(--omni-hyperlink-text-decorator-visited, none);;
            }
			`
		];
	}

	protected override render(): TemplateResult {
		return html`<a class="hyperlink" ?disabled=${this.disabled} href="${this.href ? this.href : 'javascript:void(0)'}" .target="${this.target}" tabindex="0">${this.label}</a>`;
	}

}


