import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Next icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Next.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-next-icon></omni-next-icon>
 * ```
 *
 * @element omni-next-icon
 *
 */
@customElement('omni-next-icon')
export class NextIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm-.554 3.647.084.073 4 4a.75.75 0 0 1 .073.976l-.073.084-4 4a.75.75 0 0 1-1.133-.976l.073-.084L13.939 12l-3.47-3.47a.75.75 0 0 1-.072-.976l.073-.084a.75.75 0 0 1 .976-.073Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-next-icon': NextIcon;
    }
}
