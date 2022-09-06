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
 * @property {boolean} [closable] - Sets if the chip has a close button.
 * @property {boolean} [disabled=false] - Indicator if the component is disabled.
 * 
 * @slot avatar_icon - Replaces the icon for the avatar slot
 * @slot close_icon - Replaces the icon for the closed slot
 * 
 * @fires {CustomEvent<{}>} remove - Dispatched when the close icon is clicked.
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
 * @cssprop --omni-chip-disabled-border-color - Component disabled border colour.
 * @cssprop --omni-chip-disabled-background-color - Component disabled background colour.
 * @cssprop --omni-chip-disabled-hover-background-color - Component icon left padding.
 * 
 * @cssprop --omni-chip-close-icon-padding-left - Component close icon left padding.
 * @cssprop --omni-chip-close-icon-height - Component close icon height.
 * @cssprop --omni-chip-close-icon-width - Component close icon width.
 * @cssprop --omni-chip-close-icon-color - Component close icon color.
 * 
 */
@customElement('omni-chip')
export class Chip extends LitElement {

    @property({ type: String, reflect: true }) label?: string;
    @property({ type: Boolean, reflect: true }) closable?: boolean;
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    // -----------------
	// PRIVATE FUNCTIONS
	// -----------------

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
                background-color: var(--omni-chip-background-color, var(--omni-background-color));
                padding: var(--omni-chip-padding, 4px);
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            
            .chip:hover {
                border: var(--theme-chip-hover-border, 1px solid var(--omni-primary-color));
                box-shadow: var(--theme-chip-hover-shadow, 0 2px 4px 0 rgba(0,0,0,0.25), 0 1px 3px 0 rgba(0,0,0,0.15));                
            }

            
            .label {
                display: inline-block;
                padding-left: var(--omni-chip-label-padding-left, 8px);
                padding-right: var(--omni-chip-label-padding-right, 8px);
                color: var(--omni-chip-label-color, var(--omni-primary-color));
                font-family: var(--omni-chip-label-font-family, var(--omni-font-family));
				font-size: var(--omni-chip-label-font-size, var(--omni-font-size));
				font-weight: var(--omni-chip-label-font-weight, var(--omni-font-weight));
                line-height: var(--omni-chip-label-line-height, 20px);
            }

            .icon {    
                display: grid;
                justify-content: center;
                padding-left: var(--omni-chip-close-icon-padding-left, 0px);
                height: var(--omni-chip-close-icon-height,24px);
                width: var(--omni-chip-close-icon-width,24px);
                fill: var(--omni-chip-close-icon-color,var(--omni-primary-color));
            }

            /* disabled */

            .chip.disabled {
                cursor: default;
                border-color: var(--omni-chip-disabled-border-color, var(--omni-disabled-border-color));
                background-color: var(--omni-chip-disabled-background-color, var(--omni-disabled-background-color));
            }

            .chip.disabled:hover, 
            .chip.disabled:active {
                box-shadow: none;
                background-color: var(--omni-chip-disabled-hover-background-color, var(--omni-disabled-background-color));
            }

            .chip.disabled:focus {
                outline: 0;
            }

            .chip:focus {
                outline: none;
            }           
			`
		];
	}

    protected override render(): TemplateResult {
		return html`
            <button
                id="chip"
                ?disabled=${this.disabled}
                class="chip ${this.disabled ? 'disabled' : ''}">
                <slot name="avatar_icon"></slot>
				<div id="label" class="label">${this.label}</div>
				<div id="closeButton" class="icon" @click="${(e: MouseEvent) => this._removeClicked(e)}">
                    ${this.closable ? html`<slot name="close_icon"><omni-close-icon></omni-close-icon></slot>` : nothing}
				</div>
			</button>
		`;
	}


}

