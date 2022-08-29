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
 * @prop {"alpha-numeric"|"numeric"|"currency"|"password"|"search"|String} type - Type of input supported
 * @prop {"alpha-numeric"|"numeric"|"none"|String} keyboardMode - Keyboard mode supported
 */
@customElement('omni-text-field')
export class TextField extends LitElement {



}