import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import OmniElement from './OmniElement.js';

/**
 * Base class used by components to share common properties styles and functionality
 *
 * @slot prefix - Replaces the icon for the prefix slot.
 * @slot suffix - Replaces the icon for the suffix slot.
 *
 * @csscat Base Form Variables
 * @cssprop --omni-form-container-width - Form container width.
 * @cssprop --omni-form-container-font-family - Form container font family.
 *
 * @cssprop --omni-form-field-background-color - Form layout background color.
 *
 * @cssprop --omni-form-border-top - Form border top.
 * @cssprop --omni-form-border-bottom - Form border bottom.
 * @cssprop --omni-form-border-left - Form border left.
 * @cssprop --omni-form-border-right - Form border right.
 * @cssprop --omni-form-border-width - Form border width.
 * @cssprop --omni-form-border-radius - Form border radius.
 * @cssprop --omni-form-border-color - Form border color.
 *
 * @cssprop --omni-form-label-transform-origin - Form label text align
 * @cssprop --omni-form-label-text-align - Form label text align.
 * @cssprop --omni-form-label-color - Form label color.
 * @cssprop --omni-form-label-font-size - Form label font size.
 * @cssprop --omni-form-label-font-weight - Form label font weight.
 * @cssprop --omni-form-label-left - Form label left margin.
 *
 * @cssprop --omni-form-focussed-border-width - Form focussed border width.
 * @cssprop --omni-form-focussed-border-color - Form focussed border color.
 * @cssprop --omni-form-focussed-label-color - Form focussed label color.
 *
 * @cssprop --omni-form-error-label-color - Form error label color.
 * @cssprop --omni-form-error-border-color - Form error border color.
 *
 * @cssprop --omni-form-label-disabled-color - Form label disabled color.
 * @cssprop --omni-form-disabled-border-color - Form disabled border color.
 * @cssprop --omni-form-disabled-background-color - Form disabled background color.
 * @cssprop --omni-label-disabled-focus-background-color - Form label disabled focus background color.
 *
 * @cssprop --omni-form-hint-label-font-color - Form hint label font color.
 * @cssprop --omni-form-hint-label-font-family - Form hint label font family.
 * @cssprop --omni-form-hint-label-font-size - Form hint label font size.
 * @cssprop --omni-form-hint-label-font-weight - Form hint label font weight.
 * @cssprop --omni-form-hint-label-padding-top - Form hint label top padding.
 * @cssprop --omni-form-hint-label-padding-left - Form hint label left padding.
 * @cssprop --omni-form-hint-label-border-width -
 *
 * @cssprop --omni-form-error-label-font-color - Form error label font color.
 * @cssprop --omni-form-error-label-font-family - Form error label font family.
 * @cssprop --omni-form-error-label-font-size - Form error label font size.
 * @cssprop --omni-form-error-label-font-weight - Form error label font weight.
 * @cssprop --omni-form-error-label-padding-top - Form error label top padding.
 * @cssprop --omni-form-error-label-padding-left - Form error label left padding.
 * @cssprop --omni-form-error-label-border-width
 *
 * @cssprop --omni-form-hover-color - Form hover color.
 * @cssprop --omni-form-disabled-hover-color - Form disabled hover color.
 * @cssprop --omni-form-error-hover-color - Form error hover color.
 *
 */
