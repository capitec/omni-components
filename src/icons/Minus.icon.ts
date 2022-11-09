import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement';

/**
 * Minus icon component.
 *
 * @import
 * ```js 
 * import '@capitec/omni-components/icons/Minus.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-minus-icon></omni-minus-icon>
 * ```
 *
 * @element omni-minus-icon
 *
 */
@customElement('omni-minus-icon')
export class MinusIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
            <path d="M28.615 24c0 .35-.26.64-.598.686l-.094.006h-7.846a.692.692 0 0 1-.094-1.378l.094-.006h7.846c.382 0 .692.31.692.692Z" />
        </svg>`;
    }
}
