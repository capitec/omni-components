import { css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InputBase } from '../internal/InputBase';

/**
 * An input control that allows a user to enter a single line of numbers.
 * 
 * ```js
 * import '@capitec/omni-components/numeric-field';
 * ```
 * @example
 * 
 * ```html
 * <omni-numeric-field
 *   label="Enter a value"
 *   value="12345"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-numeric-field>
 * ``` 
 * 
 * @element omni-numeric-field
 * 
 */
@customElement('omni-numeric-field')
export class NumericField extends InputBase {

    constructor() {
        super();
        super.type = 'number';
    }

    static override get styles() {
        return [
            super.styles,
            css`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            input[type=number] {
                -moz-appearance:textfield; /* Firefox */
            }         
            `
        ];
    }

}