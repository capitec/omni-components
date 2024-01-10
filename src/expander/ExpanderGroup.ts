import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';
import { Expander } from './Expander.js';

/**
 * Layout container that groups expanders.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/expander';
 * ```
 * @example
 * html```
 * <omni-expander-group>
 *  <omni-expander label="Expander-1">
 *    <omni-label label="Content"></omni-label>
 *  </omni-expander>
 *  <omni-expander label="Expander-2">
 *    <omni-label label="Content"></omni-label>
 *  </omni-expander>
 * </omni-expander-group>
 * ```
 *
 * @element omni-expander-group
 *
 * @slot - Default slot to slot multiple expanders.
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

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('expand', this._expanderExpanded.bind(this), {
            capture: true
        });
    }

    override disconnectedCallback() {
        // Ensure the component is cleaned up correctly.
        super.disconnectedCallback();
    }

    _expanderExpanded(e: Event) {
        if (this.expandMode === 'single') {
            const expanders = Array.from<Expander>(this.children as unknown as Expander[]);
            expanders.forEach((expander: Expander) => {
                if (expander !== e.target) {
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
                
                ::slotted(omni-expander:not(:last-of-type)) {                  
                    --omni-expander-content-expanded-border-bottom : none;
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
