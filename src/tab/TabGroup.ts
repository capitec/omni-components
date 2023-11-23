import { html, css, TemplateResult, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { OmniElement } from '../core/OmniElement.js';
import { TabHeader } from './TabHeader.js';

/**
 * Component that displays content in tabs.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/tab';
 * ```
 *
 * @example
 * ```html
 * <omni-tab-group>
 *  <omni-tab header='Tab 1'>
 *   <omni-label>Tab 1</omni-label>
 *  </omni-tab>
 *  <omni-tab header="Tab 2">
 *   <omni-label>Tab 2</omni-label>
 *  </omni-tab>
 *  <omni-tab header="Tab 3">
 *   <omni-label>Tab 3</omni-label>
 *  </omni-tab>
 * </omni-tab-group>
 *```
 *
 * @element omni-tab-group
 *
 * Registry of all properties defined by the component.
 *
 * @fires {CustomEvent<{ previous: HTMLElement, selected: HTMLElement}>} tab-select - Dispatched when an omni-tab is selected.
 *
 * @slot - All omni-tab components that are managed by this component.
 * @slot header - Optional omni-tab-header components associated with each omni-tab component.
 *
 * @cssprop --omni-tab-group-tab-bar-overflow-x - Tabs tab bar overflow x.
 * @cssprop --omni-tab-group-tab-bar-overflow-y - Tabs tab bar overflow y.
 * @cssprop --omni-tab-group-tab-bar-width - Tabs tab bar width.
 * @cssprop --omni-tab-group-tab-bar-height - Tabs tab bar height.
 * @cssprop --omni-tab-group-tab-bar-border-bottom - Tabs tab bar bottom border.
 * @cssprop --omni-tab-group-tab-bar-background-color - Tabs tab bar background color.
 *
 * @cssinherit omni-tab-header
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
                attributeFilter: [`header`, `active`, `disabled`],
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

    selectTab(tabHeader: TabHeader) {
        if (!tabHeader || tabHeader.classList.contains('tab-bar')) {
            return;
        }

        // set tab header used in cases where the tab header has slotted content.
        tabHeader = tabHeader.closest('omni-tab-header') as TabHeader;
        const children = Array.from(this.children);

        let tab;
        // Added check for cases where clicking between tabs results in the tabHeader being null.
        if (tabHeader) {
            tab = children.find((t) => (t.id && t.id === tabHeader.for) || t === tabHeader.data);
        }

        if (!tab || tab.hasAttribute(disabledAttribute)) {
            return;
        }

        const tabHeaders = [
            ...children.filter((oth) => oth.slot === 'header'),
            ...(this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name=header]')?.children || [])
        ] as TabHeader[];

        const previous = children.find((c) => c.hasAttribute(activeAttribute));

        // Remove active attributes from tab headers and tabs.
        tabHeaders.forEach((header) => {
            header.removeAttribute(activeHeaderAttribute);
            header.requestUpdate();
        });
        children.forEach((element) => {
            element.removeAttribute(activeAttribute);
        });

        // Set active tab-header and tab
        tab.setAttribute(activeAttribute, '');
        tabHeader.setAttribute(activeHeaderAttribute, '');
        tabHeader.requestUpdate();

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
                    overflow: hidden;
                }

                /* Tab bar */
                :host > .tab-bar {
                    display: flex;
                    flex-shrink: 0;
                    flex-direction: row;
                    align-items: center;
                    overflow-x: var(--omni-tab-group-tab-bar-overflow-x, auto);
                    overflow-y: var(--omni-tab-group-tab-bar-overflow-y, hidden);
                    width: var(--omni-tab-group-tab-bar-width, 100%);
                    height: var(--omni-tab-group-tab-bar-height, 50px);
                    border-bottom: var(--omni-tab-group-tab-bar-border-bottom, none);
                    background: var(--omni-tab-group-tab-bar-background-color, transparent);
                }

                /* CONTENT */
                ::slotted(*:not([active]):not([slot])) {
                    display: none !important;
                }
            `
        ];
    }

    protected override render(): TemplateResult {
        /**
         * Check what type of rendering option will be utilised the recommended implementation requires only nested omni-tab components the advanced implementation requires omni-tab-headers with associated omni-tab(s).
         * If omni-tab-headers are nested the associated omni-tab requires the id attribute to be set to the corresponding omni-tab-headers for attribute.
         */
        const tabHeaders = Array.from(this.querySelectorAll('omni-tab-header')).filter((oth) => oth.slot === 'header');
        const tabContent = Array.from(this.querySelectorAll('omni-tab'));

        if (tabContent.length > 0) {
            if (!tabContent.find((c) => c.hasAttribute(activeAttribute) || c.active)) {
                tabContent[0].setAttribute(activeAttribute, '');
                const activeTabHeader = tabHeaders.find((x) => x.for === tabContent[0].id);
                if (activeTabHeader) {
                    activeTabHeader.setAttribute(activeHeaderAttribute, '');
                    activeTabHeader.requestUpdate();
                }
            } else {
                const activeTab = tabContent.find((c) => c.hasAttribute(activeAttribute) || c.active);
                const activeTabHeader = tabHeaders.find((x) => x.for === activeTab?.id);
                if (activeTabHeader) {
                    activeTabHeader.setAttribute(activeHeaderAttribute, '');
                    activeTabHeader.requestUpdate();
                }
            }

            if (tabHeaders.length > 0) {
                tabContent
                    .filter((t) => t.hasAttribute(disabledAttribute))
                    .forEach((t) => {
                        const header = tabHeaders.find((x) => x.for === t.id);
                        if (header) {
                            header.setAttribute(disabledHeaderAttribute, '');
                            header.requestUpdate();
                        }
                    });
            }
        }

        return html`
                <div class='tab-bar' @click="${(e: MouseEvent) => this.selectTab(e.target as TabHeader)}">
                    <slot name='header' @slotchange="${() => this.requestUpdate()}">
                        ${tabContent.map((tab) =>
                            tab.hasAttribute('header')
                                ? html`
                                    <omni-tab-header ?data-active="${tab.hasAttribute(activeAttribute)}" for="${ifDefined(
                                      tab.id
                                  )}" .data="${tab}"  ?data-disabled="${tab.hasAttribute(disabledAttribute)}" >
                                    ${tab.getAttribute('header')}
                                    </omni-tab-header>
                        `
                                : nothing
                        )}
                    </slot>
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
export const activeAttribute = 'active';
export const disabledAttribute = 'disabled';

const activeHeaderAttribute = 'data-active';
const disabledHeaderAttribute = 'data-disabled';
