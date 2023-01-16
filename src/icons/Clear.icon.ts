import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Clear icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Clear.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-clear-icon></omni-clear-icon>
 * ```
 *
 * @element omni-clear-icon
 *
 */
@customElement('omni-clear-icon')
export class ClearIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="100%" height="100%">
                <g>
                    <path d="M7 .25A6.744 6.744 0 0 0 .25 7 6.744 6.744 0 0 0 7 13.75 6.744 6.744 0 0 0 13.75 7 6.744 6.744 0 0 0 7 .25Z" />
                    <path stroke="#FFF" stroke-width="1.5" stroke-linecap="round" d="m9.5 4.5-5 5m0-5 5 5" />
                </g>
            </svg>
        `;
    }
}
