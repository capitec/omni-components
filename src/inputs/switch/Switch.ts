import { html, css, LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A control that allows a user to switch a value on or off.
 *
 * ```js 
 * import '@innofake/web-components/inputs/switch'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-switch
 *   label="My Switch Value"
 *   data="{'id': 12345, 'name': 'Test'}"
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
 * @property {string} [label] - The switch label text.
 * @property {Object} [data] - Data associated with the component.
 * 
 * @property {string} [hint] - A hint message to assist the user.
 * @property {string} [error] - An error message to guide users to correct a mistake.
 * 
 * @property {boolean} [checked=false] - Indicator if the component is checked or not.
 * @property {boolean} [disabled=false] - Indicator if the component is disabled.
 * 
 * @fires {CustomEvent<{ old: Boolean; new: Boolean; }>} value-change - Dispatched when the switch checked state is changed.
 * @fires {CustomEvent<{ old: Boolean; new: Boolean; }>} value-changed - Dispatched when the switch checked state is changed.
 * 
 * @cssprop --innofake-omni-switch-label-font-color - Label font color.
 * @cssprop --innofake-omni-switch-label-font-family - Label font family.
 * @cssprop --innofake-omni-switch-label-font-size - Label font size.
 * @cssprop --innofake-omni-switch-label-font-weight - Label font weight.
 * @cssprop --innofake-omni-switch-label-spacing - Label left margin spacing.
 * 
 * @cssprop --innofake-omni-switch-input-hint-label-font-color - Hint text font color.
 * @cssprop --innofake-omni-switch-input-hint-label-font-family - Hint text font family.
 * @cssprop --innofake-omni-switch-input-hint-label-font-size - Hint text font size.
 * @cssprop --innofake-omni-switch-input-hint-label-font-weight - Hint text font weight.
 * 
 * @cssprop --innofake-omni-switch-input-error-label-font-color - Error text font color.
 * @cssprop --innofake-omni-switch-input-error-label-font-family - Error text font family.
 * @cssprop --innofake-omni-switch-input-error-label-font-size - Error text font size.
 * @cssprop --innofake-omni-switch-input-error-label-font-weight - Error text font weight.
 * 
 * @cssprop --innofake-omni-switch-track-width - Track width.
 * @cssprop --innofake-omni-switch-track-height - Track height. 
 * @cssprop --innofake-omni-switch-track-background-color - Track background color.
 * @cssprop --innofake-omni-switch-checked-track-background-color - Track checked background color.
 * @cssprop --innofake-omni-switch-disabled-track-background-color - Track disabled background color.
 * @cssprop --innofake-omni-switch-track-border-radius - Track border radius.
 * @cssprop --innofake-omni-switch-track-inset - Track inset margins.
 * 
 * @cssprop --innofake-omni-switch-knob-height - Knob height.
 * @cssprop --innofake-omni-switch-knob-width - Knob width.
 * @cssprop --innofake-omni-switch-knob-background-color - Knob background color.
 * @cssprop --innofake-omni-switch-checked-knob-background-color - Knob checked background color.
 * @cssprop --innofake-omni-switch-disabled-knob-background-color - Knob disabled background color.
 * @cssprop --innofake-omni-switch-knob-box-shadow - Knob box shadow.
 * @cssprop --innofake-omni-switch-knob-hover-box-shadow - Knob hover box shadow.
 * @cssprop --innofake-omni-switch-checked-hover-knob-box-shadow - Knob checked hover box shadow.
 * @cssprop --innofake-omni-switch-disabled-knob-box-shadow - Knob disabled hover box shadow.
 * 
 */
@customElement('omni-switch')
export class Switch extends LitElement {

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
		this.shadowRoot.getElementById(`track`).focus();
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

		// Switch the component checked state.
		this._switchChecked();
	}

	// ---------------
	// PRIVATE METHODS
	// ---------------

	/**
	 * Switchs the current checked state of the component.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_switchChecked(): void {

		// Record the previous state.
		const oldValue = this.checked;

		// Invert the checked state.
		this.checked = !oldValue;

		// Notify any subscribers that the value changed.
		this.dispatchEvent(new CustomEvent(`value-changed`, {
			detail: {
				old: oldValue,
				new: this.checked
			},
			bubbles: true
		}));

		this.dispatchEvent(new CustomEvent(`value-change`, {
			detail: {
				old: oldValue,
				new: this.checked
			},
			bubbles: true
		}));
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

		// Intercept space and enter key events to switch the component checked state.
		const keyCode = (event.code || ``).toUpperCase();

		if (keyCode === `SPACE` || keyCode === `ENTER` || keyCode === `NUMPADENTER`) {

			// Switch the component checked state.
			this._switchChecked();

			// Prevent the key event from propagating further.
			return event.preventDefault();
		}
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
			//super.styles,
			css`
				/* CONTAINER STYLES */
				.container {
					display: flex;
					align-items: center;
					
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-khtml-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}
				/* LABEL STYLES */
				
				.container > .label {
					color: var(--innofake-omni-switch-label-font-color, #4E6066);
					font-family: var(--innofake-omni-switch-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-switch-label-font-size, 14px);
					font-weight: var(--innofake-omni-switch-label-font-weight, 300);
					margin-left: var(--innofake-omni-switch-label-spacing, 8px);
					cursor: default;
				}
				.container > .label > .hint {
					color: var(--innofake-omni-switch-input-hint-label-font-color, lightgrey);
					font-family: var(--innofake-omni-switch-input-hint-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-switch-input-hint-label-font-size, 12px);
					font-weight: var(--innofake-omni-switch-input-hint-label-font-weight, 300);
					padding-top: 4px;
				}
				.container > .label > .error {
					color: var(--innofake-omni-switch-input-error-label-font-color, red);
					font-family: var(--innofake-omni-switch-input-error-label-font-family, Arial, Helvetica, sans-serif);
					font-size: var(--innofake-omni-switch-input-error-label-font-size, 12px);
					font-weight: var(--innofake-omni-switch-input-error-label-font-weight, 300);
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
					width: var(--innofake-omni-switch-track-width, 23px);
					height: var(--innofake-omni-switch-track-height, 12px);
					grid-row: 1;
					grid-column: 1;
					
					background-color: var(--innofake-omni-switch-track-background-color, #7C7C7C);
					border-radius: var(--innofake-omni-switch-track-border-radius, 16px);
					margin-left: var(--innofake-omni-switch-track-inset, 8px);
					margin-right: var(--innofake-omni-switch-track-inset, 8px);
					outline: 0;
				}
				.container > #content > .knob {
					height: var(--innofake-omni-switch-knob-height, 14px);
					grid-row: 1;
					grid-column: 1;
					position: relative;
				}
				.container > #content > .knob > div {
					width: var(--innofake-omni-switch-knob-width, 14px);
					height: 100%;
					background-color: var(--innofake-omni-switch-knob-background-color, #FFFFFF);
					border-radius: 50%;
					box-shadow: var(--innofake-omni-switch-knob-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
					
					position: absolute;
					left: 0px;
					margin-top: auto;
					margin-bottom: auto;
					transition: .15s left ease-in-out;
				}
				
				.container > #content:hover > .knob > div {
					box-shadow: var(--innofake-omni-switch-knob-hover-box-shadow, 0 0 3px 3px rgba(0, 157, 224, 0.10));
				}
				
				/* CHECKED STATE STYLES */
				.container.checked > #content > .track {
					background-color: var(--innofake-omni-switch-checked-track-background-color, #7fecc2);
				}
				
				.container.checked > #content > .knob > div {
					background-color: var(--innofake-omni-switch-checked-knob-background-color, #00e09d);
					left: calc(100% - var(--innofake-omni-switch-knob-width, 14px));
					box-shadow: none;
				}
				.container.checked > #content:hover > .knob > div {
					background-color: var(--innofake-omni-switch-checked-knob-background-color, #00e095);
					left: calc(100% - var(--innofake-omni-switch-knob-width, 14px));
					box-shadow: var(--innofake-omni-switch-checked-hover-knob-box-shadow, 0 0 3px 3px rgba(0, 157, 224, 0.10));
				}
				/* DISABLED STATE STYLES */
				.container.disabled > #content {
					cursor: default;
				}
				.container.disabled > #content > .track,
				.container.disabled > #content:hover > .track {
					background-color: var(--innofake-omni-switch-disabled-track-background-color, #DEDEDE);
				}
				.container.disabled > #content:hover > .knob > div,
				.container.disabled > #content > .knob > div {
					background-color: var(--innofake-omni-switch-disabled-knob-background-color, #DEDEDE);
					box-shadow: var(--innofake-omni-switch-disabled-knob-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
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
				<div
					id="content"
					@click="${this._click}"
					@keydown="${this._keyDown}">
					<div id="track" class="track" tabindex="${this.disabled ? `` : 0}"></div>
					<div class="knob">
						<div></div>
					</div>
				</div>
				<label class="label" @click="${this._click}">
					${this.label}
					${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : ``}
					${this.error ? html`<div class="error">${this.error}</div>` : ``}
				</label>
			</div>
		`;
	}
}