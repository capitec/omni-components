import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Component that displays an icon
 *
 * ```js
 *
 * import '@capitec/omni-components/icon';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-icon
 *   size="default|extra-small|small|medium|large">
 * 	   <svg version="1.1" id="diagram" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="375px" height="150px"><path d="M45,11.5H33.333c0.735-1.159,1.167-2.528,1.167-4C34.5,3.364,31.136,0,27,0s-7.5,3.364-7.5,7.5c0,1.472,0.432,2.841,1.167,4H9l-9,32h54L45,11.5z M22.5,7.5C22.5,5.019,24.519,3,27,3s4.5,2.019,4.5,4.5c0,1.752-1.017,3.257-2.481,4h-4.037 C23.517,10.757,22.5,9.252,22.5,7.5z" id="control"/></svg>
 * </omni-icon>
 * ```
 *
 * @example
 *
 * ```html
 * <omni-icon
 *   size="default|extra-small|small|medium|large"
 *   icon="＠material/person">
 * </omni-icon>
 * ```
 *
 * @element omni-icon
 *
 * Registry of all properties defined by the component.
 *
 * @slot - The icon to be displayed
 *
 * @cssprop --omni-icon-fill - Icon fill color.
 * @cssprop --omni-icon-background-color - Icon background color.
 * @cssprop --omni-icon-size-large - Icon large size.
 * @cssprop --omni-icon-size-medium - Icon medium size.
 * @cssprop --omni-icon-size-small - Icon small size.
 * @cssprop --omni-icon-size-extra-small - Icon extra small size.
 * @cssprop --omni-icon-size-default - Icon default size.
 *
 */
@customElement('omni-icon')
export class Icon extends OmniElement {
    /**
     * The size to display the icon at
     * @attr [size="default"]
     */
    @property({ type: String, reflect: true }) size: 'default' | 'extra-small' | 'small' | 'medium' | 'large' = 'default';

    /**
     * The name of the icon to display. Takes preference over the slotted icon.
     * @attr
     */
    @property({ type: String, reflect: true }) icon: string;

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    width: fit-content;
                    justify-content: center;
                    color: var(--omni-icon-fill, currentColor);
                    fill: var(--omni-icon-fill, currentColor);
                    background-color: var(--omni-icon-background-color);
                }

                /* MATERIAL ICON STYLES */

                .material-icon {
                    font-family: 'Material Icons';
                    font-weight: normal;
                    font-style: normal;
                    display: inline-block;
                    line-height: 1;
                    text-transform: none;
                    letter-spacing: normal;
                    word-wrap: normal;
                    white-space: nowrap;
                    direction: ltr;
                    padding: 0px;
                    margin: 0px;

                    align-self: center;
                    justify-self: center;

                    /* Support for all WebKit browsers. */
                    -webkit-font-smoothing: antialiased;

                    /* Support for Safari and Chrome. */
                    text-rendering: optimizeLegibility;

                    /* Support for Firefox. */
                    -moz-osx-font-smoothing: grayscale;

                    /* Support for IE. */
                    font-feature-settings: 'liga';
                }

                .material-icon.large {
                    font-size: var(--omni-icon-size-large, 48px);
                }

                .material-icon.medium {
                    font-size: var(--omni-icon-size-medium, 32px);
                }

                .material-icon.small {
                    font-size: var(--omni-icon-size-small, 16px);
                }

                .material-icon.extra-small {
                    font-size: var(--omni-icon-size-extra-small, 8.25px);
                }

                .material-icon.default {
                    font-size: var(--omni-icon-size-default, 24px);
                }

                /* SVG ICON STYLES */

                .svg-icon.large {
                    height: var(--omni-icon-size-large, 48px);
                    /*width: 48px;*/
                }

                .svg-icon.medium {
                    height: var(--omni-icon-size-medium, 32px);
                    /*width: 32px;*/
                }

                .svg-icon.small {
                    height: var(--omni-icon-size-small, 16px);
                    /*width: 16px;*/
                }

                .svg-icon.extra-small {
                    height: var(--omni-icon-size-extra-small, 8.25px);
                    /*width: 16px;*/
                }

                .svg-icon.default {
                    height: var(--omni-icon-size-default, 24px);
                    /*width: 24px;*/
                }
            `
        ];
    }

    override render(): TemplateResult {
        if (this.icon) {
            if (this.icon.startsWith('@material/')) {
                return html`<div class="material-icon ${this.size}">${this.icon.replace('@material/', '')}</div>`;
            }
            return html`<img class="svg-icon ${this.size}" src="${this.icon}" alt="${this.icon}" />`;
        }

        return html`
            <div class="svg-icon ${this.size}">
                <slot></slot>
            </div>
        `;
    }
}
