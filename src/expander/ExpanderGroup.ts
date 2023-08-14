import { css, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Layout container that groups expanders, allowing for automatic expanding and collapsing of sibling expander components.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/expander';
 * ```
 * @example
 * html```
 * <omni-expander-group>
 *  <omni-expander>
 *      <omni-label label=></omni-label>
 *  </omni-expander>
 *  <omni-expander>
 *      <omni-label></omni-label>
 *  </omni-expander>
 * </omni-expander-group>
 * ```
 *
 * @element omni-expander-group
 *
 * @cssprop --omni-expander-group-container-min-width - Expander group min width.
 * @cssprop --omni-expander-group-container-min-height - Expander group min height.
 *
 * @cssprop --omni-expander-group-container-margin-bottom - Expander group container margin bottom.
 */
@customElement('omni-expander-group')
export class ExpanderGroup extends OmniElement {
    /**
     * Expander component label.
     * @attr [expand-mode]
     */
    @property({ type: String, reflect: true, attribute: 'expand-mode' }) expandMode?: 'multiple' | 'single' = 'single';

    @state() private _observer: MutationObserver | undefined;

    override connectedCallback(): void {
        super.connectedCallback();

        this._observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const targetElement = mutation.target as Element;
                if (
                    mutation.type === `attributes` &&
                    ((mutation.attributeName === `expanding` && targetElement.hasAttribute(`expanding`)) ||
                        (mutation.attributeName === `expanded` && targetElement.hasAttribute(`expanded`)))
                ) {
                    this._expanderExpanded(targetElement);
                }
            }
        });

        this._observer.observe(this, {
            attributes: true,
            attributeFilter: [`expanded`, `expanding`],
            subtree: true
        });
    }

    override disconnectedCallback() {
        // Stop observing child attribute changes.
        if (this._observer) {
            this._observer.disconnect();
        }

        // Ensure the component is cleaned up correctly.
        super.disconnectedCallback();
    }

    _collapseAllExpanders() {
        const expanders = Array.from(this.children);
        expanders.forEach((expander: any) => {
            expander.collapse();
        });
    }

    _expanderExpanded(targetExpander: Node) {
        if (this.expandMode === 'single') {
            const expanders = Array.from(this.children);
            expanders.forEach((expander: any) => {
                if (expander !== targetExpander) {
                    expander._collapse();
                }
            });
        }
    }

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
					display: flex;
					flex-direction: column;
					justify-content: stretch;
					align-items: stretch;
                    min-width: var(--omni-expander-group-container-min-width, 200px);
					min-height: var(--omni-expander-group-container-min-height, 100px);
                }

                .group-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                }

                ::slotted(*) {
					margin-bottom: var(--omni-expander-group-container-margin-bottom, 0px);
				}

				::slotted(*[expanded]) {
					flex: 1 1 auto;
				}
            `
        ];
    }

    protected override render(): TemplateResult {
        return html`
            <div class="group-container">		
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-expander-group': ExpanderGroup;
    }
}
