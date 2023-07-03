import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control that can be used to display custom slotted content, for use within an omni-tabs component and associated omni-tab component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/tab';
 * ```
 * @example
 * html```
 * <omni-tab-header for="tab-id">
 *  <span>Slotted Content</span>
 * </omni-tab-header>
 * ```
 *
 * @element omni-tab-header
 *
 * @slot - Content to render inside the tab header.
 *
 * @cssprop --omni-tab-header-font-color - Tab header font color.
 * @cssprop --omni-tab-header-font-family - Tab header font family.
 * @cssprop --omni-tab-header-font-size - Tab header font size.
 * @cssprop --omni-tab-header-font-weight - Tab header font weight.
 *
 * @cssprop --omni-tab-header-disabled-cursor - Tab header disabled cursor.
 * @cssprop --omni-tab-header-disabled-background-color - Tab header disabled background color.
 * @cssprop --omni-tab-header-active-font-color - Tab header active font color.
 *
 * @cssprop --omni-tab-header-height - Tab header tab height.
 * @cssprop --omni-tab-header-min-width - Tab header tab min width.
 * @cssprop --omni-tab-header-max-width - Tab header tab max width.
 * @cssprop --omni-tab-header-margin - Tab header tab margin.
 *
 * @cssprop --omni-tab-header-hover-background-color - Tab header tab hover background.
 *
 * @cssprop --omni-tab-header-indicator-bar-height - Tab header indicator bar height.
 * @cssprop --omni-tab-header-indicator-bar-border-radius -  Tab header indicator bar border radius.
 * @cssprop --omni-tab-header-indicator-bar-width - Tab header indicator bar width.
 *
 * @cssprop --omni-tab-header-indicator-height - Tab header indicator height.
 * @cssprop --omni-tab-header-indicator-color - Tab header indicator color.
 * @cssprop --omni-tab-header-indicator-border-radius - Tab header indicator border radius.
 * @cssprop --omni-tab-header-indicator-width - Tab header indicator width.
 */
@customElement('omni-tab-header')
export class TabHeader extends OmniElement {
    /**
     * Indicator of which omni-tab element with the matching corresponding id attribute should be displayed.
     * @attr
     */
    @property({ type: String, reflect: true }) for?: string;

    /**
     * Data associated with the component.
     * @no_attribute
     */
    @property({ type: Object, reflect: false }) data?: unknown;

    static override get styles() {
        return [
            super.styles,
            css`

                /* host styles */
                :host {
                    color: var(--omni-tab-header-font-color, var(--omni-font-color));
                    font-family: var(--omni-tab-header-font-family, var(--omni-font-family));
                    font-size: var(--omni-tab-header-font-size, var(--omni-font-size));
                    font-weight: var(--omni-tab-header-font-weight, var(--omni-font-weight));
                    cursor: pointer;

                }

                :host([data-disabled]){
                    cursor: var(--omni-tab-header-disabled-cursor, not-allowed);
                    background-color: var(--omni-tab-header-disabled-background-color, var(--omni-disabled-background-color)); 
                }

                /*Active styles*/
                :host([data-active]){
                    color: var(--omni-tab-header-active-font-color, var(--omni-primary-color));
                }

                ::slotted(*) {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: calc(var(--omni-tab-header-height, 100%) - var(--omni-tab-header-indicator-height, 4px));
                }
            
                /* Tab */
                :host > .tab {
                    height: var(--omni-tab-header-height, 100%);
                    min-width: var(--omni-tab-header-min-width, auto);
                    max-width: var(--omni-tab-header-max-width, auto);
                    margin: var(--omni-tab-header-margin, 6px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
        
                /* Added to resolve sticky hover state on mobile devices */
                @media (hover: hover) {
                    :host(:not([data-disabled]):hover) {
                        background-color: var(--omni-tab-header-hover-background-color, var(--omni-background-hover-color));
                    }
                }
            

                :host > .indicator-bar {
                    height: var(--omni-tab-header-indicator-bar-height, 4px);
                    border-radius: var(--omni-tab-header-indicator-bar-border-radius, 100px 100px 0 0);
                    width: var(--omni-tab-header-indicator-bar-width, auto);
                }


                :host > .indicator-bar > .indicator {
                    height: var(--omni-tab-header-indicator-height, 4px);
                    background-color: var(--omni-tab-header-indicator-color, var(--omni-primary-color));
                    border-radius: var(--omni-tab-header-indicator-border-radius, 100px 100px 0 0);
                    width: var(--omni-tab-header-indicator-width, auto);
                }
            `
        ];
    }

    protected override render(): TemplateResult {
        return html`		
            <div class='tab ${this.hasAttribute('data-disabled') ? `disabled` : ``}'>
                <slot></slot>
            </div>
            <div class="indicator-bar">
                ${this.hasAttribute('data-active') ? html`<div class="indicator"></div>` : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-tab-header': TabHeader;
    }
}
