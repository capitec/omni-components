import { html, css, LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A simple label component that renders a styled text string.
 *
 * ```js 
 * import '@innofake/omni-components/core/label'; 
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
 * @cssprop --innofake-omni-label-font-color - Label font color.
 * @cssprop --innofake-omni-label-font-family - Label font family.
 * @cssprop --innofake-omni-label-font-size - Label font size.
 * @cssprop --innofake-omni-label-font-weight - Label font weight.
 * 
 * @cssprop --innofake-omni-label-cursor - Label cursor.
 * 
 * @cssprop --innofake-omni-label-title-font-size - Title label font size.
 * @cssprop --innofake-omni-label-title-font-weight - Title label font weight.
 * 
 * @cssprop --innofake-omni-label-subtitle-font-size - Subtitle label font size.
 * @cssprop --innofake-omni-label-subtitle-font-weight - Subtitle label font weight.
 * 
 * @cssprop --innofake-omni-label-strong-font-size - Strong label font size.
 * @cssprop --innofake-omni-label-strong-font-weight - Strong label font weight.
 * 
 * @cssprop --innofake-omni-label-default-font-size - Default label font size.
 * @cssprop --innofake-omni-label-default-font-weight - Default label font weight.
 * 
 * 
 */
@customElement('omni-label')
export class Label extends LitElement {

	@property({ type: String, reflect: true }) label?: string;
	@property({ type: String, reflect: true }) type?: String;

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
			//super.styles,
			css`
				:host {
					color: var(--innofake-omni-label-font-color, black);
					font-family: var(--innofake-omni-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-label-font-size, 12px);
					font-weight: var(--innofake-omni-label-font-weight, normal);
					white-space: pre-wrap;
					cursor: var(--innofake-omni-label-cursor, default);
				}
				:host([type="title"]) {
					font-size: var(--innofake-omni-label-title-font-size, 20px);
					font-weight: var(--innofake-omni-label-title-font-weight, bold);
				}
				:host([type="subtitle"]) {
					font-size: var(--innofake-omni-label-subtitle-font-size, 16px);
					font-weight: var(--innofake-omni-label-subtitle-font-weight, bold);
				}
				:host([type="strong"]) {
					font-size: var(--innofake-omni-label-strong-font-size, 12px);
					font-weight: var(--innofake-omni-label-strong-font-weight, bold);
				}				
				:host([type="default"]) {
					font-size: var(--innofake-omni-label-default-font-size, 12px);
					font-weight: var(--innofake-omni-label-default-font-weight, normal);
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
		return html`${this.label}`;
	}
}