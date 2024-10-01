import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { ifDefined, OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/Clear.icon.js';
import '../icons/Search.icon.js';

/**
 * Search input control.
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
 * @cssprop --omni-search-field-padding - Search field padding.
 * @cssprop --omni-search-field-height - Search field height.
 * @cssprop --omni-search-field-width - Search field width.
 *
 * @cssprop --omni-search-field-disabled-font-color - Search field disabled font color.
 * @cssprop --omni-search-field-error-font-color - Search field error font color.
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
 * @cssprop --omni-search-field-label-left-margin - Search field label left margin.
 *
 * @cssprop --omni-search-field-autofill-hover-transition - Search field suggestions input hover color.
 *
 */
@customElement('omni-search-field')
export class SearchField extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
            capture: true
        });
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    _keyInput() {
        const input = this._inputElement;
        this.value = input?.value;
    }

    _blurOnEnter(e: KeyboardEvent) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            (e.currentTarget as HTMLElement).blur();
        }
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
                    padding: var(--omni-search-field-padding, 10px);
                    height: var(--omni-search-field-height, 100%);
                    width: var(--omni-search-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-search-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-search-field-error-font-color, var(--omni-font-color));
                }

                .search-icon {
                    fill: var(--omni-search-field-search-icon-color, var(--omni-primary-color));
                    width: var(--omni-search-field-search-icon-width, 20px);   
                    margin-left: var(--omni-search-field-search-icon-margin-left,10px) !important;                                 
                }

                .label {
                    margin-left: var(--omni-search-field-label-left-margin, 42px);
                }
                
                /* Remove the default clear button from the input with type="search"*/
                input[type="search"]::-webkit-search-decoration,
                input[type="search"]::-webkit-search-cancel-button,
                input[type="search"]::-webkit-search-results-button,
                input[type="search"]::-webkit-search-results-decoration {
                  -webkit-appearance:none;
                }

                /* Grant the ability to set the hover color when cursor hovers over auto selectable options */
                input:-webkit-autofill,
                input:-webkit-autofill:focus {
                    transition: var(--omni-search-field-autofill-hover-transition) !important;
                }
                
            `
        ];
    }

    protected override renderPrefix() {
        return html`<omni-search-icon class="search-icon"></omni-search-icon>`;
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
                id="inputField"
                type="search"
                inputmode="${ifDefined(this.noNativeKeyboard ? 'none' : undefined)}"
                .value=${live(this.value as string)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-search-field': SearchField;
    }
}
