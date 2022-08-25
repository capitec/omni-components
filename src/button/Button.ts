import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A control that allows an action to be executed.
 * 
 * ```js 
 * import '@innofake/omni-components/button'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <omni-button 
 *   label="Some Action"
 *   type="primary">
 * </omni-button>
 * ```
 * 
 * @element omni-button
 * 
 * Registry of all properties defined by the component.
 * 
 * @property {string} [label] - Text label.
 * @property {"primary"|"secondary"|"clear"|"white"} [type="secondary"] - Display type.
 * @property {"left"|"top"|"right"|"bottom"} [slotPosition="left"] - Position of slotted content.
 * @property {boolean} [disabled=false] - Indicator if the component is disabled.
 * 
 * @fires {CustomEvent} click - When the button component is clicked.
 * 
 */
@customElement('omni-button')
export class Button extends LitElement {

	@property({ type: String, reflect: true }) label?: string;
	@property({ type: String, reflect: true }) type?: ButtonType = 'secondary';
	@property({ type: String, reflect: true, attribute: 'slot-position' }) slotPosition?: SlotPositionType;
	@property({ type: Boolean, reflect: true }) disabled?: boolean;

	// -----------------
	// PRIVATE FUNCTIONS
	// -----------------

	private _click(e: Event) {

		// Ignore the event if the component is disabled.
		if (this.disabled) {
			return e.stopImmediatePropagation();
		}

		// Prevent the event from bubbling up.
		e.preventDefault();
		e.stopPropagation();

		// Notify any subscribers that the link was clicked.
		this.dispatchEvent(new CustomEvent('click', {
			detail: null
		}));
	}

	// -------------------
	// RENDERING TEMPLATES
	// -------------------

