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
 * @cssprop --omni-button-primary-background-color - Primary "type" background color.
 * @cssprop --omni-button-primary-border-color - Primary "type" border color.
 * @cssprop --omni-button-primary-border-width - Primary "type" border width.
 * @cssprop --omni-button-primary-color - Primary "type" color.
 * @cssprop --omni-button-primary-active-background-color - Primary "type" active back color.
 * @cssprop --omni-button-secondary-background-color - Secondary "type" background color.
 * @cssprop --omni-button-secondary-border-color - Secondary "type" border color.
 * @cssprop --omni-button-secondary-border-width - Secondary "type" border width.
 * @cssprop --omni-button-secondary-color - Secondary "type" color.
 * @cssprop --omni-button-secondary-active-background-color - Secondary "type" active background color.
 * @cssprop --omni-button-clear-background-color - Clear "type" background color.
 * @cssprop --omni-button-clear-border-color - Clear "type" border color.
 * @cssprop --omni-button-clear-border-width - Clear "type" border width.
 * @cssprop --omni-button-clear-color - Clear "type" color.
 * @cssprop --omni-button-clear-hover-background-color - Clear "type" hover background color.
 * @cssprop --omni-button-clear-active-background-color - Clear "type" active background color.
 * @cssprop --omni-button-clear-active-border-color - Clear "type" active border color.
 * @cssprop --omni-button-clear-active-border-width - Clear "type" active border width.
 * @cssprop --omni-button-white-background-color - White "type" background color.
 * @cssprop --omni-button-white-border-color - White "type" border color.
 * @cssprop --omni-button-white-border-width - White "type" border width.
 * @cssprop --omni-button-white-color - White "type" color.
 * @cssprop --omni-button-white-hover-background-color - White "type" hover background color.
 * @cssprop --omni-button-white-active-background-color - White "type" active background color.
 * @cssprop --omni-button-white-active-border-color - White "type" active border color.
 * @cssprop --omni-button-white-active-border-width - White "type" active border width.
 * @cssprop --omni-button-disabled-border-color - Disabled border color.
 * @cssprop --omni-button-disabled-background-color - Disabled background color.
 * @cssprop --omni-button-disabled-active-hover-background-color - Disabled active background color.
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
    @property({ type: String, reflect: true }) label: string;

    /**
     * Position of slotted content.
     * @attr [slot-position="left"]
     */
    @property({ type: String, reflect: true, attribute: 'slot-position' }) slotPosition: 'left' | 'top' | 'right' | 'bottom' = 'left';

    /**
     * Indicator if the component is disabled.
     * @attr
     */
    @property({ type: Boolean, reflect: true }) disabled: boolean;

    static override get styles() {
        return [
            super.styles,
            css`
                :host {
                    box-sizing: border-box;
                    display: inline-flex;
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

                /* primary */

                .button.primary {
                    background-color: var(--omni-button-primary-background-color, var(--omni-primary-color));
                    border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                    border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                    color: var(--omni-button-primary-color, var(--omni-background-color));
                }

                .button.primary:hover {
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
                }

                .button.primary:active {
                    background-color: var(--omni-button-primary-active-background-color, var(--omni-primary-active-color));
                    box-shadow: none;
                }

                /* secondary */

                .button.secondary {
                    background-color: var(--omni-button-secondary-background-color, var(--omni-background-color));
                    border-color: var(--omni-button-secondary-border-color, var(--omni-primary-color));
                    border-width: var(--omni-button-secondary-border-width, var(--omni-border-width));
                    color: var(--omni-button-secondary-color, var(--omni-primary-color));
                }

                .button.secondary:hover {
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
                }

                .button.secondary:active {
                    background-color: var(--omni-button-secondary-active-background-color, var(--omni-background-active-color));
                    box-shadow: none;
                }

                /* clear */

                .button.clear {
                    background-color: var(--omni-button-clear-background-color, transparent);
                    border-color: var(--omni-button-clear-border-color, transparent);
                    border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
                    color: var(--omni-button-clear-color, var(--omni-primary-color));
                }

                .button.clear:hover {
                    background-color: var(--omni-button-clear-hover-background-color, var(--omni-background-hover-color));
                }

                .button.clear:active {
                    background-color: var(--omni-button-clear-active-background-color, var(--omni-background-active-color));
                    box-shadow: none;
                    border-color: var(--omni-button-clear-active-border-color, transparent);
                    border-width: var(--omni-button-clear-active-border-width, var(--omni-border-width));
                    outline: none;
                }

                /* white */

                .button.white {
                    background-color: var(--omni-button-white-background-color, white);
                    border-color: var(--omni-button-white-border-color, white);
                    border-width: var(--omni-button-white-border-width, var(--omni-border-width));
                    color: var(--omni-button-white-color, var(--omni-primary-color));
                }

                .button.white:hover {
                    background-color: var(--omni-button-white-hover-background-color, white);
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15);
                }

                .button.white:active {
                    background-color: var(--omni-button-white-active-background-color, var(--omni-background-active-color));
                    box-shadow: none;
                    border-color: var(--omni-button-white-active-border-color, transparent);
                    border-width: var(--omni-button-white-active-border-width, var(--omni-border-width));
                    outline: none;
                }

                /* disabled */

                .button.disabled {
                    cursor: default;
                    border-color: var(--omni-button-disabled-border-color, var(--omni-disabled-border-color));
                    background-color: var(--omni-button-disabled-background-color, var(--omni-disabled-background-color));
                }

                .button.disabled:hover,
                .button.disabled:active {
                    box-shadow: none;
                    background-color: var(--omni-button-disabled-active-hover-background-color, var(--omni-disabled-background-color));
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
                        background-color: unset;
                    }

                    .button.primary:hover,
                    .button.secondary:hover,
                    .button.clear:hover,
                    .button.white:hover {
                        box-shadow: unset;
                    }
                }

                /* slot position */

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

                /* slot margins */

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
                    [`slot-${this.slotPosition}`]: this.slotPosition,
                    [`${this.type}`]: this.type,
                    disabled: this.disabled
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
