import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Close icon component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/Close.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-close-icon></omni-close-icon>
 * ```
 *
 * @element omni-close-icon
 *
 */
@customElement('omni-close-icon')
export class CloseIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
        <path
          d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM8.47 8.47a.75.75 0 0 1 1.06 0L12 10.939l2.47-2.47a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 0 1.06L13.061 12l2.47 2.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0L12 13.061l-2.47 2.47a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1 0-1.06L10.939 12l-2.47-2.47a.75.75 0 0 1-.072-.976Z" />
      </svg>
    `;
    }
}

declare global {
	interface HTMLElementTagNameMap {
		'omni-close-icon': CloseIcon
	}
}
