import { css, html, nothing, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators';
import { InputBase } from '../internal/InputBase';

/**
 * XXXXXXXX
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
 */
@customElement('omni-password-field')
export class PasswordField extends InputBase {

    constructor() {
        super();
        super.type = 'password';
    }

    // static override get styles() {
    //     return [
    //         super.styles,
    //         css``
    //     ];
    // }

    protected override renderPreSuffix() {
        return html`Implement eye icons`;
    }
}