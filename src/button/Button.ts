import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A control that allows an action to be executed.
 * 
 * ```js 
 * import '@innofake/omni-components/button'; 
 * ```
 * @example
 * ```html
 * <omni-button 
 *   label="Some Action"
 *   type="primary">
 * </omni-button>
 * ```
 * 
 */
@customElement('omni-button')
export class Button extends LitElement {

    @property({ type: String, reflect: true }) label?: string;
    @property({ type: String, reflect: true }) type?: 'primary' | 'secondary' | 'clear' | 'white' | 'icon' | string = 'secondary';
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

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

	// ----------------
	// PUBLIC FUNCTIONS
	// ----------------	

	// --------------
	// EVENT HANDLERS
	// --------------

	// -----------------
	// PRIVATE FUNCTIONS
	// -----------------

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

				.button.secondary {
					background-color: var(--omni-button-default-background-color, #FFFFFF);
					border-color: var(--omni-button-default-border-color, #009DE0);
					border-width: var(--omni-button-default-border-width, 1px);
					color: var(--omni-button-default-font-color, #009DE0);
				}
				
				.button.secondary:hover  {
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
				}

				.button.secondary:active {
					background-color: var(--omni-button-default-background-tapped-color, rgba(0,131,187,0.1));
					box-shadow: none;
				}
			`
		];
	}

	protected override render(): TemplateResult {
		return html`
			<button class="button ${this.type ? this.type : 'secondary'} ${this.disabled ? 'disabled' : ''}">
				${this.label ? html`<div class="label">${this.label}</div>` : ``}
				<slot></slot>
			</button>
		`;
	}
}