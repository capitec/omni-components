import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * An indeterminate icon component.
 *
 * ```js
 * import '@capitec/omni-components/icons/Indeterminate.icon.js';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-indeterminate-icon></omni-indeterminate-icon>
 * ```
 *
 * @element omni-indeterminate-icon
 *
 */
@customElement('omni-indeterminate-icon')
export class IndeterminateIcon extends LitElement {
    static override get styles() {
        return [
            ComponentStyles,
            css`
                :host {
                    color: inherit;
                    fill: inherit;
                    background-color: inherit;
                    background: inherit;

                    width: var(--omni-icon-size, 16px);
                    height: var(--omni-icon-size, 16px);
                }
            `
        ];
    }

    override render(): TemplateResult {
        return html`
            <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <g transform="translate(-2,-1.5)">
                    <path d="M5 10.75v-1.5h10v1.5Z"></path>
                </g>
            </svg>
        `;
    }
}
