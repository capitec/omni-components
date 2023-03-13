import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Caps off icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/CapsOff.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-caps-off-icon></omni-caps-off-icon>
 * ```
 *
 * @element omni-caps-off-icon
 *
 */
@customElement('omni-caps-off-icon')
export class CapsOffIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%"><path clip-rule="evenodd" d="m16 9 9 9h-5v5h-8v-5H7l9-9Zm0 2.12-5.38 5.38h2.88v5h5v-5h2.88L16 11.12Z"/></svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-caps-off-icon': CapsOffIcon;
    }
}
