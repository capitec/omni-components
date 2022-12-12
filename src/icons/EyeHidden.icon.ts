import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMTreeElement from '../core/DOMTreeElement.js';

/**
 * Hidden eye icon component
 *
 * @import
 * ```js
 * import '@capitec/omni-components/icons/EyeHidden.icon.js';
 * ```
 *
 * @example
 * ```html
 * <omni-eye-hidden-icon></omni-eye-hidden-icon>
 * ```
 *
 * @element omni-eye-hidden-icon
 *
 */
@customElement('omni-eye-hidden-icon')
export class EyeHiddenIcon extends DOMTreeElement {
    override render(): TemplateResult {
        return html` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
      <path
        d="m4.446 3.397.084.073 16 16a.75.75 0 0 1-.976 1.133l-.084-.073-2.239-2.238-.11.063c-.571.31-1.143.57-1.715.777A9.952 9.952 0 0 1 12 19.75c-3.859 0-7.724-2.391-11.504-7.044a1.119 1.119 0 0 1-.002-1.398C2.002 9.44 3.519 7.938 5.045 6.81c.137-.1.273-.199.41-.294L3.47 4.53a.75.75 0 0 1 .976-1.133Zm1.492 4.618c-1.299.96-2.607 2.228-3.918 3.798l-.158.192.092.11c3.324 3.981 6.61 6.017 9.768 6.13l.278.005c.956 0 1.92-.175 2.895-.528.407-.148.816-.327 1.228-.536l-1.337-1.338a4.75 4.75 0 0 1-6.633-6.634l-1.619-1.62c-.198.133-.397.273-.596.42Zm17.568 3.293a1.12 1.12 0 0 1-.002 1.398c-1.124 1.384-2.256 2.568-3.393 3.548a.75.75 0 0 1-.98-1.136c.949-.817 1.9-1.794 2.851-2.925l.155-.188-.062-.077C17.86 6.831 13.767 4.932 9.726 6.071l-.252.076a.75.75 0 1 1-.449-1.432c4.889-1.532 9.737.714 14.48 6.593ZM8.75 12a3.25 3.25 0 0 0 4.955 2.767l-4.472-4.473A3.234 3.234 0 0 0 8.75 12ZM12 7.25A4.75 4.75 0 0 1 16.75 12a.75.75 0 1 1-1.5 0A3.25 3.25 0 0 0 12 8.75a.75.75 0 1 1 0-1.5Z" />
    </svg>`;
    }
}
