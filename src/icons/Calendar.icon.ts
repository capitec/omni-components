import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * A calendar icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Calendar.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-calendar-icon></omni-calendar-icon>
 * ```
 *
 * @element omni-calendar-icon
 *
 */
@customElement('omni-calendar-icon')
export class CalenderIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path d="M16 .25a.75.75 0 0 1 .743.648L16.75 1v.25H22a.75.75 0 0 1 .743.648L22.75 2v20a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V2A.75.75 0 0 1 2 1.25h5.25V1A.75.75 0 0 1 8.743.898L8.75 1v.25h6.5V1A.75.75 0 0 1 16 .25Zm5.102 7.993L21 8.25H3a.749.749 0 0 1-.25-.043V21.25h18.5l.001-13.043a.745.745 0 0 1-.15.036ZM15.25 2.75h-6.5V3a.75.75 0 0 1-1.493.102L7.25 3v-.25h-4.5v4.043a.745.745 0 0 1 .148-.036L3 6.75h18c.088 0 .173.015.251.043L21.25 2.75h-4.5V3a.75.75 0 0 1-1.493.102L15.25 3v-.25Z"/></svg>
        `;
    }
}
