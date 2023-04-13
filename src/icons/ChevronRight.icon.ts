import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Chevron right icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/ChevronRight.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-chevron-right-icon></omni-chevron-right-icon>
 * ```
 *
 * @element omni-chevron-right-icon
 *
 */
@customElement('omni-chevron-right-icon')
export class ChevronRightIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m13.94 12-4.47 4.47a.75.75 0 0 0 1.06 1.06l5-5a.75.75 0 0 0 0-1.06l-5-5a.75.75 0 0 0-1.06 1.06L13.94 12Z"/></svg>
        `;
    }
}
