import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement';

/**
 * Plus icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Plus.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-plus-icon></omni-plus-icon>
 * ```
 *
 * @element omni-plus-icon
 *
 */
@customElement('omni-plus-icon')
export class PlusIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
      <path
        clip-rule="evenodd"
        d="M24.72 24.72v3.36a.72.72 0 0 1-1.44 0v-3.36h-3.361a.72.72 0 1 1 0-1.44h3.36v-3.36a.72.72 0 1 1 1.44 0v3.36h3.36a.72.72 0 1 1 0 1.44h-3.36Z" />
    </svg>`;
    }
}
