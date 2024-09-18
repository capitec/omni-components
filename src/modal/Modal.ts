import { html, css, type TemplateResult, nothing, type PropertyValueMap, render as renderToElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { type Ref, ref, createRef } from 'lit/directives/ref.js';
import { OmniElement } from '../core/OmniElement.js';
import type { RenderFunction, RenderResult } from '../render-element/RenderElement.js';

export type { RenderFunction, RenderResult } from '../render-element/RenderElement.js';

// Considered doing this dynamically on `Modal.show` but due to reasonable tradeoffs, this is still satisfactory in terms of optimization.
import '../render-element/RenderElement.js';

/**
 * Control to display modal content with optional header and footer content.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/modal';
 * ```
 *
 * @example
 * ```html
 * <omni-modal header-label="Header Label" header-align="center">
 *    <span slot="header">Rich Header Content</span>
 *    <span>Body Content</span>
 *    <span slot="footer">Footer Content</span>
 * </omni-modal>
 * ```
 *
 * @element omni-modal
 *
 * Registry of all properties defined by the component.
 *
 * @fires click-outside - Dispatched when a click or touch occurs outside the modal container.
 *
 * @slot header - Content to render inside the component header.
 * @slot - Content to render inside the component body.
 * @slot footer - Content to render inside the component footer.
 *
 * @csspart dialog - Internal `HTMLDialogElement` instance.
 * @csspart backdrop - Internal `HTMLDivElement` instance for backdrop.
 * @csspart container - Internal `HTMLDivElement` instance for container.
 * @csspart header - Internal `HTMLDivElement` instance for header.
 * @csspart body - Internal `HTMLDivElement` instance for body.
 * @csspart footer - Internal `HTMLDivElement` instance for footer.
 *
 * @cssprop --omni-modal-dialog-top - Top position for wrapping `HTMLDialogElement`.
 * @cssprop --omni-modal-dialog-left - Left position for wrapping `HTMLDialogElement`.
 * @cssprop --omni-modal-dialog-right - Right position for wrapping `HTMLDialogElement`.
 * @cssprop --omni-modal-dialog-bottom - Bottom position for wrapping `HTMLDialogElement`.
 * @cssprop --omni-modal-dialog-background - Background for wrapping `HTMLDialogElement` backdrop.
 *
 * @cssprop --omni-modal-container-padding - Padding for modal content container.
 * @cssprop --omni-modal-container-box-shadow - Box shadow for modal content container.
 * @cssprop --omni-modal-max-width - Max width for modal content container.
 * @cssprop --omni-modal-max-height - Max height for modal content container.
 *
 * @cssprop --omni-modal-header-font-color - Font color for modal header.
 * @cssprop --omni-modal-header-font-family - Font family for modal header.
 * @cssprop --omni-modal-header-font-size - Font size for modal header.
 * @cssprop --omni-modal-header-font-weight - Font weight for modal header.
 * @cssprop --omni-modal-header-background - Background for modal header.
 * @cssprop --omni-modal-header-padding-left - Left padding for modal header.
 * @cssprop --omni-modal-header-padding-top - Top padding for modal header.
 * @cssprop --omni-modal-header-padding-right - Right padding for modal header.
 * @cssprop --omni-modal-header-padding-bottom - Bottom padding for modal header.
 * @cssprop --omni-modal-header-border-radius - Border radius for modal header.
 *
 * @cssprop --omni-modal-body-font-color - Font color for modal body.
 * @cssprop --omni-modal-body-font-size - Font size for modal body.
 * @cssprop --omni-modal-body-font-family - Font family for modal body.
 * @cssprop --omni-modal-body-font-weight - Font weight for modal body.
 * @cssprop --omni-modal-body-padding - Padding for modal body.
 * @cssprop --omni-modal-body-background - Background for modal body.
 * @cssprop --omni-modal-body-overflow - Overflow for modal body.
 * @cssprop --omni-modal-body-min-width - Min width for modal body.
 *
 * @cssprop --omni-modal-no-header-body-border-top-radius - Top border radius for modal body when there is no header.
 * @cssprop --omni-modal-no-footer-body-border-bottom-radius - Bottom border radius for modal body when there is no footer.
 *
 * @cssprop --omni-modal-footer-text-align - Text align for modal footer.
 * @cssprop --omni-modal-footer-padding - Padding for modal footer.
 * @cssprop --omni-modal-footer-font-color - Font color for modal footer.
 * @cssprop --omni-modal-footer-font-family - Font family for modal footer.
 * @cssprop --omni-modal-footer-font-size - Font size for modal footer.
 * @cssprop --omni-modal-footer-font-weight - Font weight for modal footer.
 * @cssprop --omni-modal-footer-background - Background for modal footer.
 *
 */
@customElement('omni-modal')
export class Modal extends OmniElement {
    /**
     *  Title text to be displayed in header area.
     * @attr [header-label]
     */
    @property({ type: String, attribute: 'header-label', reflect: true }) headerLabel: string = '';

    /**
     * Header text horizontal alignment:
     *  - `left` Align header to the left.
     *  - `center` Align header to the center.
     *  - `right` Align header to the right.
     * @attr [header-align]
     */
    @property({ type: String, attribute: 'header-align', reflect: true }) headerAlign?: 'left' | 'center' | 'right';

    /**
     * If true, will hide the modal.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) hide?: boolean;

    /**
     * If true, will not display the header section of the modal
     * @attr [no-header]
     */
    @property({ type: Boolean, attribute: 'no-header', reflect: true }) noHeader?: boolean;

    /**
     * If true, will not display the footer section of the modal
     * @attr [no-footer]
     */
    @property({ type: Boolean, attribute: 'no-footer', reflect: true }) noFooter?: boolean;

    /**
     * If true, will not apply the modal as fullscreen on mobile viewports.
     * @attr [no-fullscreen]
     */
    @property({ type: Boolean, attribute: 'no-fullscreen', reflect: true }) noFullscreen?: boolean;

    /**
     * Internal `HTMLDialogElement` instance.
     * @no_attribute
     * @ignore
     */
    @query('dialog') dialog!: HTMLDialogElement;

    /**
     * Creates a new Modal element with the provided context and appends it to the DOM (either to document body or to provided target parent element).
     * @param init Initialisation context for Modal element that will be created.
     * @returns Modal element that was created.
     */
    public static show(init: ModalInit): Modal | undefined {
        if (!init.parent) {
            // If no parent element is specified, the Modal will be appended to an empty div directly on the document body.
            init.parent = document.createElement('div');
            document.body.appendChild(init.parent);
        }

        if (typeof init.parent === 'string') {
            // If a parent element is specified as a string, find the actual parent element instance using the provided string as an id.
            init.parent = document.getElementById(init.parent);
            if (!init.parent) {
                return undefined;
            }
        }

        const refToModal: Ref<Modal> = createRef();
        renderToElement(
            html`        
                <omni-modal ${ref(refToModal)} id="${ifDefined(init.id)}" ?no-header="${init.noHeader}" ?no-footer="${
                init.noFooter
            }" ?no-fullscreen="${init.noFullscreen}" header-align="${ifDefined(init.headerAlign)}">
                    ${
                        init.header
                            ? html`<omni-render-element slot="header" .renderer="${
                                  typeof init.header === 'function' ? init.header : () => init.header
                              }"></omni-render-element>`
                            : nothing
                    }
                    <omni-render-element .renderer="${typeof init.body === 'function' ? init.body : () => init.body}"></omni-render-element>
                    ${
                        init.footer
                            ? html`<omni-render-element slot="footer" .renderer="${
                                  typeof init.footer === 'function' ? init.footer : () => init.footer
                              }"></omni-render-element>`
                            : nothing
                    }
                </omni-modal>
            `,
            init.parent
        );

        return refToModal.value;
    }

    private notifyClickOutside(e: Event) {
        const containerElement = this.dialog.querySelector(`.container`);
        if (containerElement && !e.composedPath().includes(containerElement)) {
            this.dispatchEvent(new CustomEvent('click-outside'));
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);

        // `HTMLDialogElement` needs to programmatically be opened and closed. This would open on first render unless the `hide` attribute is set.
        if (!this.hide && !this.dialog.open) {
            this.dialog.showModal();
        }
        if (this.hide && this.dialog.open) {
            this.dialog.close();
        }
    }

    static override get styles() {
        return [
            super.styles,
            css`
                :host([hide]){
                    display: none;
                }

                .modal {
                    display: flex;
                    position: fixed;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    left: 0;
                    top: 0;
                    max-width: 100%;
                    max-height: 100%;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    cursor: default;
                    
                    margin: unset;
                    border-style: none;
                    padding: unset;
                    top: var(--omni-modal-dialog-top, inherit);
                    left: var(--omni-modal-dialog-left, 0px);
                    right: var(--omni-modal-dialog-right, 0px);
                    bottom: var(--omni-modal-dialog-bottom, 0px);

                    opacity: inherit;
                }

                ::backdrop {                    
                    background: transparent;
                }

                .backdrop {
                    background: var(--omni-modal-dialog-background, rgba(0, 0, 0, 0.3));
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: stretch;
                    padding: var(--omni-modal-container-padding, 0px);
                    background: transparent;
                    box-shadow: var(--omni-modal-container-box-shadow);
                    max-width: var(--omni-modal-max-width,100%);
                    max-height: var(--omni-modal-max-height, 100%);
                }

                .header {
                    display: inline-flex;
                    align-items: center;
                    color: var(--omni-modal-header-font-color,var(--omni-font-color));
                    background: var(--omni-modal-header-background, var(--omni-background-active-color));
                    font-family: var(--omni-modal-header-font-family, var(--omni-font-family));
                    font-size: var(--omni-modal-header-font-size, var(--omni-font-size));
                    font-weight: var(--omni-modal-header-font-weight, var(--omni-font-weight));
                    
                    padding-left: var(--omni-modal-header-padding-left, 24px);
                    padding-top: var(--omni-modal-header-padding-top, 24px);
                    padding-right: var(--omni-modal-header-padding-right, 24px);
                    padding-bottom: var(--omni-modal-header-padding-bottom, 24px);
                    position: relative;
                }

                .header.center {
                    justify-content: center;
                    text-align: center;
                }

                .header.right {
                    justify-content: right;
                    text-align: right;
                }

                .body {
                    margin-top:0px;
                    padding: var(--omni-modal-body-padding, 24px 24px 24px 24px);
                    color: var(--omni-modal-body-font-color, var(--omni-font-color));
                    font-size: var(--omni-modal-body-font-size, var(--omni-font-size));
                    font-family: var(--omni-modal-body-font-family, var(--omni-font-family));
                    font-weight: var(--omni-modal-body-font-weight, var(--omni-font-weight));
                    background: var(--omni-modal-body-background, var(--omni-background-color));
                    line-height: 24px;
                    overflow: var(--omni-modal-body-overflow, auto);
                    min-width: var(--omni-modal-body-min-width, auto);
                }

                .body[no-header] {                    
                    border-top-left-radius: var(--omni-modal-no-header-body-border-top-radius, 4px);
                    border-top-right-radius: var(--omni-modal-no-header-body-border-top-radius, 4px);
                }

                .body[no-footer] {                    
                    border-bottom-left-radius: var(--omni-modal-no-footer-body-border-bottom-radius, 4px);
                    border-bottom-right-radius: var(--omni-modal-no-footer-body-border-bottom-radius, 4px);
                }

                .footer {
                    align-self: stretch;
                    text-align: var(--omni-modal-footer-text-align, right);
                    padding: var(--omni-modal-footer-padding, 12px 12px 12px 0px);
                    color: var(--omni-modal-footer-font-color,var(--omni-font-color));
                    font-size: var(--omni-modal-footer-font-size, var(--omni-font-size));
                    font-family: var(--omni-modal-footer-font-family, var(--omni-font-family));
                    font-weight: var(--omni-modal-footer-font-weight, var(--omni-font-weight));
                    background: var(--omni-modal-footer-background, var(--omni-background-active-color));
                }

                ::slotted(omni-render-element) {
                    width: 100%;
                }

                @media screen and (min-width: 767px) {
                    
                    .header {
                        border-radius: var(--omni-modal-header-border-radius, 4px 4px 0px 0px);
                    }
                }

                @media screen and (max-width: 767px) {
                    
                    .container:not([no-fullscreen]) {
                        height: 100%;
                    }
                    
                    .body:not([no-fullscreen]) {
                        height: inherit;
                    }

                }
      `
        ];
    }

    override render(): TemplateResult {
        return html`
            <dialog part="dialog" class="modal" role="dialog" aria-modal="true"
                    @cancel="${(e: Event) => e.preventDefault()}"
                    @click="${(e: Event) => this.notifyClickOutside(e)}" @touch="${(e: Event) => this.notifyClickOutside(e)}">
                <div class="modal backdrop" part="backdrop">
                    <div class="container" ?no-fullscreen="${this.noFullscreen}" part="container">
                        ${this._renderHeader()}
                        <div class="body" ?no-header="${this.noHeader}" ?no-footer="${this.noFooter}" ?no-fullscreen="${
            this.noFullscreen
        }" part="body">
                            <slot></slot>
                        </div>
                        ${this._renderFooter()}
                    </div>
                </div>
            </dialog>
        `;
    }

    _renderHeader() {
        if (this.noHeader) {
            return nothing;
        }
        return html`
            <div class="header ${this.headerAlign ?? ''}" part="header">
                ${this.headerLabel}

                <slot name="header"></slot>
            </div>
		`;
    }

    _renderFooter() {
        if (this.noFooter) {
            return nothing;
        }

        return html`
            <div class="footer" part="footer">
                <slot name="footer"></slot>
            </div>`;
    }
}

/**
 * Context for `Modal.show` function to programmatically render a new `<omni-modal>` instance.
 */
export type ModalInit = {
    /**
     * The id to apply to the Modal element.
     */
    id?: string;

    /**
     * The container to append the Modal as child. If not provided will append to a new div element on the document body.
     */
    parent?: string | HTMLElement | DocumentFragment | null;

    /**
     * A function that returns, or an instance of content to render as modal body
     */
    body: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render in the modal header
     */
    header?: RenderFunction | RenderResult;

    /**
     * A function that returns, or an instance of content to render in the modal footer
     */
    footer?: RenderFunction | RenderResult;

    /**
     * Header text alignment:
     *  - `left` Align header to the left.
     *  - `center` Align header to the center.
     *  - `right` Align header to the right.
     */
    headerAlign?: 'left' | 'center' | 'right';

    /**
     * If true, will not display the header section of the modal
     */
    noHeader?: boolean;

    /**
     * If true, will not display the footer section of the modal
     */
    noFooter?: boolean;

    /**
     * If true will not apply the modal as fullscreen on mobile viewports.
     */
    noFullscreen?: boolean;
};

declare global {
    interface HTMLElementTagNameMap {
        'omni-modal': Modal;
    }
}
