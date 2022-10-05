import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { InputBase } from '../core/OmniInputElement.js';

import '../icons/EyeHidden.icon';
import '../icons/EyeVisible.icon';

/**
 * A password input control.
 *
 * ```js
 *
 * import '@capitec/omni-components/password-field';
 * ```
 *
 * @example
 *
 * ```html
 * <omni-password-field
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
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
 * @cssprop --omni-password-icon-height - Password icon height.
 * @cssprop --omni-password-icon-width - Password icon width.
 * @cssprop --omni-password-icon-color - Password icon fill color.
 * @cssprop --omni-password-input-icon-right - Password slot icon styles.
 * @cssprop --omni-password-input-icon-top - Password field slot padding.
 *
 */
@customElement('omni-password-field')
export class PasswordField extends InputBase {
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

    constructor() {
        super();
        /**
         * @ignore
         */
        super.type = 'password';
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
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    padding-right: var(--omni-password-field-icon-padding-right, 10px);
                    padding-left: var(--omni-password-field-icon-padding-left, 10px);
                    padding-top: var(--omni-password-field-icon-padding-top, 0px);
                    padding-bottom: var(--omni-password-field-icon-padding-bottom, 0px);
                }

                .hide-icon,
                .show-icon {
                    height: var(--omni-password-field-icon-height, var(--omni-icon-size));
                    width: var(--omni-password-field-icon-width, var(--omni-icon-size));
                    fill: var(--omni-password-field-icon-color, var(--omni-primary-color));
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
                    height: var(--omni-password-field-height, 100%);
                    padding: var(--omni-password-field-padding, 10px);
                }
            `
        ];
    }

    protected override renderControl() {
        return html`
            <div class="control-box" @click="${(e: MouseEvent) => this._iconClicked(e)}">
                ${this.type === 'password'
                    ? html` <slot name="hide"><omni-eye-visible-icon></omni-eye-visible-icon></slot> `
                    : html` <slot name="show"><omni-eye-hidden-icon></omni-eye-hidden-icon></slot> `}
            </div>
        `;
    }

    protected override renderInput() {
        return html`
            <input
                class="field"
                id="inputField"
                .type="${this.type}"
                .value=${live(this.value as string)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }
}
