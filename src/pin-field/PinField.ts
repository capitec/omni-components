import { css, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { OmniFormElement } from '../core/OmniFormElement.js';

import '../icons/EyeHidden.icon.js';
import '../icons/EyeVisible.icon.js';

/**
 * Pin input control to enter masked numeric values.
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
 *   data="{'id': 12345, 'name': 'Test'}"
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
 */
@customElement('omni-pin-field')
export class PinField extends OmniFormElement {
    /**
     * @ignore
     */
    @state() protected type: 'password' | 'number' = 'number';

    @query('#inputField')
    private _inputElement?: HTMLInputElement;
    private showPin?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isWebkit?: boolean;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('input', this._keyInput.bind(this), {
            capture: true
        });
        this.addEventListener('keydown', this._keyDown.bind(this), {
            capture: true
        });
        this.addEventListener('keyup', this._blurOnEnter.bind(this), {
            capture: true
        });
    }

    //Added for non webkit supporting browsers
    protected override async firstUpdated(): Promise<void> {
        const style: any = window.getComputedStyle(this._inputElement as HTMLInputElement);
        this.isWebkit = style.webkitTextSecurity;
        if (!this.isWebkit) {
            this.type = 'password';
        }
    }

    override async attributeChangedCallback(name: string, _old: string | null, value: string | null): Promise<void> {
        super.attributeChangedCallback(name, _old, value);
        if (name === 'value') {
            if (new RegExp('^[0-9]+$').test(value as string) === false) {
                return;
            }
        }
    }

    _blurOnEnter(e: any) {
        if (e.code === 'Enter' || e.keyCode === 13) {
            e.currentTarget.blur();
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
        const input = this._inputElement;
        this.value = input?.value;
    }

    _iconClicked(e: MouseEvent) {
        if (this.disabled) {
            return e.stopImmediatePropagation();
        }

        if (this.showPin) {
            this.showPin = false;
            this._inputElement?.classList.add('field-hide-pin');

            if (!this.isWebkit) {
                this.type = 'password';
            }
        } else {
            this.showPin = true;
            this._inputElement?.classList.remove('field-hide-pin');

            if (!this.isWebkit) {
                this.type = 'number';
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
      
        }

        .field-hide-pin {
            -webkit-text-security:disc;
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

    protected override renderContent() {
        return html`
      <input
        class="field ${!this.showPin ? 'field-hide-pin' : ''}"
        id="inputField"
        inputmode="numeric"
        .type="${this.type}"
        .value=${live(this.value as string)}
        ?readOnly=${this.disabled}
        tabindex="${this.disabled ? -1 : 0}" />
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-pin-field': PinField;
    }
}
