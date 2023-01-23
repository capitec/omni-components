import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement';

/**
 * Closed lock icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/LockClosed.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-lock-closed-icon></omni-lock-closed-icon>
 * ```
 *
 * @element omni-lock-closed-icon
 *
 */
@customElement('omni-lock-closed-icon')
export class LockClosedIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html` <svg slot="hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="M12 1.25c3.65 0 6.621 2.934 6.746 6.596l.004.24v3.164H20a.75.75 0 0 1 .743.648l.007.102v10a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 .75-.75h1.25V8.086C5.25 4.313 8.27 1.25 12 1.25Zm7.25 11.5H4.75v8.5h14.5v-8.5ZM12 15.25a.75.75 0 0 1 .743.648l.007.102v2a.75.75 0 0 1-1.493.102L11.25 18v-2a.75.75 0 0 1 .75-.75Zm0-12.5c-2.825 0-5.132 2.269-5.246 5.115l-.004.22v3.165h10.5V8.086c0-2.95-2.353-5.336-5.25-5.336Z"></path>
    </svg>`;
    }
}

declare global {
	interface HTMLElementTagNameMap {
		'omni-lock-closed-icon': LockClosedIcon
	}
}
