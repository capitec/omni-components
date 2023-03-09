import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import OmniElement from '../core/OmniElement.js';

/**
 * An internal keyboard button control used in the keyboard component.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/keyboard';
 * ```
 *
 * @example
 * ```html
 * <omni-keyboard-button
 *  label="a"
 *  mode="alpha"
 *  character="Return"
 *  case="upper"
 *  disabled>
 * </omni-keyboard-button>"
 * ```
 *
 * @slot - Content to render inside button
 *
 * @fires {CustomEvent<{ value: string; }>} keyboard-click - Dispatched when the keyboard button is clicked.
 *
 * @ignore
 */

@customElement('omni-keyboard-button')
export class KeyboardButton extends OmniElement {
    /**
     * Text label.
     * @attr
     */
    @property({ type: String, reflect: true }) label: string = '';
    /**
     * The character for the button.
     * @attr
     */
    @property({ type: String, reflect: true }) character: string = '';
    /**
     * The mode for the button:
     * - `alpha` Alphabetical mode.
     * - `return` Return (Enter) mode.
     * - `numeric` Numerical mode.
     * - `action` Arbitrary actions mode.
     * - `space` Spacebar mode.
     * @attr
     */
    @property({ type: String, reflect: true }) mode: KeyboardButtonMode = 'none';
    /**
     * The case of the button:
     * - `upper` Uppercase input only.
     * - `lower` Lowercase input only.
     * @attr
     */
    @property({ type: String, reflect: true }) case: 'lower' | 'upper' | 'custom' = 'lower';
    /**
     * Indicator if the button is disabled.
     * @attr
     * */
    @property({ type: Boolean, reflect: true }) disabled?: boolean;

    /**
     * Handles component key down events.
     */
    _click(event: MouseEvent) {
        // Ignore the event if the component is disabled.
        if (this.disabled) {
            return event.stopImmediatePropagation();
        }

        let val = '';
        if (this.character) {
            if (this.case === `custom`) {
                val = this.character;
            } else if (this.case !== `lower`) {
                val = this.character.toUpperCase();
            } else {
                val = this.character.toLowerCase();
            }
        } else if (this.case === `custom`) {
            val = this.label;
        } else if (this.case !== `lower`) {
            val = this.label.toUpperCase();
        } else {
            val = this.label.toLowerCase();
        }

        this.dispatchEvent(
            new CustomEvent('keyboard-click', {
                detail: {
                    value: val
                }
            })
        );

        event.stopPropagation();
    }

    /**
     * Generates the component stylesheet.
     *
     * @ignore
     */
    static override get styles() {
        return [
            super.styles,
            css`
				:host {
					box-sizing: border-box;
					display: inline-flex;
				}

				::slotted() {
					max-height: var(--omni-keyboard-button-icon-max-height,40px);
					max-width: var(--omni-keyboard-button-icon-max-width,40px);
				}

                .button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    
                    font-family: var(--omni-keyboard-button-font-family, var(--omni-font-family));
                    color: var(--omni-keyboard-button-font-color, var(--omni-font-color));
                    font-size: var(--omni-keyboard-button-font-size, 15px);
                    /*Common styles for keyboard button types*/

                    background-color: var(--omni-keyboard-button-background-color, var(--omni-background-color));
                    border: var(--omni-keyboard-button-border, 1.5px solid var(--omni-background-color));
                    margin: var(--omni-keyboard-button-margin, 6px 7px);
                    font-weight: var(--omni-keyboard-button-font-weight, 600);
                    height: var(--omni-keyboard-button-height, 40px);
                    width: var(--omni-keyboard-button-width, 50px);
                    
                    line-height: var(--omni-keyboard-button-line-height, 30px);
                    border-radius: var(--omni-keyboard-button-border-radius, 8px);

                    box-shadow: 2px 2px 5px 0 rgba(109,109,109,0.35), -10px -10px 20px -10px var(--omni-box-shadow-color);

                    cursor: pointer;
                    
                    transition:
                        opacity .1s ease,
                        background-color .1s ease,
                        border .1s ease,
                        color .1s ease,
                        box-shadow .1s ease,
                        background .1s ease,
                        -webkit-box-shadow .1s ease;
                }

                .action {
                    width: auto;
                }

                .space {
                    width: auto;
                }

                /* Mobile device styling */
                @media screen and (max-width: 766px) {

                    .button {
                        margin: var(--omni-keyboard-button-mobile-margin, 2px 2px);
                        height: var(--omni-keyboard-button-mobile-height, 30px);
                        width: var(--omni-keyboard-button-mobile-width, 32px);                        
                    }

                    .space {
                        width: auto;
                        height: var(--omni-keyboard-button-mobile-height, 30px);
                    }

                    .alpha {
                        height: var(--omni-keyboard-button-mobile-height, 30px);
                        width: var(--omni-keyboard-button-mobile-width, 32px);               
                    }

                    .action {
                        width: auto;
                    }

                    .return{
                        height: var(--omni-keyboard-button-mobile-height, 30px);
                        width: var(--omni-return-keyboard-button-mobile-width, 60px);
                    }

                    .numeric {
                        height: var(--omni-keyboard-button-mobile-height, 30px);
                        width: var(--omni-numeric-keyboard-button-mobile-width, 55px);
                    }
                }

                /* Small mobile device */
                @media screen and (max-width: 355px) {
                    .button {
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                        width: var(--omni-keyboard-button-mobile-small-width, 22px);
                        
                        font-size: var(--omni-keyboard-button-mobile-small-font-size, 12px);
                        border-radius: var(--omni-keyboard-button-mobile-small-border-radius, 6px);
                    }

                    .space {
                        width: auto;
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                    }

                    .alpha {
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                        width: var(--omni-keyboard-button-mobile-small-width, 22px);
                    }

                    .action {
                        width: auto;
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                    }

                    .numeric {
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                        width: var(--omni-numeric-keyboard-button-mobile-small-width, 45px);
                    }

                    .return {
                        height: var(--omni-keyboard-button-mobile-small-height, 22px);
                        width: var(--omni-return-keyboard-button-mobile-small-width, 36px);
                    }
                }
			`
        ];
    }

    override render() {
        this.label = this.case !== `lower` ? (this.case === `custom` ? this.label : this.label.toUpperCase()) : this.label.toLowerCase();

        return html`
			<button class="button ${this.mode === `alpha` ? `alpha` : ``}${this.mode === `return` ? `return` : ``} ${this.mode === `numeric` ? `numeric` : ``} ${
            this.mode === `action` ? `action` : ``
        } ${this.mode === `space` ? `space` : ``} ${this.disabled ? `disabled` : ``} " 
				@click="${this._click}">
                <slot></slot>
				${this.label ? html`<div class="label">${this.label}</div>` : ``}
			</button>
		`;
    }
}

export type KeyboardButtonMode = 'alpha' | 'return' | 'numeric' | 'action' | 'space' | 'none';

declare global {
    interface HTMLElementTagNameMap {
        'omni-keyboard-button': KeyboardButton;
    }
}
