import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Backspace icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Backspace.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-backspace-icon></omni-backspace-icon>
 * ```
 *
 * @element omni-backspace-icon
 *
 */
@customElement('omni-backspace-icon')
export class BackspaceIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M26.451 6a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H12.282a2 2 0 0 1-1.417-.59l-9.163-9.205a1 1 0 0 1 0-1.41l9.163-9.206A2 2 0 0 1 12.282 6h14.17Zm-3.254 5.9a.744.744 0 0 0-.972.07l-3.363 3.362L15.5 11.97a.748.748 0 0 0-1.057.004l-.073.084a.744.744 0 0 0 .069.973l3.362 3.362-3.362 3.363a.748.748 0 0 0 .004 1.057l.084.073c.295.22.708.195.973-.07l3.362-3.362 3.363 3.363c.29.29.764.289 1.057-.004l.073-.085a.744.744 0 0 0-.07-.972l-3.362-3.363 3.363-3.362a.748.748 0 0 0-.004-1.057Z"/></svg>
            `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-backspace-icon': BackspaceIcon;
    }
}
