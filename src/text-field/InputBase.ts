import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult, } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import InputStyles from '../styles/InputStyles';

/**
 * Base class used by input controls to share common properties styles and functionality
 * 
 * @cssprop --omni-input-label-padding-left - Component label left padding.
 * @cssprop --omni-input-label-padding-top -  Component label top padding.
 * @cssprop --omni-input-label-line-height - Component label line height.
 * @cssprop --omni-input-label-background-color - Component label background color.
 * @cssprop --omni-input-label-border-radius - Component label border radius.
 * 
 * @cssprop --omni-input-label-color - Component label color.
 * @cssprop --omni-input-label-font-family - Component font family.
 * @cssprop --omni-input-label-font-size - Component label font size.
 * @cssprop --omni-input-label-font-weight - Component label font weight.
 * 
 * @cssprop --omni-input-label-error-color - Component label color in error state.
 * @cssprop --omni-input-label-error-font-family - Component label font family in error state.
 * 
 * @cssprop --omni-input-field-background-color - Component field background color.
 * @cssprop --omni-input-field-border-width - Component field border width.
 * @cssprop --omni-input-field-border-color - Component field border color.
 * @cssprop --omni-input-field-border-radius - Component field border radius.
 * 
 * @cssprop --omni-input-field-font-color - Component field font color.
 * @cssprop --omni-input-field-font-family - Component field font family.
 * @cssprop --omni-input-field-font-size - Component field font size.
 * @cssprop --omni-input-field-font-weight - Component field font weight
 * 
 * @cssprop --omni-input-field-padding-top - Component field top padding.
 * @cssprop --omni-input-field-padding-bottom - Component field bottom padding.
 * @cssprop --omni-input-field-padding-left - Component field left padding.
 * @cssprop --omni-input-field-padding-right - Component field right padding.
 * 
 * @cssprop --omni-input-field-hover-border-color - Component field hover border color.
 * 
 * @cssprop --omni-input-disabled-label-background-color - Component disabled label color.
 * 
 * @cssprop --omni-input-disabled-background-color - Component disabled field background color.
 * @cssprop --omni-input-disabled-border-color - Component disabled field border color.
 * @cssprop --omni-input-disabled-font-color - Component disabled field color.
 * 
 * @cssprop --omni-input-field-focussed-border-color - Component focussed state border color.
 * @cssprop --omni-input-field-focussed-box-shadow-color - Component focussed state box shadow color.
 * 
 */
 @customElement('omni-input')
export class InputBase extends LitElement {

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
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * Indicator of the type of input the component should render
     * @attr
     */
    @property({type: String, reflect: true}) type: 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' |'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button' =  'text';


    /**
	 * @hideconstructor
	 */
	constructor() {
        super();
        // Register state event listeners.
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this._focusGained.bind(this));
		this.addEventListener('focusout', this._focusLost.bind(this));
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
	_focusLost(event: FocusEvent) {

		// Prevent the control from gaining focus when it is in a disabled state.
		if (this.disabled) {
			return event.stopImmediatePropagation();
		}
	}
    
    static override styles = InputStyles;


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
			    type="${this.type}"
			    .value="${this.value}" tabindex="${this.disabled ? '' : 0}"
                />
			
				${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : ''}
				${this.error ? html`<div class="error">${this.error}</div>` : ''}
        </div>
		`;
	}
}