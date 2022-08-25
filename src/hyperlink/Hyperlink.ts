import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A link control that allows a user to indicate an action to be executed. Typically used for navigational purposes.
 * 
 * ```js 
 * import '@innofake/omni-components/hyperlink'; 
 * ```
 * 
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
 * @property {string} [label] - The label string to display.
 * @property {string} [href] - URL to link to. NOTE, suppresses "click" event if specified.
 * @property {"_self"|"_blank"|"_parent"|"_top"|String} [target="_self"] - Where to load the URL specified in "href":
 *  - `_self` Current browsing context.
 *  - `_blank` Usually a new tab, users can configure the browser to open a new window instead.
 *  - `_parent` Parent browsing context of the current one. If no parent, behave as "_self".
 *  - `_top` Topmost browsing context (the "highest" context thats an ancestor of the current one). If no ancestors, behaves as "_self".
 * @property {boolean} [disabled=false] - Indicator if the link is disabled.
 * @property {boolean} [inline=false] - Indicator if the link is used as part of a sentence.
 * @property {string} [size] - Size of the Hyperlink text:
 *  - `default` Size variation to apply.
 *  - `small` Size variation to apply.
 * 
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

    @property({ type: String, reflect: true }) label?: string;
    @property({ type: String, reflect: true}) href?: string;
    @property({ type: String, reflect: true}) target: string = '_self';
    @property({ type: Boolean, reflect: true}) disabled: boolean = false;
    @property({ type: Boolean, reflect: true}) inline: boolean = false;
    @property({ type: String, reflect: true}) size?: string;

    // --------------
	// INITIALISATION
	// --------------

	/**
	 * @hideconstructor
	 */
     constructor() {
		super();
	}

    // -------------------
	// LIFECYCLE OVERRIDES
	// -------------------

	// n/a	

	// --------------
	// EVENT HANDLERS
	// --------------

	/**
	 * Handles component click events.
	 * 
	 * @param {MouseEvent} event - The event details.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_linkClicked(event: MouseEvent): void {

		// Ignore the event if the component is disabled.
		if (this.disabled) {
			return event.stopImmediatePropagation();
		}

		// Notify any subscribers that the link was clicked.
		this.dispatchEvent(new CustomEvent(`click`, {
			detail: {}
		}));

		// Prevent the event from bubbling up.
		event.stopPropagation();
	}

    // ---------------
	// PRIVATE METHODS
	// ---------------
	
	// n/a

	// -------------------
	// RENDERING TEMPLATES
	// -------------------

	/**
	 * The element style template.
	 * 
	 */
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
                font-family: var(--omni-font-family-small, "Hind Vadodara");
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


    /**
	 * Apply changes to the element DOM when a property value changes.
	 * 
	 * @returns {TemplateResult} The updated DOM template.
	 */
	override render(): TemplateResult {
		if (this.href) {
			return html`<a class="hyperlink" href="${this.href}" .target="${this.target}" tabindex="0">${this.label}</a>`;
		}
		return html`<a class="hyperlink" href="javascript:void(0)" @click="${(e: MouseEvent) => this._linkClicked(e)}" .target="${this.target}" tabindex="0">${this.label}</a>`;
	}

}