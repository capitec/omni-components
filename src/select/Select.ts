import { html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import { RenderFunction } from '../render-element/RenderElement.js';
import '../render-element/RenderElement.js';
import '../icons/ChevronDown.icon.js';
import '../icons/More.icon.js';

/**
 * A text input control.
 *
 * ```js
 *
 * import '@capitec/omni-components/select';
 * ```
 * @example
 *
 * ```html
 * <omni-select
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   items={'item1','item2','item3','item4'}
 *   inline=false
 *   display-field="label"
 *   id-field="id"
 *   header-label="Select a item"
 *   disabled>
 * </omni-select>
 * ```
 *
 * @element omni-select
 * 
 * @cssprop --omni-select-field-text-align - Select component text align.
 * @cssprop --omni-select-field-font-color -  Select component font color.
 * @cssprop --omni-select-field-font-family - Select component font family.
 * @cssprop --omni-select-field-font-size - Select component font size.
 * @cssprop --omni-select-field-font-weight - Select component font weight.
 * @cssprop --omni-select-field-height - Select component height
 * @cssprop --omni-select-field-padding - Select component padding.
 *
 * @cssprop --omni-select-items-container-width - Select component items container width.
 * @cssprop --omni-select-items-container-box-shadow - Select component items container box shadow.
 * @cssprop --omni-select-items-container-background-color - Select component items container background color.
 * 
 * @cssprop --omni-select-control-margin-right - Select control right margin.
 * @cssprop --omni-select-control-margin-left - Select control left margin.
 * @cssprop --omni-select-control-width - Select control width.
 * 
 * @cssprop --omni-select-control-icon-width - Select control icon width.
 * @cssprop --omni-select-control-icon-color - Select control icon color.
 */
@customElement('omni-select')
export class Select extends OmniFormElement {
    @query('#select')
    private _selectElement: HTMLSelectElement;

    /**
     * Inline flag for the select component.
     * @attr
     */
    @property({ type: Boolean , reflect: true }) inline: boolean = false;

    /**
     * Selectable items of the select component.
     * @attr
     */
    @property({type: Array, reflect: true}) items: Array<unknown>;

    /**
     * Placeholder for the select text for the select component.
     * @attr 
     */
    @property({type: String, reflect: true}) placeholder: string;

    /**
     * The field of the item to display as one of the selectable options.
     * @attr
     */
    @property({type: String, reflect: true, attribute: 'display-field'}) displayField: string;

    /**
     * The id field of the items provided.
     * @attr
     */
    @property({type: String, reflect: true, attribute: 'id-field'}) idField: string = 'id';

    /**
     * The label to display on the mobile item list 
     * @attr
     */
    @property({type: String, reflect: true, attribute: 'header-label'}) headerLabel: string = 'Select a option';

    /**
     * The render function for each item.
     */
    @property({type: Object, reflect: false}) renderItem: RenderFunction;

    // Internal state properties
    @state() private _popUp: boolean = false;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('change', this._valueChanged.bind(this));
        this.addEventListener('click', this._inputClick.bind(this));
        console.log('The screen width of this device is', screen.width);
    }

    _inputClick() {
        this._togglePopup();
    }

    _valueChanged() {
        const input = this._selectElement;
        this.value = input.value;
    }

    _controlClick() {
        this._togglePopup();
    }

    _togglePopup() {
        if(this._popUp) {
            this._popUp = false;
        } else {
            this._popUp = true;
        }
        console.log('popUp property state', this._popUp);
    }

    _renderHeader() {
        return html`<div class="header">${this.headerLabel}</div>`;
    }

    _renderOptions() {
        const itemsLength = this.items.length;

        if(itemsLength === 0) {
            return html`<div class="none">No matching items</div>`;
        }
        return this.items.map(i => this._renderOption(i));
    }

    //Check that this only 
    _renderOption(item: any) {
        return html`
            <div class="item" @click="${(e: MouseEvent) => this._onItemClick(this.displayField? item[this.displayField]: item, e)}">
                ${this.renderItem ?
                     html`
                     <omni-render-element .data="${item}" .renderer="${this.renderItem}">
                        <div slot="loading_indicator">...</div>
                     </omni-render-element>` :
                    this.displayField? item[this.displayField]: item}
            </div>`;
    }

    _onItemClick(item: string, e: MouseEvent) {
        this.value = item;
        // Added to stop item container from staying open.
        e.stopPropagation();
        this._togglePopup();
    }

    static override get styles() {
        return [
            super.styles,
            css`
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
                    height: var(--omni-select-field-height, 100%);
                    padding: var(--omni-select-field-padding, 10px);
                }

                .control {
                    display: flex;
                    cursor: pointer;
                    margin-right: var(--omni-select-control-margin-right, 10px);
                    /*margin-left: var(--omni-select-control-margin-left, 10px);*/
                    width: var(--omni-select-control-width, 20px);
                    /* Added to resolve issue of click event firing twice*/
                    pointer-events: none;
                }

                .control-icon {
                    width: var(--omni-select-control-icon-width,20px);
                    fill: var(--omni-select-control-icon-color,var(--omni-primary-color));                   
                }

                @media screen and (min-width: 767px) {
                    /* control when the items are expanded */ 
                    .control.expanded {
                        transform: rotate(180deg);
                        transition: all linear .15s;
                    }

                    .control.collapsed {
                        transform: none;
                        transition: all linear .15s;
                    }
                }

                /* Should only display for mobile rendering*/
                .header {
                    position: relative;
                    left: 0px;
                    right: 0px;

                    font-family: var(--omni-select-item-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-item-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-item-font-weight, var(--omni-font-weight));
                    background-color: var(--omni-select-items-header-background-color, green);

                    padding-top: 14px;
                    padding-bottom: 14px;
                    padding-right: 10px;
                    padding-left: 10px;
                }

                /* Default item container styles*/
                .items-container {
                    /*Check this later as direct rip */
                    box-shadow: var(--omni-select-items-container-box-shadow,0 0 6px 0 rgba(0,0,0,0.11));
                    background-color: var(--omni-select-items-container-background-color, #FFFFFF)
                }

                /*Mobile device styling*/
                @media screen and (max-width: 767px) {
                    .items-container {
                        position: fixed;
                        left: 0px;
                        right: 0px;
                        bottom: 0px;
                    }
                }

                /*Desktop and landscape tablet device styling*/
                @media screen and (min-width: 767px) {
                    .items-container {

                        position: absolute;
                        width:100%;
                        top: 100%;
                        transition:1s;                     
                    }
                }

                .items {
                    height: var(--omni-select-items-height, auto);
                    width: var(--omni-select-items-width, 100%);

                    /* Check this later as direct rip*/
                    overflow-y: auto;
                    overflow-x: hidden;

                }

                .item, .none {
                    white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

                    color: var(--omni-select-item-font-color, var(--omni-font-color));

                    font-family: var(--omni-select-item-font-family, var(--omni-font-family));
                    font-size: var(--omni-select-item-font-size, var(--omni-font-size));
                    font-weight: var(--omni-select-item-font-weight, var(--omni-font-weight));

                    padding-top:var(--omni-select-item-padding-top,8px);
                    padding-bottom:var(--omni-select-item-padding-bottom,14px);
                    padding-left:var(--omni-select-item-padding-left,10px);
                    padding-right:var(--omni-select-item-padding-right,10px);
                    width: var(--omni-select-item-width,100%);
                }

                .item:hover {
                    background-color: var(--omni-select-item-hover-background-color, var(--omni-background-hover-color));
                }

                .none:hover {

                }
            `
        ];
    }

    /*readonly determined by disabled property this will have to be altered for the select removed ?readOnly=${this.disabled}*/
    protected override renderContent() {
        return html`
            <input
                class="field"
                id="select"
                type="text"
                readonly
                placeholder=${this.placeholder}
                .value=${live(this.value as string)}
                tabindex="${this.disabled ? -1 : 0}" />
        `;

    }

    protected override renderPicker() {
        if(!this._popUp || !this.items) {
            return nothing;
        }
        return html`
            <div class="items-container">
                ${screen.width < 767? html`<div class="header">${this.headerLabel}</div>`: nothing}
                <div class="items">
                    ${this._renderOptions()}
                </div>
            </div>
        `;
        
    }

    protected override renderControl() {
        return html`
        <div id="control" class="control ${this._popUp ? `expanded`:`collapsed`}" @click="${() => this._controlClick()}">
            ${screen.width > 767 ? html`<omni-chevron-down-icon class="control-icon"></omni-chevron-down-icon>`: html`<omni-more-icon class="control-icon"></omni-more-icon>` }
        </div>`;
    }
}
