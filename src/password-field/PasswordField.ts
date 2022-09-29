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
                    height: var(--omni-input-slot-height,24px);
                    width: var(--omni-input-slot-width,24px);
                    fill: var(--omni-input-slot-color, var(--omni-primary-color));
                    
                }

                .pre-suffix {
                    padding-inline-end: var(--omni-input-suffix-slot-padding-inline-end, 7px);
                }
                /*
                .pre-suffix:has(.icon){
                    padding-inline-end: var(--omni-input-suffix-slot-padding-inline-end, 7px);
                }
                */

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
                ${this.type === 'password' ? html`<slot name="hide"><omni-eye-visible-icon></omni-eye-visible-icon></slot>` : html`<slot name="visible"><omni-eye-hidden-icon></omni-eye-hidden-icon></slot>`}
            </div>
        `;
    }
}