import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Chevron left icon component.
 *
 * ```js
 *
 * import '@capitec/omni-components/icons/ChevronLeft.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-chevron-left-icon></omni-chevron-left-icon>
 * ```
 *
 * @element omni-chevron-left-icon
 *
 */
@customElement('omni-chevron-left-icon')
export class ChevronLeftIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="m11.06 12 4.47 4.47a.75.75 0 0 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 1.06L11.06 12Z"/></svg>
        `;
    }
}