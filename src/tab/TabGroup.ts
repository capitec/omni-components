import { html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Component that displays content in tabs.
 *
 *   @import
 * ```js
 * import '@capitec/omni-components/tab-group';
 * ```
 *
 * @example
 * ```html
 * <omni-tab-group>
 *  <omni-tab label="Details">
 *   <omni-label label="Tab 1"></omni-label>
 *  </omni-tab>
 *  <omni-tab label="Comments (3)">
 *   <omni-label label="Tab 2"></omni-label>
 *  </omni-tab>
 * </omni-tab-group>
 *```
 *
 * @element omni-tab-group
 *
 * Registry of all properties defined by the component.
 *
 * @fires {CustomEvent<{}>} tab-select - Dispatched when one of the omni-tabs is clicked.
 *
 * @slot - Content to render inside the component body.
 *
 * @global_attribute {string} data-omni-tab-label - Set the label for the tab in the group.
 * @global_attribute {boolean} data-omni-tab-active - Set the active tab in the group.
 *
 * @cssprop --omni-tab-group-tab-bar-width - Tab group tab bar width.
 * @cssprop --omni-tab-bar-height - Tab group tab bar height.
 * @cssprop --omni-tab-group-tab-bar-border-bottom - Tab group tab bar bottom border.
 * @cssprop --omni-tab-group-tab-bar-background-color - Tab group tab bar background color.
 *
 * @cssprop --omni-tab-group-tab-height - Tab group tab height.
 * @cssprop --omni-tab-group-tab-min-width - Tab group tab min width.
 * @cssprop --omni-tab-group-tab-max-width - Tab group tab max width.
 *
 * @cssprop --omni-tab-group-tab-hover-background-color - Tab group tab hover background.
 *
 * @cssprop --omni-tab-group-tab-label-container-height -
 * @cssprop --omni-tab-group-tab-tab-indicator-height -
 *
 * @cssprop --omni-tab-group-tab-label-font-size - Tab group tab label font size.
 * @cssprop --omni-tab-group-tab-label-font-weight - Tab group tab label font weight.
 * @cssprop --omni-tab-group-tab-label-font-color - Tab group tab label font color.
 *
 * @cssprop --theme-tab-selected-font-color - Tab group selected Tab font color.
 *
 * @cssprop --omni-tab-group-tab-indicator-height - Tab group selected tab indicator height.
 *
 * @cssprop --omni-tab-group-tab-indicator-height - .
 * @cssprop --omni-tab-group-tab-indicator-color - .
 * @cssprop --omni-tab-group-tab-indicator-border-radius - .
 * @cssprop --omni-tab-group-tab-indicator-width - .
 *
 */
@customElement('omni-tab-group')
export class TabGroup extends OmniElement {
    @state() private _observer: MutationObserver | undefined;

    override connectedCallback(): void {
        super.connectedCallback();
        this._observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === `attributes`) {
                    // Re-render the component when a child item's attributes has changed.
                    this.requestUpdate();
                }
            }

            // Start observing child attribute changes.
            this._observer?.observe(this, {
                attributes: true,
                attributeFilter: [`data-omni-tab-label`],
                subtree: true
            });
        });
    }

    /**
     * Clean-up the component once removed from the DOM.
     *
     * @ignore
     *
     * @returns {void}
     */
    override disconnectedCallback() {
        // Stop observing child attribute changes.
        if (this._observer) {
            this._observer.disconnect();
        }

        // Ensure the component is cleaned up correctly.
        super.disconnectedCallback();
    }

    selectTab(tab: Element) {
        if (!tab) {
            return;
        }
        const children = Array.from(this.children);
        const previous = children.find((c) => c.hasAttribute(activeAttribute));
        children.forEach((element) => {
            element.removeAttribute(activeAttribute);
        });
        tab.setAttribute(activeAttribute, '');

        this.dispatchEvent(
            new CustomEvent('tab-select', {
                detail: {
                    previous: previous,
                    selected: tab
                }
            })
        );

        this.requestUpdate();
    }

    static override get styles() {
        return [
            super.styles,
            css`
            :host {
                width:100%;
                height:100%;
            }

            /* Tab bar */
            :host > .tab-bar {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: var(--omni-tab-group-tab-bar-width, 100%);
                height: var(--omni-tab-group-tab-bar-height, 50px);
                border-bottom: var(--omni-tab-group-tab-bar-border-bottom, none);
                background: var(--omni-tab-group-tab-bar-background-color, transparent);
            }

            /* Tab */
            :host > .tab-bar > .tab {
                height: var(--omni-tab-group-tab-height, 100%);
                min-width: var(--omni-tab-group-tab-min-width, 100px);
                max-width: var(--omni-tab-group-tab-max-width, 300px);
            }

            :host > .tab-bar > .tab:hover {
                background-color: var(--omni-tab-group-tab-hover-background-color, var(--omni-accent-hover-color));
            }

            :host > .tab-bar > .tab > .tab-label-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: calc(var(--omni-tab-group-tab-label-container-height, 100%) - var(--omni-tab-group-tab-tab-indicator-height, 4px));
                cursor: pointer;
            }

            :host > .tab-bar > .tab > .tab-label-container > .tab-label {
                font-size: var(--omni-tab-group-tab-label-font-size, var(--omni-font-size));
                font-weight: var(--omni-tab-group-tab-label-font-weight, var(--omni-font-weight));
                color: var(--omni-tab-group-tab-label-font-color, var(--omni-font-color));
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

            }

            :host > .tab-bar > .tab > .tab-label-container > .tab-label.selected {
                color: var(--omni-tab-group-tab-selected-font-color, var(--omni-accent-color));
            }

            :host > .tab-bar > div > .indicator {
                height: var(--omni-tab-group-tab-indicator-height, 4px);
                background-color: var(--omni-tab-group-tab-indicator-color, var(--omni-primary-color));
                border-radius: var(--omni-tab-group-tab-indicator-border-radius, 100px 100px 0 0);
                width: var(--omni-tab-group-tab-indicator-width, 100%);
            }

            :host > .tab-slot {
                display: flex;
                flex: 1 1 auto;
					
                width: 100%;
                height: 100%;

                padding-left: var(--omni-tab-group-tab-content-padding-left, 10px);
                padding-right: var(--omni-tab-group-tab-content-padding-right, 10px);
                padding-top: var(--omni-tab-group-tab-content-padding-top, 10px);
                padding-bottom: var(--omni-tab-group-tab-content-padding-bottom, 10px);
            }

            ::slotted(*:not([data-omni-tab-active])) {
                display: none !important;
            }

        `
        ];
    }

    protected override render(): TemplateResult {
        const children = Array.from(this.children);
        if (!children.find((c) => c.hasAttribute(activeAttribute)) && children.length > 0) {
            children[0].setAttribute(activeAttribute, '');
        }
        return html`
            <div class='tab-bar'>
                ${children.map(
                    (tab: Element) => html`
                    <div class='tab' @click='${() => this.selectTab(tab)}'>
                        <div class="tab-label-container">
                            <div class="tab-label ${tab.hasAttribute(activeAttribute) ? `selected` : ``}">${tab.getAttribute(
                        'data-omni-tab-label'
                    )}</div>
                        </div>
                        ${tab.hasAttribute(activeAttribute) ? html`<div class="indicator"></div>` : nothing}
                    </div>
                `
                )}
            </div>

			<slot @slotchange="${() => this.requestUpdate()}"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-tab-group': TabGroup;
    }
}

// Custom Global Attributes
/**
 * Indicates which slot is active
 */
export const activeAttribute = 'data-omni-tab-active';
