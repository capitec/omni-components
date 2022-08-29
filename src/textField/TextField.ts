import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';



/**
 * An input control that allows a user to enter a single line of text.
 * 
 * ```js
 * import 'platform/components/inputs/TextField';
 * ```
 * 
 * ```html
 * <omni-text-field
 *   label="Enter a value"
 *   value="Hello World"
 *   data="{'id': 12345, 'name': 'Test'}"
 *   keyboardMode="alpha-numeric"
 *   type="alpha-numeric"
 *   hint="Required"
 *   error="Field level error message"
 * 	 minlength=0
 * 	 maxlength=20
 * 	 min=1
 * 	 max=10
 *   disabled>
 * </omni-text-field>
 * ```
 * 
 * @property {string} [label] - Text field label.
 * @property {string} [value] - The value entered into the text-field.
 * @property {object} [data] - Data associated with the component.
 * @property {string} [hint] - A hint message to assist the user.
 * @property {string} [error] - A error message guiding a user to correct a mistake.
 * @property {boolean} [focussed=false] - Indicator if the component should be focussed.
 * @property {boolean} [disabled=false] - Indicator if the component should be editable.
 * @property {number} [minlength=0] - Value of the minlength attribute on the input
 * @property {number} [maxlength=0] - Value of the maxlength attribute on the input
 * @property {number} [min=0] - The minimum allowed value. Note should only be used when type is set to `numeric` or `currency` or `numeric-input`.
 * @property {number} [max=0] - The maximum allowed value. Note should only be used when type is set to `numeric` or `currency` or `numeric-input`.
 * @property {"alpha-numeric"|"numeric"|"currency"|"password"|"search"|String} type - Type of input supported
 */
@customElement('omni-text-field')
export class TextField extends LitElement {

    @property({ type: String, reflect: true}) label?: string;
    @property({ type: String, reflect: true}) value?: string;
    @property({ type: Object, reflect: true}) data?: object;
    @property({ type: String, reflect: true}) hint?: string;


}