import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/Clear.icon';
import '../icons/Search.icon';

/**
 * A search input control.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/search-field';
 * ```
 * @example
 *
 * ```html
 * <omni-search-field
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-search-field>
 * ```
 *
 * @element omni-search-field
 *
 * @cssprop --omni-search-field-text-align - Search field text align.
 * @cssprop --omni-search-field-font-color - Search field font color.
 * @cssprop --omni-search-field-font-family - Search field font family.
 * @cssprop --omni-search-field-font-size - Search field font size.
 * @cssprop --omni-search-field-font-weight - Search field font weight.
 * @cssprop --omni-search-field-height - Search field height.
 * @cssprop --omni-search-field-padding - Search field width.
 *
 * @cssprop --omni-search-field-control-margin-right - Search field control right margin.
 * @cssprop --omni-search-field-control-margin-left - Search field control left margin.
 * @cssprop --omni-search-field-control-width - Search field control width.
 *
 * @cssprop --omni-search-field-clear-icon-color - Search field clear icon color.
 * @cssprop --omni-search-field-clear-icon-width - Search field clear icon width.
 *
 * @cssprop --omni-search-field-search-icon-color - Search field search icon color.
 * @cssprop --omni-search-field-search-icon-width - Search field search icon width.
 * @cssprop --omni-search-field-search-icon-margin-left - Search field search icon left margin.
 *
 */
@customElement('omni-search-field')
export class SearchField extends OmniFormElement {
    @query('#inputField')
    private _inputElement: HTMLInputElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
    }

    _keyInput() {
        const input = this._inputElement;
        this.value = input.value;
    }

    async _clearField(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        this.value = '';
        // Moves the label back into position when clear button is clicked.
        super._focusLost();
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

                    text-align: var(--omni-search-field-text-align, left);

                    color: var(--omni-search-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-search-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-search-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-search-field-font-weight, var(--omni-font-weight));
                    height: var(--omni-search-field-height, 100%);
                    padding: var(--omni-search-field-padding, 10px);
                }

                .control {
                    display: flex;
                  
                    margin-right: var(--omni-search-field-control-margin-right, 10px);
                    margin-left: var(--omni-search-field-control-margin-left, 10px);
                    width: var(--omni-search-field-control-width, 20px);
                }

                .clear-icon {
                    fill: var(--omni-search-field-clear-icon-color, var(--omni-primary-color));
                }

                .clear-icon,
                ::slotted([slot='clear']){
                    width: var(--omni-search-field-clear-icon-width, 20px);
                    cursor: pointer;
                }

                .search-icon {
                    fill: var(--omni-search-field-search-icon-color, var(--omni-primary-color));
                    width: var(--omni-search-field-search-icon-width, 20px);   
                    margin-left: var(--omni-search-field-search-icon-margin-left,10px) !important;                                 
                }
                
                /* Remove the default clear button from the input with type="search"*/
                input[type="search"]::-webkit-search-decoration,
                input[type="search"]::-webkit-search-cancel-button,
                input[type="search"]::-webkit-search-results-button,
                input[type="search"]::-webkit-search-results-decoration {
                  -webkit-appearance:none;
                }
                .
            `
        ];
    }

    protected override renderPrefix() {
        return html`<omni-search-icon class="search-icon"></omni-search-icon>`;
    }

    protected override renderControl() {
        return html`
            <div id="control" class="control" @click="${(e: MouseEvent) => this._clearField(e)}">
                ${this.value ? html`<slot name="clear"><omni-clear-icon class="clear-icon"></omni-clear-icon></slot>` : ``}
            </div>
        `;
    }

    protected override renderContent() {
        return html`
            <input
                class="field"
                id="inputField"
                type="search"
                .value=${live(this.value as string)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}
