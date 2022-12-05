import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * More icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/More.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-more-icon></omni-more-icon>
 * ```
 *
 * @element omni-more-icon
 *
 */
@customElement('omni-more-icon')
export class MoreIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                <path d="M12 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
            </svg>
        `;
    }
}