	static override get styles() {
		return [
			ComponentStyles,
			css`
				:host {
					box-sizing: border-box;
					display: inline-flex;
				}

				.button {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					text-align: left;
					
					font-family: var(--omni-button-font-family, var(--omni-font-family));
					font-size: var(--omni-button-font-size, var(--omni-font-size));
					font-weight: var(--omni-button-font-weight, bolder);
					line-height: var(--omni-button-line-height);
					border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
					border-style: solid;

					padding-top: var(--omni-button-padding-top, 10px);
					padding-bottom: var(--omni-button-padding-bottom, 10px);
					padding-left: var(--omni-button-padding-left, 10px);
					padding-right: var(--omni-button-padding-right, 10px);

					cursor: pointer;
					
					transition:
						opacity .1s ease,
						background-color .1s ease,
						border .1s ease,
						color .1s ease,
						box-shadow .1s ease,
						background .1s ease,
						-webkit-box-shadow .1s ease;
				}

				.button > .label {
					cursor: pointer;
				}

				.button.disabled > .label {
					cursor: default;
				}

				/* primary */

				.button.primary {
					background-color: var(--omni-button-primary-background-color, var(--omni-primary-color));
					border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
					border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
					color: var(--omni-button-primary-font-color, var(--omni-background-color));
				}

				.button.primary:hover {
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}
						
				.button.primary:active {
					background-color: var(--omni-button-primary-background-tapped-color, var(--omni-primary-active-color));
					box-shadow: none;
				}

				/* secondary */

				.button.secondary {
					background-color: var(--omni-button-default-background-color, var(--omni-background-color));
					border-color: var(--omni-button-default-border-color, var(--omni-primary-color));
					border-width: var(--omni-button-default-border-width, var(--omni-border-width));
					color: var(--omni-button-default-font-color, var(--omni-primary-color));
				}
				
				.button.secondary:hover  {
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}

				.button.secondary:active {
					background-color: var(--omni-button-default-background-tapped-color, var(--omni-background-active-color));
					box-shadow: none;
				}

				/* clear */

				.button.clear {
					background-color: var(--omni-button-clear-background-color, transparent);
					border-color: var(--omni-button-clear-border-color, transparent);
					border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
					color: var(--omni-button-clear-font-color, var(--omni-primary-color));
				}

				.button.clear:hover {
					background-color: var(--omni-button-clear-background-hover-color, var(--omni-background-hover-color));
				}
						
				.button.clear:active {
					background-color: var(--omni-button-clear-background-tapped-color, var(--omni-background-active-color));
					box-shadow: none;
					border-color: var(--omni-button-clear-border-color, transparent);
					border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
					outline:none;
				}

				/* white */

				.button.white {
					background-color: var(--omni-button-white-background-color, white);
					border-color: var(--omni-button-white-border-color, white);
					border-width: var(--omni-button-white-border-width, var(--omni-border-width));
					color: var(--omni-button-white-font-color, var(--omni-primary-color));
				}

				.button.white:hover {
					background-color: var(--omni-button-white-background-hover-color, white);
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}

				.button.white:active {
					background-color: var(--omni-button-clear-background-tapped-color, var(--omni-background-active-color));
					box-shadow: none;
					border-color: var(--omni-button-clear-border-color, transparent);
					border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
					outline:none;
				}

				/* disabled */

				.button.disabled {
					cursor: default;
					border-color: var(--omni-button-disabled-border-color, var(--omni-disabled-border-color));
					background-color: var(--omni-button-disabled-background-color, var(--omni-disabled-background-color));
				}

				.button.disabled:hover, 
				.button.disabled:active {
					box-shadow: none;
					background-color: var(--omni-button-disabled-background-color, var(--omni-disabled-background-color));
				}

				.button.disabled:focus {
					outline: 0;
				}

				.button:focus {
					outline: none;
				}

				/**
				 * Disable the hover state on touch enabled devices, e.g. mobile phones.
				 * On these devices hover acts like focus instead which keeps the button looking like it is in a pressed state.
				 * Learn more here: https://webdevpuneet.com/how-to-remove-hover-on-touch-devices.
				 */
				@media (hover: none) {

					.button.clear:hover:not(.disabled) {
						background-color: unset;
					}

					.button.primary:hover,
					.button.secondary:hover,
					.button.clear:hover,
					.button.white:hover {
						box-shadow: unset;
					}
				}

				/* slot position */

				.button.slot-left {
					flex-direction: row;
					text-align: left;
				}

				.button.slot-right {
					flex-direction: row-reverse;
					text-align: left;
				}

				.button.slot-top {
					flex-direction: column;
					text-align: center;
				}

				.button.slot-bottom {
					flex-direction: column-reverse;
					text-align: center;
				}

				/* slot margins */

				.button.slot-left > ::slotted(*) {
					margin-right: var(--omni-button-icon-spacing, 10px);
				}

				.button.slot-top > ::slotted(*) {
					margin-bottom: var(--omni-button-icon-spacing, 10px);
				}

				.button.slot-right > ::slotted(*) {
					margin-left: var(--omni-button-icon-spacing, 10px);
				}

				.button.slot-bottom > ::slotted(*) {
					margin-top: var(--omni-button-icon-spacing, 10px);
				}
			`
		];
	}

	protected override render(): TemplateResult {
		return html`
			<button 
				class="button ${this.slotPosition ? `slot-${this.slotPosition}` : ''} ${this.type ? this.type : 'secondary'} ${this.disabled ? 'disabled' : ''}"
				id="button"
				@click="${this._click}">
				<slot></slot>
				${this.label ? html`<label id="label" class="label">${this.label}</label>` : nothing}
			</button>
		`;
	}
}

/* Types for "type" property */
export const buttonType = ['primary', 'secondary', 'clear', 'white'] as const;
export type ButtonType = typeof buttonType[number];

/* Types for "slotPosition" property */
export const slotPositionType = ['left', 'top', 'right', 'bottom'] as const;
export type SlotPositionType = typeof slotPositionType[number];