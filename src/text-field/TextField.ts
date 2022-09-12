import { css, html, LitElement, nothing, TemplateResult, } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import ComponentStyles from '../styles/ComponentStyles';
import InputStyles from '../styles/InputStyles';


/**
 * An input control that allows a user to enter a single line of text.
 * 
 * ```js
 * import '@capitec/omni-components/textfield';
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
 */
@customElement('omni-text-field')
export class TextField extends LitElement {

    /**
     * Text label.
	 * @attr
     */
    @property({ type: String, reflect: true }) label: string;

    /**
     * The value entered into the text-field.
     * @attr
     */
    @property({ type: String, reflect: true }) value: string;

    /**
     * Data associated with the component.
     * @attr
     */
    @property({ type: Object, reflect: true }) data: object;

    /**
     * A hint message to assist the user.
     * @attr
     */
    @property({ type: String, reflect: true }) hint: string;

    /**
     * A error message guiding a user to correct a mistake.
     * @attr
     */
    @property({ type: String, reflect: true }) error: string;

    /**
     * Indicator if the component should be focussed
     * @attr
     */
    @property({ type: Boolean, reflect: true }) focussed = false;

    /**
     * Indicator if the component should be editable.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled = false;


	constructor() {
		super();
	}

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this._focusGained.bind(this));
    }

    // --------------
	// EVENT HANDLERS
	// --------------

	/**
	 * Handle focus gained events.
	 * 
	 * @param {FocusEvent} event - The event details.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_focusGained(event: FocusEvent) {

		// Prevent the control from gaining focus when it is in a disabled state.
		if (this.disabled) {
			return event.stopImmediatePropagation();
		}

		// Update the component focus state.
		this.focussed = true;
	}

	/**
	 * @param  {KeyboardEvent} event keyboard event
	 * @returns {void}
	 */
     _keyInput(event: KeyboardEvent) {

        if(!this.focussed){
            this.focussed === true;
        }
      
        if (event.key === 'Enter') {
			// this._valueChanged();
		}
	}

    static override get styles() {

		return [
            InputStyles,
			css`



			`
		];
	}


    protected override render(): TemplateResult {
		return html`
        <div
           class="container
           ${this.value && (!this.focussed) ? ' completed' : ''}
           ${this.error ? ' error': ''}
           ${this.focussed === true ? ' focussed': ''}
           ${this.disabled === true ? ' disabled': ''}">

           <label class="label${this.focussed === true ? ' blue' : ' idle'}" for="inputField">${this.label}</label>
           <input
			    class="field"
			    id="inputField"
			    type="text"
			    .value="${this.value}" tabindex="${this.disabled ? '' : 0}"
                />
			
				${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : ''}
				${this.error ? html`<div class="error">${this.error}</div>` : ''}
        </div>
		`;
	}

    /*
    protected override render(): TemplateResult {
		return super.render();
	}
    */


}