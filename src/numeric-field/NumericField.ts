import { css, html, LitElement, nothing, TemplateResult, } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import InputStyles from '../styles/InputStyles';
import { InputBase } from '../internal/InputBase';

/**
 * An input control that allows a user to enter a single line of numbers.
 * 
 * ```js
 * import '@capitec/omni-components/numericfield';
 * ```
 * @example
 * 
 * ```html
 * <omni-numeric-field
 *   label="Enter a value"
 *   value="Hello World"
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
                type="number"
                value="${this.value}" ?readonly="${this.disabled}" tabindex="${this.disabled ? '' : 0}"
                />
            
                ${this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : nothing}
                ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        </div>
        `;
    }

}