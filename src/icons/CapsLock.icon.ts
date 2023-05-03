import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Caps lock icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/CapsLock.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-caps-lock-icon></omni-caps-lock-icon>
 * ```
 *
 * @element omni-caps-lock-icon
 *
 */
@customElement('omni-caps-lock-icon')
export class CapsLockIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%"><path d="M23 24v2H9v-2h14ZM16 6l9 9h-5v5h-8v-5H7l9-9Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-caps-lock-icon': CapsLockIcon;
    }
}
