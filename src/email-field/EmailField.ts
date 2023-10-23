import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Email input control, used in forms for input validation and to display correct virtual keyboard on mobile.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/email-field';
 * ```
 *
 * @example
 * ```html
 * <omni-email-field
 *   label="Enter a value"
 *   value="JohnDoe@mail.com"
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-email-field>
 * ```
 *
 * @element omni-email-field
 *
 * @cssprop --omni-email-field-text-align - Email field text align.
 * @cssprop --omni-email-field-font-color - Email field font color.
 * @cssprop --omni-email-field-font-family - Email field font family.
 * @cssprop --omni-email-field-font-size - Email field font size.
 * @cssprop --omni-email-field-font-weight - Email field font weight.
 * @cssprop --omni-email-field-padding - Email field padding.
 * @cssprop --omni-email-field-height - Email field height.
 * @cssprop --omni-email-field-width - Email field width.
 *
 * @cssprop --omni-email-field-disabled-font-color - Email field disabled font color.
 * @cssprop --omni-email-field-error-font-color - Email field error font color.
 */
@customElement('omni-email-field')
export class EmailField extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
            capture: true
        });
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    _blurOnEnter(e: KeyboardEvent) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            (e.currentTarget as HTMLElement).blur();
        }
    }

    _keyInput() {
        const input = this._inputElement as HTMLInputElement;
        this.value = input.value;
    }

    static override get styles() {
        return [
            super.styles,
            css`
                .field {
                flex: 1 1 auto;

                border: none;
                background: none;
                box-shadow: none;
                outline: 0;
                padding: 0;
                margin: 0;

                text-align: var(--omni-email-field-text-align, left);

                color: var(--omni-email-field-font-color, var(--omni-font-color));
                font-family: var(--omni-email-field-font-family, var(--omni-font-family));
                font-size: var(--omni-email-field-font-size, var(--omni-font-size));
                font-weight: var(--omni-email-field-font-weight, var(--omni-font-weight));
                padding: var(--omni-email-field-padding, 10px);

                height: var(--omni-email-field-height, 100%);
                width: var(--omni-email-field-width, 100%);
                }
                
                .field.disabled {
                    color: var(--omni-email-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-email-field-error-font-color, var(--omni-font-color));
                }   
            `
        ];
    }

    protected override renderContent() {
        const field: ClassInfo = {
            field: true,
            disabled: this.disabled,
            error: this.error as string
        };
        return html`
      <input
        class=${classMap(field)}
        id="inputField"
        inputmode="${this.noNativeKeyboard ? 'none' : 'email'}"
        data-omni-keyboard-mode="email"
        type="email"
        aria-disabled="${this.disabled}"
        aria-label="${this.label}"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-email-field': EmailField;
    }
}
