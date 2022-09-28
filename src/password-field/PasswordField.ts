import { css, html } from 'lit';
import { customElement } from 'lit/decorators';
import { InputBase } from '../internal/InputBase';

import '../icons/EyeHidden.icon';
import '../icons/EyeVisible.icon';

/**
 * A password input control.
 * 
 * ```js
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
 * @slot hide_icon - Replaces the icon for the password value hidden state.
 * @slot visible_icon - Replaces the icon for the checked value visible state.
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
                
                .icon
                 {    
                    height: var(--omni-password-icon-height,24px);
                    width: var(--omni-password-icon-width,24px);
                    fill: var(--omni-password-icon-color,var(--omni-primary-color));
                    /*
                    position:absolute;
                    right: var(--omni-password-input-icon-right, 10.5px);
                    top: var(--omni-password-input-icon-top, 6px);*/
                    cursor: pointer;
                }

                
                ::slotted([slot=hide_icon]),
                ::slotted([slot=visible_icon])
                {
                    width: 100%;
                    height: 100%;
                    fill: var(--omni-password-icon-color,var(--omni-primary-color));
                }

                /* Prevent default icon from displaying in password field on Edge browser */
                input::-ms-reveal,
                input::-ms-clear {
                  display: none;
                }
            `
        ];
    }

    protected override renderPreSuffix() {
        return html`				
            <div class="icon" @click="${(e: MouseEvent) => this._iconClicked(e)}">
                ${this.type === 'password' ? html`<span class="hide-icon"><slot name="hide-icon"><omni-eye-visible-icon></omni-eye-visible-icon></slot></span>` : html`<span class="visible-icon"><slot name="visible_icon"><omni-eye-hidden-icon></omni-eye-hidden-icon></slot></span>`}
            </div>
        `;
    }
}