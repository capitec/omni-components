import { css, CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { property, state, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map';
import { live } from 'lit/directives/live';
import ComponentStyles from '../styles/ComponentStyles';

/**
 * Base class used by input controls to share common properties styles and functionality
 * 
 * @slot prefix - Replaces the icon for the prefix slot.
 * @slot suffix - Replaces the icon for the suffix slot.
 * 
 * @csscat Base Input Variables
 * @cssprop --omni-input-container-font-family - Input container font family.
 * @cssprop --omni-input-container-width - Input container width.
 * 
 * @cssprop --omni-input-border-top - Input border top.
 * @cssprop --omni-input-border-bottom - Input border bottom.
 * @cssprop --omni-input-border-left - Input border left.
 * @cssprop --omni-input-border-right - Input border right.
 * @cssprop --omni-input-border-width - Input border width.
 * @cssprop --omni-input-border-radius - Input border radius.
 * @cssprop --omni-input-border-color - Input border color.
 * @cssprop --omni-input-background-color - Input background color.
 * 
 * @cssprop --omni-input-label-text-align - Input label text align.
 * @cssprop --omni-input-label-color - Input label color.
 * @cssprop --omni-input-label-font-size - Input label font size.
 * @cssprop --omni-input-label-font-weight - Input label font weight.
 * @cssprop --omni-input-label-left - Input label left margin.
 * 
 * @cssprop --omni-input-field-text-align - Input field text align.
 * @cssprop --omni-input-field-font-color - Input field font color.
 * @cssprop --omni-input-field-font-family - Input field font family.
 * @cssprop --omni-input-field-font-size - Input field font size.
 * @cssprop --omni-input-field-font-weight - Input field font weight.
 * @cssprop --omni-input-field-height - Input field height.
 * @cssprop --omni-input-field-padding - Input field padding.
 * 
 * @cssprop --omni-input-focussed-border-width - Input focussed border width.
 * @cssprop --omni-input-focussed-border-color - Input focussed border color.
 * 
 * @cssprop --omni-input-error-label-color - Input error label color.
 * @cssprop --omni-input-error-border-color - Input error border color.
 * 
 * @cssprop --omni-input-label-disabled-color - Input label disabled color.
 * @cssprop --omni-input-disabled-border-color - Input disabled border color.
 * @cssprop --omni-input-disabled-background-color - Input disabled background color.
 * 
 * @cssprop --omni-input-hint-label-font-color - Input hint label font color.
 * @cssprop --omni-input-hint-label-font-family - Input hint label font family.
 * @cssprop --omni-input-hint-label-font-size - Input hint label font size.
 * @cssprop --omni-input-hint-label-font-weight - Input hint label font weight.
 * @cssprop --omni-input-hint-label-padding-top - Input hint label top padding.
 * @cssprop --omni-input-hint-label-padding-left - Input hint label left padding.
 * @cssprop --omni-input-hint-label-border-width - 
 * 
 * @cssprop --omni-input-error-label-font-color - Input error label font color.
 * @cssprop --omni-input-error-label-font-family - Input error label font family.
 * @cssprop --omni-input-error-label-font-size - Input error label font size.
 * @cssprop --omni-input-error-label-font-weight - Input error label font weight.
 * @cssprop --omni-input-error-label-padding-top - Input error label top padding.
 * @cssprop --omni-input-error-label-padding-left - Input error label left padding.
 * @cssprop --omni-input-error-label-border-width
 * 
 * @cssprop --omni-input-hover-color - Input hover color.
 * @cssprop --omni-input-disabled-hover-color - Input disabled hover color.
 * @cssprop --omni-input-error-hover-color - Input error hover color.
 * 
 * @cssprop --omni-input-slot-height - Input field slot height. 
 * @cssprop --omni-input-slot-width - Input field slot width.
 * @cssprop --omni-input-slot-color - Input field slot color.
 * 
 */
export class InputBase extends LitElement {

    /**
     * @ignore
     */
    @state() protected type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'time' = 'text';

    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label: string;

    /**
     * The value entered into the text-field.
     * @attr
     */
    @property({ reflect: true }) value: string = null;

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
     * Indicator if the component should be disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    @query('#inputField')
    private _inputElement: HTMLInputElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this));
        this.addEventListener('focus', this._focusGained.bind(this));
        this.addEventListener('focusout', this._focusLost.bind(this));
    }


    _keyInput() {
        const input = this._inputElement;
        this.value = input.value;
    }

    _focusGained() {

        if(this.disabled) {
            return;
        }

        if(this._inputElement){
            const inputParentOffset = this._inputElement.parentElement.offsetLeft;

            if(!this.value) {
                this._inputElement.parentElement.querySelector('div').style.transform = `translateX(${inputParentOffset * -1}px)  translateY(-37.5%) scale(75%)`;
            }     
        }
    }

    _focusLost() {
        
        if(this.disabled) {
            return;
        }

        if(!this.value) {
            this._inputElement.parentElement.querySelector('div').style.transform = '';
        }
     
    }


    static override get styles(): CSSResultGroup {
        return [
            css`
                ${ComponentStyles}

                :host {
                    display: inline-flex;
                }

                /* CONTAINER STYLES */

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    justify-content: flex-start;

                    width: var(--omni-input-container-width, 100%);

                    /* added at a container level to apply to all child elements */
                    font-family: var(--omni-input-container-font-family, var(--omni-font-family));
                }   

                /* TOUCH ZONE STYLES */

                .touch-zone {
                    position: relative;

                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    justify-content: center;                 
                }

                .border {
                    position: absolute;
					top: var(--omni-input-border-top, 0px);
					bottom: var(--omni-input-border-bottom, 0px);
					left: var(--omni-input-border-left, 0px);
					right: var(--omni-input-border-right, 0px);

                    border-width: var(--omni-input-border-width, 1px);
                    border-radius: var(--omni-input-border-radius, 4px);
                    border-style: solid;
                    border-color: var(--omni-input-border-color, var(--omni-primary-color));
                    background-color: var(--omni-input-field-background-color, var(--omni-background-color));
                }

                /* INPUT CONTAINER STYLES */

                .input-container {
                    position: relative; 
                    display: flex; 
                    align-items: center;
                    width: var(--omni-input-container-width, 100%);
                } 
                

                /* LABEL STYLES */

                .label {
                    z-index: 10;
                    position: absolute;
                    flex: 1 1 auto;
					transform-origin: top var(--omni-input-label-text-align, left);
                    
                    transition: all 150ms ease 0s;

                    line-height: 100%;

                    text-align: var(--omni-input-label-text-align, left);

                    pointer-events: none;
					user-select: none;


                    color: var(--omni-input-label-color, var(--omni-font-color));
                    font-size: var(--omni-input-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-label-font-weight, var(--omni-font-weight));

                    left: var(--omni-input-label-left, 10px);

                }

                /* INPUT FIELD STYLES */
                
                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-input-field-text-align, left);

                    color: var(--omni-input-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-input-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-field-font-weight, var(--omni-font-weight));
                    height: var(--omni-input-field-height, 100%);
                    padding: var(--omni-input-field-padding, 10px);
                }

                .touch-zone > .label > span {
					position: relative;
				}

                /* FOCUS STYLES */

                :host([value]:not([value=''])) .touch-zone > .input-container > .label,         
				.field:focus + .label {
					top: 0px;
					transform: translateY(-37.5%) scale(75%);
				}

                :host([value]) .touch-zone > .input-container > .label::before,
                .field:focus + .label::before {
                    content: "";
					height: 100%;
					background-color: var(--omni-label-focus-background-color, white);
					position: absolute;
					left: var(--omni-label-focus-left, -3px);
					right: var(--omni-label-focus-right, -3px);
					top: 50%;
    				height: 50%;
					z-index: -1;
				}

                .touch-zone:focus-within > .border {
                    border-style: solid;
                    border-width: var(--omni-input-focussed-border-width, 2px);
                    border-color: var(--omni-input-focussed-border-color, var(--omni-primary-color));
				}
                
                /* ERROR STYLES */

                .label.error {
                    color: var(--omni-input-error-label-color, var(--omni-error-font-color));
                }

                .touch-zone.error > .border {
                    border-color: var(--omni-input-error-border-color, var(--omni-error-border-color));
                }

                /* DISABLED STYLES */

                .touch-zone.disabled {
                    pointer-events: none;
                }

                .label.disabled {
                    color: var(--omni-input-label-disabled-color, var(--omni-disabled-border-color));
                    pointer-events: none;
                }

                .touch-zone.disabled > .border {
                    border-color: var(--omni-input-disabled-border-color, var(--omni-disabled-border-color));
                    background-color: var(--omni-input-disabled-background-color, var(--omni-disabled-background-color));
                }

            
                /* HINT LABEL STYLES */

                .hint-label {
                    color: var(--omni-input-hint-label-font-color, var(--omni-hint-font-color));
                    font-family: var(--omni-input-hint-label-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-hint-label-font-size, 0.86em);
                    font-weight: var(--omni-input-hint-label-font-weight, 300);

                    padding-top: var(--omni-input-hint-label-padding-top, 2px);
                    padding-left: calc(var(--omni-input-hint-label-padding-left, 10px) + var(--omni-input-hint-label-border-width, 1px));
                }

                /* ERROR LABEL STYLES */

                .error-label {
                    color: var(--omni-input-error-label-font-color, var(--omni-error-font-color));
                    font-family: var(--omni-input-error-label-font-family, var(--omni-font-family));
                    font-size: var(--omni-input-error-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-input-error-label-font-weight, var(--omni-font-weight));

                    padding-top: var(--omni-input-error-label-padding-top, 2px);
                    padding-left: calc(var(--omni-input-error-label-padding-left, 10px) + var(--omni-input-error-label-border-width, 1px));
                }

               /* HOVER STYLES */

               .touch-zone:hover > .border {
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-hover-color, var(--omni-primary-color));
                }

               .touch-zone.disabled:hover > .border {
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-disabled-hover-color,var(--omni-disabled-border-color));
                }

                .touch-zone.error:hover > .border {
                    box-shadow:inset 0px 0px 0px 1px var(--omni-input-error-hover-color,var(--omni-error-border-color));
                }

                /* SLOT STYLES */
                .prefix,
                .suffix,
                .pre-suffix,
                .post-prefix {
                    z-index: 10;
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: default;
                }

                ::slotted([slot=prefix]),::slotted([slot=suffix]) {
                    align-items: center;
                    height: var(--omni-input-slot-height,24px);
                    min-width: var(--omni-input-slot-width,24px);
                    fill: var(--omni-input-slot-color, var(--omni-primary-color));
                }
                                
            `
        ];
    }

    protected override render() {
        return html`
        <div class="container">
            ${this.renderTouchZone()}
        </div>
    `;
    }

    protected renderTouchZone() {
        const touchZone: ClassInfo = {
            'touch-zone': true,
            error: this.error,
            disabled: this.disabled
        };

        return html`
            <label class=${classMap(touchZone)}>
                ${this.renderBorder()}
                <span class="prefix">${this.renderPrefix()}</span>
                <span class="post-prefix">${this.renderPostPrefix()}</span>                
                ${this.renderInputContainer()}
                <span class="pre-suffix">${this.renderPreSuffix()}</span>
                <span class="suffix">${this.renderSuffix()}</span>
            </label>
            ${this.renderHint()}
            ${this.renderError()}
        `;
    }

    protected renderBorder() {
        return html`
        <div class="border"></div>
        `;
    }

    protected renderPrefix() {
        return html`
            <slot name="prefix"></slot>
        `;
    }

    protected renderPostPrefix(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderInputContainer() {
        return html`
            <div class="input-container">
                ${this.renderInput()}
                ${this.renderLabel()}
            </div>
        `;
    }

    protected renderInput() {
        return html`
            <input
                class="field"
                id="inputField"
                type=${this.type}
                .value=${live(this.value)}
                ?readOnly=${this.disabled}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected renderLabel() {
        const labelClass: ClassInfo = {
            label: true,
            error: this.error,
            disabled: this.disabled
        };
        return html`${this.label ? html`<div class=${classMap(labelClass)}><span>${this.label}</span></div>` : nothing}`;
    }

    protected renderPreSuffix(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderSuffix() {
        return html`     
            <slot name="suffix"></slot>
        `;
    }

    protected renderHint() {
        return this.hint && !this.error ? html`<div class="hint-label">${this.hint}</div>` : nothing;
    }

    protected renderError() {
        return this.error ? html`<div class="error-label">${this.error}</div>` : nothing;
    }
}