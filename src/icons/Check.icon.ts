import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Check icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Check.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-check-icon></omni-check-icon>
 * ```
 *
 * @element omni-check-icon
 *
 */
@customElement('omni-check-icon')
export class CheckIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
      <svg version="1.1" viewBox="0 0 16 16" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-2,-2)">
          <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
        </g>
      </svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-check-icon': CheckIcon;
    }
}
