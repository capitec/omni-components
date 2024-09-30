import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { ifDefined, OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Control to input text.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/text-field';
 * ```
 *
 * @example
 * ```html
 * <omni-text-field
 *   label="Enter a value"
 *   value="Hello World"
 *   hint="Required"
 *   max-length: 5
 *   error="Field level error message"
 *   disabled>
 * </omni-text-field>
 * ```
 *
 * @element omni-text-field
 *
 * @cssprop --omni-text-field-text-align - Text field text align.
 * @cssprop --omni-text-field-font-color - Text field font color.
 * @cssprop --omni-text-field-font-family - Text field font family.
 * @cssprop --omni-text-field-font-size - Text field font size.
 * @cssprop --omni-text-field-font-weight - Text field font weight.
 * @cssprop --omni-text-field-padding - Text field padding.
 * @cssprop --omni-text-field-height - Text field height.
 * @cssprop --omni-text-field-width - Text field width.
 *
 * @cssprop --omni-text-field-disabled-font-color - Text field disabled font color.
 * @cssprop --omni-text-field-font-color - Text field error font color.
 * 
 * @cssprop --omni-text-field-autofill-hover-transition - Text field input auto fill hover state transition.
 *
 */
@customElement('omni-text-field')
export class TextField extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    /**
     * Maximum character input length.
     * @attr [max-length]
     */
    @property({ type: Number, reflect: true, attribute: 'max-length' }) maxLength?: number;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
            capture: true
        });
    }

    // If a value is bound when the component is first updated slice the value based on the max length.
    protected override async firstUpdated(): Promise<void> {
        if (this.value !== null && this.value !== undefined) {
            if (this.maxLength) {
                this._inputElement!.value = String(this.value).slice(0, this.maxLength);
            }
        }
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
        const input = this._inputElement;

        // If the input has a value and the max length property is set then slice the value according to the max length.
        if (input?.value && this.maxLength) {
            if (input.value.length > this.maxLength) {
                input.value = input.value.slice(0, this.maxLength);
            }
        }
        this.value = input?.value;
        this.requestUpdate();
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

                    text-align: var(--omni-text-field-text-align, left);

                    color: var(--omni-text-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-text-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-text-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-text-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-text-field-padding, 10px);
                    height: var(--omni-text-field-height, 100%);
                    width: var(--omni-text-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-text-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-text-field-error-font-color, var(--omni-font-color));
                }

                input:-webkit-autofill,
                input:-webkit-autofill:focus {
                    transition: var(--omni-text-field-autofill-hover-transition) !important;
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
        type="text"
        inputmode="${ifDefined(this.noNativeKeyboard ? 'none' : undefined)}"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-text-field': TextField;
    }
}
