import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A simple label component that renders a styled text string.
 *
 * ```js 
 * import '@innofake/omni-components/label'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-label
 *   label="Hello World"
 *   type="strong">
 * </omni-label>
 * ```
 * 
 * @element omni-label
 * 
 * Registry of all properties defined by the component.
 * 
 * @property {String} label - The label string to display.
 * @property {"default"|"title"|"subtitle"|"strong"|String}  [type="default"] - The type of label to display:
 *  - `default` Normal font weight.
 *  - `title` Larger font and weight.
 *  - `subtitle` Larger font and weight.
 *  - `strong` Largest font and weight.
 * 
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
 * 
 * 
 */
@customElement('omni-label')
export class Label extends LitElement {

	@property({ type: String, reflect: true }) label?: string;
	@property({ type: String, reflect: true }) type?: string;

	// --------------
	// INITIALISATION
	// --------------

	/**
	 * @hideconstructor
	 */
	constructor() {

		super();
	}

	// ------------------
	// LIFECYCLE HANDLERS
	// ------------------

	// n/a

	// ----------------
	// PUBLIC FUNCTIONS
	// ----------------

	// n/a

	// --------------
	// EVENT HANDLERS
	// --------------

	// n/a

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
					color: var(--omni-label-font-color, var(--omni-font-color));
					font-family: var(--omni-label-font-family, var(--omni-font-family));
					font-size: var(--omni-label-font-size, var(--omni-font-size));
					font-weight: var(--omni-label-font-weight, var(--omni-font-weight));
					white-space: pre-wrap;
					cursor: var(--omni-label-cursor, default);
				}
				:host([type="title"]) {
					font-size: var(--omni-label-title-font-size, 1.42em);
					font-weight: var(--omni-label-title-font-weight, bold);
				}
				:host([type="subtitle"]) {
					font-size: var(--omni-label-subtitle-font-size, 1.14em);
					font-weight: var(--omni-label-subtitle-font-weight, bold);
				}
				:host([type="strong"]) {
					font-size: var(--omni-label-strong-font-size, var(--omni-font-size));
					font-weight: var(--omni-label-strong-font-weight, bold);
				}				
				:host([type="default"]) {
					font-size: var(--omni-label-default-font-size, var(--omni-font-size));
					font-weight: var(--omni-label-default-font-weight, var(--omni-font-weight));
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
		return html`${this.label}<slot></slot>`;
	}
}