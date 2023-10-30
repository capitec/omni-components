import { html, css, type TemplateResult, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { OmniElement } from '../core/OmniElement.js';
import { Modal } from '../modal/Modal.js';
import type { RenderFunction, RenderResult } from '../render-element/RenderElement.js';

export type { RenderFunction, RenderResult } from '../render-element/RenderElement.js';

import '../button/Button.js';
import '../render-element/RenderElement.js';
import '../modal/Modal.js';

/**
 * Component that displays an alert.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/alert';
 * ```
 *
 * @example
 * ```html
 * <omni-alert>
 * </omni-alert>
 * ```
 *
 * @element omni-alert
 *
 * Registry of all properties defined by the component.
 *
 * @fires alert-action-click - Dispatched when an alert action button is clicked.
 * @fires alert-close - Dispatched when the alert is closed.
 *
 * @slot status-indicator - Content to render as the status indicator instead of default status icons.
 * @slot header - Content to render inside the component message area.
 * @slot - Content to render inside the component description body.
 * @slot primary - Content to render as the primary action button.
 * @slot secondary - Content to render as the secondary action button.
 *
 * @csspart modal - Internal `omni-modal` element instance.
 * @csspart content - Internal `HTMLDivElement` instance for container of header and description content.
 * @csspart content - Internal `HTMLDivElement` instance for each line of description (does not include slotted description content).
 * @csspart header - Internal `HTMLDivElement` instance for header.
 * @csspart actions - Internal `HTMLDivElement` instance for container of action button(s).
 *
 * @cssprop --omni-alert-min-width - Minimum width for alert.
 * @cssprop --omni-alert-max-width - Maximum width for alert.
 * @cssprop --omni-alert-border - Alert border.
 * @cssprop --omni-alert-border-radius - Alert border radius.
 * @cssprop --omni-alert-box-shadow - Alert box shadow.
 *
 * @cssprop --omni-alert-animation-duration - Alert fade in and out animation duration.
 * @cssprop --omni-alert-padding-top - Alert content top padding.
 * @cssprop --omni-alert-padding-bottom - Alert content bottom padding.
 * @cssprop --omni-alert-padding-left - Alert content left padding.
 * @cssprop --omni-alert-padding-right - Alert content right padding.
 *
 * @cssprop --omni-alert-header-font-color - Alert header font color.
 * @cssprop --omni-alert-header-font-family - Alert header font family.
 * @cssprop --omni-alert-header-font-size - Alert header font size.
 * @cssprop --omni-alert-header-font-weight - Alert header font weight.
 * @cssprop --omni-alert-header-line-height - Alert header line height.
 * @cssprop --omni-alert-header-background - Alert header background.
 *
 * @cssprop --omni-alert-header-padding-top - Alert header top padding.
 * @cssprop --omni-alert-header-padding-bottom - Alert header bottom padding.
 * @cssprop --omni-alert-header-padding-left - Alert header left padding.
 * @cssprop --omni-alert-header-padding-right - Alert header right padding.
 *
 * @cssprop --omni-alert-description-font-color - Alert description font color.
 * @cssprop --omni-alert-description-font-family - Alert description font family.
 * @cssprop --omni-alert-description-font-size - Alert description font size.
 * @cssprop --omni-alert-description-font-weight - Alert description font weight.
 * @cssprop --omni-alert-description-line-height - Alert description line height.
 *
 * @cssprop --omni-alert-description-padding-top - Alert description top padding.
 * @cssprop --omni-alert-description-padding-bottom - Alert description bottom padding.
 * @cssprop --omni-alert-description-padding-left - Alert description left padding.
 * @cssprop --omni-alert-description-padding-right - Alert description right padding.
 * 
 * @cssprop --omni-alert-action-padding-top - Alert actions part top padding.
 * @cssprop --omni-alert-action-padding-bottom - Alert actions part bottom padding.
 * @cssprop --omni-alert-action-padding-left - Alert actions part left padding.
 * @cssprop --omni-alert-action-padding-right - Alert actions part right padding.
 *
 * @cssprop --omni-alert-action-button-padding-top - Alert action button(s) top padding.
 * @cssprop --omni-alert-action-button-padding-bottom - Alert action button(s) bottom padding.
 * @cssprop --omni-alert-action-button-padding-left - Alert action button(s) left padding.
 * @cssprop --omni-alert-action-button-padding-right - Alert action button(s) right padding.
 *
 * @cssprop --omni-alert-action-button-internal-padding-top - Alert action button(s) internal top padding.
 * @cssprop --omni-alert-action-button-internal-padding-bottom - Alert action button(s) internal bottom padding.
 * @cssprop --omni-alert-action-button-internal-padding-left - Alert action button(s) internal left padding.
 * @cssprop --omni-alert-action-button-internal-padding-right - Alert action button(s) internal right padding.
 *
 * @cssprop --omni-alert-header-horizontal-gap - Alert header horizontal space between status indicator and header content.
 *
 * @cssprop --omni-alert-header-status-size - Alert header status indicator symmetrical size.
 */
@customElement('omni-alert')
export class Alert extends OmniElement {
    /**
     * Internal `omni-modal` instance.
     * @no_attribute
     * @ignore
     */
    @query('omni-modal') modal!: Modal;

    /**
     * The alert status (Defaults to 'none').
     * @attr
     */
    @property({ type: String, reflect: true }) status: 'success' | 'warning' | 'error' | 'info' | 'none' = 'none';

    /**
     * The alert header message.
     * @attr
     */
    @property({ type: String, reflect: true }) message?: string;

    /**
     * Header content horizontal alignment:
     *  - `left` Align header to the left.
     *  - `center` Align header to the center. (Default)
     *  - `right` Align header to the right.
     * @attr [header-align]
     */
    @property({ type: String, attribute: 'header-align', reflect: true }) headerAlign?: 'left' | 'center' | 'right';

    /**
     * The alert detail message.
     * @attr
     */
    @property({ type: String, reflect: true }) description?: string;

    /**
     * Description content horizontal alignment:
     *  - `left` Align description content to the left.
     *  - `center` Align description content to the center. (Default)
     *  - `right` Align description content to the right.
     * @attr [description-align]
     */
    @property({ type: String, attribute: 'description-align', reflect: true }) descriptionAlign?: 'left' | 'center' | 'right';

    /**
     * The primary action button label (Defaults to 'Ok').
     * @attr [primary-action]
     */
    @property({ type: String, reflect: true, attribute: 'primary-action' }) primaryAction?: string;

    /**
     * The secondary action button label (Defaults to 'Cancel').
     * @attr [secondary-action]
     */
    @property({ type: String, reflect: true, attribute: 'secondary-action' }) secondaryAction?: string;

    /**
     * If true, will provide a secondary action button.
     * @attr [enable-secondary]
     */
    @property({ type: Boolean, reflect: true, attribute: 'enable-secondary' }) enableSecondary?: boolean;

    /**
     * Action button(s) horizontal alignment:
     *  - `left` Align action button(s) to the left.
     *  - `center` Align action button(s) to the center.
     *  - `right` Align action button(s) to the right. (Default)
     *  - `stretch` Align action button(s) stretched to fill the horizontal space.
     * @attr [action-align]
     */
    @property({ type: String, attribute: 'action-align', reflect: true }) actionAlign?: 'left' | 'center' | 'right' | 'stretch';

    /**
     * Create a global `omni-alert` element without showing it.
     *
     * @returns The alert instance.
     */
    static create(init: AlertInit) {
        const element = document.body.appendChild(document.createElement('omni-alert'));
        if (!init) {
            init = {};
        }

        // Set the `omni-alert` component values.
        element.status = init.status ?? 'none';
        element.message = init.message;
        element.headerAlign = init.headerAlign;
        element.descriptionAlign = init.descriptionAlign;
        element.description = init.description;
        element.primaryAction = init.primaryAction;
        element.secondaryAction = init.secondaryAction;
        element.enableSecondary = init.enableSecondary;
        element.actionAlign = init.actionAlign;
        if (init.id) {
            element.id = init.id;
        }

        // Setup optional renderers for slot(s)
        if (init.statusIndicator) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'status-indicator';
            renderElement.renderer = typeof init.statusIndicator === 'function' ? init.statusIndicator : () => init.statusIndicator as RenderResult;
            element.appendChild(renderElement);
        }
        if (init.header) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'header';
            renderElement.renderer = typeof init.header === 'function' ? init.header : () => init.header as RenderResult;
            element.appendChild(renderElement);
        }
        if (init.body) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.renderer = typeof init.body === 'function' ? init.body : () => init.body as RenderResult;
            element.appendChild(renderElement);
        }
        if (init.primary) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'primary';
            renderElement.renderer = typeof init.primary === 'function' ? init.primary : () => init.primary as RenderResult;
            element.appendChild(renderElement);
        }
        if (init.secondary) {
            const renderElement = document.createElement('omni-render-element');
            renderElement.slot = 'secondary';
            renderElement.renderer = typeof init.secondary === 'function' ? init.secondary : () => init.secondary as RenderResult;
            element.appendChild(renderElement);
        }

        return element as Alert;
    }

    /**
     * Show a global `omni-alert` element.
     *
     * @returns The alert instance.
     */
    static show(
        init: AlertInit & {
            onClose?: (reason: 'auto' | 'primary' | 'secondary') => void;
        }
    ) {
        const element = Alert.create(init);

        if (init.onClose) {
            let reason: 'auto' | 'primary' | 'secondary' = 'auto';
            element.addEventListener('alert-action-click', (e: Event) => {
                const actionClickEvent = e as CustomEvent<{ secondary: boolean }>;
                reason = actionClickEvent.detail.secondary ? 'secondary' : 'primary';
            });
            element.addEventListener('alert-close', () => {
                init.onClose?.apply(element, [reason]);
            });
        }

        // Show the component as a modal dialog.
        return element.show() as Alert;
    }

    /**
     * Show a global `omni-alert` element asynchronously, waits for it to close and returns the reason for close.
     *
     * @returns The reason for the alert close.
     */
    static showAsync(init: AlertInit) {
        const element = Alert.create(init);
        return element.showAsync() as Promise<'auto' | 'primary' | 'secondary'>;
    }

    /**
     * Show the `omni-alert` asynchronously, waits for it to close and returns the reason for close.
     *
     * @returns The reason for the alert close.
     */
    showAsync() {
        return new Promise<'auto' | 'primary' | 'secondary'>((resolve, reject) => {
            try {
                this.show();
                let reason: 'auto' | 'primary' | 'secondary' = 'auto';
                this.addEventListener('alert-action-click', (e: Event) => {
                    const actionClickEvent = e as CustomEvent<{ secondary: boolean }>;
                    reason = actionClickEvent.detail.secondary ? 'secondary' : 'primary';
                });
                this.addEventListener('alert-close', () => {
                    resolve?.apply(this, [reason]);
                });
            } catch (error) {
                reject.apply(this, [error]);
            }
        });
    }

    /**
     * Show the `omni-alert`.
     *
     * @returns The alert instance.
     */
    show(): Alert {
        // Show the component modal dialog, after the initial component render has completed.
        this.updateComplete.then(() => {
            this.modal.hide = false;
        });
        return this;
    }

    /**
     * Hide the `omni-alert` and remove the component from the DOM
     */
    hide(): void {
        this.updateComplete.then(async () => {
            const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)');

            // Animate the alert fading out if the user allows motion.
            if (motionOK && document.timeline) {
                // Get current opacity to cater for existing fade out of timed toasts.
                const currentOpacity = Number(getComputedStyle(this.modal).getPropertyValue('opacity'));

                const anim = this.modal.animate(
                    [
                        // key frames
                        { offset: 0, opacity: currentOpacity },
                        { offset: 1, opacity: 0 }
                    ],
                    {
                        // sync options
                        duration: 500,
                        easing: 'ease'
                    }
                );
                await anim.finished;
            }

            this.modal.hide = true;
            this.dispatchEvent(new CustomEvent('alert-close'));
            if (this.parentElement) {
                this.remove();
            }
        });
    }

    private onActionClick(secondary?: boolean) {
        this.dispatchEvent(
            new CustomEvent('alert-action-click', {
                detail: {
                    secondary: secondary ?? false
                }
            })
        );

        this.hide();
    }

    /**
     * The element style template.
     */
    static override get styles() {
        return [
            super.styles,
            css`
			:host {
				box-sizing: border-box;
			}

            omni-modal {
                --omni-modal-body-padding: 0px;
            }

            omni-modal::part(container) {               

				min-width: var(--omni-alert-min-width, 10%);
				max-width: var(--omni-alert-max-width, 80%);
            }

			/** Dialog */

			.container {
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-content: flex-start;

				padding: 0px;

				border: var(--omni-alert-border, none);

				box-shadow: var(--omni-alert-box-shadow, 0px 0px 3px rgba(0, 0, 0, 0.1));
				border-radius: var(--omni-alert-border-radius, 10px);
			}
			
			omni-modal:not([hide]) {
				animation: fadein var(--omni-alert-animation-duration, 0.2s) ease-in-out;
				animation-fill-mode: forwards;
			}

            @media (prefers-reduced-motion) {
                /* styles to apply if a user's device settings are set to reduced motion */
                omni-modal:not([hide]) {
                    animation: unset;
                    opacity: 1;
                }
            }

			@keyframes fadein {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			/* Content */

			.content {
				display: flex;
				flex-direction: column;
				justify-content: center;

				padding-top: var(--omni-alert-padding-top, 10px);
				padding-bottom: var(--omni-alert-padding-bottom, 10px);
				padding-left: var(--omni-alert-padding-left, 10px);
				padding-right: var(--omni-alert-padding-right, 10px);
			}

            .header {
                display: inline-flex;
                align-items: center;
				text-align: center;
                justify-content: center;
                color: var(--omni-alert-header-font-color,var(--omni-font-color));
                background: var(--omni-alert-header-background, var(--omni-background-color));
                font-family: var(--omni-alert-header-font-family, var(--omni-font-family));
                font-size: var(--omni-alert-header-font-size, var(--omni-font-size));
				line-height: var(--omni-alert-header-line-height, 1.2);
                font-weight: var(--omni-alert-header-font-weight, bold);
                
                position: relative;

				margin-top: var(--omni-alert-header-padding-top, 10px);
				margin-bottom: var(--omni-alert-header-padding-bottom, 0px);
				margin-left: var(--omni-alert-header-padding-left, 0px);
				margin-right: var(--omni-alert-header-padding-right, 0px);
            }

            .header.left {
                justify-content: left;
            }

            .header.right {
                justify-content: right;
                text-align: right;
            }

            ::slotted(*:not([slot])),
			.description {
				font-family: var(--omni-alert-description-font-family, sans-serif);
				font-size: var(--omni-alert-description-font-size, 16px);
				font-weight: var(--omni-alert-description-font-weight, normal);
				line-height: var(--omni-alert-description-line-height, 1.2);

				color: var(--omni-alert-description-font-color, var(--omni-font-color));

				text-align: center;

				margin-top: var(--omni-alert-description-padding-top, 10px);
				margin-bottom: var(--omni-alert-description-padding-bottom, 0px);
				margin-left: var(--omni-alert-description-padding-left, 0px);
				margin-right: var(--omni-alert-description-padding-right, 0px);
			}

            .description.left {
                justify-content: left;
				text-align: left;
            }

            .description.right {
                justify-content: right;
                text-align: right;
            }

			.actions {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items: center;

                padding-top: var(--omni-alert-action-padding-top, 0px);
				padding-bottom: var(--omni-alert-action-padding-bottom, 0px);
				padding-left: var(--omni-alert-action-padding-left, 0px);
				padding-right: var(--omni-alert-action-padding-right, 0px);
			}

            .actions.center {
                justify-content: center;
                text-align: center;
            }

            .actions.left {
                flex-direction: row-reverse;
                text-align: left;
            }

            .actions.left .action-btn {
                padding-left: var(--omni-alert-action-button-padding-left, 4px);
				padding-right: var(--omni-alert-action-button-padding-right);
            }

            .actions.stretch .action-btn,
            .actions.stretch .clear-btn {
                padding-left: var(--omni-alert-action-button-padding-left, 4px);
				padding-right: var(--omni-alert-action-button-padding-right, 4px);
                width: 100%;
            }

			.action-btn {
				padding-top: var(--omni-alert-action-button-padding-top);
				padding-bottom: var(--omni-alert-action-button-padding-bottom, 4px);
				padding-left: var(--omni-alert-action-button-padding-left);
				padding-right: var(--omni-alert-action-button-padding-right, 4px);
                
                --omni-button-padding-top:var(--omni-alert-action-button-internal-padding-top, 0px);
                --omni-button-padding-bottom:var(--omni-alert-action-button-internal-padding-bottom, 0px);
                --omni-button-padding-left:var(--omni-alert-action-button-internal-padding-left, 4px);
                --omni-button-padding-right:var(--omni-alert-action-button-internal-padding-right, 4px);
			}

			.clear-btn {
                line-height: normal;
				padding-top: var(--omni-alert-action-button-padding-top, 4px);
				padding-bottom: var(--omni-alert-action-button-padding-bottom);
				padding-left: var(--omni-alert-action-button-padding-left);
				padding-right: var(--omni-alert-action-button-padding-right);
                
                --omni-button-padding-top:var(--omni-alert-action-button-internal-padding-top);
                --omni-button-padding-bottom:var(--omni-alert-action-button-internal-padding-bottom);
                --omni-button-padding-left:var(--omni-alert-action-button-internal-padding-left);
                --omni-button-padding-right:var(--omni-alert-action-button-internal-padding-right);
			}

			.status-icon {

				margin-right: var(--omni-alert-header-horizontal-gap, 10px);

				width: var(--omni-alert-header-status-size, 24px);
				height: var(--omni-alert-header-status-size, 24px);

				min-width: var(--omni-alert-header-status-size, 24px);
				min-height: var(--omni-alert-header-status-size, 24px);

				max-width: var(--omni-alert-header-status-size, 24px);
				max-height: var(--omni-alert-header-status-size, 24px);
			}
		`
        ];
    }

    /**
     * Generate the web component template.
     *
     * @returns The HTML component template.
     */
    override render(): TemplateResult {
        // Determine the icon to show.
        let iconTemplate: TemplateResult | typeof nothing = nothing;

        // Derive the icon from the status.
        switch (this.status) {
            case 'info':
                iconTemplate = html`
					<svg class="status-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<circle id="shape" stroke="var(--omni-alert-info-status-indicator-color, var(--omni-primary-color, currentColor))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" cx="12" cy="12" r="11"></circle>
							<path id="icon" fill="var(--omni-alert-info-status-indicator-color, var(--omni-primary-color, currentColor))" fill-rule="nonzero" d="M12,9.25 C12.3796958,9.25 12.693491,9.53215388 12.7431534,9.89822944 L12.75,10 L12.75,17 C12.75,17.4142136 12.4142136,17.75 12,17.75 C11.6203042,17.75 11.306509,17.4678461 11.2568466,17.1017706 L11.25,17 L11.25,10 C11.25,9.58578644 11.5857864,9.25 12,9.25 Z M12,6 C12.5522847,6 13,6.44771525 13,7 C13,7.55228475 12.5522847,8 12,8 C11.4477153,8 11,7.55228475 11,7 C11,6.44771525 11.4477153,6 12,6 Z"></path>
						</g>
					</svg>
				`;
                break;

            case 'success':
                iconTemplate = html`
					<svg class="status-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<path id="shape" stroke="var(--omni-alert-success-status-indicator-color, darkgreen)" stroke-width="1.5" d="M12,1.75 C9.16954066,1.75 6.60704066,2.89727033 4.75215549,4.75215549 C2.89727033,6.60704066 1.75,9.16954066 1.75,12 C1.75,14.8304593 2.89727033,17.3929593 4.75215549,19.2478445 C6.60704066,21.1027297 9.16954066,22.25 12,22.25 C14.8304593,22.25 17.3929593,21.1027297 19.2478445,19.2478445 C21.1027297,17.3929593 22.25,14.8304593 22.25,12 C22.25,9.16954066 21.1027297,6.60704066 19.2478445,4.75215549 C17.3929593,2.89727033 14.8304593,1.75 12,1.75 Z"></path>
							<path id="icon" fill="var(--omni-alert-success-status-indicator-color, darkgreen)" fill-rule="nonzero" d="M16.4696699,8.46966991 C16.7625631,8.1767767 17.2374369,8.1767767 17.5303301,8.46966991 C17.7965966,8.73593648 17.8208027,9.15260016 17.6029482,9.44621165 L17.5303301,9.53033009 L10.5303301,16.5303301 C10.2640635,16.7965966 9.84739984,16.8208027 9.55378835,16.6029482 L9.46966991,16.5303301 L6.46966991,13.5303301 C6.1767767,13.2374369 6.1767767,12.7625631 6.46966991,12.4696699 C6.73593648,12.2034034 7.15260016,12.1791973 7.44621165,12.3970518 L7.53033009,12.4696699 L10,14.939 L16.4696699,8.46966991 Z"></path>
						</g>
					</svg>
				`;
                break;

            case 'error':
                iconTemplate = html`
					<svg class="status-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<circle id="shape" stroke="var(--omni-alert-error-status-indicator-color, darkred)" stroke-width="1.5" fill-opacity="0.0991586538" cx="12" cy="12" r="10.25"></circle>
							<path id="icon" fill="var(--omni-alert-error-status-indicator-color, darkred)" fill-rule="nonzero" d="M12,9.5 C12.3796958,9.5 12.693491,9.78215388 12.7431534,10.1482294 L12.75,10.25 L12.75,17.25 C12.75,17.6642136 12.4142136,18 12,18 C11.6203042,18 11.306509,17.7178461 11.2568466,17.3517706 L11.25,17.25 L11.25,10.25 C11.25,9.83578644 11.5857864,9.5 12,9.5 Z M12,6.25 C12.5522847,6.25 13,6.69771525 13,7.25 C13,7.80228475 12.5522847,8.25 12,8.25 C11.4477153,8.25 11,7.80228475 11,7.25 C11,6.69771525 11.4477153,6.25 12,6.25 Z" transform="translate(12.000000, 12.125000) scale(1, -1) translate(-12.000000, -12.125000)"></path>
						</g>
					</svg>
				`;
                break;

            case 'warning':
                iconTemplate = html`
					<svg class="status-icon" width="24px" height="24px" viewBox="0 0 24 24">
						<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<path id="shape" stroke="var(--omni-alert-warning-status-indicator-color, orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.2243339,2.95957541 L1.2821787,18.2598736 C0.908046333,18.8732479 0.905812547,19.6285012 1.27631077,20.2438493 C1.64680899,20.8591973 2.33439082,21.2422155 3.08252,21.25 L20.91748,21.25 C21.6656092,21.2422155 22.353191,20.8591973 22.7236892,20.2438493 C23.0941875,19.6285012 23.0919537,18.8732479 22.7178213,18.2598736 L13.8250165,2.95957541 C13.443296,2.36382395 12.7606949,2 12.0246752,2 C11.2886555,2 10.6060543,2.36382395 10.2243339,2.95957541 Z"></path>
							<path id="icon" fill="var(--omni-alert-warning-status-indicator-color, orange)" fill-rule="nonzero" d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M12,6.25 C12.3796958,6.25 12.693491,6.53215388 12.7431534,6.89822944 L12.75,7 L12.75,14 C12.75,14.4142136 12.4142136,14.75 12,14.75 C11.6203042,14.75 11.306509,14.4678461 11.2568466,14.1017706 L11.25,14 L11.25,7 C11.25,6.58578644 11.5857864,6.25 12,6.25 Z"></path>
						</g>
					</svg>
				`;
                break;

            case 'none':
            default:
                iconTemplate = nothing;
                break;
        }

        // Generate the component template.
        return html`
			<omni-modal part="modal" no-fullscreen no-header no-footer hide>
                    <div part="content" class="content">
                        <div part="header" class="header ${this.headerAlign}">
                            <slot name="status-indicator">
                                ${iconTemplate}
                            </slot>
                            <slot name="header">
                                ${this.message ? html`<div class="message">${this.message}</div>` : nothing}
                            </slot>
                        </div>
                        ${
                            this.description
                                ? this.description
                                      .split('\n')
                                      .map(
                                          (paragraph) => html`<div part="description" class="description ${this.descriptionAlign}">${paragraph}</div>`
                                      )
                                : nothing
                        }
                        <slot>
                        </slot>
                    </div>
                    <div part="actions" class="actions ${this.actionAlign}">
                        ${
                            this.enableSecondary
                                ? html`
                                    <div style="display: contents; cursor: pointer;" @click="${() => this.onActionClick(true)}">
                                        <slot name="secondary">
                                            <omni-button class="action-btn" label="${
                                                this.secondaryAction || 'Cancel'
                                            }" type="secondary"></omni-button>
                                        </slot>
                                    </div>
                                `
                                : nothing
                        }
                        <div style="display: contents; cursor: pointer;" @click="${() => this.onActionClick()}">
                            <slot name="primary">
                                <omni-button class="${this.enableSecondary ? 'action-btn' : 'clear-btn'}" label="${
            this.primaryAction || 'Ok'
        }" type="${this.enableSecondary ? 'primary' : 'clear'}"></omni-button>
                            </slot>
                        </div>
                    </div>
			</omni-modal>
		`;
    }
}

