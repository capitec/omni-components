import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { ifDefined, OmniFormElement } from '../core/OmniFormElement.js';

/**
 * Input control to enter a single line of numbers.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/number-field';
 * ```
 * @example
 * ```html
 * <omni-number-field
 *   label="Enter a value"
 *   value=12345
 *   max-length: 5
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-number-field>
 * ```
 *
 * @element omni-number-field
 *
 * @cssprop --omni-number-field-text-align - Number field text align.
 * @cssprop --omni-number-field-font-color - Number field font color.
 * @cssprop --omni-number-field-font-family - Number field font family.
 * @cssprop --omni-number-field-font-size - Number field font size.
 * @cssprop --omni-number-field-font-weight - Number field font weight.
 * @cssprop --omni-number-field-padding - Number field padding.
 * @cssprop --omni-number-field-height - Number field height.
 * @cssprop --omni-number-field-width - Number field width.
 *
 * @cssprop --omni-number-field-disabled-font-color - Number field disabled font color.
 * @cssprop --omni-number-field-error-font-color - Number field error font color.
 */
@customElement('omni-number-field')
export class NumberField extends OmniFormElement {
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
        this.addEventListener('keydown', this._keyDown.bind(this), {
            capture: true
        });
    }

    // If a value is bound when the component is first updated slice the value based on the max length if set.
    protected override async firstUpdated(): Promise<void> {
        if (this.value !== null && this.value !== undefined) {
            if (this.maxLength) {
                this._inputElement!.value = String(this.value).slice(0, this.maxLength);
            }
        }
    }

    // Added for browsers that allow text values entered into a input when type is set to number.
    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);
        if (name === 'value') {
            if (new RegExp('^[0-9]+$').test(value as string) === false) {
                return;
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

    _keyDown(e: KeyboardEvent) {
        // Stop alpha keys
        if (e.key >= 'a' && e.key <= 'z') {
            e.preventDefault();
            return;
        }
    }

    _keyInput() {
        const input = this._inputElement as HTMLInputElement;

        // If the input has a value and the max length property is set then slice the value according to the max length.
        if (input?.value && this.maxLength) {
            if (input.value.length > this.maxLength) {
                input.value = input.value.slice(0, this.maxLength);
            }
        }

        this.value = input?.value;
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

                    text-align: var(--omni-number-field-text-align, left);

                    color: var(--omni-number-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-number-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-number-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-number-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-number-field-padding, 10px);

                    height: var(--omni-number-field-height, 100%);
                    width: var(--omni-number-field-width, 100%);
                }

                .field.disabled {
                    color: var(--omni-number-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-number-field-error-font-color, var(--omni-font-color));
                }

                /* Used to not display default stepper */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
                }

                input[type='number'] {
                -moz-appearance: textfield; /* Firefox */
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
        type="number"
        inputmode="${ifDefined(this.noNativeKeyboard ? 'none' : undefined)}"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-number-field': NumberField;
    }
}
