import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Chevron down icon component.
 *
 * ```js
 *
 * import '@capitec/omni-components/icons/ChevronDown.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-chevron-down-icon></omni-chevron-down-icon>
 * ```
 *
 * @element omni-chevron-down-icon
 *
 */
@customElement('omni-chevron-down-icon')
export class ChevronDownIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                <path d="M12.5 13.44 8.03 8.97a.75.75 0 0 0-1.06 1.06l5 5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06l-4.47 4.47Z" />
            </svg>
        `;
    }
}
