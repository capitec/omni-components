import { html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';

import '../icons/Close.icon.js';

/**
 * Component to visually notify a user of a message.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/toast';
 * ```
 *
 * @example
 * ```html
 * <omni-toast
 *   type="info"
 *   header="Toast Title"
 *   detail="Short detail Text"
 *   closable>
 * </omni-toast>

 * ```
 *
 * @element omni-toast
 *
 * Registry of all properties defined by the component.
 *
 * @slot prefix - Content to render before toast message area.
 * @slot - Content to render inside the component message area.
 * @slot close - Content to render as the close button when `closeable`.
 *
 * @fires close-click - Dispatched when the close button is clicked when `closeable`.
 *
 * @cssprop --omni-toast-min-width - Min Width.
 * @cssprop --omni-toast-max-width - Max Width.
 * @cssprop --omni-toast-width - Width.
 * @cssprop --omni-toast-z-index - The z-index.
 * @cssprop --omni-toast-border-width - Border width.
 * @cssprop --omni-toast-border-radius - Border radius.
 * @cssprop --omni-toast-box-shadow - Box shadow.
 * @cssprop --omni-toast-padding - Container padding.
 * @cssprop --omni-toast-horizontal-gap - Horizontal spacing between icon from `type` and content.
 * @cssprop --omni-toast-icon-size - Symmetrical size of icon from `type`.
 * 
 * @cssprop --omni-toast-header-font-family - Font family for header.
 * @cssprop --omni-toast-header-font-size - Font size for header.
 * @cssprop --omni-toast-header-font-weight - Font weight for header.
 * @cssprop --omni-toast-header-line-height - Line height for header.
 * 
 * @cssprop --omni-toast-detail-font-family - Font family for detail.
 * @cssprop --omni-toast-detail-font-size - Font size for detail.
 * @cssprop --omni-toast-detail-font-weight - Font weight for detail.
 * @cssprop --omni-toast-detail-line-height - Line height for detail.
 * @cssprop --omni-toast-vertical-gap - Vertical space between detail and header.
 * 
 * @cssprop --omni-toast-background - The default background applied when no `type` is set.
 * @cssprop --omni-toast-default-font-color - The default font color applied when no `type` is set.
 * @cssprop --omni-toast-border-color - Border color. * 
 * 
 * @cssprop --omni-toast-success-background - The background applied when  `type` is set to `success`.
 * @cssprop --omni-toast-success-font-color - The font color applied when `type` is set to `success`.
 * @cssprop --omni-toast-success-border-color - The border color applied when  `type` is set to `success`.
 * @cssprop --omni-toast-success-icon-color - The icon color applied when  `type` is set to `success`.
 * 
 * @cssprop --omni-toast-warning-background - The background applied when  `type` is set to `warning`.
 * @cssprop --omni-toast-warning-font-color - The font color applied when `type` is set to `warning`.
 * @cssprop --omni-toast-warning-border-color - The border color applied when  `type` is set to `warning`.
 * @cssprop --omni-toast-warning-icon-color - The icon color applied when  `type` is set to `warning`.
 * 
 * @cssprop --omni-toast-error-background - The background applied when  `type` is set to `error`.
 * @cssprop --omni-toast-error-font-color - The font color applied when `type` is set to `error`.
 * @cssprop --omni-toast-error-border-color - The border color applied when  `type` is set to `error`.
 * @cssprop --omni-toast-error-icon-color - The icon color applied when  `type` is set to `error`.
 * 
 * @cssprop --omni-toast-info-background - The background applied when  `type` is set to `info`.
 * @cssprop --omni-toast-info-font-color - The font color applied when `type` is set to `info`.
 * @cssprop --omni-toast-info-border-color - The border color applied when  `type` is set to `info`.
 * @cssprop --omni-toast-info-icon-color - The icon color applied when  `type` is set to `info`.
 * 
 * @cssprop --omni-toast-close-padding - Padding applied to close button when `closeable`.
 * @cssprop --omni-toast-close-size - Symmetrical size applied to close button when `closeable`.
 *
 */
@customElement('omni-toast')
export class Toast extends OmniElement {
    /**
     * The type of toast to display.
     * @attr
     */
    @property({ type: String, reflect: true }) type: 'success' | 'warning' | 'error' | 'info' | 'none' = 'none';

    /**
     * The toast title.
     * @attr
     */
    @property({ type: String, reflect: true }) header?: string;

    /**
     * The toast detail.
     * @attr
     */
    @property({ type: String, reflect: true }) detail?: string;

    /**
     * If true, will display a close button that fires a `close-click` event when clicked.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) closeable?: boolean;

    private _raiseCloseClick(event: MouseEvent) {
        // Notify any subscribers that the close button was clicked.
        this.dispatchEvent(
            new CustomEvent(`close-click`, {
                detail: {}
            })
        );

        // Prevent the event from bubbling up.
        event.stopPropagation();
    }

    static override get styles() {
        return [
            super.styles,
            css`
			:host {
				display: flex;
				flex-direction: row;

				box-sizing: border-box;

				min-width: var(--omni-toast-min-width);
				max-width: var(--omni-toast-max-width);
				width: var(--omni-toast-width, 100%);

				z-index: var(--omni-toast-z-index, 10000);

				background: var(--omni-toast-background, var(--omni-background-color));

				border-width: var(--omni-toast-border-width, 1px);
				border-style: var(--omni-toast-border-style, solid);
				border-color: var(--omni-toast-border-color, black);

				border-radius: var(--omni-toast-border-radius, 10px);

				box-shadow: var(--omni-toast-box-shadow,  0 6px 10px 0 rgba(0,0,0,0.25));

				color: var(--omni-toast-default-font-color, --omni-font-color);
			}

			.container {
				display: flex;
				flex-direction: row;
				justify-content: stretch;
				align-items: center;

				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;

				box-sizing: border-box;

				min-width: var(--omni-toast-min-width);
				max-width: var(--omni-toast-max-width);
				width: var(--omni-toast-width, 100%);

				padding: var(--omni-toast-padding, 10px);
			}

			/* Toast Box */

			.type-icon {
				grid-column: 1;
				grid-row: 1/3;

				margin-right: var(--omni-toast-horizontal-gap, 10px);

				width: var(--omni-toast-icon-size, 24px);
				height: var(--omni-toast-icon-size, 24px);
			}

			.content {
				flex: 1 1 auto;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;
			}

			.content .header {
				grid-column: 2;
				grid-row: 1;

				font-family: var(--omni-toast-header-font-family, var(--omni-font-family));
				font-size: var(--omni-toast-header-font-size, 16px);
				font-weight: var(--omni-toast-header-font-weight, bold);
				line-height: var(--omni-toast-header-line-height, 1.2);
			}

            ::slotted(*) {
				font-family: var(--omni-toast-detail-font-family, var(--omni-font-family));
				font-size: var(--omni-toast-detail-font-size, 16px);
				font-weight: var(--omni-toast-detail-font-weight, normal);
				line-height: var(--omni-toast-detail-line-height, 1.2);
            }

			.content .detail {
				grid-column: 2;
				grid-row: 2;

				font-family: var(--omni-toast-detail-font-family, var(--omni-font-family));
				font-size: var(--omni-toast-detail-font-size, 16px);
				font-weight: var(--omni-toast-detail-font-weight, normal);
				line-height: var(--omni-toast-detail-line-height, 1.2);

				margin-top: var(--omni-toast-vertical-gap);
			}

			/* Info Status */

			:host([type="info"]) {
				background: var(--omni-toast-info-background, lightcyan);
				border-color: var(--omni-toast-info-border-color, cyan);
			}

			:host([type="info"]) .header {
				color: var(--omni-toast-info-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

            :host([type="info"]) ::slotted(*) {
				color: var(--omni-toast-info-font-color, var(--omni-toast-default-font-color, --omni-font-color));
            }

			:host([type="info"]) .detail {
				color: var(--omni-toast-info-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

			:host([type="info"]) .type-icon #shape {
				stroke: var(--omni-toast-info-icon-color,var(--omni-toast-info-border-color, cyan));
			}

			:host([type="info"]) .type-icon #icon {
				fill: var(--omni-toast-info-icon-color,var(--omni-toast-info-border-color, cyan));
			}

			/* Success Status */

			:host([type="success"]) {
				background: var(--omni-toast-success-background, lightgreen);
				border-color: var(--omni-toast-success-border-color, darkgreen);
			}

			:host([type="success"]) .header {
				color: var(--omni-toast-success-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

            :host([type="success"]) ::slotted(*) {
				color: var(--omni-toast-success-font-color, var(--omni-toast-default-font-color, --omni-font-color));
            }

			:host([type="success"]) .detail {
				color: var(--omni-toast-success-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

			:host([type="success"]) .type-icon #shape {
				stroke: var(--omni-toast-success-icon-color,var(--omni-toast-success-border-color, darkgreen));
			}

			:host([type="success"]) .type-icon #icon {
				fill: var(--omni-toast-success-icon-color,var(--omni-toast-success-border-color, darkgreen));
			}

			/* Error Status */

			:host([type="error"]) {
				background: var(--omni-toast-error-background, lightcoral);
				border-color: var(--omni-toast-error-border-color, darkred);
			}

			:host([type="error"]) .header {
				color: var(--omni-toast-error-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

            :host([type="error"]) ::slotted(*) {
				color: var(--omni-toast-error-font-color, var(--omni-toast-default-font-color, --omni-font-color));
            }

			:host([type="error"]) .detail{
				color: var(--omni-toast-error-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

			:host([type="error"]) .type-icon #shape {
				stroke: var(--omni-toast-error-icon-color,var(--omni-toast-error-border-color, darkred));
			}

			:host([type="error"]) .type-icon #icon {
				fill: var(--omni-toast-error-icon-color,var(--omni-toast-error-border-color, darkred));
			}

			/* Warning Status */

			:host([type="warning"]) {
				background: var(--omni-toast-warning-background, lightyellow);
				border-color: var(--omni-toast-warning-border-color, orange);
			}

			:host([type="warning"]) .header {
				color: var(--omni-toast-warning-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

            :host([type="warning"]) ::slotted(*) {
				color: var(--omni-toast-warning-font-color, var(--omni-toast-default-font-color, --omni-font-color));
            }

			:host([type="warning"]) .detail {
				color: var(--omni-toast-warning-font-color, var(--omni-toast-default-font-color, --omni-font-color));
			}

			:host([type="warning"]) .type-icon #shape {
				stroke: var(--omni-toast-warning-icon-color,var(--omni-toast-warning-border-color, orange));
			}

			:host([type="warning"]) .type-icon #icon {
				fill: var(--omni-toast-warning-icon-color,var(--omni-toast-warning-border-color, orange));
			}

            .closer {
                display: flex;
                padding: var(--omni-toast-close-padding,4px);
            }

            .close-btn {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px;
                margin: 0px;
                width: var(--omni-toast-close-size,24px);
                height: var(--omni-toast-close-size,24px);
                cursor: pointer;
            }

      `
        ];
    }

    override render(): TemplateResult {
        return html`
            <div class="container">
               
                    <slot name="prefix">
                        ${this.iconTemplate()}
                    </slot>
    
                    <div class="content">
                        ${this.header ? html`<label class="header">${this.header}</label>` : nothing}
                        ${this.detail ? html`<label class="detail">${this.detail}</label>` : nothing} 
                        <slot></slot>
                    </div>
            </div>

            ${
                this.closeable
                    ? html`
                        <div class="closer">
                            <div class="close-btn" @click="${(e: MouseEvent) => this._raiseCloseClick(e)}">
                                <slot name="close">
                                    <omni-close-icon></omni-close-icon>
                                </slot>
                            </div>
                        </div>`
                    : nothing
            }
		`;
    }

    private iconTemplate(): TemplateResult | typeof nothing {
        switch (this.type) {
            case 'info':
                return html`
					<svg class="type-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<circle id="shape" stroke="cyan" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" cx="12" cy="12" r="11"></circle>
							<path id="icon" fill="cyan" fill-rule="nonzero" d="M12,9.25 C12.3796958,9.25 12.693491,9.53215388 12.7431534,9.89822944 L12.75,10 L12.75,17 C12.75,17.4142136 12.4142136,17.75 12,17.75 C11.6203042,17.75 11.306509,17.4678461 11.2568466,17.1017706 L11.25,17 L11.25,10 C11.25,9.58578644 11.5857864,9.25 12,9.25 Z M12,6 C12.5522847,6 13,6.44771525 13,7 C13,7.55228475 12.5522847,8 12,8 C11.4477153,8 11,7.55228475 11,7 C11,6.44771525 11.4477153,6 12,6 Z"></path>
						</g>
					</svg>
				`;

            case 'success':
                return html`
					<svg class="type-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<path id="shape" stroke="darkgreen" stroke-width="1.5" d="M12,1.75 C9.16954066,1.75 6.60704066,2.89727033 4.75215549,4.75215549 C2.89727033,6.60704066 1.75,9.16954066 1.75,12 C1.75,14.8304593 2.89727033,17.3929593 4.75215549,19.2478445 C6.60704066,21.1027297 9.16954066,22.25 12,22.25 C14.8304593,22.25 17.3929593,21.1027297 19.2478445,19.2478445 C21.1027297,17.3929593 22.25,14.8304593 22.25,12 C22.25,9.16954066 21.1027297,6.60704066 19.2478445,4.75215549 C17.3929593,2.89727033 14.8304593,1.75 12,1.75 Z"></path>
							<path id="icon" fill="darkgreen" fill-rule="nonzero" d="M16.4696699,8.46966991 C16.7625631,8.1767767 17.2374369,8.1767767 17.5303301,8.46966991 C17.7965966,8.73593648 17.8208027,9.15260016 17.6029482,9.44621165 L17.5303301,9.53033009 L10.5303301,16.5303301 C10.2640635,16.7965966 9.84739984,16.8208027 9.55378835,16.6029482 L9.46966991,16.5303301 L6.46966991,13.5303301 C6.1767767,13.2374369 6.1767767,12.7625631 6.46966991,12.4696699 C6.73593648,12.2034034 7.15260016,12.1791973 7.44621165,12.3970518 L7.53033009,12.4696699 L10,14.939 L16.4696699,8.46966991 Z"></path>
						</g>
					</svg>
				`;

            case 'error':
                return html`
					<svg class="type-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<circle id="shape" stroke="darkred" stroke-width="1.5" fill-opacity="0.0991586538" cx="12" cy="12" r="10.25"></circle>
							<path id="icon" fill="darkred" fill-rule="nonzero" d="M12,9.5 C12.3796958,9.5 12.693491,9.78215388 12.7431534,10.1482294 L12.75,10.25 L12.75,17.25 C12.75,17.6642136 12.4142136,18 12,18 C11.6203042,18 11.306509,17.7178461 11.2568466,17.3517706 L11.25,17.25 L11.25,10.25 C11.25,9.83578644 11.5857864,9.5 12,9.5 Z M12,6.25 C12.5522847,6.25 13,6.69771525 13,7.25 C13,7.80228475 12.5522847,8.25 12,8.25 C11.4477153,8.25 11,7.80228475 11,7.25 C11,6.69771525 11.4477153,6.25 12,6.25 Z" transform="translate(12.000000, 12.125000) scale(1, -1) translate(-12.000000, -12.125000)"></path>
						</g>
					</svg>
				`;

            case 'warning':
                return html`
					<svg class="type-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<path id="shape" stroke="orange" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.2243339,2.95957541 L1.2821787,18.2598736 C0.908046333,18.8732479 0.905812547,19.6285012 1.27631077,20.2438493 C1.64680899,20.8591973 2.33439082,21.2422155 3.08252,21.25 L20.91748,21.25 C21.6656092,21.2422155 22.353191,20.8591973 22.7236892,20.2438493 C23.0941875,19.6285012 23.0919537,18.8732479 22.7178213,18.2598736 L13.8250165,2.95957541 C13.443296,2.36382395 12.7606949,2 12.0246752,2 C11.2886555,2 10.6060543,2.36382395 10.2243339,2.95957541 Z"></path>
							<path id="icon" fill="orange" fill-rule="nonzero" d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M12,6.25 C12.3796958,6.25 12.693491,6.53215388 12.7431534,6.89822944 L12.75,7 L12.75,14 C12.75,14.4142136 12.4142136,14.75 12,14.75 C11.6203042,14.75 11.306509,14.4678461 11.2568466,14.1017706 L11.25,14 L11.25,7 C11.25,6.58578644 11.5857864,6.25 12,6.25 Z"></path>
						</g>
					</svg>
				`;

            default:
                return nothing;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-toast': Toast;
    }
}
