import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Arrow right icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/ArrowRight.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-arrow-right-icon></omni-arrow-right-icon>
 * ```
 *
 * @element omni-arrow-right-icon
 *
 */
@customElement('omni-arrow-right-icon')
export class ArrowRightIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.53 5.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H3a.75.75 0 0 0-.743.648L2.25 12c0 .414.336.75.75.75h16.19l-4.72 4.72a.75.75 0 0 0-.073.976l.073.084a.75.75 0 0 0 1.06 0l6-6a.75.75 0 0 0 0-1.06Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-arrow-right-icon': ArrowRightIcon;
    }
}
