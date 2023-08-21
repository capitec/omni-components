import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';
import '../icons/ChevronDown.icon.js';
import '../label/Label.js';

/**
 * Component that groups together content in an expanded box.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/expander';
 * ```
 * @example
 * html```
 * <omni-expander label="My Expander">
 *  <omni-label label="Expanded"></omni-label>
 * </omni-expander>
 * ```
 * @element omni-expander
 *
 * @slot - Content to render inside the expander once expanded.
 * @slot expand-icon - Replaces the expand icon by default this will be the omni-chevron-down-icon.
 * @slot header-icon - Replaces the icon in the header which is usually placed on the opposite end of the expand icon.
 *
 * @fires {CustomEvent<{ label: string; }>} expand - Dispatched when the expander is expanded.
 * @fires {CustomEvent<{ label: string; }>} collapse - Dispatched when the expander is collapsed.
 *
 * @cssprop --omni-expander-header-min-height - Expander component minimum height.
 * @cssprop --omni-expander-header-max-height - Expander component maximum height.
 *
 * @cssprop --omni-expander-width - Expander component width.
 * @cssprop --omni-expander-background - Expander component background.
 *
 * @cssprop --omni-expander-expanded-height - Expander component expanded height.
 *
 * @cssprop --omni-expander-header-width - Expander header width.
 * @cssprop --omni-expander-header-height - Expander header height.
 * @cssprop --omni-expander-header-padding - Expander header padding.
 * @cssprop --omni-expander-header-border-top - Expander header border top.
 *
 * @cssprop --omni-expander-header-hover-background - Expander header hover background.
 *
 * @cssprop --omni-expander-header-label-font-color - Expander header label font color.
 * @cssprop --omni-expander-header-label-font-size - Expander header label font size.
 * @cssprop --omni-expander-header-label-font-weight - Expander header label font weight.
 *
 * @cssprop --omni-expander-header-disabled-background - Expander header disabled background.
 *
 * @cssprop --omni-expander-content-width - Expander content width.
 * @cssprop --omni-expander-content-height - Expander content height.
 * @cssprop --omni-expander-content-border -  Expander content border.
 * @cssprop --omni-expander-content-padding - Expander content padding.
 *
 * @cssprop --omni-expander-content-closed-padding-top -  Expander content closed top padding.
 * @cssprop --omni-expander-content-closed-padding-bottom - Expander content closed bottom padding.
 *
 * @cssprop --omni-expander-content-expanded-border-bottom - Bottom border of the expander content.
 *
 * @cssprop --omni-expander-header-icon-container-padding - Expander header icon container padding.
 *
 * @cssprop --omni-expander-header-icon-slot-width - Expander header icon slot width.
 * @cssprop --omni-expander-header-icon-slot-height - Expander header icon slot height.
 *
 * @cssprop --omni-expander-expand-icon-container-padding - Expander expand icon container padding.
 *
 * @cssprop --omni-expander-expand-icon-width - Expander expand icon width.
 * @cssprop --omni-expander-expand-icon-height - Expander expand icon height.
 * @cssprop --omni-expander-expand-icon-color - Expander expand icon color.
 *
 * @cssprop --omni-expander-expanding-container-padding-top - Expander expanding content top padding.
 * @cssprop --omni-expander-expanding-container-padding-bottom - Expander expanding content bottom padding.
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
    @property({ type: String, reflect: true, attribute: 'button-alignment' }) buttonAlignment: 'left' | 'right' = 'right';

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('animationend', this._animationCompleted.bind(this), {
            capture: true
        });
    }

    override disconnectedCallback() {
        // Stop listening for child label change events.
        this.removeEventListener(`animationend`, this._animationCompleted.bind(this));

        // Ensure the component is cleaned up correctly.
        super.disconnectedCallback();
    }

    _headerClick(e: MouseEvent) {
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
        const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');
        if (motionOK) {
            // Ignore the request to expand if the component is already expanded.
            if (this.expanded === true || this.hasAttribute(`expanding`)) {
                return;
            }

            // Trigger the expanding animation.
            this.removeAttribute(`collapsing`);
            this.setAttribute(`expanding`, ``);
        } else {
            this.expanded = true;
        }

        // Notify any direct subscribers that the component was expanded.
        this.dispatchEvent(
            new CustomEvent(`expand`, {
                detail: {
                    label: this.label
                }
            })
        );
    }

    _collapse() {
        const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');

        if (motionOK) {
            // Ignore the request to collapse if the component is already collapsed.
            if (this.expanded === false || this.hasAttribute(`collapsing`)) {
                return;
            }

            // Trigger the collapsing animation.
            this.removeAttribute(`expanding`);
            this.setAttribute(`collapsing`, ``);
        } else {
            this.expanded = false;
        }

        // Notify any direct subscribers that the component was collapsed.
        this.dispatchEvent(
            new CustomEvent(`collapse`, {
                detail: {
                    label: this.label
                }
            })
        );
    }

    static override get styles() {
        return [
            super.styles,

            css`
				:host {
					min-height: var(--omni-expander-header-min-height, 50px);
					max-height: var(--omni-expander-header-max-height, 50px);
				}
			`,
            css`

            
                :host {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: stretch;
					width: var(--omni-expander-width, 100%);
					background: var(--omni-expander-background, var(--omni-background-color));
                }

                :host([expanded]) {
					max-height: unset;
					height: var(--omni-expander-expanded-height, 200px);
				}

                /* HEADER STYLES */

                :host > .header {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
					width: var(--omni-expander-header-width, 100%);
					height: var(--omni-expander-header-height, 50px);
					padding: var(--omni-expander-header-padding, 10px);
					border-top: var(--omni-expander-header-border-top, 1px solid var(--omni-primary-color));
					cursor: pointer;
				}

                :host > .header:hover {
					background: var(--omni-expander-header-hover-background, var(--omni-background-hover-color));
				}

                
                :host > .header > omni-label {
                    --omni-label-font-color: var(--omni-expander-header-label-font-color, var(--omni-font-color));
					--omni-label-font-size: var(--omni-expander-header-label-font-size, var(--omni-font-size));
					--omni-label-font-weight: var(--omni-expander-header-label-font-weight, var(--omni-font-weight));
					margin-right: auto;
					cursor: pointer;
                }

                :host([expanded]) > .header {
					border-bottom-left-radius: 0px;
					border-bottom-right-radius: 0px;
                }

                :host([expanded]) > .header > .expand-icon-container {
					transform: rotate(180deg);
				}

				:host(:not([expanded])) > .header > .expand-icon-container {
					transform: none;
				}

                :host([disabled]) > .header {
                    background: var(--omni-expander-header-disabled-background ,var(--omni-disabled-background-color));
                }

                /* EXPANDER CONTENT STYLES */
                :host > .expander-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                    width: var(--omni-expander-content-width, 100%);
                    height: var(--omni-expander-content-height, 100%);

                    flex: 1 1 auto;

                    border-left: var(--omni-expander-content-border, 1px solid var(--omni-primary-color));
                    border-right: var(--omni-expander-content-border, 1px solid var(--omni-primary-color));
                    border-top: var(--omni-expander-content-border, 1px solid var(--omni-primary-color));

                    padding: var(--omni-expander-content-padding, 10px);
                }

                :host(:not([expanded])) > .expander-content {
					overflow: hidden;
					padding-top: var(--omni-expander-content-closed-padding-top, 0px);
					padding-bottom: var(--omni-expander-content-closed-padding-bottom, 0px);
				}

                :host([expanding]) > .expander-content,
                :host([expanded]) > .expander-content {
                    border-bottom: var(--omni-expander-content-expanded-border-bottom, 1px solid var(--omni-primary-color));
				}



                /* HEADER ICON */

                .header-icon-container {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-expander-header-icon-container-padding, 10px 10px);
                }

                ::slotted([slot='header-icon']) {
                    width: var(--omni-expander-header-icon-slot-width, 20px);
                    height: var(--omni-expander-header-icon-slot-height, 20px);
                }


                /* EXPAND ICON */
                .expand-icon-container {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-expander-expand-icon-container-padding, 10px 10px);
                }

                .expand-icon {
                    width: var(--omni-expander-expand-icon-width, 20px);
                    height: var(--omni-expander-expand-icon-height, 20px);
                    fill: var(--omni-expander-expand-icon-color, var(--omni-primary-color));
                }

                ::slotted([slot='expand-icon']) {
                    height: var(--omni-expander-expand-icon-height, 20px);
                    width: var(--omni-expander-expand-icon-width, 20px);
                  }

                /* ANIMATIONS */

				:host([expanding]) {
					animation: expand 0.5s;
					animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1);
					animation-fill-mode: forwards;
				}

                :host([expanding]) > .header > .expand-icon-container {
					transition: all 0.15s linear 0s;
					transform: rotate(180deg);
				}
                
				:host([collapsing]) > .header > .expand-icon-container {
					transition: all 0.15s linear 0s;
					transform: none;
				}

                :host([expanding]) > .expander-content {
					transition: padding linear 0.2s;
					padding-top: var(--omni-expander-expanding-container-padding-top, 10px);
					padding-bottom: var(--omni-expander-expanding-container-padding-bottom 10px);
				}
                
				:host([collapsing]) > .expander-content {
					overflow: hidden;
				}

                /* Hide scrollbar for Chrome, Safari and Opera */
				:host([collapsing]) > .expander-content::-webkit-scrollbar {
					display: none;
				}

				/* Hide scrollbar for IE and Edge */
				:host([collapsing]) > .expander-content {
					-ms-overflow-style: none;
				}

				:host([collapsing]) {
					animation: collapse 0.5s;
					animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1);
					animation-fill-mode: forwards;
				}

                @media (prefers-reduced-motion) {
                    :host([expanding]) {
                        animation: unset;
                    }

                    :host([collapsing]) {
                        animation: unset;
                    }
                }

                @keyframes expand {
					0% {
						max-height: var(--omni-expander-header-height, 50px);
						height: var(--omni-expander-header-height, 50px);
					}
					99% {
						max-height: var(--omni-expander-expanding-max-height, 100vh);
						height: var(--omni-expander-height, 200px);
					}
					100% {
						max-height: unset;
						height: var(--omni-expander-height, 200px);
					}
				}

				@keyframes collapse {
					0% {
						max-height: var(--omni-expander-height, 200px);
						overflow: hidden;
					}
					100% {
						max-height: var(--omni-expander-header-height, 50px);
						overflow: hidden;
					}
				}

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
        ${
            this.buttonAlignment === 'left'
                ? html`<div class='expand-icon-container'><slot name='expand-icon'><omni-chevron-down-icon class='expand-icon'></omni-chevron-down-icon></slot></div>`
                : this._renderIcon()
        }
        ${this.label ? html`<omni-label label="${this.label}"></omni-label>` : nothing}
        ${
            this.buttonAlignment === 'right'
                ? html`<div class='expand-icon-container'><slot name='expand-icon'><omni-chevron-down-icon class='expand-icon'></omni-chevron-down-icon></slot></div>`
                : this._renderIcon()
        }
        `;
    }

    _renderIcon(): TemplateResult {
        return html`
        <div class='header-icon-container'>
            <slot name='header-icon'></slot>
        </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-expander': Expander;
    }
}
