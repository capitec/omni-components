import { css, html, nothing, TemplateResult, } from 'lit';
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

    // static override get styles() {
    //     return [
    //         super.styles,
    //         css``
    //     ];
    // }

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