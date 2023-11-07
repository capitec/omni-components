import { PropertyValueMap, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { ifDefined, OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/EyeHidden.icon.js';
import '../icons/EyeVisible.icon.js';

/**
 * Password input control.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/password-field';
 * ```
 *
 * @example
 * ```html
 * <omni-password-field
 *   label="Enter a value"
 *   value="Hello World"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-password-field>
 * ```
 *
 * @element omni-password-field
 *
 * @slot hide - Replaces the icon for the password value hidden state.
 * @slot show - Replaces the icon for the checked value visible state.
 *
 * @cssprop --omni-password-field-control-padding-right - Password field control padding right.
 * @cssprop --omni-password-field-control-padding-left - Password field control padding left.
 * @cssprop --omni-password-field-control-padding-top - Password field control padding top.
 * @cssprop --omni-password-field-control-padding-bottom - Password field control padding bottom.
 *
 * @cssprop --omni-password-field-icon-color - Password field slot icon color.
 * @cssprop --omni-password-field-icon-width - Password field slot width.
 * @cssprop --omni-password-field-icon-height - Password field slot height.
 *
 * @cssprop --omni-password-field-text-align - Password field text align.
 * @cssprop --omni-password-field-font-color - Password field font color.
 * @cssprop --omni-password-field-font-family - Password field font family.
 * @cssprop --omni-password-field-font-size - Password field font size.
 * @cssprop --omni-password-field-font-weight - Password field font weight.
 * @cssprop --omni-password-field-padding - Password field padding.
 * @cssprop --omni-password-field-height - Password field height.
 * @cssprop --omni-password-field-width - Password field width.
 *
 * @cssprop --omni-password-field-disabled-color - Password field disabled font color.
 * @cssprop --omni-password-field-error-font-color - Password field error font color.
 *
 */
@customElement('omni-password-field')
export class PasswordField extends OmniFormElement {
    /**
     * @ignore
     */
    @state() protected type: 'password' | 'text' = 'password';

    /**
     * Override for the value property inherited from the OmniFormElement component with reflect set to false.
     */
    @property({ type: String, reflect: false }) override value?: string;

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    @query('#inputField')
    private _inputElement?: HTMLInputElement;
    @query('.container')
    private container?: HTMLDivElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('focus', this._focusInput.bind(this), {
            capture: true
        });
    }

    protected override async firstUpdated(): Promise<void> {
        this._setInputValue();
    }

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        if (_changedProperties.has('value')) {
            if (this.value) {
                this.container?.classList?.add('float-label');
                this.container?.classList?.remove('no-float-label');
            } else {
                this.container?.classList?.remove('float-label');
                this.container?.classList?.add('no-float-label');
            }
            this._setInputValue();
        }
    }

    // Set the value of the input component.
    _setInputValue() {
        if (this._inputElement) {
            this._inputElement.value = this.value as string;
        }
    }

    _focusInput() {
        const input = this._inputElement;
        if (input) {
            setTimeout(function () {
                input.selectionStart = input.selectionEnd = 10000;
            }, 0);
        }
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

    _iconClicked(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        if (this.type === 'password') {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
        // Prevent the event from bubbling up. should this be here
        e.stopPropagation();
    }

    static override get styles() {
        return [
            super.styles,
            css`
                .control-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    padding-right: var(--omni-password-field-control-padding-right, 10px);
                    padding-left: var(--omni-password-field-control-padding-left, 10px);
                    padding-top: var(--omni-password-field-control-padding-top, 0px);
                    padding-bottom: var(--omni-password-field-control-padding-bottom, 0px);
                }

                .hide-icon,
                .show-icon {
                    fill: var(--omni-password-field-icon-color, var(--omni-primary-color));
                }

                .hide-icon,
                .show-icon,
                ::slotted([slot='show']),
                ::slotted([slot='hide']) {
                    width: var(--omni-password-field-icon-width, 24px);
                    height: var(--omni-password-field-icon-height, 24px);
                }

                /* Prevent default icon from displaying in password field on Edge browser */
                input::-ms-reveal,
                input::-ms-clear {
                    display: none;
                }

                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-password-field-text-align, left);

                    color: var(--omni-password-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-password-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-password-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-password-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-password-field-padding, 10px);

                    height: var(--omni-password-field-height, 100%);
                    width: var(--omni-password-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-password-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-password-field-error-font-color, var(--omni-font-color));
                }
            `
        ];
    }

    protected override renderControl() {
        return html`
      <div class="control-box" @click="${(e: MouseEvent) => this._iconClicked(e)}">
        ${
            this.type === 'password'
                ? html` <slot name="show"><omni-eye-visible-icon class="show-icon"></omni-eye-visible-icon></slot> `
                : html` <slot name="hide"><omni-eye-hidden-icon class="hide-icon"></omni-eye-hidden-icon></slot> `
        }
      </div>
    `;
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
        .type="${this.type}"
        aria-label="${this.label}"
        aria-disabled="${this.disabled}"
        inputmode="${ifDefined(this.noNativeKeyboard ? 'none' : undefined)}"
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-password-field': PasswordField;
    }
}
