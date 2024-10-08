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
import '../icons/Clear.icon.js';
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
 *   clearable
 *   searchable
 *   disabled>
 * </omni-select>
 * ```
 *
 * @element omni-select
 *
 * @slot more - Replaces the icon for the more slot (Displays on mobile devices).
 * @slot arrow - Replaces the icon for the arrow slot (Displays on desktop and tablet devices).
 * @slot search-clear - Replaces the icon in the Search field (Displays when searchable is set to true).
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
 * @cssprop --omni-select-items-container-z-index - Select items container z-index.
 *
 * @cssprop --omni-select-items-max-height - Select items max height.
 *
 * @cssprop --omni-select-items-container-width - Select items container width
 * @cssprop --omni-select-items-container-top - Select items container top.
 * @cssprop --omni-select-items-container-render-bottom-top - Select items container top when rendered at the bottom.
 *
 * @cssprop --omni-select-items-height - Select items height.
 * @cssprop --omni-select-items-width - Select items width.
 * @cssprop --omni-select-items-background-color - Select items background color.
 *
 * @cssprop --omni-select-item-font-color - Select item font color.
 * @cssprop --omni-select-item-font-family - Select item font family.
 * @cssprop --omni-select-item-font-size - Select item font size.
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
 * @cssprop --omni-select-search-field-font-color - Select search field font color.
 * @cssprop --omni-select-search-field-font-family - Select search field font family.
 * @cssprop --omni-select-search-field-font-size - Select search field font size.
 * @cssprop --omni-select-search-field-font-weight - Select search field font weight.
 *
 * @cssprop --omni-select-search-field-padding-top - Select search field top padding.
 * @cssprop --omni-select-search-field-padding-bottom - Select search field bottom padding.
 * @cssprop --omni-select-search-field-padding-left - Select search field left padding.
 * @cssprop --omni-select-search-field-padding-right - Select search field right padding.
 *
 * @cssprop --omni-select-search-field-width - Select search field width.
 *
 * @cssprop --omni-select-search-field-top-border-width - Select search field top border width.
 * @cssprop --omni-select-search-field-left-border-width - Select search field left border width.
 * @cssprop --omni-select-search-field-right-border-width - Select search field right border width.
 * @cssprop --omni-select-search-field-bottom-border-width - Select search field bottom border width.
 * @cssprop --omni-select-search-field-bottom-border-color - Select search field bottom border color.
 *
 * @cssprop --omni-select-search-field-background-color - Select search field background color.
 * @cssprop --omni-select-search-control-bottom-border -  Select search field clear control bottom border.
 *
 * @cssprop --omni-select-search-clear-div-right-padding - Select search field clear div right padding.
 * @cssprop --omni-select-search-clear-div-background-color - Select search field clear div background color.
 *
 * @cssprop --omni-select-search-clear-icon-height - Select search field clear icon height.
 * @cssprop --omni-select-search-clear-icon-width - Select search field clear icon width.
 * @cssprop --omni-select-search-clear-icon-color - Select search field clear icon color.
 *
 * @cssprop --omni-select-item-header-left - Select item header left.
 * @cssprop --omni-select-item-header-right - Select item header right.
 * @cssprop --omni-select-item-header-font-color - Select item header font color.
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
 * @cssprop --omni-select-dialog-width - Select dialog width
 * @cssprop --omni-select-dialog-left - Select dialog left.
 * @cssprop --omni-select-dialog-right - Select dialog right.
 * @cssprop --omni-select-dialog-bottom - Select dialog bottom.
 * @cssprop --omni-select-dialog-background-color - Select dialog background color.
 *
 * @cssprop --omni-select-dialog-modal-max-width - Select dialog modal max width.
 * @cssprop --omni-select-dialog-modal-max-height - Select dialog height.
 * @cssprop --omni-select-dialog-backdrop-color - Select dialog background color.
 *
 * @cssprop --omni-select-dialog-items-min-height - Select dialog items min height.
 *
 */
@customElement('omni-select')
export class Select extends OmniFormElement {
    @query('#select')
    private _selectElement?: HTMLInputElement;
    @query('#searchField')
    private _searchElement?: HTMLInputElement;
    private _itemsContainer?: HTMLDivElement;

    /**
     * Value entered into the form component.
     * @attr
     */
    @property({
        reflect: true,
        converter: {
            toAttribute(value) {
                try {
                    if (!value) {
                        return value;
                    }
                    if (typeof value === 'string') {
                        return value;
                    } else {
                        return JSON.stringify(value) ?? null;
                    }
                } catch (err) {
                    return value;
                }
            },
            fromAttribute(value) {
                try {
                    if (value && typeof value === 'string' && (value.includes('{') || value.includes('['))) {
                        return JSON.parse(value);
                    }
                    return value;
                } catch (err) {
                    // Value cannot be used as defined type, default to using value as is.
                    return value;
                }
            }
        }
    })
    override value?: string | Record<string, unknown> = null as unknown as string;

    /**
     * Selectable items of the select component.
     * @attr
     */
    @property({ type: Array, reflect: true }) items?: SelectItems | ((filterValue?: string) => SelectItems);

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
     * Toggles the ability to search the items of the select of the component.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) searchable = false;

    /**
     * Render function for each item.
     * @no_attribute
     */
    @property({ type: Object, reflect: false }) renderItem?: RenderFunction;

    /**
     * Render function for selected item.
     * @no_attribute
     */
    @property({ type: Object, reflect: false }) renderSelection?: RenderFunction;

    /**
     * Custom search function for items instead of using the default provided.
     * @no_attribute
     */
    @property({ type: Object, reflect: false }) filterItems?: (filterValue: string, items: SelectTypes) => SelectItems;

    // Internal state properties
    @state() private _popUp: boolean = false;
    @state() private _bottomOfViewport: boolean = false;
    @state() private _isMobile: boolean = false;
    @state() private _searchValue?: string;

    // Protect getters for inheritance when extending the `<omni-select>` component.
    protected get bottomOfViewport() {
        return this._bottomOfViewport;
    }

    protected get isMobile() {
        return this._isMobile;
    }

    protected get searchValue() {
        return this._searchValue;
    }

    protected get popUp() {
        return this._popUp;
    }

    protected get searchElement() {
        return this._searchElement;
    }

    protected get itemsContainer() {
        return this._itemsContainer;
    }

    protected get selectElement() {
        return this._selectElement;
    }

    private _windowClickBound = this._windowClick.bind(this);
    private _checkScreenDimensionsBound = this._checkScreenDimensions.bind(this);

    override connectedCallback() {
        super.connectedCallback();
        this._checkforMobile();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClickBound);
    }

    protected override async firstUpdated(): Promise<void> {
        await this._checkScreenDimensions();
        window.addEventListener('resize', this._checkScreenDimensionsBound);
        window.addEventListener('scroll', this._checkScreenDimensionsBound);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener('click', this._windowClickBound);
        window.removeEventListener('resize', this._checkScreenDimensionsBound);
        window.removeEventListener('scroll', this._checkScreenDimensionsBound);
    }

    _inputClick(e: Event) {
        if (this.disabled) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
        const composedPath = e.composedPath();
        const searchControl = this.renderRoot.querySelector<HTMLDivElement>('#search-control') as HTMLDivElement;

        //Stop the items container from closing when clicking the search input
        if (this.searchable && composedPath.includes(searchControl)) {
            return;
        } else {
            this._togglePopup();
        }
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
            this._onSearchFieldClear();
            if (this._isMobile) {
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
                let newHeight = '';
                if (this._bottomOfViewport) {
                    newHeight =
                        visualViewport.height -
                        this.getBoundingClientRect().height -
                        (this.searchable && this._searchElement ? this._searchElement.height : 0) -
                        (visualViewport.height - this.getBoundingClientRect().top) -
                        10 +
                        'px';
                } else {
                    newHeight =
                        visualViewport.height -
                        this.getBoundingClientRect().bottom -
                        (this.searchable && this._searchElement ? this._searchElement.offsetHeight : 0) -
                        10 +
                        'px';
                }

                this._itemsContainer.style.maxHeight = `var(--omni-select-items-max-height, ${newHeight})`;
            }
        }
    }

    _onSearchFieldInput() {
        this._searchValue = this._searchElement?.value as string;
        this.requestUpdate();
    }

    _onSearchFieldClear() {
        this._searchValue = undefined;
        if (this._searchElement) {
            this._searchElement.value = '';
        }
        this.requestUpdate();
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
                    color: var(--omni-select-field-disabled-font-color,#7C7C7C);
                }

                .field.error {
                    color: var(--omni-select-field-error-font-color, var(--omni-font-color));
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
                    .control.expanded .arrow,
                    .control.expanded ::slotted([slot='arrow']) {
                        transform: rotate(180deg);
                        transition: all linear 0.15s;
                    }

                    .control.collapsed .arrow,
                    .control.collapsed ::slotted([slot='arrow']) {
                        transform: none;
                        transition: all linear 0.15s;
                    }
                }

                .items {
                    overflow-y: auto;
                    overflow-x: hidden;

                    height: var(--omni-select-items-height, auto);
                    width: var(--omni-select-items-width, 100%);
                    background: var(--omni-select-items-background-color, var(--omni-background-color));              
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

                /* Search field styles */

                .searchField {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    color: var(--omni-select-search-field-font-color, var(--omni-font-color));

                    font-family: var(--omni-select-search-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-search-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-search-field-font-weight,var(--omni-font-weight));
                    
                    padding-top: var(--omni-select-search-field-padding-top, 14px);
                    padding-bottom: var(--omni-select-search-field-padding-bottom, 14px);
                    padding-left: var(--omni-select-search-field-padding-left, 10px);
                    padding-right: var(--omni-select-search-field-padding-right, 10px);

                    width: var(--omni-select-search-field-width,100%);

                    border-top-width: var(--omni-select-search-field-top-border-width, 0);
                    border-left-width: var(--omni-select-search-field-left-border-width, 0);
                    border-right-width: var(--omni-select-search-field-right-border-width, 0);
                    border-bottom-width: var(--omni-select-search-field-bottom-border-width, 1px);
                    border-bottom-color: var(--omni-select-search-field-bottom-border-color, transparent);

                    background: var(--omni-select-search-field-background-color, var(--omni-background-color));   
                }

                .searchField:focus {
                    outline: none;
                }

                /* Search field clear icons styles */
                .search-control {
                    display: flex;
                    border-bottom: var(--omni-select-search-control-bottom-border, 1px solid var(--omni-primary-color));
                }

                .search-clear-click {
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                    padding-right: var(--omni-select-search-clear-div-right-padding, 10px);    
                    background: var(--omni-select-search-clear-div-background-color, var(--omni-background-color));
                }

                .search-clear-icon,
                ::slotted([slot='search-clear']) {
                    cursor: pointer;
                    height: var(--omni-select-search-clear-icon-height,20px);
                    width: var(--omni-select-search-clear-icon-width, 20px);
                    fill: var(--omni-select-search-clear-icon-color, var(--omni-primary-color));
                }

                /* Should only display for mobile rendering */
                .header {
                    left: var(--omni-select-item-header-left, 0px);
                    right: var(--omni-select-item-header-right, 0px);

                    color: var(--omni-select-item-header-font-color, var(--omni-font-color));
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

                /* Mobile device styling */
                @media screen and (max-width: 766px) {
                    .items-dialog {
                        position: fixed;
                        top: inherit;
                        margin: unset;
                        border-style: none;
                        padding: unset;
                        width: var(--omni-select-dialog-width,100vw);
                        left: var(--omni-select-dialog-left, 0px);
                        right: var(--omni-select-dialog-right, 0px);
                        bottom: var(--omni-select-dialog-bottom, 0px);
                        background-color: var(--omni-select-dialog-background-color, transparent);
                    }
                    
                    .items-dialog:modal{
                        display: flex;
                        flex-direction: column;
                        max-width: var(--omni-select-dialog-modal-max-width, 100vw);
                        max-height: var(--omni-select-dialog-modal-max-height, 240px);                  
                    }

                    .items-dialog::backdrop {
                        background: var(--omni-select-dialog-backdrop-color, rgba(0, 0, 0, 0.1));
                    }

                    .items {
                        min-height: var(--omni-select-dialog-items-min-height, 150px);
                    }
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
                style="${this.renderSelection ? 'display: none' : nothing}"
                class=${classMap(field)}
                data-omni-keyboard-hidden
                id="select"
                type="text"
                readonly
                inputMode="none"
                ?disabled=${this.disabled}
                .value=${live(
                    (typeof this.value !== 'string' && this.displayField
                        ? (((this.value as Record<string, unknown>) ?? {})[this.displayField] as string)
                        : (this.value as string)) ?? ''
                )}
                tabindex="${this.disabled ? -1 : 0}" />
            ${
                this.renderSelection
                    ? html`
                        <div 
                            class=${classMap(field)} 
                            style="pointer-events: none;">
                            ${
                                this.value
                                    ? html` 
                                        <omni-render-element 
                                            style="height: inherit; width: inherit;" 
                                            .data="${this.value}" 
                                            .renderer="${this.renderSelection}"
                                        >
                                            ${this._renderSelectionLoading()}
                                        </omni-render-element>
                                        `
                                    : nothing
                            }
                        </div>`
                    : nothing
            }
        `;
    }

    _renderSelectionLoading() {
        const loading = this.querySelector('[slot=loading_indicator]');
        if (loading) {
            const copy = loading.cloneNode(true) as HTMLElement;
            copy.setAttribute('slot', 'loading_indicator');
            copy.setAttribute('style', 'height: 100%; max-width: 24px;');
            return copy;
        }
        return html`<omni-loading-icon slot="loading_indicator" style="height: 100%; max-width: 24px;"></omni-loading-icon>`;
    }

    // Render the picker (items container) this will be a dialog in mobile form factors
    protected override renderPicker() {
        if (this._isMobile) {
            return this._renderMobilePicker();
        }

        if (!this._popUp) {
            return nothing;
        }
        return this._renderDesktopPicker();
    }

    _renderDesktopPicker() {
        return html`
            <div id="items-container" class="items-container ${this._bottomOfViewport ? `bottom` : ``}">
                ${this._renderSearchField()}
                <div ${ref(this._itemsMaxHeightChange)} id="items" class="items"> 
                    ${until(this._renderOptions(), html`<div>${this.renderLoading()}</div>`)}
                </div>
            </div>
        `;
    }

    _renderMobilePicker() {
        return html`
            <dialog id="items-dialog" class="items-dialog" @cancel="${(e: Event) => e.preventDefault()}">
                ${this._renderMobileHeader()}
                ${this._renderSearchField()}
                <div ${ref(this._itemsMaxHeightChange)} id="items" class="items"> 
                    ${until(this._renderOptions(), html`<div>${this.renderLoading()}</div>`)}
                </div>
            </dialog>
            `;
    }

    _renderMobileHeader() {
        return this.label ? html`<div class="header">${this.label}</div>` : nothing;
    }

    // Render the search field if the searchable property is set and renders a clear button if there is a value in the input
    _renderSearchField() {
        if (this.searchable) {
            return html`
            <div id="search-control" class='search-control'>
                <input type="text" class="searchField" id="searchField" placeholder="Search..." @input="${this._onSearchFieldInput}" />
                <div id="search-clear-click" class="search-clear-click" @click="${this._onSearchFieldClear}">
                    ${
                        this._searchValue
                            ? html`
                        <slot name="search-clear">
                            ${this._renderSearchClear()}
                        </slot>
                    `
                            : nothing
                    }
                </div>
            </div>`;
        } else {
            return nothing;
        }
    }

    _renderSearchClear() {
        return html`<omni-clear-icon class="search-clear-icon"></omni-clear-icon>`;
    }

    // Render the control of the Select when clicked this will open up the items container
    protected override renderControl() {
        const controlIcon: ClassInfo = {
            arrow: true, // Required for desktop slot rotation.
            icon: true,
            disabled: this.disabled,
            error: this.error as string
        };
        return html`
        <div id="control" class="control ${this._popUp ? `expanded` : `collapsed`}" @click="${() => this._controlClick()}">
            ${this._isMobile ? this._renderMobileControl(controlIcon) : this._renderDesktopControl(controlIcon)}
        </div>`;
    }

    _renderDesktopControl(controlIcon: ClassInfo): unknown {
        return html`<slot name="arrow"><omni-chevron-down-icon class=${classMap(controlIcon)}></omni-chevron-down-icon></slot>`;
    }

    _renderMobileControl(controlIcon: ClassInfo): unknown {
        return html`<slot name="more"><omni-more-icon class=${classMap(controlIcon)}></omni-more-icon></slot>`;
    }

    async _renderOptions() {
        let items: SelectTypes = [];
        let itemsLength = 0;

        if (typeof this.items === 'function') {
            items = await this.items(this._searchValue);
        } else {
            items = (await this.items) as SelectTypes;
        }

        if (Array.isArray(items)) {
            //If a custom filter function is provided and there is a value in the searchField then use it vs using the default.
            if (this._searchValue && this.filterItems && typeof this.filterItems === 'function') {
                items = (await this.filterItems(this._searchValue, items)) as SelectTypes;
            } else {
                items = (items as (string | Record<string, unknown>)[]).filter((i) => this._filterOption(i)) as SelectTypes;
            }
            itemsLength = items.length;
        }

        if (itemsLength === 0) {
            return this._renderEmptyOptions();
        } else {
            return this._renderItems(items);
        }
    }

    _renderItems(items: SelectTypes) {
        return items.map((i) => this._renderOption(i));
    }

    _renderEmptyOptions() {
        return html`<div class="none">${this.emptyMessage}</div>`;
    }

    // Filter the items provided if the searchField has a value filter the items based on the value.
    _filterOption(item: string | Record<string, unknown>) {
        if (!this._searchValue) {
            return true;
        }

        if (typeof item === `string`) {
            return item.toString().toLowerCase().includes(this._searchValue.toLowerCase());
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!this.displayField || !item.hasOwnProperty(this.displayField)) {
            return true;
        }

        return (item[this.displayField!] as string).toString().toLowerCase().includes(this._searchValue.toLowerCase()) as unknown as string;
    }

    // Render the each option in the item container
    _renderOption(item: Record<string, unknown> | string) {
        return html` 
        <div
            class="item ${
                this.value === (typeof item === 'string' ? item : item[this.displayField as string]) || this.value === item ? `selected` : ``
            }"
            @click="${() => this._onItemClick(item)}">
            ${
                this.renderItem
                    ? html` 
                        <omni-render-element .data="${item as never}" .renderer="${this.renderItem}">
                            ${this._renderItemLoading()}
                        </omni-render-element>
                    `
                    : typeof item !== 'string' && this.displayField
                    ? item[this.displayField]
                    : item
            }
        </div>
        ${this._renderOptionSeparator(item)}
        `;
    }

    _renderItemLoading() {
        const loading = this.querySelector('[slot=loading_indicator]');
        if (loading) {
            const copy = loading.cloneNode(true) as HTMLElement;
            copy.setAttribute('slot', 'loading_indicator');
            copy.setAttribute('style', 'height: 100%; max-width: 24px;');
            return copy;
        }
        return nothing;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _renderOptionSeparator(_item: Record<string, unknown> | string) {
        return nothing;
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
