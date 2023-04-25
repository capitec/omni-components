import { html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { ref } from 'lit/directives/ref.js';
import { until } from 'lit/directives/until.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import '../icons/Loading.icon.js';
import '../render-element/RenderElement.js';
import '../icons/ChevronDown.icon.js';
import '../icons/More.icon.js';

/**
 * Control to get / set a value within a list of options.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/select';
 * ```
 * @example
 *
 * ```html
 * <omni-select
 *   label="Enter a value"
 *   value="Hello World"
 *   hint="Required"
 *   error="Field level error message"
 *   items={'item1','item2','item3','item4'}
 *   display-field="label"
 *   id-field="id"
 *   disabled>
 * </omni-select>
 * ```
 *
 * @element omni-select
 *
 * @slot more - Replaces the icon for the more slot (Displays on mobile devices).
 * @slot arrow - Replaces the icon for the arrow slot (Displays on desktop and tablet devices).
 *
 * @cssprop --omni-select-field-text-align - Select component input field text align.
 * @cssprop --omni-select-field-font-color -  Select component input field font color.
 * @cssprop --omni-select-field-font-family - Select component input field font family.
 * @cssprop --omni-select-field-font-size - Select component input field font size.
 * @cssprop --omni-select-field-font-weight - Select component input field font weight.
 * @cssprop --omni-select-field-padding - Select component input field padding.
 * @cssprop --omni-select-field-height - Select component input field height.
 * @cssprop --omni-select-field-width - Select component input field width.
 *
 * @cssprop --omni-select-field-disabled-font-color - Select component input field disabled font color.
 * @cssprop --omni-select-field-error-font-color - Select component input field error font color.
 *
 * @cssprop --omni-select-control-padding - Select component control padding.
 *
 * @cssprop --omni-select-control-icon-width - Select control icon width.
 * @cssprop --omni-select-control-icon-height - Select control icon height.
 * @cssprop --omni-select-control-icon-color - Select control icon color.
 * @cssprop --omni-select-control-icon-error-color - Select control error icon color.
 *
 * @cssprop --omni-select-items-container-box-shadow - Select items container box shadow.
 * @cssprop --omni-select-items-container-background-color - Select items container background color.
 *
 * @cssprop --omni-select-dialog-height - Select dialog height
 * @cssprop --omni-select-dialog-left - Select dialog left
 * @cssprop --omni-select-dialog-right - Select dialog right
 * @cssprop --omni-select-dialog-bottom - Select dialog bottom
 * @cssprop --omni-select-dialog-modal-max-width - Select dialog modal max width.
 * @cssprop --omni-select-dialog-background-color - Select dialog background color().
 *
 * @cssprop --omni-select-items-container-width - Select items container width
 * @cssprop --omni-select-items-container-top - Select items container top.
 * @cssprop --omni-select-items-container-render-bottom-top - Select items container top when rendered at the bottom.
 *
 * @cssprop --omni-select-item-header-left - Select item header left.
 * @cssprop --omni-select-item-header-right - Select item header right.
 * @cssprop --omni-select-item-header-font-family - Select item header font family.
 * @cssprop --omni-select-item-header-font-size - Select item header font size.
 * @cssprop --omni-select-item-header-font-weight - Select item header font weight.
 * @cssprop --omni-select-item-header-font-background-color - Select item header font background color.
 *
 * @cssprop --omni-select-item-header-padding-top - Select item header top padding.
 * @cssprop --omni-select-item-header-padding-bottom - Select item head bottom padding.
 * @cssprop --omni-select-item-header-padding-right - Select item head right padding.
 * @cssprop --omni-select-item-header-padding-left - Select item head left padding.
 *
 * @cssprop --omni-select-item-header-item-border-top-left-radius - Select item header top left border radius.
 * @cssprop --omni-select-item-header-item-border-top-right-radius - Select item header top right border radius.
 *
 * @cssprop --omni-select-items-height - Select items height.
 * @cssprop --omni-select-items-width - Select items width.
 *
 * @cssprop --omni-select-item-font-color - Select item font color.
 * @cssprop --omni-select-item-font-family - Select item font family.
 * @cssprop --omni-select-item-font-weight - Select item font weight.
 * @cssprop --omni-select-item-padding-top - Select item top padding.
 * @cssprop --omni-select-item-padding-bottom - Select item bottom padding.
 * @cssprop --omni-select-item-padding-left - Select item left padding.
 * @cssprop --omni-select-item-padding-right - Select item right padding.
 * @cssprop --omni-select-item-width - Select item width.
 *
 * @cssprop --omni-select-item-hover-background-color - Select item hover background color.
 * @cssprop --omni-select-item-selected-color - Selected item color.
 * @cssprop --omni-select-item-none-hover - Select item hover.
 *
 * @cssprop --omni-select-loading-indicator-width - Select loading indicator width.
 * @cssprop --omni-select-loading-indicator-height - Select loading indicator height.
 *
 */
@customElement('omni-select')
export class Select extends OmniFormElement {
    @query('#select')
    private _selectElement?: HTMLInputElement;
    private _itemsContainer?: HTMLDivElement;

    /**
     * Selectable items of the select component.
     * @attr
     */
    @property({ type: Array, reflect: true }) items?: SelectItems | (() => SelectItems);

    /**
     * Field of the item to display as one of the selectable options.
     * @attr [display-field]
     */
    @property({ type: String, reflect: true, attribute: 'display-field' }) displayField?: string;

    /**
     * Id field of the items provided.
     * @attr [id-field]
     */
    @property({ type: String, reflect: true, attribute: 'id-field' }) idField: string = 'id';

    /**
     * Message displayed in the items container when no items are bound to the component.
     * @attr [empty-message]
     */
    @property({ type: String, reflect: true, attribute: 'empty-message' }) emptyMessage: string = 'No items provided';

    /**
     * Render function for each item.
     * @no_attribute
     */
    @property({ type: Object, reflect: false }) renderItem?: RenderFunction;

    // Internal state properties
    @state() private _popUp: boolean = false;
    @state() private _bottomOfViewport: boolean = false;
    @state() private _isMobile: boolean = false;

    override connectedCallback() {
        super.connectedCallback();
        this._checkforMobile();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClick.bind(this));
    }

    protected override async firstUpdated(): Promise<void> {
        await this._checkScreenDimensions();
        window.addEventListener('resize', this._checkScreenDimensions.bind(this));
        window.addEventListener('scroll', this._checkScreenDimensions.bind(this));
    }

    _inputClick(e: Event) {
        /*
        const itemsContainer = this.renderRoot.querySelector<HTMLDivElement>('#items-container');
        const itemsDialog = this.renderRoot.querySelector<HTMLDialogElement>('#items-dialog');
        
        //Check that the pickerContainer or pickerDialog is not loaded 
        if ((!e.composedPath() || !(itemsContainer || itemsDialog) || !(e.composedPath().includes(itemsContainer as Element) || e.composedPath().includes(itemsDialog as Element)))) {
            this._togglePopup();
        }*/
        this._togglePopup();
    }

    // https://stackoverflow.com/a/39245638
    // Close the item container when clicking outside the select component.
    _windowClick(e: Event) {
        const itemsDialog = this.renderRoot.querySelector<HTMLDialogElement>('#items-dialog') as HTMLDialogElement;
        const composedPath = e.composedPath();
        /**
         * Check when the window is clicked to close the container(Desktop) or dialog(Mobile)
         * For mobile scenarios check if the dialog is the lowest item in the composed path
         */
        if (
            composedPath &&
            (!composedPath.includes(this) || (this._isMobile && itemsDialog && composedPath.findIndex((p) => p === itemsDialog) === 0)) &&
            this._popUp
        ) {
            this._togglePopup();
        }
    }

    _controlClick() {
        this._togglePopup();
    }

    _togglePopup() {
        if (this._popUp) {
            this._popUp = false;
            if (this._isMobile) {
                //this._pickerContainer?.close();
                const itemsDialog = this.renderRoot.querySelector<HTMLDialogElement>('#items-dialog');
                if (itemsDialog) {
                    itemsDialog.close();
                }
            }
        } else {
            this._popUp = true;
            if (this._isMobile) {
                const itemsDialog = this.renderRoot.querySelector<HTMLDialogElement>('#items-dialog');
                if (itemsDialog) {
                    itemsDialog.showModal();
                }
            }
        }
    }

    // Set the value when a item is clicked
    async _onItemClick(item: Record<string, unknown> | string) {
        this.value = item;

        await this.updateComplete;

        //https://stackoverflow.com/a/36084475
        this._selectElement?.dispatchEvent(
            new Event('change', {
                bubbles: true,
                composed: true
            })
        );
    }

    // Check the dimensions of the screen to determine how to render items container and which control icon to apply.
    async _checkScreenDimensions() {
        await this._checkForBottomOfScreen();
        this._checkforMobile();
        await this._itemsMaxHeightChange();
    }

    // Check to see if the component is at the bottom of the viewport if true set the internal boolean value.
    async _checkForBottomOfScreen() {
        if (visualViewport) {
            const distanceFromBottom = visualViewport.height - this.getBoundingClientRect().bottom;
            if (distanceFromBottom < 150) {
                this._bottomOfViewport = true;
            } else {
                this._bottomOfViewport = false;
            }
        }
    }

    // Check the width of the screen to set the internal mobile boolean to true of false.
    _checkforMobile() {
        if (!window.matchMedia ? window.innerWidth >= 767 : window.matchMedia('screen and (min-width: 767px)').matches) {
            // Desktop width is at least 767px
            this._isMobile = false;
        } else {
            // Mobile screen less than 767px
            this._isMobile = true;
        }
    }

    // Set the max height of the items container to be within bounds of the viewport when it is rendered at the bottom or at the top of the input.
    async _itemsMaxHeightChange(el?: Element) {
        if (el) {
            this._itemsContainer = el as HTMLDivElement;
        }
        if (this._itemsContainer && !this._isMobile) {
            await this.updateComplete;
            if (visualViewport) {
                if (this._bottomOfViewport) {
                    const newHeight =
                        visualViewport.height -
                        this.getBoundingClientRect().height -
                        (visualViewport.height - this.getBoundingClientRect().top) -
                        10 +
                        'px';
                    this._itemsContainer.style.maxHeight = `var(--omni-select-items-max-height, ${newHeight})`;
                } else {
                    const newHeight = visualViewport.height - this.getBoundingClientRect().bottom - 10 + 'px';
                    this._itemsContainer.style.maxHeight = `var(--omni-select-items-max-height, ${newHeight})`;
                }
            }
        }
    }

    static override get styles() {
        return [
            super.styles,
            css`
                /* Added to ensure that component has pointer cursor applied */
                :host {
                    cursor: pointer;
                }

                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-select-field-text-align, left);

                    color: var(--omni-select-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-select-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-select-field-padding, 10px);

                    height: var(--omni-select-field-height, 100%);
                    width: var(--omni-select-field-width, 100%);

                    cursor: pointer;
                }

                .field.disabled {
                    color: var(--omni-select-field-disabled-font-color,  #7C7C7C);
                }

                .field.error {
                    color: var(--omni-select-field-error-font-color);
                }

                .control {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-select-control-padding, 10px 10px);
                    /*Added to resolve issue of click event firing twice*/
                    pointer-events: none;
                }

                .icon {
                    width: var(--omni-select-control-icon-width, 20px);
                    height: var(--omni-select-control-icon-height, 20px);
                    fill: var(--omni-select-control-icon-color, var(--omni-primary-color));
                }

                .icon.error {
                    fill: var(--omni-select-control-icon-error-color, var(--omni-error-font-color));
                }

                /* Default item container styles*/
                .items-container {
                    box-shadow: var(--omni-select-items-container-box-shadow, 0 0 6px 0 rgba(0, 0, 0, 0.11));
                    background-color: var(--omni-select-items-container-background-color, var(--omni-background-color));
                    z-index: var(--omni-select-items-container-z-index, 420);
                }

                /* Desktop and landscape tablet device styling, if element is at the bottom of the screen make items render above the input */
                @media screen and (min-width: 767px) {
                    .items {
                       max-height: var(--omni-select-items-max-height, 100%);
                    }

                    .items-container {
                        position: absolute;
                        width: var(--omni-select-items-container-width, 100%);
                        top: var(--omni-select-items-container-top, 100%);
                        transition: 1s;
                    }

                    /* Styles if the element is at the bottom of the screen */
                    .items-container.bottom {
                        top: var(--omni-select-items-container-render-bottom-top, 0px);
                        transform: translateY(-100%);
                    }
                }

                /* Only applies styles to transform the control icon if on Desktop */
                @media screen and (min-width: 767px) {
                    .control.expanded {
                        transform: rotate(180deg);
                        transition: all linear 0.15s;
                    }

                    .control.collapsed {
                        transform: none;
                        transition: all linear 0.15s;
                    }
                }
                
                /* Mobile device styling */
                @media screen and (max-width: 766px) {
                    .items-dialog {
                        position: fixed;
                        top: inherit;
                        margin: unset;
                        border-style: none;
                        padding: unset;
                        width: 100%;
                        height: var(--omni-select-dialog-height, 240px);
                        left: var(--omni-select-dialog-left, 0px);
                        right: var(--omni-select-dialog-right, 0px);
                        bottom: var(--omni-select-dialog-bottom, 0px);
                    }
                    
                    .items-dialog:modal{
                        max-width: var(--omni-select-dialog-modal-max-width, 100%);
                    }

                    .items-dialog::backdrop {
                        background: var(--omni-select-dialog-background-color, rgba(0, 0, 0, 0.1));
                    }
                }

                /* Should only display for mobile rendering */
                .header {
                    position: relative;
                    left: var(--omni-select-item-header-left, 0px);
                    right: var(--omni-select-item-header-right, 0px);

                    color: var(--omni-select-item-header-font-color, #ffffff);
                    font-family: var(--omni-select-item-header-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-item-header-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-item-header-font-weight, var(--omni-font-weight));
                    background-color: var(--omni-select-item-header-background-color, var(--omni-primary-color));

                    padding-top: var(--omni-select-item-header-padding-top, 14px);
                    padding-bottom: var(--omni-select-item-header-padding-bottom, 14px);
                    padding-right: var(--omni-select-item-header-padding-right, 10px);
                    padding-left: var(--omni-select-item-header-padding-left, 10px);

                    border-top-left-radius: var(--omni-select-item-header-border-top-left-radius, 10px);
                    border-top-right-radius: var(--omni-select-item-header-border-top-right-radius, 10px);
                }

                .items {
                    overflow-y: auto;
                    overflow-x: hidden;

                    height: var(--omni-select-items-height, auto);
                    width: var(--omni-select-items-width, 100%);
                }

                .item,
                .none {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    color: var(--omni-select-item-font-color, var(--omni-font-color));

                    font-family: var(--omni-select-item-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-item-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-item-font-weight, var(--omni-font-weight));

                    padding-top: var(--omni-select-item-padding-top, 14px);
                    padding-bottom: var(--omni-select-item-padding-bottom, 14px);
                    padding-left: var(--omni-select-item-padding-left, 10px);
                    padding-right: var(--omni-select-item-padding-right, 10px);
                    width: var(--omni-select-item-width, 100%);
                }

                .item:hover {
                    background-color: var(--omni-select-item-hover-background-color, var(--omni-accent-hover-color));
                }

                .item.selected {
                    color: var(--omni-select-item-selected-color, var(--omni-primary-color));
                }

                .none:hover {
                    background-color: var(--omni-select-item-none-hover, var(--omni-accent-hover-color));
                }

                .loading {
                    width: var(--omni-select-loading-indicator-width, 50px);
                    height: var(--omni-select-loading-indicator-height, 50px);
                }
            `
        ];
    }

    protected override renderContent() {
        const field: ClassInfo = {
            field: true,
            disabled: this.disabled,
            error: this.error as string
        };
        return html`
            <input
                class=${classMap(field)}
                id="select"
                type="text"
                readonly
                ?disabled=${this.disabled}
                .value=${live(
                    (typeof this.value !== 'string' && this.displayField
                        ? (((this.value as Record<string, unknown>) ?? {})[this.displayField] as string)
                        : (this.value as string)) ?? ''
                )}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected override renderPicker() {
        if (this._isMobile) {
            return html`
            <dialog id="items-dialog" class="items-dialog">
                ${this._isMobile && this.label ? html`<div class="header">${this.label}</div>` : nothing}
                <div ${ref(this._itemsMaxHeightChange)} id="items" class="items"> ${until(
                this._renderOptions(),
                html`<div>${this.renderLoading()}</div>`
            )} 
                </div>
            </dialog>
            `;
        }

        if (!this._popUp) {
            return nothing;
        }
        return html`
            <div id="items-container" class="items-container ${this._bottomOfViewport ? `bottom` : ``}">
                ${this._isMobile && this.label ? html`<div class="header">${this.label}</div>` : nothing}
                <div ${ref(this._itemsMaxHeightChange)} id="items" class="items"> ${until(
            this._renderOptions(),
            html`<div>${this.renderLoading()}</div>`
        )} 
                </div>
            </div>
        `;
    }

    protected override renderControl() {
        const controlIcon: ClassInfo = {
            icon: true,
            disabled: this.disabled,
            error: this.error as string
        };
        return html`<div id="control" class="control ${this._popUp ? `expanded` : `collapsed`}" @click="${() => this._controlClick()}">
            ${
                this._isMobile
                    ? html`<slot name="more"><omni-more-icon class=${classMap(controlIcon)}></omni-more-icon></slot>`
                    : html`<slot name="arrow"><omni-chevron-down-icon class=${classMap(controlIcon)}></omni-chevron-down-icon></slot>`
            }
        </div>`;
    }

    async _renderOptions() {
        let items: SelectTypes = [];
        let itemsLength = 0;

        if (typeof this.items === 'function') {
            items = await this.items();
        } else {
            items = (await this.items) as SelectTypes;
        }

        if (Array.isArray(items)) {
            itemsLength = items.length;
        }

        if (itemsLength === 0) {
            return html`<div class="none">${this.emptyMessage}</div>`;
        } else {
            return items.map((i) => this._renderOption(i));
        }
    }

    // Render the each option in the item container
    _renderOption(item: Record<string, unknown> | string) {
        return html` <div
            class="item ${
                this.value === (typeof item === 'string' ? item : item[this.displayField as string]) || this.value === item ? `selected` : ``
            }"
            @click="${() => this._onItemClick(item)}">
            ${
                this.renderItem
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      html` <omni-render-element .data="${item as any}" .renderer="${this.renderItem}"></omni-render-element>`
                    : typeof item !== 'string' && this.displayField
                    ? item[this.displayField]
                    : item
            }
        </div>`;
    }

    // Render the loading indicator
    protected override renderLoading() {
        return html`<slot name="loading_indicator"><omni-loading-icon class="loading"></omni-loading-icon></slot>`;
    }

    protected override renderLabel() {
        return super.renderLabel(true);
    }
}

export type SelectTypes = string[] | Record<string, unknown>[];
export type SelectItems = SelectTypes | Promise<SelectTypes>;

declare global {
    interface HTMLElementTagNameMap {
        'omni-select': Select;
    }
}
