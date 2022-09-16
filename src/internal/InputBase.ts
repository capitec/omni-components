import { css, html, LitElement, nothing, TemplateResult } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map';
import { live } from 'lit/directives/live';
import ComponentStyles from '../styles/ComponentStyles';

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
     * Indicator if the component should be focussed.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) focussed: boolean;

    /**
     * Indicator if the component should be disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /**
     * Input type.
     * @attr
     */
    @property({type: String, reflect: true}) type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'time' =  'text';

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
        this.addEventListener('focus', this._focusGained.bind(this));
        this.addEventListener('focusout', this._focusLost.bind(this));
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.addEventListener('input', this._keyInput);
        this.removeEventListener('focus', this._focusGained);
        this.removeEventListener('focusout', this._focusLost);
    }

    // --------------
    // EVENT HANDLERS
    // --------------

    /**
     * @param  {InputEvent} event keyboard event
     * @returns {void}
     */
    _keyInput() {

        const inputField = <HTMLInputElement>this.shadowRoot.getElementById('inputField');
        this.value = inputField.value;
    }

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

    static override get styles() {
        return [
            css`
                ${ComponentStyles}

                /* CONTAINER STYLES */

                .container {
                    width: 100%;
                    position: relative;
                }

                .container > .label {
                    position: absolute;
                    left: var(--omni-input-container-label-padding-left, 16px);
                    top: var(--omni-input-container-label-padding-top, 16px);
                
                    z-index: 10;
                    line-height: var(--omni-input-container-label-line-height, 0.8);
                    padding: 0px;
                
                    transition:
                        transform 150ms ease-out,
                        font-size 150ms ease-out,
                        padding 150ms ease-out;
                
                    background-color: var(--omni-input-container-label-background-color, var(--omni-background-color));
                
                    border-radius: var(--omni-input-container-label-border-radius, var(--omni-border-radius));
                
                    color: var(--omni-input-container-label-color,var(--omni-font-color));
                    font-family: var(--omni-input-container-label-font-family,var(--omni-font-family));
                    font-size: var(--omni-input-container-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-container-label-font-weight, var(--omni-font-weight));
                }

                .container > .field {
                    box-sizing: border-box;
                    outline: 0;
                    width: 100%;
                    padding: -2px;
                    transition: border 150ms ease-out;

                    background-color: var(--omni-input-field-background-color, var(--omni-background-color));

                    border-width: var(--omni-input-field-border-width, 1px);
                    border-style: solid;
                    border-color: var(--omni-input-field-border-color, #E1E1E1);
                    border-radius: var(--omni-input-field-border-radius, 4px);

                    color: var(--omni-input-field-font-color, #4E6066);
                    font-family: var(--omni-input-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-field-font-weight, var(--omni-font-weight));

                    padding-top: var(--omni-input-field-padding-top , 8px);
                    padding-bottom: var(--omni-input-field-padding-bottom, 14px);
                    padding-left: var(--omni-input-field-padding-left, 10px);
                    padding-right: var(--omni-input-field-padding-right, 10px);
                }

                .container > .hint {
                    color: var(--omni-input-container-hint-font-color, var(--omni-hint-font-color));
                    font-family: var(--omni-input-container-hint-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-container-hint-font-size, 0.86em);
                    font-weight: var(--omni-input-container-hint-font-weight, 300);

                    padding-top: 2px;
                    padding-left: calc(var(--omni-input-container-hint-padding-left, 10px) + var(--omni-input-container-hint-border-width, 1px));
                }

                .container > .error {
                    color: var(--omni-input-container-error-font-color, var(--omni-error-font-color));
                    font-family: var(--omni-input-container-error-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-container-error-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-container-error-font-weight, var(--omni-font-weight));

                    padding-top: 2px;
                    padding-left: calc(var(--omni-input-container-error-padding-left, 10px) + var(--omni-input-container-error-border-width, 1px));
                }

                .container > .label.error { 
                    color: var(--omni-input-container-label-error-color, var(--omni-error-font-color));
                    font-family: var(--omni-input-container-label-error-font-family, var(--omni-font-family));
                }

                /* HOVER STATE STYLES */

                .container > .field:hover {
                    border-color: var(--omni-input-container-field-hover-border-color, var(--omni-primary-color));
                }

                /* DISABLED STATE STYLES */

                .container.disabled > .label {
                    cursor: default;        
                    background-color: var(--omni-input-container-disabled-label-background-color, var(--omni-background-color));
                }

                .container.disabled > .field {
                    cursor: default;              
                    background-color: var(--omni-input-container-field-disabled-background-color, var(--omni-background-color));
                    border-color: var(--omni-input-container-field-disabled-border-color, #E1E1E1);               
                    color: var(--omni-input-container-field-disabled-font-color, #7C7C7C);
                }

                /* FOCUSSED STATE STYLES */

                .container.focussed > .field {
                    border-color: var(--omni-input-container-field-focussed-border-color, var(--omni-primary-color));
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-focussed-box-shadow-color, var(--omni-primary-color));
                }

                /* COMPLETED STATE STYLES */

                .container.completed > .label, 
                .container.focussed > .label,
                .container.filtered > .label {
                    /* The below transform is used to ensure Edge 41 compatibility. */
                    transform: translateX(-3px) translateY(-23px); 
                    font-size: var(--omni-input-container-label-font-size, var(--omni-font-size));
                    padding: 0px var(--omni-input-container-label-padding-sides, 4px);
                    visibility: inherit;
                }

                .container:hover {
                    border-radius: 4px;
                }

                .container.focussed > .label.error {
                    color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
                }

                .container.completed > .label.error {
                    color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
                }

                .container.focussed > .label {
                    color: var(--omni-input-label-focussed-font-color, var(--omni-primary-color));
                }

                .container.completed > .label {
                    color: var(--omni-input-label-completed-font-color, var(--omni-primary-color));
                }

                .container.completed > .field, 
                .container.focussed > .field {
                    padding-top: calc(var(--omni-input-container-field-padding-top, 8px) + 3px);
                    padding-bottom: calc(var(--omni-input-container-field-padding-bottom, 14px) - 3px);
                }

                /* ERROR STATE STYLES */

                .container.error > .field {
                    border-color: var(--omni-input-container-field-error-border-color, var(--omni-error-font-color));
                }

                .container.error.focussed > .field {
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-focussed-error-border-color,var(--omni-primary-color));
                }

                .container.error > .field:hover {
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-container-field-error-border-color,var(--omni-error-border-color));
                }

                /* DISABLED STATE STYLES */

                .container.disabled > .label {
                    cursor: default;

                    background-color: var(--omni-input-container-disabled-label-background-color, var(--omni-disabled-background-color));
                }

                .container.disabled > .field {
                    cursor: default;

                    background-color: var(--omni-input-container-field-disabled-background-color, var(--omni-disabled-background-color));
                    border-color: var(--omni-input-container-field-disabled-border-color, var(--omni-disabled-border-color));

                    color: var(--omni-input-container-field-disabled-font-color, #7C7C7C);
                }
            `
        ];
    }

    
    protected override render() {
        return html`
            <div 
                class=${classMap({
                    container: true,
                    completed: this.value && !this.focussed,
                    error: this.error,
                    focussed: this.focussed,
                    disabled: this.disabled
                })}>

                ${this.renderPrefix()}
                ${this.renderPostPrefix()}

                ${this.renderLabel()}
                ${this.renderInput()}

                ${this.renderHint()}
                ${this.renderError()}

                ${this.renderPreSuffix()}
                ${this.renderSuffix()}
            </div>
        `;
    }

    protected renderPrefix(){
        return html`
             <slot name="prefix"></slot>
        `;
    }

    protected renderPostPrefix(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderLabel() {
        return html`
            <label 
                class=${classMap({
                    label: true,
                    error: this.error,
                    focussed: this.focussed,
                    idle: !this.focussed,
                })} 
                for="inputField">
                    ${this.label}
            </label>
        `;
    }

    protected renderInput() {
        return html`
            <input
                class="field"
                id="inputField"
                type=${this.type}
                .value=${live(this.value)} 
                ?readonly=${this.disabled} 
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected renderHint() {
        return this.hint && !this.error ? html`<div class="hint">${this.hint}</div>` : nothing;
    }

    protected renderError() {
        return this.error ? html`<div class="error">${this.error}</div>` : nothing;
    }

    protected renderPreSuffix(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderSuffix(){
        return html`
            <slot name="suffix"></slot>
        `;
    }
}