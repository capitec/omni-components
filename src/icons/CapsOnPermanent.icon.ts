import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Permanent caps on icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/CapsOnPermanent.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-caps-on-permanent-icon></omni-caps-on-permanent-icon>
 * ```
 *
 * @element omni-caps-on-permanent-icon
 *
 */
@customElement('omni-caps-on-permanent-icon')
export class CapsOnPermanentIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M23 24v2H9v-2h14ZM16 6l9 9h-5v5h-8v-5H7l9-9Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-caps-on-permanent-icon': CapsOnPermanentIcon;
    }
}
