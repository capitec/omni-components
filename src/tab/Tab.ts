import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control that can be used to display slotted content used within a omni-tab-group component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/tab';
 * ```
 * @example
 * html```
 * <omni-tab>
 *  <span>Slotted Content</span>
 * </omni-tab>
 * ```
 *
 * @element omni-tab
 *
 * @slot - Content to render inside the component body.
 */
@customElement('omni-tab')
export class Tab extends OmniElement {
    static override get styles() {
        return [
            super.styles,
            css`
            :host {
                width: 100%;
                height: 100%;
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
