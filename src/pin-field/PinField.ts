import { PropertyValueMap, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/EyeHidden.icon.js';
import '../icons/EyeVisible.icon.js';

/**
 * Input control to enter a masked numeric value.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/pin-field';
 * ```
 *
 * @example
 * ```html
 * <omni-pin-field
 *   label="Enter a value"
 *   value=1234
 *   max-length: 5
 *   hint="Required"
 *   error="Field level error message"
 *   disabled>
 * </omni-pin-field>
 * ```
 *
 * @element omni-pin-field
 *
 * @slot hide - Replaces the icon for the pin value hidden state.
 * @slot show - Replaces the icon for the checked value visible state.
 *
 * @cssprop --omni-pin-field-control-padding-right - Pin field control padding right.
 * @cssprop --omni-pin-field-control-padding-left - Pin field control padding left.
 * @cssprop --omni-pin-field-control-padding-top - Pin field control padding top.
 * @cssprop --omni-pin-field-control-padding-bottom - Pin field control padding bottom.
 *
 * @cssprop --omni-pin-field-icon-color - Pin field slot icon color.
 * @cssprop --omni-pin-field-icon-width - Pin field slot width.
 * @cssprop --omni-pin-field-icon-height - Pin field slot height.
 *
 * @cssprop --omni-pin-field-text-align - Pin field text align.
 * @cssprop --omni-pin-field-font-color - Pin field font color.
 * @cssprop --omni-pin-field-font-family - Pin field font family.
 * @cssprop --omni-pin-field-font-size - Pin field font size.
 * @cssprop --omni-pin-field-font-weight - Pin field font weight.
 * @cssprop --omni-pin-field-padding - Pin field padding.
 * @cssprop --omni-pin-field-height - Pin field height.
 * @cssprop --omni-pin-field-width - Pin field width.
 *
 * @cssprop --omni-pin-field-disabled-font-color - Pin field disabled font color.
 * @cssprop --omni-pin-field-error-font-color - Pin field error font color.
 */
@customElement('omni-pin-field')
export class PinField extends OmniFormElement {
    /**
     * @ignore
     */
    @state() protected type: 'password' | 'text' = 'text';

    /**
     * Disables native on screen keyboards for the component.
     * @attr [no-native-keyboard]
     */
    @property({ type: Boolean, reflect: true, attribute: 'no-native-keyboard' }) noNativeKeyboard?: boolean;

    /**
     * Override for the value property inherited from the OmniFormElement component with reflect set to false.
     */
    @property({ type: String, reflect: false }) override value?: string;

    /**
     * Maximum character input length.
     * @attr [max-length]
     */
    @property({ type: Number, reflect: true, attribute: 'max-length' }) maxLength?: number;

    @query('#inputField')
    private _inputElement?: HTMLInputElement;
    @query('.container')
    private container?: HTMLDivElement;
    private showPin?: boolean = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isWebkit?: boolean;

    override connectedCallback() {
        super.connectedCallback();
        // Used instead of keydown to catch inputs for mobile devices.
        this.addEventListener('beforeinput', this._beforeInput.bind(this), {
            capture: true
        });
        this.addEventListener('input', this._onInput.bind(this), {
            capture: true
        });
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
            capture: true
        });
    }

    // Added for non webkit supporting browsers and to stop the component from having a non-valid value (non-numeric) value bound.
    protected override async firstUpdated(): Promise<void> {
        const style: any = window.getComputedStyle(this._inputElement as HTMLInputElement);
        this.isWebkit = style.webkitTextSecurity;
        if (!this.isWebkit) {
            this.type = 'password';
        }

        this._sanitiseValue();
    }

    protected override updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        if (_changedProperties.has('value')) {
            if (this.value) {
                this.container?.classList?.add('float-label');
                this.container?.classList?.remove('no-float-label');
            } else {
                this.container?.classList?.remove('float-label');
                this.container?.classList?.add('no-float-label');
            }
            this._sanitiseValue();
        }
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    // Check if the value provided is valid and shorten according to the max length if provided, if there is invalid alpha characters they are removed.
    _sanitiseValue() {
        if (this.value) {
            if (this.maxLength && (this.value as string).length > this.maxLength) {
                this.value = this.value?.slice(0, this.maxLength) as string;
            }
        } else {
            this.value = '';
        }

        this.value = this.value?.toString()?.replace(/[^\d]/gi, '');

        if (this._inputElement) {
            this._inputElement.value = this.value as string;
        }
    }

    _blurOnEnter(e: KeyboardEvent) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            (e.currentTarget as HTMLElement).blur();
        }
    }

    // Used to check if the value provided in a valid numeric value.
    _isNumber(number: string) {
        return /\d/.test(number);
    }

    // Check the beforeinput event data and prevent default if it is a non-numeric value.
    _beforeInput(e: InputEvent) {
        const input = this._inputElement as HTMLInputElement;
        if (input && e.data !== null && !this._isNumber(e.data as string)) {
            e.preventDefault();
            return;
        }
    }

    _onInput() {
        const input = this._inputElement;
        // Check if the value of the input field is valid based on the regex.
        if (input?.value && this.maxLength && typeof this.maxLength === 'number') {
            if (String(input?.value).length > this.maxLength) {
                // Restrict the input characters to the length of specified in the args.
                input.value = String(input?.value).slice(0, this.maxLength);
            }
        }
        this.value = input?.value;
    }

    _iconClicked(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        if (this.showPin) {
            this.showPin = false;
            this._inputElement?.setAttribute('data-omni-keyboard-mask', '');

            if (!this.isWebkit) {
                this.type = 'password';
            }
        } else {
            this.showPin = true;
            this._inputElement?.removeAttribute('data-omni-keyboard-mask');

            if (!this.isWebkit) {
                this.type = 'text';
            }
        }

        this.requestUpdate();
        // Prevent the event from bubbling up. should this be here
        e.stopPropagation();
    }

    static override get styles() {
        return [
            super.styles,
            css`
                .control-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    padding-right: var(--omni-pin-field-control-padding-right, 10px);
                    padding-left: var(--omni-pin-field-control-padding-left, 10px);
                    padding-top: var(--omni-pin-field-control-padding-top, 0px);
                    padding-bottom: var(--omni-pin-field-control-padding-bottom, 0px);
                }

                .hide-icon,
                .show-icon {
                    fill: var(--omni-pin-field-icon-color, var(--omni-primary-color));
                }

                .hide-icon,
                .show-icon,
                ::slotted([slot='show']),
                ::slotted([slot='hide']) {
                    width: var(--omni-pin-field-icon-width, 24px);
                    height: var(--omni-pin-field-icon-height, 24px);
                }

                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-pin-field-text-align, left);

                    color: var(--omni-pin-field-font-color, var(--omni-font-color));
                    font-family: var(--omni-pin-field-font-family, var(--omni-font-family));
                    font-size: var(--omni-pin-field-font-size, var(--omni-font-size));
                    font-weight: var(--omni-pin-field-font-weight, var(--omni-font-weight));
                    padding: var(--omni-pin-field-padding, 10px);

                    height: var(--omni-pin-field-height, 100%);
                    width: var(--omni-pin-field-width, 100%);

                    -webkit-text-security:disc;          
                }

                .field.disabled {
                    color: var(--omni-pin-field-disabled-font-color, #7C7C7C);
                }

                .field.error {
                    color: var(--omni-pin-field-error-font-color, var(--omni-font-color));
                }

                .show {
                    -webkit-text-security:none;
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

    protected override renderControl() {
        return html`
      <div class="control-box" @click="${(e: MouseEvent) => this._iconClicked(e)}">
        ${
            !this.showPin
                ? html` <slot name="show"><omni-eye-visible-icon class="show-icon"></omni-eye-visible-icon></slot> `
                : html` <slot name="hide"><omni-eye-hidden-icon class="hide-icon"></omni-eye-hidden-icon></slot> `
        }
      </div>
    `;
    }

    /* inputmode is set to decimal to avoid the virtual keyboard input event with cancelable read-only property.*/
    protected override renderContent() {
        const field: ClassInfo = {
            field: true,
            disabled: this.disabled,
            show: this.showPin as boolean,
            error: this.error as string
        };
        return html`
      <input
        class=${classMap(field)}
        id="inputField"
        inputmode="${this.noNativeKeyboard ? 'none' : 'decimal'}"
        data-omni-keyboard-mode="decimal"
        type="${this.type}"
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}"
        data-omni-keyboard-mask />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-pin-field': PinField;
    }
}
