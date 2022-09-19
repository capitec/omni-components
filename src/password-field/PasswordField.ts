import { css, html} from 'lit';
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
 * @cssprop --omni-password-icon-height - password icon height.
 * @cssprop --omni-password-icon-width - password icon width.
 * @cssprop --omni-password-icon-color - password icon fill color.
 * @cssprop --omni-password-slot-icon - password slot icon styles.
 * @cssprop --omni-password-slot-icon-padding - Password field slot padding.
 * 
 */
@customElement('omni-password-field')
export class PasswordField extends InputBase {

    constructor() {
        super();
        super.type = 'password';
    }

    _iconClicked(e: MouseEvent) {

        if (this.disabled) {
			return e.stopImmediatePropagation();
		}

        if(this.type === 'password') {
            this.type = 'text';
        } else {
            this.type = 'password';
        }
		// Prevent the event from bubbling up.
		e.stopPropagation();
	}

    static override get styles() {
        return [
            super.styles,
            css`
            .icon,
            ::slotted(*) {    
                height: var(--omni-password-icon-height,24px);
                width: var(--omni-password-icon-width,24px);
                fill: var(--omni-password-icon-color,var(--omni-primary-color));
                position:absolute;
                right: var(--omni-password-input-icon-right, 10.5px);
                top: var(--omni-password-input-icon-top, 8px);
                cursor: pointer;
            }
            `
        ];
    }

    
    protected override renderPreSuffix() {
        return html`				
        <div id="eyeIcon" class="icon" @click="${(e: MouseEvent) => this._iconClicked(e)}">
            ${this.type === 'password' ? html `<slot><omni-eye-hidden-icon></omni-eye-hidden-icon></slot>`: html `<slot><omni-eye-visible-icon></omni-eye-visible-icon></slot>`}
        </div>`;
    }
    
}