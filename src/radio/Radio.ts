import { html, css, LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A control that allows a user to select a single value from a small group of values.
 *
 * ```js 
 * import '@innofake/omni-components/radio'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-radio
 *   label="My Toggle Value"
 *   data="{'id': 12345, 'name': 'Test'}"
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
 * @property {string} [label] - The radio label text.
 * @property {Object} [data] - Data associated with the component.
 * 
 * @property {string} [hint] - A hint message to assist the user.
 * @property {string} [error] - An error message to guide users to correct a mistake.
 * 
 * @property {boolean} [checked=false] - Indicator if the component is checked or not.
 * @property {boolean} [disabled=false] - Indicator if the component is disabled.
 * 
 * @fires {CustomEvent<{ old: Boolean; new: Boolean; }>} value-change - Dispatched when the control value is changed to either on or off.
 * 
 * @cssprop --innofake-omni-radio-width - Width.
 * @cssprop --innofake-omni-radio-height - Height.
 * @cssprop --innofake-omni-radio-padding - Padding.
 * 
 * @cssprop --innofake-omni-label-font-color - Label Font Color.
 * @cssprop --innofake-omni-label-font-family - Label Font Family.
 * @cssprop --innofake-omni-label-font-size - Label Font Size.
 * @cssprop --innofake-omni-radio-label-font-weight - Label Font Weight.
 * @cssprop --innofake-omni-radio-label-line-height - Label Line Height.
 * @cssprop --innofake-omni-radio-label-spacing - Label Spacing.
 * 
 * @cssprop --innofake-omni-input-hint-label-font-color - Hint Font Color.
 * @cssprop --innofake-omni-input-hint-label-font-family - Hint Font Family.
 * @cssprop --innofake-omni-input-hint-label-font-size - Hint Font Size.
 * @cssprop --innofake-omni-input-hint-label-font-weight - Hint Font Weight.
 * 
 * @cssprop --innofake-omni-input-error-label-font-color - Error Font Color.
 * @cssprop --innofake-omni-input-error-label-font-family - Error Font Family.
 * @cssprop --innofake-omni-input-error-label-font-size - Error Font Size.
 * @cssprop --innofake-omni-input-error-label-font-weight - Error Font Weight.
 * 
 * @cssprop --innofake-omni-radio-background-color - Background Color.
 * @cssprop --innofake-omni-radio-border-width - Border Width.
 * @cssprop --innofake-omni-radio-border-style - Border Style.
 * @cssprop --innofake-omni-radio-border-color - Border Color.
 * @cssprop --innofake-omni-radio-border-radius - Border Radius.
 * 
 * @cssprop --innofake-omni-radio-indicator-border-width - Indicator Border Width.
 * @cssprop --innofake-omni-radio-indicator-border-color - Indicator Border Color.
 * @cssprop --innofake-omni-radio-border-radius - Indicator Border Radius.
 * @cssprop --innofake-omni-radio-indicator-color - Indicator Color.
 * 
 * @cssprop --innofake-omni-radio-checked-background-color - Checked Background color.
 * 
 * @cssprop --innofake-omni-radio-hover-box-shadow - Hover Box Shadow.
 * @cssprop --innofake-omni-radio-hover-background-color - Hover Background Color.
 * 
 * @cssprop --innofake-omni-radio-disabled-border-color - Disabled Border Color.
 * @cssprop --innofake-omni-radio-disabled-background-color - Disabled Background Color.
 * 
 */
@customElement('omni-radio')
export class Radio extends LitElement {

	@property({ type: String, reflect: true }) label?: string;
	@property({ type: Object, reflect: true }) data?: Object;
	@property({ type: String, reflect: true }) hint?: String;
	@property({ type: String, reflect: true }) error?: String;
	@property({ type: Boolean, reflect: true }) checked: Boolean = false;  
	@property({ type: Boolean, reflect: true }) disabled: Boolean = false;  

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

	override focus() {
		this.shadowRoot.getElementById(`content`).focus();
	}

	// --------------
	// EVENT HANDLERS
	// --------------

	/**
	 * Handles click events.
	 * 
	 * @param {MouseEvent} event - The event details.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_click(event: MouseEvent): void {

		// Ignore the event if the component is disabled.
		if (this.disabled) {
			return event.stopImmediatePropagation();
		}

		// Toggle the component checked state.
		this._toggleChecked();
	}

	/**
	 * Handles key down events.
	 * 
	 * @param {KeyboardEvent} event - The event details.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_keyDown(event: KeyboardEvent): void {

		// Ignore the event if the component is disabled.
		if (this.disabled) {
			return event.stopImmediatePropagation();
		}

		// Intercept space and enter key events to toggle the component checked state.
		const keyCode = (event.code || ``).toUpperCase();

		if (keyCode === `SPACE` || keyCode === `ENTER`) {

			// Toggle the component checked state.
			this._toggleChecked();

			// Prevent the key event from propogating further.
			return event.preventDefault();
		}
	}

	// ---------------
	// PRIVATE METHODS
	// ---------------


	/**
	 * Toggles the current checked state of the component.
	 * 
	 * @ignore
	 * @returns {void}
	 */
     _toggleChecked(): void {

		const oldValue = this.checked;
		this.checked = !oldValue;

		this.dispatchEvent(new CustomEvent(`value-changed`, {
			detail: {
				old: oldValue,
				new: this.checked
			}
		}));

		this.dispatchEvent(new CustomEvent(`value-change`, {
			detail: {
				old: oldValue,
				new: this.checked
			}
		}));
	}


	// -------------------
	// RENDERING TEMPLATES
	// -------------------

	/**
	 * The element style template.
	 * 
	 */
	static override get styles() {

		return [
			//super.styles,,
			css`

				/* CONTAINER STYLES */

				.container {
					display: flex;
					align-items: center;
				}`,

			css`
				:host {
					--innofake-omni-radio-width: 24px;
					--innofake-omni-radio-height: 24px;

					--innofake-omni-radio-padding: 2px;
					
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-khtml-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}
			`,
			css`
				/* LABEL STYLES */
				
				.container > .label {
					color: var(--innofake-omni-label-font-color);
					font-family: var(--innofake-omni-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-label-font-size, 14px);
					font-weight: var(--innofake-omni-radio-label-font-weight, 500);
					line-height: var(--innofake-omni-radio-label-line-height, 20px);

					margin-left: var(--innofake-omni-radio-label-spacing, 8px);

					cursor: default;
				}

				.container > .label > .hint {
					color: var(--innofake-omni-input-hint-label-font-color, lightgrey);
					font-family: var(--innofake-omni-input-hint-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-input-hint-label-font-size, 12px);
					font-weight: var(--innofake-omni-input-hint-label-font-weight, 300);

					padding-top: 4px;
				}

				.container > .label > .error {
					color: var(--innofake-omni-input-error-label-font-color, red);
					font-family: var(--innofake-omni-input-error-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-input-error-label-font-size, 12px);
					font-weight: var(--innofake-omni-input-error-label-font-weight, 300);

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

					min-width: var(--innofake-omni-radio-width, 24px);
					min-height: var(--innofake-omni-radio-height, 24px);
					max-width: var(--innofake-omni-radio-width, 24px);
					max-height: var(--innofake-omni-radio-height, 24px);

					margin: var(--innofake-omni-radio-padding, 2px);

					background-color: var(--innofake-omni-radio-background-color, #FFFFFF);

					border-width: var(--innofake-omni-radio-border-width, 2px);
					border-style: var(--innofake-omni-radio-border-style, solid);
					border-color: var(--innofake-omni-radio-border-color, #009DE0);
					border-radius: var(--innofake-omni-radio-border-radius, 50%);
					
					outline: 0;
				}
				
				.container.checked > #content > .indicator {
					width: calc(var(--innofake-omni-radio-width) - var(--innofake-omni-radio-padding)*2);
					height: calc(var(--innofake-omni-radio-height) - var(--innofake-omni-radio-padding)*2);

					border-width: var(--innofake-omni-radio-indicator-border-width, 2px);
					border-style: solid;
					border-color: var(--innofake-omni-radio-indicator-border-color, #FFFFFF);
					border-radius: var(--innofake-omni-radio-border-radius, 50%);

					color: var(--innofake-omni-radio-indicator-color, #FFFFFF);
				}
				
				/* CHECKED STATE STYLES */

				.container.checked > #content {
					background-color: var(--innofake-omni-radio-checked-background-color, #009DE0);
				}
				
				/* HOVER STATE STYLES */

				.container > #content:hover {
					box-shadow: var(--innofake-omni-radio-hover-box-shadow, 0 0 4px 4px #E6F7FF);
					background-color: var(--innofake-omni-radio-hover-background-color, #E6F7FF);
				}

				.container.checked:hover > #content {
					background-color: var(--innofake-omni-radio-checked-background-color, #009DE0);
				}
				/* DISABLED STATE STYLES */

				.container.disabled > #content {
					cursor: default;
					border-color: var(--innofake-omni-radio-disabled-border-color, #DEDEDE);
					background-color: var(--innofake-omni-radio-disabled-background-color, #FFFFFF);
				}
				
				.container.disabled.checked > #content {
					background-color: var(--innofake-omni-radio-disabled-background-color, #DEDEDE);
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

	/**
	 * Apply changes to the element DOM when a property value changes.
	 * 
	 * @returns {TemplateResult} The updated DOM template.
	 */
	override render(): TemplateResult {
		return html`
            <div class="container${this.checked ? ` checked` : ``}${this.disabled ? ` disabled` : ``}">
                <div id="content" tabindex="${this.disabled ? `` : 0}" @click="${this._click}" @keydown="${this._keyDown}">
                    ${this.checked ? html`<div class="indicator"></div>` : ``}
                </div>
            
                <label id="label" class="label" @click="${this._click}">
                    ${this.label}
                    ${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : ``}
                    ${this.error ? html`<div class="error">${this.error}</div>` : ``}
                </label>
            </div>
		`;
	}
}