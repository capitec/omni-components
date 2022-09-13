import { css, html, LitElement, nothing, TemplateResult, } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';
import { InputBase } from '../text-field/InputBase';


/**
 * An input control that allows a user to enter a single line of text.
 * 
 * ```js
 * import '@capitec/omni-components/datepicker';
 * ```
 * @example
 * 
 * ```html
 * <omni-date-picker
 *   label="Enter a date"
 *   value="Hello World"
 *   hint="Fill in a valid date"
 *   error="Invalid date provided"
 *   disabled>
 * </omni-date-picker>
 * ``` 
 * 
 */

@customElement('omni-date-picker')
export class DatePicker extends InputBase {

    /**
     * Text label.
	 * @attr
     */
    @property({ type: String, reflect: true }) override label: string;

    /**
     * The value entered into the text-field.
     * @attr
     */
    @property({ type: String, reflect: true }) override value: string;

    /**
     * A hint message to assist the user.
     * @attr
     */
    @property({ type: String, reflect: true }) override hint: string;

    /**
     * A error message guiding a user to correct a mistake.
     * @attr
     */
    @property({ type: String, reflect: true }) override error: string;

    /**
     * Indicator if the component should be focussed
     * @attr
     */
    @property({ type: Boolean, reflect: true }) override focussed = false;

    /**
     * Indicator if the component should be editable.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) override disabled = false;


    constructor() {
		super();
	}

    override focus() {
		this.focussed = !this.focussed;
	}

    protected override render(): TemplateResult {
		return html`
            <omni-input
                label="${this.label}"
                value="${this.value}"
                type="date"
                ?disabled="${this.disabled}"
                ?focussed="${this.focussed}"
                error="${this.error}"
                hint="${this.hint}"
                @click="${() => this.focus()}"
            ></omni-input>
		`;
	}

}