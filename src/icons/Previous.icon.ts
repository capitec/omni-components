import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Previous icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Previous.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-previous-icon></omni-previous-icon>
 * ```
 *
 * @element omni-previous-icon
 *
 */
@customElement('omni-previous-icon')
export class PreviousIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm1.53 3.72a.75.75 0 0 1 .073.976l-.073.084L10.061 12l3.47 3.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073-4-4a.75.75 0 0 1-.073-.976l.073-.084 4-4a.75.75 0 0 1 1.06 0Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-previous-icon': PreviousIcon;
    }
}
