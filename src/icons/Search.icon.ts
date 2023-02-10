import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Search icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Search.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-search-icon></omni-search-icon>
 * ```
 *
 * @element omni-search-icon
 *
 */
@customElement('omni-search-icon')
export class SearchIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                <path
                    d="M8.5.25a8.25 8.25 0 0 1 6.34 13.529l7.683 7.684a.75.75 0 0 1-.976 1.133l-.084-.073-7.684-7.683A8.25 8.25 0 1 1 8.5.25Zm0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Z" />
            </svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-search-icon': SearchIcon;
    }
}
