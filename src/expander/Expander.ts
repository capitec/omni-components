import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Layout component that groups together content in an expanded box.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/expander';
 * ```
 * @example
 * html```
 * <omni-expander>
 *  <omni-label label="Expanded"></omni-label>
 * </omni-expander>
 * ```
 *
 * @element omni-expander
 * 
 * @slot - Content to render inside the expander once expanded.
 * @slot expand-icon - Replaces the expand icon by default this will be the omni-chevron-down-icon.
 * @slot header-icon - Replaces the icon in the header which is usually placed on the opposite end of the expand icon.
 *
 * @cssprop --omni-expander-width - Expander component width.
 * @cssprop --omni-expander-background-color - Expander component background color.
 * 
 * @cssprop --omni-expander-header-width - Expander header width.
 * @cssprop --omni-expander-header-height - Expander header height.
 * @cssprop --omni-expander-header-padding - Expander header padding.
 * @cssprop --omni-expander-border-top - Expander header border top.
 * 
 * @cssprop --omni-expander-content-border - Expander content border.
 * 
 * @cssprop --omni-expander-header-icon-container-padding - Expander header icon container padding.
 * 
 * @cssprop
 *
 */
@customElement('omni-expander')
export class Expander extends OmniElement {
    /**
     * Expander component label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Indicator if the expander is expanded.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) expanded?: boolean;

    /**
     * Indicator if the expander is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    /**
     * Indicate where the Expander button should be positioned
     * @attr [button-alignment]
     */
    @property({type: String, reflect: true, attribute: 'button-alignment'}) buttonAlignment: 'left' | 'right' = 'right';
    
    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('animationend', this._animationCompleted.bind(this), {
            capture: true
        });
    }

	override disconnectedCallback() {
		// Stop listening for child label change events.
		this.removeEventListener(`animationend`,this._animationCompleted.bind(this));

		// Ensure the component is cleaned up correctly.
		super.disconnectedCallback();
	}

    _headerClick(e: MouseEvent) {
        console.log('header clicked');
        // Prevent the event from bubbling up.
		e.stopPropagation();

		// Ignore the click event if the item is disabled.
		if (this.disabled) {
			return;
		}

		// Toggle the expanded state of the item.
		if (this.expanded) {
			this._collapse();
		} else {
			this._expand();
		}
    }

	_animationCompleted() {
		// Remove the expanding animation, if set.
		if (this.hasAttribute(`expanding`)) {
			this.removeAttribute(`expanding`);
			this.expanded = true;
		}

		// Remove the collapsing animation, if set.
		if (this.hasAttribute(`collapsing`)) {
			this.removeAttribute(`collapsing`);
			this.expanded = false;
		}
	}

    _expand() {
        console.log('expander called');
        // Ignore the request to expand if the component is already expanded.
		if (this.expanded === true || this.hasAttribute(`expanding`)) {
			return;
		}

		// Trigger the expanding animation.
		this.removeAttribute(`collapsing`);
		this.setAttribute(`expanding`, ``);

		// Notify any direct subscribers that the component was expanded.
		this.dispatchEvent(new CustomEvent(`expand`, {
			detail: {
				label: this.label
			}
		}));
    }

    _collapse() {
        console.log('collapse called');
        // Ignore the request to collapse if the component is already collapsed.
		if (this.expanded === false || this.hasAttribute(`collapsing`)) {
			return;
		}

		// Trigger the collapsing animation.
		this.removeAttribute(`expanding`);
		this.setAttribute(`collapsing`, ``);

		// Notify any direct subscribers that the component was collapsed.
		this.dispatchEvent(new CustomEvent(`collapse`, {
			detail: {
				label: this.label
			}
		}));
    }

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: stretch;
					width: var(--omni-expander-width, 100%);
					background: var(--omni-expander-background-color, var(--omni-background-color));
                }

                /* HEADER STYLES */

                :host > .header {
					width: var(--omni-expander-header-width, 100%);
					height: var(--omni-expander-header-height, 50px);
					padding: var(--omni-expander-header-padding, 10px);
					border-top: var(--omni-expander-border-top, 1px solid black);
					cursor: pointer;
				}

                :host > .header > omni-label {
                    color: var(--omni-expander-header-font-color, black);
					font-size: var(--omni-expander-header-font-size, 14px);
					font-weight: var(--omni-expander-header-font-weight, bold);
					margin-right: auto;
					cursor: pointer;
                }

                /* EXPANDER CONTENT STYLES */
                :host > .expander-content {
                    border-left: var(--omni-expander-content-border, 1px solid black);
                    border-right: var(--omni-expander-content-border, 1px solid black);
                    border-top: var(--omni-expander-content-border, 1px solid black);
                    align-content: flex-start;
                }

                :host(:not([expanded])) > .content {
					overflow: hidden;
					padding-top: var(--omni-expander-content-padding-top, 0px);
					padding-bottom: var(--omni-expander-content-padding-bottom, 0px);
				}



                /* HEADER ICON */

                .header-icon-container {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-expander-header-icon-container-padding, 10px 10px);
                }

                ::slotted([slot='header_icon']) {
                    width: 20px;
                    height: 20px;
                }


                /* EXPAND ICON */
                .expand-icon-container {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-expander-header-icon-container-padding, 10px 10px);
                }

                .expand-icon {
                    width: var(--omni-expander-header-icon-width, 20px);
                    height: var(--omni-expander-header-icon-height, 20px);
                    /*fill: var(--omni-expander-header-icon-color, var(--omni-primary-color));*/
                }

                /* ANIMATIONS */

                


            `
        ];
    }

    protected override render(): TemplateResult {
        return html`
        <div class="header" @click="${(e: MouseEvent) => this._headerClick(e)}">
            ${this._renderHeader()}
        </div>
        <div class="expander-content">
            <slot></slot>
        </div>		

        `;
    }

    _renderHeader(): TemplateResult {
        return html`
        ${this.buttonAlignment === 'left' ? html `<div class='expand-icon-container'><slot name='expand-icon'><omni-chevron-down-icon class='expand-icon'></omni-chevron-down-icon></slot></div>`: this._renderIcon()}
        ${this.label ? html`<capitec-label type="strong" label="${this.label}"></capitec-label>` : html`<div></div>`}
        ${this.buttonAlignment === 'right' ? html `<div class='expand-icon-container'><slot name='expand-icon'><omni-chevron-down-icon class='expand-icon'></omni-chevron-down-icon></slot></div>`: this._renderIcon()}
        `;
    }

    _renderIcon(): TemplateResult {
        return html`
        <div class='header-icon-container'>
            <slot name='header_icon'></slot>
        </div>
        `   
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'omni-expander': Expander;
    }
}