export class OmniFormElement extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label: string;

    /**
     * The value entered into the form.
     * @attr
     */
    @property({ reflect: true }) value: string | number = null;

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

    @query('.form-container')
    private _formContainer: HTMLElement;

    @query('.label')
    private _labelElement: HTMLElement;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('focus', this._focusGained.bind(this));
        this.addEventListener('focusout', this._focusLost.bind(this));
    }

    _focusGained() {
        if (this.disabled) {
            return;
        }

        const formParentOffset = this._formContainer.offsetLeft;

        if (!this.value && this._labelElement) {
            this._labelElement.style.transform = `translateX(${formParentOffset * -1}px)  translateY(-37.5%) scale(75%)`;
        }
    }

    _focusLost() {
        if (this.disabled) {
            return;
        }

        if (!this.value && this._labelElement) {
            this._labelElement.style.transform = '';
        }
    }

    static override get styles(): CSSResultGroup {
        return [
            css`
                ${super.styles}

                :host {
                    display: inline-flex;
                }

                /* CONTAINER STYLES */

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    justify-content: flex-start;

                    width: var(--omni-form-container-width, 100%);

                    /* added at a container level to apply to all child elements */
                    font-family: var(--omni-form-container-font-family, var(--omni-font-family));
                }

                /* LAYOUT STYLES */

                .layout {
                    position: relative;

                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    justify-content: center;
                    background-color: var(--omni-form-field-background-color, var(--omni-background-color));
                }

                .border {
                    position: absolute;
                    top: var(--omni-form-border-top, 0px);
                    bottom: var(--omni-form-border-bottom, 0px);
                    left: var(--omni-form-border-left, 0px);
                    right: var(--omni-form-border-right, 0px);

                    border-width: var(--omni-form-border-width, 1px);
                    border-radius: var(--omni-form-border-radius, 4px);
                    border-style: solid;
                    border-color: var(--omni-form-border-color, var(--omni-primary-color));
                    pointer-events: none;
                }

                /* INPUT CONTAINER STYLES */

                .form-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: var(--omni-form-container-width, 100%);
                }

                /* LABEL STYLES */

                .label {
                    position: absolute;
                    flex: 1 1 auto;
                    transform-origin: top var(--omni-form-label-transform-origin, left);

                    transition: all 150ms ease 0s;

                    line-height: 100%;

                    text-align: var(--omni-form-label-text-align, left);

                    pointer-events: none;
                    user-select: none;

                    color: var(--omni-form-label-color, var(--omni-font-color));
                    font-size: var(--omni-form-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-form-label-font-weight, var(--omni-font-weight));

                    left: var(--omni-form-label-left, 10px);
                }

                .layout > .label > span {
                    position: relative;
                }

                /* FOCUS STYLES */

                :host([value]:not([value=''])) .layout > .form-container > .label,
                :focus + .label {
                    top: 0px;
                    transform: translateY(-37.5%) scale(75%);
                    color: var(--omni-form-focussed-label-color, var(--omni-primary-color));
                }

                :host([value]) .layout > .form-container > .label::before,
                :focus + .label::before {
                    content: '';
                    background-color: var(--omni-label-focus-background-color, white);
                    position: absolute;
                    left: var(--omni-label-focus-left, -3px);
                    right: var(--omni-label-focus-right, -3px);
                    top: 50%;
                    height: 50%;
                    z-index: -1;
                }

                .layout:focus-within > .border {
                    border-style: solid;
                    border-width: var(--omni-form-focussed-border-width, 2px);
                    border-color: var(--omni-form-focussed-border-color, var(--omni-primary-color));
                }

                /* ERROR STYLES */

                .label.error {
                    color: var(--omni-form-error-label-color, var(--omni-error-font-color));
                }

                .layout.error > .border {
                    border-color: var(--omni-form-error-border-color, var(--omni-error-border-color));
                }

                /* DISABLED STYLES */

                .layout.disabled {
                    pointer-events: none;
                }

                .label.disabled {
                    /*color: var(--omni-form-label-disabled-color, var(--omni-disabled-border-color));*/
                    pointer-events: none;
                }

                .layout.disabled > .border {
                    border-color: var(--omni-form-disabled-border-color, var(--omni-disabled-border-color));
                    background-color: var(--omni-form-disabled-background-color, var(--omni-disabled-background-color));
                }

                :host([value]) .layout.disabled > .form-container > .label::before {
                    background-color: var(--omni-label-disabled-focus-background-color, var(--omni-disabled-background-color));
                }

                /* HINT LABEL STYLES */

                .hint-label {
                    color: var(--omni-form-hint-label-font-color, var(--omni-hint-font-color));
                    font-family: var(--omni-form-hint-label-font-family, var(--omni-font-family));
                    font-size: var(--omni-form-hint-label-font-size, 0.86em);
                    font-weight: var(--omni-form-hint-label-font-weight, 300);

                    padding-top: var(--omni-form-hint-label-padding-top, 2px);
                    padding-left: calc(var(--omni-form-hint-label-padding-left, 10px) + var(--omni-form-hint-label-border-width, 1px));
                }

                /* ERROR LABEL STYLES */

                .error-label {
                    color: var(--omni-form-error-label-font-color, var(--omni-error-font-color));
                    font-family: var(--omni-form-error-label-font-family, var(--omni-font-family));
                    font-size: var(--omni-form-error-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-form-error-label-font-weight, var(--omni-font-weight));

                    padding-top: var(--omni-form-error-label-padding-top, 2px);
                    padding-left: calc(var(--omni-form-error-label-padding-left, 10px) + var(--omni-form-error-label-border-width, 1px));
                }

                /* HOVER STYLES */

                .layout:hover > .border {
                    box-shadow: inset 0px 0px 0px 1px var(--omni-form-hover-color, var(--omni-primary-color));
                }

                .layout.disabled:hover > .border {
                    box-shadow: inset 0px 0px 0px 1px var(--omni-form-disabled-hover-color, var(--omni-disabled-border-color));
                }

                .layout.error:hover > .border {
                    box-shadow: inset 0px 0px 0px 1px var(--omni-form-error-hover-color, var(--omni-error-border-color));
                }

                slot[name='prefix'],
                slot[name='suffix'],
                ::slotted([slot='prefix']),
                ::slotted([slot='suffix']) {
                    display: flex;
                    align-items: center;
                }
            `
        ];
    }

    protected override render() {
        const layout: ClassInfo = {
            layout: true,
            error: this.error,
            disabled: this.disabled
        };

        return html`
            <div class="container">
                <div class=${classMap(layout)}>
                    <div class="border"></div>
                    <slot name="prefix"></slot>
                    <div class="form-container"> ${this.renderContent()} ${this.renderLabel()} </div>
                    <slot name="suffix"></slot>
                    ${this.renderControl()}
                </div>
                ${this.renderHint()} ${this.renderError()}
            </div>
        `;
    }

    protected renderContent(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderControl(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderLabel() {
        const labelClass: ClassInfo = {
            label: true,
            error: this.error,
            disabled: this.disabled
        };

        return html`${this.label ? html`<div class=${classMap(labelClass)}><span>${this.label}</span></div>` : nothing}`;
    }

    protected renderHint() {
        return html`${this.hint && !this.error ? html`<div class="hint-label">${this.hint}</div>` : nothing}`;
    }

    protected renderError() {
        return html`${this.error ? html`<div class="error-label">${this.error}</div>` : nothing} `;
    }
}
