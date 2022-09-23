import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * A check icon component.
 *
 * ```js
 * import '@capitec/omni-components/icons/Check.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-check-icon></omni-check-icon>
 * ```
 *
 * @element omni-check-icon
 *
 */
@customElement('omni-check-icon')
export class CheckIcon extends LitElement {
    static override get styles() {
        return [
            ComponentStyles,
            css`
                :host {
                    color: inherit;
                    fill: inherit;
                    background-color: inherit;
                    background: inherit;
                }
            `
        ];
    }

    override render(): TemplateResult {
        return html`
            <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <g transform="translate(-2,-2)">
                    <path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z" />
                </g>
            </svg>
        `;
    }
}
