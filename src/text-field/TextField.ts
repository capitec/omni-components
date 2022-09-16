import { customElement } from 'lit/decorators.js';
import { InputBase } from '../internal/InputBase';

/**
 * A text input control.
 * 
 * ```js
 * import '@capitec/omni-components/text-field';
 * ```
 * @example
 * 
 * ```html
 * <omni-text-field
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-text-field>
 * ``` 
 * 
 * @element omni-text-field
 * 
 */
@customElement('omni-text-field')
export class TextField extends InputBase {

    // static override get styles() {
    //     return [
    //         super.styles,
    //         css``
    //     ];
    // }
}