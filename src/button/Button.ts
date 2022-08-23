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
	@property({ type: String, reflect: true, attribute: 'slot-position' }) slotPosition?: SlotPositionType = 'left';
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
					font-size: var(--omni-button-font-size, 14px);
					font-weight: var(--omni-button-font-weight, bold);
					line-height: var(--omni-button-line-height);
					border-radius: var(--omni-button-border-radius, 4px);
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

				/* primary */

				.button.primary {
					background-color: var(--omni-button-primary-background-color, #009DE0);
					border-color: var(--omni-button-primary-border-color, #009DE0);
					border-width: var(--omni-button-primary-border-width, 1px);
					color: var(--omni-button-primary-font-color, #FFFFFF);
				}

				.button.primary:hover {
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}
						
				.button.primary:active {
					background-color: var(--omni-button-primary-background-tapped-color, #0091CE);
					box-shadow: none;
				}

				.button.secondary {
					background-color: var(--omni-button-default-background-color, #FFFFFF);
					border-color: var(--omni-button-default-border-color, #009DE0);
					border-width: var(--omni-button-default-border-width, 1px);
					color: var(--omni-button-default-font-color, #009DE0);
				}

				/* secondary */
				
				.button.secondary:hover  {
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}

				.button.secondary:active {
					background-color: var(--omni-button-default-background-tapped-color, rgba(0,131,187,0.1));
					box-shadow: none;
				}

				/* clear */

				.button.clear {
					background-color: var(--omni-button-clear-background-color, white);
					border-color: var(--omni-button-clear-border-color, blue);
					border-width: var(--omni-button-clear-border-width, 0);
					color: var(--omni-button-clear-font-color, #009DE0);
				}

				.button.clear:hover {
					background-color: rgba(0, 131, 187, 0.05);
				}
						
				.button.clear:active {
					background-color: var(--omni-button-clear-background-tapped-color, rgba(0,131,187,0.1));
					box-shadow: none;
					border-color: var(--omni-button-clear-border-color, blue);
					border-width: var(--omni-button-clear-border-width, 0);
					outline:none;
				}

				/* white */

				.button.white {
					background-color: var(--omni-button-white-background-color, white);
					border-color: var(--omni-button-white-border-color, blue);
					border-width: var(--omni-button-white-border-width, 0);
					color: var(--omni-button-white-font-color, #009DE0);
				}

				.button.white:hover {
					/* background: rgba(255, 255, 255, 0.1); */
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}

				/* slot */

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
			`
		];
	}

	protected override render(): TemplateResult {
		return html`
			<button 
				class="button slot-${this.slotPosition} ${this.type ? this.type : 'secondary'} ${this.disabled ? 'disabled' : ''}"
				@click="${this._click}">
				<slot></slot>
				${this.label ? html`<div class="label">${this.label}</div>` : nothing}
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