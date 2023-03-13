import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Caps on icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/CapsOn.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-caps-on-icon></omni-caps-on-icon>
 * ```
 *
 * @element omni-caps-on-icon
 *
 */
@customElement('omni-caps-on-icon')
export class CapsOnIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20 18h5l-9-9-9 9h5v5h8z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-caps-on-icon': CapsOnIcon;
    }
}
