import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { OmniElement } from '../core/OmniElement.js';

/**
 * Control that allows an action to be executed.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/button';
 * ```
 *
 * @example
 * ```html
 * <omni-button
 *   label="Some Action"
 *   type="primary">
 * </omni-button>
 * ```
 *
 * @element omni-button
 *
 * @slot - Content to render inside button, can be positioned using {@link slotPosition} property.
 *
 * @cssprop --omni-button-font-family - Component font family.
 * @cssprop --omni-button-font-size - Component font size.
 * @cssprop --omni-button-font-weight - Component font weight.
 * @cssprop --omni-button-line-height - Component line height.
 * @cssprop --omni-button-border-radius - Component border radius.
 * @cssprop --omni-button-padding-top - Component padding top.
 * @cssprop --omni-button-padding-bottom - Component padding bottom.
 * @cssprop --omni-button-padding-left - Component padding left.
 * @cssprop --omni-button-padding-right - Component padding right.
 *
 * @cssprop --omni-button-primary-background - Primary "type" background color.
 * @cssprop --omni-button-primary-border-color - Primary "type" border color.
 * @cssprop --omni-button-primary-border-width - Primary "type" border width.
 * @cssprop --omni-button-primary-color - Primary "type" color.
 * @cssprop --omni-button-primary-hover-background - Primary "type" hover background color.
 * @cssprop --omni-button-primary-hover-border-color - Primary "type" hover border color.
 * @cssprop --omni-button-primary-hover-border-width - Primary "type" hover border width.
 * @cssprop --omni-button-primary-hover-box-shadow - Primary "type" hover box shadow.
 * @cssprop --omni-button-primary-active-background - Primary "type" active back color.
 *
 * @cssprop --omni-button-secondary-background - Secondary "type" background color.
 * @cssprop --omni-button-secondary-border-color - Secondary "type" border color.
 * @cssprop --omni-button-secondary-border-width - Secondary "type" border width.
 * @cssprop --omni-button-secondary-color - Secondary "type" color.
 * @cssprop --omni-button-secondary-hover-background - Secondary "type" hover background color.
 * @cssprop --omni-button-secondary-hover-border-color - Secondary "type" hover border color.
 * @cssprop --omni-button-secondary-hover-border-width - Secondary "type" hover border width.
 * @cssprop --omni-button-secondary-hover-box-shadow - Secondary "type" hover box shadow.
 * @cssprop --omni-button-secondary-active-background - Secondary "type" active background color.
 *
 * @cssprop --omni-button-clear-background - Clear "type" background color.
 * @cssprop --omni-button-clear-border-color - Clear "type" border color.
 * @cssprop --omni-button-clear-border-width - Clear "type" border width.
 * @cssprop --omni-button-clear-color - Clear "type" color.
 * @cssprop --omni-button-clear-hover-background - Clear "type" hover background color.
 * @cssprop --omni-button-clear-hover-border-color - Clear "type" hover border color.
 * @cssprop --omni-button-clear-hover-border-width - Clear "type" hover border width.
 * @cssprop --omni-button-clear-hover-color - Clear "type" hover color.
 * @cssprop --omni-button-clear-active-background - Clear "type" active background color.
 * @cssprop --omni-button-clear-active-border-color - Clear "type" active border color.
 * @cssprop --omni-button-clear-active-border-width - Clear "type" active border width.
 *
 * @cssprop --omni-button-white-background - White "type" background color.
 * @cssprop --omni-button-white-border-color - White "type" border color.
 * @cssprop --omni-button-white-border-width - White "type" border width.
 * @cssprop --omni-button-white-color - White "type" color.
 * @cssprop --omni-button-white-hover-background - White "type" hover background color.
 * @cssprop --omni-button-white-hover-border-color - White "type" hover border color.
 * @cssprop --omni-button-white-hover-border-width - White "type" hover border width.
 * @cssprop --omni-button-white-hover-box-shadow - White "type" hover box shadow.
 * @cssprop --omni-button-white-active-background - White "type" active background color.
 * @cssprop --omni-button-white-active-border-color - White "type" active border color.
 * @cssprop --omni-button-white-active-border-width - White "type" active border width.
 *
 * @cssprop --omni-button-disabled-border-color - Disabled border color.
 * @cssprop --omni-button-disabled-background - Disabled background color.
 * @cssprop --omni-button-disabled-active-hover-background - Disabled hover and active background color.
 *
 * @cssprop --omni-button-slot-margin-right - Slot margin left (When positioned right of label).
 * @cssprop --omni-button-slot-margin-bottom - Slot margin bottom (When positioned top of label).
 * @cssprop --omni-button-slot-margin-left - Slot margin left (When positioned right of label).
 * @cssprop --omni-button-slot-margin-top - Slot margin top (When positioned bottom of label).
 */
