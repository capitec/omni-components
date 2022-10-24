import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/Clear.icon';
import '../icons/Search.icon';

/**
 * A search input control.
 *
 * ```js
 *
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
 * @cssprop --omni-search-field-search-align - search field search align.
 * @cssprop --omni-search-field-font-color - search field font color.
 * @cssprop --omni-search-field-font-family - search field font family.
 * @cssprop --omni-search-field-font-size - search field font size.
 * @cssprop --omni-search-field-font-weight - search field font weight.
 * @cssprop --omni-search-field-height - search field height.
 * @cssprop --omni-search-field-padding - search field width.
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

    _clearField(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        this.value = '';

        /*Come back and fix this horrid implementation*/
        const label: HTMLElement = this.shadowRoot.getElementById('label');
        console.log(label);
        label.style.transform = '';
        
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

                    text-align: var(--omni-search-field-search-align, left);

                    color: var(--omni-search-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-search-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-search-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-search-field-font-weight, var(--omni-font-weight));
                    height: var(--omni-search-field-height, 100%);
                    padding: var(--omni-search-field-padding, 10px);
                }

                .control {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    padding-right: var(--omni-search-field-control-padding-right, 10px);
                    padding-left: var(--omni-search-field-control-padding-left, 10px);
                    padding-top: var(--omni-search-field-control-padding-top, 0px);
                    padding-bottom: var(--omni-search-field-control-padding-bottom, 0px);
                }

                .clear-icon {
                    fill: var(--omni-search-field-clear-icon-color, var(--omni-primary-color));
                }

                .clear-icon,
                ::slotted([slot='clear']){
                    width: var(--omni-search-field-clear-icon-width, 20px);
                }

                .search-icon {
                    fill: var(--omni-search-field-search-icon-color, var(--omni-primary-color));
                                
                }

                .search-icon,
                ::slotted([slot='prefix']){
                    width: var(--omni-search-field-search-icon-width, 20px);
                    padding-left: var(--omni-search-field-search-icon-left-padding, 10px);
                }


                input:empty .label {
                    transform: '';
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
        return html `<omni-search-icon class="search-icon"></omni-search-icon>`;
    }

    protected override renderControl() {
        return html`
            <div class="control" @click="${(e: MouseEvent) => this._clearField(e)}">
                <slot name="clear"><omni-clear-icon class="clear-icon"></omni-clear-icon></slot> 
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
