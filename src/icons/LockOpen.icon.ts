import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Open lock icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/LockOpen.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-lock-open-icon></omni-lock-open-icon>
 * ```
 *
 * @element omni-lock-open-icon
 *
 */
@customElement('omni-lock-open-icon')
export class LockOpenIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html` <svg slot="show" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12 1.25c2.099 0 4.04.977 5.31 2.615a.75.75 0 0 1-1.185.92A5.208 5.208 0 0 0 12 2.75c-2.825 0-5.132 2.269-5.246 5.115l-.004.22v3.165H20a.75.75 0 0 1 .743.648l.007.102v10a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 .75-.75h1.25V8.086C5.25 4.313 8.27 1.25 12 1.25Zm7.25 11.5H4.75v8.5h14.5v-8.5ZM12 15.25a.75.75 0 0 1 .743.648l.007.102v2a.75.75 0 0 1-1.493.102L11.25 18v-2a.75.75 0 0 1 .75-.75Z"></path>
    </svg>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-lock-open-icon': LockOpenIcon;
    }
}