@customElement('omni-button')
export class Button extends OmniElement {
    /**
     * Display type.
     * @attr
     */
    @property({ type: String, reflect: true }) type: 'primary' | 'secondary' | 'clear' | 'white' = 'secondary';

    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label?: string;

    /**
     * Position of slotted content.
     * @attr [slot-position="left"]
     */
    @property({ type: String, reflect: true, attribute: 'slot-position' }) slotPosition: 'left' | 'top' | 'right' | 'bottom' = 'left';

    /**
     * Indicator if the component is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    box-sizing: border-box;
                    display: inline-flex;
                }

                :host([disabled]),
                :host([disabled]) > * {
                    pointer-events: none;
                }

                .button {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;

                    text-align: left;

                    font-family: var(--omni-button-font-family, var(--omni-font-family));
                    font-size: var(--omni-button-font-size, var(--omni-font-size));
                    font-weight: var(--omni-button-font-weight, bolder);
                    line-height: var(--omni-button-line-height);
                    border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
                    border-style: solid;

                    padding-top: var(--omni-button-padding-top, 10px);
                    padding-bottom: var(--omni-button-padding-bottom, 10px);
                    padding-left: var(--omni-button-padding-left, 10px);
                    padding-right: var(--omni-button-padding-right, 10px);

                    cursor: pointer;

                    /* prettier-ignore */
                    transition:
                        opacity .1s ease,
                        background-color .1s ease,
                        border .1s ease,
                        color .1s ease,
                        box-shadow .1s ease,
                        background .1s ease,
                        -webkit-box-shadow .1s ease;
                }

                .button > .label {
                    cursor: pointer;
                }

                .button.disabled > .label {
                    cursor: default;
                }

                /* PRIMARY */

                .button.primary {
                    background: var(--omni-button-primary-background, var(--omni-primary-color));
                    border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                    border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                    color: var(--omni-button-primary-color, var(--omni-background-color));
                }

                .button.primary:hover {
                    background: var(--omni-button-primary-hover-background, var(--omni-primary-hover-color));
                    border-color: var(--omni-button-primary-hover-border-color, var(--omni-primary-hover-color));
                    border-width: var(--omni-button-primary-hover-border-width, var(--omni-border-width));
                    box-shadow: var(--omni-button-primary-hover-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
                }

                .button.primary:active {
                    background: var(--omni-button-primary-active-background, var(--omni-primary-active-color));
                    box-shadow: none;
                }

                /* SECONDARY */

                .button.secondary {
                    background: var(--omni-button-secondary-background, var(--omni-background-color));
                    border-color: var(--omni-button-secondary-border-color, var(--omni-primary-color));
                    border-width: var(--omni-button-secondary-border-width, var(--omni-border-width));
                    color: var(--omni-button-secondary-color, var(--omni-primary-color));
                }

                .button.secondary:hover {
                    background: var(--omni-button-secondary-hover-background, var(--omni-background-hover-color));
                    border-color: var(--omni-button-secondary-hover-border-color, var(--omni-primary-hover-color));
                    border-width: var(--omni-button-secondary-hover-border-width, var(--omni-border-width));
                    box-shadow: var(--omni-button-secondary-hover-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
                }

                .button.secondary:active {
                    background: var(--omni-button-secondary-active-background, var(--omni-background-active-color));
                    box-shadow: none;
                }

                /* CLEAR */

                .button.clear {
                    background: var(--omni-button-clear-background, transparent);
                    border-color: var(--omni-button-clear-border-color, transparent);
                    border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
                    color: var(--omni-button-clear-color, var(--omni-primary-color));
                }

                .button.clear:hover {
                    background: var(--omni-button-clear-hover-background, var(--omni-background-hover-color));
                    border-color: var(--omni-button-clear-hover-border-color, transparent);
                    border-width: var(--omni-button-clear-hover-border-width, var(--omni-border-width));
                    color: var(--omni-button-clear-hover-color, var(--omni-primary-color));
                }

                .button.clear:active {
                    background: var(--omni-button-clear-active-background, var(--omni-background-active-color));
                    border-color: var(--omni-button-clear-active-border-color, transparent);
                    border-width: var(--omni-button-clear-active-border-width, var(--omni-border-width));
                    box-shadow: none;
                    outline: none;
                }

                /* WHITE */

                .button.white {
                    background: var(--omni-button-white-background, white);
                    border-color: var(--omni-button-white-border-color, white);
                    border-width: var(--omni-button-white-border-width, var(--omni-border-width));
                    color: var(--omni-button-white-color, var(--omni-primary-color));
                }

                .button.white:hover {
                    background: var(--omni-button-white-hover-background, white);
                    border-color: var(--omni-button-white-hover-border-color, white);
                    border-width: var(--omni-button-white-hover-border-width, var(--omni-border-width));
                    box-shadow: var(--omni-button-white-hover-box-shadow, 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15));
                }

                .button.white:active {
                    background: var(--omni-button-white-active-background, var(--omni-background-active-color));
                    border-color: var(--omni-button-white-active-border-color, transparent);
                    border-width: var(--omni-button-white-active-border-width, var(--omni-border-width));
                    box-shadow: none;
                    outline: none;
                }

                /* DISABLED */

                .button.disabled {
                    cursor: default;
                    border-color: var(--omni-button-disabled-border-color, var(--omni-disabled-border-color));
                    background: var(--omni-button-disabled-background, var(--omni-disabled-background-color));
                }

                .button.disabled:hover,
                .button.disabled:active {
                    box-shadow: none;
                    background: var(--omni-button-disabled-active-hover-background, var(--omni-disabled-background-color));
                }

                .button.disabled:focus {
                    outline: 0;
                }

                .button:focus {
                    outline: none;
                }

                /**
                 * Disable the hover state on touch enabled devices, e.g. mobile phones.
                 * On these devices hover acts like focus instead which keeps the button looking like it is in a pressed state.
                 * Learn more here: https://webdevpuneet.com/how-to-remove-hover-on-touch-devices.
                 */
                @media (hover: none) {
                    .button.clear:hover:not(.disabled) {
                        background: var(--omni-button-clear-hover-background, unset);
                    }

                    .button.primary:hover,
                    .button.secondary:hover,
                    .button.clear:hover,
                    .button.white:hover {
                        box-shadow: unset;
                    }
                }

                /* SLOT POSITION */

                .button.slot-left {
                    flex-direction: row;
                    text-align: left;
                }

                .button.slot-right {
                    flex-direction: row-reverse;
                    text-align: left;
                }

                .button.slot-top {
                    flex-direction: column;
                    text-align: center;
                }

                .button.slot-bottom {
                    flex-direction: column-reverse;
                    text-align: center;
                }

                /* SLOT MARGINS */

                .button.slot-left > ::slotted(*) {
                    margin-right: var(--omni-button-slot-margin-right, 10px);
                }

                .button.slot-top > ::slotted(*) {
                    margin-bottom: var(--omni-button-slot-margin-bottom, 10px);
                }

                .button.slot-right > ::slotted(*) {
                    margin-left: var(--omni-button-slot-margin-left, 10px);
                }

                .button.slot-bottom > ::slotted(*) {
                    margin-top: var(--omni-button-slot-margin-top, 10px);
                }
            `
        ];
    }

    protected override render(): TemplateResult {
        return html`
            <button
                id="button"
                class=${classMap({
                    button: true,
                    [`slot-${this.slotPosition}`]: this.label ? this.slotPosition : false,
                    [`${this.type}`]: this.type,
                    disabled: this.disabled ?? false
                })}
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? 'true' : 'false'}
                tabindex=${this.disabled ? '-1' : '0'}>
                <slot></slot>
                ${this.label ? html`<label id="label" class="label">${this.label}</label>` : nothing}
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-button': Button;
    }
}
