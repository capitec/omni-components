import { css, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control that can be used to display slotted content, for use within an Tab Group component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/tab';
 * ```
 * @example
 * html```
 * <omni-tab header='Tab 1'>
 *  <span>Tab 1 Content</span>
 * </omni-tab>
 * ```
 *
 * @element omni-tab
 *
 * @slot - Content to render inside the component body.
 *
 * @cssprop --omni-tab-background-color - Tab background.
 *
 */
@customElement('omni-tab')
export class Tab extends OmniElement {
    /**
     * Tab header label, use the omni-tab-header component for more complex header layouts
     * @attr
     */
    @property({ type: String, reflect: true }) header?: string;

    /**
     * Indicator if the tab is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    /**
     * Indicator if the tab is active.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) active?: boolean;

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background: var(--omni-tab-background, var(--omni-background-color));
                }
            
                :host(*:not([active])) {
                    display: none !important;
                }
            `
        ];
    }

    protected override render(): TemplateResult {
        return html`		
            <slot></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-tab': Tab;
    }
}