/**
 * Context for `Alert.show`/`Alert.showAsync` function(s) to programmatically render a new `<omni-alert>` instance.
 */
export type AlertInit = {
    /**
     * The id to apply to the Alert element.
     */
    id?: string;

    /**
     * A function that returns, or an instance of content to render as the alert status indicator
     */
    statusIndicator?: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render in the alert header
     */
    header?: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render as alert body
     */
    body?: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render as the alert primary action
     */
    primary?: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render as the alert secondary action
     */
    secondary?: RenderFunction | RenderResult;

    /**
     * The alert status (Defaults to 'none').
     */
    status?: 'success' | 'warning' | 'error' | 'info' | 'none';

    /**
     * The alert header message.
     */
    message?: string;

    /**
     * Header content horizontal alignment:
     *  - `left` Align header to the left.
     *  - `center` Align header to the center. (Default)
     *  - `right` Align header to the right.
     */
    headerAlign?: 'left' | 'center' | 'right';

    /**
     * The alert detail message.
     */
    description?: string;

    /**
     * Description content horizontal alignment:
     *  - `left` Align description content to the left.
     *  - `center` Align description content to the center. (Default)
     *  - `right` Align description content to the right.
     */
    descriptionAlign?: 'left' | 'center' | 'right';

    /**
     * The primary action button label (Defaults to 'Ok').
     */
    primaryAction?: string;

    /**
     * The secondary action button label (Defaults to 'Cancel').
     */
    secondaryAction?: string;

    /**
     * If true, will provide a secondary action button.
     */
    enableSecondary?: boolean;

    /**
     * Action button(s) horizontal alignment:
     *  - `left` Align action button(s) to the left.
     *  - `center` Align action button(s) to the center.
     *  - `right` Align action button(s) to the right. (Default)
     *  - `stretch` Align action button(s) stretched to fill the horizontal space.
     */
    actionAlign?: 'left' | 'center' | 'right' | 'stretch';
};

declare global {
    interface HTMLElementTagNameMap {
        'omni-alert': Alert;
    }
}
