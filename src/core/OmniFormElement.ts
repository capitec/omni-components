import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
export { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import OmniElement from './OmniElement.js';

/**
 * Base class used by form components to share common properties, styles and functionality.
 *
 * @slot prefix - Replaces the icon for the prefix slot.
 * @slot suffix - Replaces the icon for the suffix slot.
 *
 * @csscat Base Form Variables
 *
 * @cssprop --omni-container-font-family -  Container font family.
 * @cssprop --omni-container-width - Container width.
 * @cssprop --omni-container-height - Container height.
 *
 * @cssprop --omni-form-layout-border-radius - Layout border radius.
 * @cssprop --omni-form-layout-background-color - Layout background color.
 * @cssprop --omni-form-layout-height - Layout height.
 * @cssprop --omni-form-layout-width - Layout width.
 *
 * @cssprop --omni-form-border-top - Form border top.
 * @cssprop --omni-form-border-bottom - Form border bottom.
 * @cssprop --omni-form-border-left - Form border left.
 * @cssprop --omni-form-border-right - Form border right.
 * @cssprop --omni-form-border-width - Form border width.
 * @cssprop --omni-form-border-radius - Form border radius.
 * @cssprop --omni-form-border-style - Form border style.
 * @cssprop --omni-form-border-color - Form border color.
 *
 * @cssprop --omni-form-label-transform-origin - Form label text align.
 * @cssprop --omni-form-label-margin-left - Form label margin left.
 * @cssprop --omni-form-label-text-align - Form label text align.
 * @cssprop --omni-form-label-color - Form label color.
 * @cssprop --omni-form-label-font-size - Form label font size.
 * @cssprop --omni-form-label-font-weight - Form label font weight.
 * @cssprop --omni-form-label-z-index - Form label z-index.
 *
 * @cssprop --omni-form-focussed-border-width - Form focussed border width.
 * @cssprop --omni-form-focussed-border-color - Form focussed border color.
 * @cssprop --omni-form-focussed-label-transform-scale - Form focussed label transform scale.
 * @cssprop --omni-form-focussed-label-top - Form focussed label top.
 * @cssprop --omni-form-focussed-label-margin-left - Form focussed label left margin.
 * @cssprop --omni-form-focussed-label-color - Form focussed label color.
 * @cssprop --omni-form-focussed-error-label-color - Form focussed error label color.
 *
 * @cssprop --omni-form-focussed-label-background-color - Form focussed label background color.
 * @cssprop --omni-form-focussed-label-left - Form focussed label left.
 * @cssprop --omni-form-focussed-label-right - Form focussed label right.
 *
 * @cssprop --omni-form-error-label-color - Form error label color.
 * @cssprop --omni-form-error-border-color - Form error border color.
 *
 * @cssprop --omni-form-label-disabled-color - Form label disabled color.
 * @cssprop --omni-form-disabled-border-color - Form disabled border color.
 * @cssprop --omni-form-disabled-background-color - Form disabled background color.
 * @cssprop --omni-form-disabled-focussed-label-background-color - Form disabled label focussed background color.
 *
 * @cssprop --omni-form-hint-label-font-color - Form hint label font color.
 * @cssprop --omni-form-hint-label-font-family - Form hint label font family.
 * @cssprop --omni-form-hint-label-font-size - Form hint label font size.
 * @cssprop --omni-form-hint-label-font-weight - Form hint label font weight.
 * @cssprop --omni-form-hint-label-padding-top - Form hint label top padding.
 * @cssprop --omni-form-hint-label-padding-left - Form hint label left padding.
 * @cssprop --omni-form-hint-label-border-width - Form hint label border width.
 *
 * @cssprop --omni-form-error-label-font-color - Form error label font color.
 * @cssprop --omni-form-error-label-font-family - Form error label font family.
 * @cssprop --omni-form-error-label-font-size - Form error label font size.
 * @cssprop --omni-form-error-label-font-weight - Form error label font weight.
 * @cssprop --omni-form-error-label-padding-top - Form error label top padding.
 * @cssprop --omni-form-error-label-padding-left - Form error label left padding.
 * @cssprop --omni-form-error-label-border-width - Form error label border width.
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
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Value entered into the form component.
     * @attr
     */
    @property({ reflect: true }) value?: string | number | Record<string, unknown> = null as unknown as string;

    /**
     * Data associated with the component.
     * @attr
     */
    @property({ type: Object, reflect: true }) data?: object;

    /**
     * Hint message to assist the user.
     * @attr
     */
    @property({ type: String, reflect: true }) hint?: string;

    /**
     * Error message guiding a user to correct a mistake.
     * @attr
     */
    @property({ type: String, reflect: true }) error?: string;

    /**
     * Indicator if the component should be disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    static override get styles(): CSSResultGroup {
        return [
            css`
                ${super.styles}

                :host {
                    display: flex;       
                }

                :host([disabled]),
                :host([disabled]) > * {
                    pointer-events: none;
                }

                /* CONTAINER STYLES */

                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    justify-content: flex-start;

                    /* added at a container level to apply to all child elements */
                    font-family: var(--omni-container-font-family, var(--omni-font-family));
                    width: var(--omni-container-width, 100%);
                    height: var(--omni-container-height, 100%);
                }

                /* LAYOUT STYLES */

                .layout {
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;

                    border-radius: var(--omni-form-layout-border-radius, 4px);
                    background-color: var(--omni-form-layout-background-color, var(--omni-background-color));
                    height: var(--omni-form-layout-height, 100%);
                    width: var(--omni-form-layout-width, 100%);
                }

                .border {
                    position: absolute;
                    top: var(--omni-form-border-top, 0px);
                    bottom: var(--omni-form-border-bottom, 0px);
                    left: var(--omni-form-border-left, 0px);
                    right: var(--omni-form-border-right, 0px);

                    border-width: var(--omni-form-border-width, 1px);
                    border-radius: var(--omni-form-border-radius, 4px);
                    border-style: var(--omni-form-border-style, solid);
                    border-color: var(--omni-form-border-color, var(--omni-primary-color));
                    pointer-events: none;
                }

                /* LABEL STYLES */

                .label {
                    position: absolute;
                    transform-origin: top var(--omni-form-label-transform-origin, left);
                    transition: all 150ms ease 0s;
                    pointer-events: none;
                    user-select: none;
                    line-height: 100%;

                    /* Used to position the label in the middle of the y-axis*/
                    top:50%;
                    transform: translateY(-50%);

                    margin-left: var(--omni-form-label-margin-left, 10px);          
                    text-align: var(--omni-form-label-text-align, left);

                    color: var(--omni-form-label-color, var(--omni-font-color));
                    font-size: var(--omni-form-label-font-size, var(--omni-font-size));
                    font-weight: var(--omni-form-label-font-weight, var(--omni-font-weight));

                    z-index: var(--omni-form-label-z-index, 410);
                }

                .layout > .label > span {
                    position: relative;
                }

                /* FOCUS STYLES */

                .layout:focus-within > .border {
                    border-style: solid;
                    border-width: var(--omni-form-focussed-border-width, 2px);
                    border-color: var(--omni-form-focussed-border-color, var(--omni-primary-color));
                }

                :host([value]:not([value=''])) .layout  > .label,
                .layout:focus-within > .label
                {
                    top: var(--omni-form-focussed-label-top, 0px);
                    margin-left: var(--omni-form-focussed-label-margin-left, 10px);
                }

                .layout:focus-within > .label {
                    color: var(--omni-form-focussed-label-color, var(--omni-primary-color));
                }

                :host([value]:not([value=''])) .layout  > .label.error,
                .layout:focus-within > .label.error {
                    color: var(--omni-form-focussed-error-label-color, var(--omni-error-font-color));
                }
            
                :host([value]:not([value=''])) .layout  > .label::before,
                .layout:focus-within > .label::before 
                {
                    content: "";
					display: block;
                    transform: scale(var(--omni-form-focussed-label-transform-scale), 0.90);
					background-color: var(--omni-form-focussed-label-background-color, var(--omni-background-color));
					position: absolute;
					left: var(--omni-form-focussed-label-left,-3px);
					right: var(--omni-form-focussed-label-right,-3px);
    				height: 50%;
					z-index: -1;
                    top:50%;
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
                    background-color: var(--omni-form-disabled-background-color, var(--omni-disabled-background-color));
                }

                .label.disabled {
                    color: var(--omni-form-label-disabled-color, var(--omni-font-color));
                    pointer-events: none;
                }

                .layout.disabled > .border {
                    border-color: var(--omni-form-disabled-border-color, var(--omni-disabled-border-color));
                }

                :host([value]) .layout.disabled  > .label::before {
                    background-color: var(--omni-form-disabled-focussed-label-background-color, var(--omni-disabled-background-color));
                    height: 0%;
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

                .layout:focus-within:hover > .border,
                .layout.error:focus-within:hover > .border,
                .layout.disabled:focus-within:hover > .border {
                    box-shadow: none;
                }

                .layout:hover > .border {
                    border-color: var(--omni-form-hover-color, var(--omni-primary-color));
                }

                .layout.disabled:hover > .border {
                    border-color: var(--omni-form-disabled-hover-color, var(--omni-disabled-border-color));
                }

                .layout.error:hover > .border {
                    border-color: var(--omni-form-error-hover-color, var(--omni-error-border-color));
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
            error: this.error ?? false,
            disabled: this.disabled
        };

        return html`
            <div class="container">
                <div class=${classMap(layout)}>
                    <div class="border"></div>
                    <slot name="prefix">${this.renderPrefix()}</slot>
                    ${this.renderLabel()} 
                    ${this.renderContent()} 
                    <slot name="suffix"></slot>
                    ${this.renderControl()} ${this.renderPicker()}
                </div>
                ${this.renderHint()} ${this.renderError()}
            </div>
        `;
    }

    protected renderPrefix(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderContent(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderLabel() {
        const labelClass: ClassInfo = {
            label: true,
            error: this.error ?? false,
            disabled: this.disabled
        };

        return html`${this.label ? html`<div class=${classMap(labelClass)}><span>${this.label}</span></div>` : nothing}`;
    }

    protected renderControl(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderPicker(): typeof nothing | TemplateResult {
        return nothing;
    }

    protected renderHint() {
        return html`${this.hint && !this.error ? html`<div class="hint-label">${this.hint}</div>` : nothing}`;
    }

    protected renderError() {
        return html`${this.error ? html`<div class="error-label">${this.error}</div>` : nothing} `;
    }
}
