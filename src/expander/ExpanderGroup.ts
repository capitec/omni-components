import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Layout container that groups expanders, allowing for automatic expanding and collapsing of sibling expander controls.
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
     * @attr
     */
    @property({ type: String, reflect: true }) expandMode?: 'multiple' | 'single'  = 'single';

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