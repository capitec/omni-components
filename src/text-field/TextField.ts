import { css, html, LitElement, nothing, TemplateResult, } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
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
    @property({ type: Boolean, reflect: true }) focussed: boolean;

    /**
     * Indicator if the component should be editable.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled: boolean;


	constructor() {
		super();
	}

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
        this.addEventListener('focus', this._focusGained.bind(this));
        this.addEventListener('focusout', this._focusLost.bind(this));
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.addEventListener('input', this._keyInput);
        this.removeEventListener('focus', this._focusGained);
        this.removeEventListener('focusout', this._focusLost);
        // this.removeEventListener('focus',);
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
	 * Handle focus lost events.
	 * 
	 * @param {FocusEvent} event - The event details.
	 * 
	 * @ignore
	 * @returns {void}
	 */
	_focusLost() {

		// Update the component focus state.
		this.focussed = false;
	}

	/**
	 * @param  {InputEvent} event keyboard event
	 * @returns {void}
	 */
     _keyInput() {

        const inputField = <HTMLInputElement>this.shadowRoot.getElementById('inputField');
        this.value = inputField.value;
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

           <label class="label${this.error ? ' error' : ''}${this.focussed === true ? ' blue' : ' idle'}" for="inputField">${this.label}</label>
           <input
			    class="field"
			    id="inputField"
			    type="text"
			    value="${this.value}" ?readonly="${this.disabled}" tabindex="${this.disabled ? '' : 0}"
                />
			
				${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : nothing}
				${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        </div>
		`;
	}

}