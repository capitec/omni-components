import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Send icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Send.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-send-icon></omni-send-icon>
 * ```
 *
 * @element omni-send-icon
 *
 */
@customElement('omni-send-icon')
export class SendIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m3.25 10 .008.113a.75.75 0 0 0 .56.615L8.908 12l-5.09 1.272A.75.75 0 0 0 3.25 14v6a.75.75 0 0 0 1.085.67l16-8a.75.75 0 0 0 0-1.34l-16-8A.75.75 0 0 0 3.25 4v6Zm1.5-4.787L18.323 12 4.75 18.786v-4.201l7.432-1.857.113-.037c.642-.264.604-1.24-.113-1.419L4.75 9.414V5.213Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-send-icon': SendIcon;
    }
}
