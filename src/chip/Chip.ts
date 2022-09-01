import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';


import '../icons/Close.icon.js';

/**
 * A chip control.
 *
 * ```js 
 * import 'capitec/omni-components/chip'; 
 * ```
 * 
 * @example
 * 
 * ```html
 * <capitec-chip 
 *   label="Chip title"
 *   closable>
 * </capitec-chip>
 * ```
 * 
 * @element omni-chip
 * 
 *  Registry of all properties defined by the component.
 * 
 * @property {string} [label] - The label string to display.
 * @property {boolean} [closable] - Sets if the close button should be shown.
 * 
 * 
 * @cssprop --omni-chip-border - Component border.
 * @cssprop --omni-chip-border-radius - Component border radius.
 * @cssprop --omni-chip-background-color - Component background colour.
 * @cssprop --omni-chip-padding - Component padding.
 * 
 * @cssprop --omni-chip-label-padding-left - Component label left padding.
 * @cssprop --omni-chip-label-padding-right - Component label right padding.
 * @cssprop --omni-chip-label-color - Component label colour.
 * @cssprop --omni-chip-label-font-family - Component label font family.
 * @cssprop --omni-chip-label-font-size - Component label font size.
 * @cssprop --omni-chip-label-font-weight - Component label font weight.
 * @cssprop --omni-chip-label-line-height - Component label line height.
 * 
 * @cssprop --omni-chip-icon-padding-left - Component icon left padding.
 * 
 */
@customElement('omni-chip')
export class Chip extends LitElement {

    @property({ type: String, reflect: true }) label?: string;
    @property({ type: Boolean, reflect: true }) closable?: boolean;
	@property({ type: String, reflect: true }) avatar?: string;
	@property({ type: String, reflect: true}) avatarImage?: string;

	_removeClicked(event: MouseEvent) {

		// Notify any subscribers that the link was clicked.
		this.dispatchEvent(new CustomEvent('remove', {
			detail: {}
		}));

		// Prevent the event from bubbling up.
		event.stopPropagation();
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

            :host(:not([closable])) .icon {
                display: none;
            }

            .chip {
                height: 32px;
                max-height: 32px;
                box-sizing: border-box;
                border: var(--omni-chip-border, 1px solid #E1E1E1);
                border-radius: var(--omni-chip-border-radius, 16px);
                background-color: var(--omni-chip-background-color, #F7F7F7);
                padding: var(--omni-chip-padding, 4px);
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .label {
                display: inline-block;
                padding-left: var(--omni-chip-label-padding-left, 8px);
                padding-right: var(--omni-chip-label-padding-right, 8px);
                color: var(--omni-chip-label-color, #4E6066);
                font-family: var(--omni-chip-label-font-family, "Hind Vadodara");
				font-size: var(--omni-chip-label-font-size, 14px);
				font-weight: var(--omni-chip-label-font-weight, 400);
                line-height: var(--omni-chip-label-line-height, 20px);
            }

            .icon {    
                display: grid;
                justify-content: center;
                padding-left: var(--omni-chip-icon-padding-left, 0px);
                height: 24px;
                width: 24px;
            }
            
			`
		];
	}

    protected override render(): TemplateResult {
		return html`
            <button class="chip">
                <div></div>
                ${this.avatar || this.avatarImage ? html`<slot></slot>` : ''}
				<div class="label">${this.label}</div>
				<div class="icon" @click="${(e: MouseEvent) => this._removeClicked(e)}">
					<slot name='close_icon'><omni-close-icon></omni-close-icon></slot>
				</div>
			</button>
		`;
	}


}

