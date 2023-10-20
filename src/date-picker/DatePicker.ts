import { html, css, nothing, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { DateTime } from 'luxon';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../calendar/Calendar.js';
import '../icons/Calendar.icon.js';
import '../icons/ChevronLeft.icon.js';
import '../icons/ChevronRight.icon.js';

/**
 * Control to get / set a specific date using a calendar.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/date-picker';
 * ```
 *
 * @example
 * ```html
 * <omni-date-picker
 *  label="Enter a value"
 *  value="2023-03-01"
 *  min-date="2023-02-01"
 *  max-date="2023-04-01"
 *  hint="Required"
 *  error="Select a valid date"
 *  locale="en-US"
 *  disabled>
 * </omni-date-picker>
 * ```
 * @element omni-date-picker
 *
 * Registry of all properties defined by the component.
 *
 * @fires {CustomEvent<{}>} change - Dispatched when a date is selected.
 *
 * @cssprop --omni-date-picker-text-align - Date picker input text align.
 * @cssprop --omni-date-picker-font-color - Date picker input font color.
 * @cssprop --omni-date-picker-font-family - Date picker input font family.
 * @cssprop --omni-date-picker-font-size - Date picker input font size.
 * @cssprop --omni-date-picker-font-weight - Date picker input font weight.
 * @cssprop --omni-date-picker-height - Date picker input height.
 * @cssprop --omni-date-picker-padding - Date picker input padding.
 * @cssprop --omni-date-picker-width - Date picker width.
 * @cssprop --omni-date-picker-min-width - Date picker min width.
 *
 * @cssprop --omni-date-picker-disabled-font-color - Date picker disabled font color.
 *
 * @cssprop --omni-date-picker-error-font-color - Date picker error font color.
 *
 * @cssprop --omni-date-picker-control-padding - Date picker control padding.
 * @cssprop --omni-date-picker-control-hover-color - Date picker control hover.
 *
 * @cssprop --omni-date-picker-control-icon-width - Date picker control icon width.
 * @cssprop --omni-date-picker-control-icon-height - Date picker control icon height.
 * @cssprop --omni-date-picker-control-icon-color - Date picker control icon color.
 *
 * @cssprop --omni-date-picker-control-icon-error-color - Date picker control icon error color.
 *
 * @cssprop --omni-date-picker-control-left-border-width - Date picker control left border width.
 * @cssprop --omni-date-picker-control-left-border-color - Date picker control left border color.
 *
 * @cssprop --omni-date-picker-control-left-focused-border-width - Date picker control left border focused width.
 * @cssprop --omni-date-picker-control-left-focused-color - Date picker control left border focused color.
 *
 * @cssprop --omni-date-picker-control-left-border-error-color - Date picker control left border error color.
 *
 * @cssprop --omni-date-picker-container-z-index - Date picker container z-index.
 *
 * @cssprop --omni-date-picker-mobile-picker-dialog-left - Date picker dialog left.
 * @cssprop --omni-date-picker-mobile-picker-dialog-right - Date picker dialog right
 * @cssprop --omni-date-picker-mobile-picker-dialog-bottom - Date picker dialog bottom
 * @cssprop --omni-date-picker-mobile-picker-dialog-background-color - Date picker dialog background color.
 *
 * @cssprop --omni-date-picker-container-width - Date picker container width.
 * @cssprop --omni-date-picker-container-top - Date picker container top.
 * @cssprop --omni-date-picker-period-container-border-bottom - Date picker container border bottom.
 *
 * @cssprop --omni-date-picker-container-render-bottom-top - Date picker container render bottom top.
 *
 */
@customElement('omni-date-picker')
export class DatePicker extends OmniFormElement {
    @query('#inputField')
    private _inputElement?: HTMLInputElement;
    private defaultLocale: string = 'en-US';

    /**
     * The locale used for formatting the output of the Date time picker.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = this.defaultLocale;

    /**
     * The minimum date inclusively allowed to be selected.
     * @attr [min-date]
     */
    @property({ type: String, attribute: 'min-date', reflect: true }) minDate?: string;

    /**
     * The maximum date inclusively allowed to be selected.
     * @attr [max-date]
     */
    @property({ type: String, attribute: 'max-date', reflect: true }) maxDate?: string;

    // Internal state properties for date picker and
    @state() private date: DateTime =
        this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local();
    @state() private _showCalendar: boolean = false;

    //Internal state properties for dimensions
    @state() private _bottomOfViewport: boolean = false;
    @state() private _isMobile: boolean = false;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClick.bind(this));
    }

    protected override async firstUpdated(): Promise<void> {
        await this._checkForBottomOfScreen();
        await this._checkforMobile();
        window.addEventListener('resize', this._checkForBottomOfScreen.bind(this));
        window.addEventListener('scroll', this._checkForBottomOfScreen.bind(this));
        window.addEventListener('resize', this._checkforMobile.bind(this));
        window.addEventListener('scroll', this._checkforMobile.bind(this));
    }

    // Update properties of the Date picker component if user provides a value to the value property or if the locale property is updated.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected override shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
        if (_changedProperties.has('value')) {
            this.date = DateTime.fromISO(<string>this.value).setLocale(this.locale);
        }
        return true;
    }

    override focus(options?: FocusOptions | undefined): void {
        if (this._inputElement) {
            this._inputElement.focus(options);
        } else {
            super.focus(options);
        }
    }

    // Check to see if the component is at the bottom of the viewport if true set the internal boolean value.
    async _checkForBottomOfScreen() {
        const distanceFromBottom = (visualViewport?.height as number) - this.getBoundingClientRect().bottom;
        if (distanceFromBottom < 270) {
            this._bottomOfViewport = true;
        } else {
            this._bottomOfViewport = false;
        }
    }

    // Check the width of the screen to set the internal mobile boolean to true of false.
    async _checkforMobile() {
        if (!window.matchMedia ? window.innerWidth >= 767 : window.matchMedia('screen and (min-width: 767px)').matches) {
            // Desktop width is at least 767px
            this._isMobile = false;
        } else {
            // Mobile screen less than 767px
            this._isMobile = true;
        }
    }

    _inputClick(e: Event) {
        if (this.disabled) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        const pickerContainer = this.renderRoot.querySelector<HTMLDivElement>('#picker-container');
        const pickerDialog = this.renderRoot.querySelector<HTMLDialogElement>('#picker-dialog');

        //Check that the pickerContainer or pickerDialog is not loaded
        if (
            !e.composedPath() ||
            !(pickerContainer || pickerDialog) ||
            !(e.composedPath().includes(pickerContainer as Element) || e.composedPath().includes(pickerDialog as Element))
        ) {
            this._toggleCalendar();
        }
    }

    // https://stackoverflow.com/a/39245638
    // Close the item container when clicking outside the date picker component.
    _windowClick(e: Event) {
        const pickerDialog = this.renderRoot.querySelector<HTMLDialogElement>('#picker-dialog') as HTMLDialogElement;
        const composedPath = e.composedPath();
        /**
         * Check when the window is clicked to close the container(Desktop) or dialog(Mobile)
         * For mobile scenarios check if the dialog is the lowest item in the composed path
         */
        if (
            composedPath &&
            (!composedPath.includes(this) || (this._isMobile && pickerDialog && composedPath.findIndex((p) => p === pickerDialog) === 0)) &&
            this._showCalendar
        ) {
            this._toggleCalendar();
        }
    }

    _toggleCalendar() {
        if (this._showCalendar) {
            this._showCalendar = false;
            if (this._isMobile) {
                const pickerDialog = this.renderRoot.querySelector<HTMLDialogElement>('#picker-dialog');

                if (pickerDialog) {
                    pickerDialog.close();
                }
            }
        } else {
            this._showCalendar = true;
            if (this._isMobile) {
                const pickerDialog = this.renderRoot.querySelector<HTMLDialogElement>('#picker-dialog');
                if (pickerDialog) {
                    pickerDialog.showModal();
                }
            }
        }
    }

    _dateSelected(e: Event) {
        this.date = DateTime.fromJSDate((<CustomEvent>e).detail.date);

        this.value = this.date.toISODate() as string;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    date: this.date.toJSDate()
                }
            })
        );

        this._toggleCalendar();
    }

    static override get styles() {
        return [
            super.styles,
            css`
                /* Added to ensure that component has pointer cursor applied */
                :host {
                    cursor: pointer;
                }

                .field {
                    flex: 1 1 auto;

                    border: none;
                    background: none;
                    box-shadow: none;
                    outline: 0;
                    padding: 0;
                    margin: 0;

                    text-align: var(--omni-date-picker-text-align, left);

                    color: var(--omni-date-picker-font-color, var(--omni-font-color));
                    font-family: var(--omni-date-picker-font-family, var(--omni-font-family));
                    font-size: var(--omni-date-picker-font-size, var(--omni-font-size));
                    font-weight: var(--omni-date-picker-font-weight, var(--omni-font-weight));
                    height: var(--omni-date-picker-height, 100%);
                    padding: var(--omni-date-picker-padding, 10px);
                    width: var(--omni-date-picker-width);
                    min-width: var(--omni-date-picker-min-width, 242px);

                    cursor: pointer;
                }

                .field.disabled {
                    color: var(--omni-date-picker-disabled-font-color, #7C7C7C);
                }
        
                .field.error {
                    color: var(--omni-date-picker-error-font-color, var(--omni-font-color));
                }

                /* Styles for the control and control icon */

                .control {
                    display: inline-flex;
                    flex: 0 0 auto;
                    align-items: center;
                    cursor: pointer;
                    padding: var(--omni-date-picker-control-padding, 10px 10px);
                }

                .control:hover  {
                    background-color: var(--omni-date-picker-control-hover-color, var(--omni-accent-hover-color));
                }


                .control-icon,
                ::slotted([slot='calendar']){
                    width: var(--omni-date-picker-control-icon-width, 20px);
                    height: var(--omni-date-picker-control-icon-height, 20px);
                    fill: var(--omni-date-picker-control-icon-color,  var(--omni-primary-color));
                    cursor: pointer;
                }

                .control-icon.error {
                    fill: var(--omni-date-picker-control-icon-error-color, var(--omni-error-font-color));
                }

                .left-border {
                    width: var(--omni-date-picker-control-left-border-width, 2px);
                    background-color: var(--omni-date-picker-control-left-border-color,var(--omni-form-border-color));
                }

                .layout:focus-within > .left-border {
                    width: var(--omni-date-picker-control-left-focused-border-width, 2px);
                    background-color: var(--omni-date-picker-control-left-focused-color, var(--omni-primary-color));
                }

                .left-border.error {
                    background-color: var(--omni-date-picker-control-left-border-error-color, var(--omni-error-font-color));
                }

                /* Styles related to the picker container*/
                .picker-container {
                    z-index: var(--omni-date-picker-container-z-index, 420);
                }

                /* Picker dialog mobile*/
                @media screen and (max-width: 766px) {

                    .picker-dialog {
                        position: fixed;
                        top: inherit;
                        width: 100%;
                        margin: unset;
                        border-style: none;
                        padding: unset;
                        left: var(--omni-date-picker-mobile-picker-dialog-left, 0px);
                        right: var(--omni-date-picker-mobile-picker-dialog-right, 0px);
                        bottom: var(--omni-date-picker-mobile-picker-dialog-bottom, 0px);
                    }
                    
                    .picker-dialog:modal{
                        max-width: 100%;
                        overflow: none;
                    }

                    .picker-dialog::backdrop {
                        background: var(--omni-date-picker-mobile-picker-dialog-background-color, rgba(0, 0, 0, 0.1));
                    }
                }

                /* Desktop and landscape tablet device styling, if element is at the bottom of the screen make items render above the input */
                @media screen and (min-width: 767px) {
                    .picker-container {
                        position: absolute;
                        cursor: default;
                        transition: 1s;
                        width: var(--omni-date-picker-container-width, 100%);
                        top: var(--omni-date-picker-container-top, 102%);
                    }

                /* Styles if the element is at the bottom of the screen then render the picker on top of the element */
                .picker-container.bottom {
                    top: var(--omni-date-picker-container-render-bottom-top, -2%);
                    transform: translateY(-100%);
                }
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
                readonly
                ?disabled=${this.disabled}
                .value=${live(this.date && this.date.isValid ? this.date.toLocaleString(DateTime.DATE_FULL) : '')}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected override renderControl() {
        const border: ClassInfo = {
            'left-border': true,
            disabled: this.disabled,
            error: this.error as string
        };
        const control: ClassInfo = {
            control: true,
            disabled: this.disabled,
            error: this.error as string
        };

        const controlIcon: ClassInfo = {
            'control-icon': true,
            disabled: this.disabled,
            error: this.error as string
        };

        return html` 
        <div class=${classMap(border)}></div>
        <div id="control" class=${classMap(control)} @click=${this.focus}>
                <slot name="calendar">
                    <omni-calendar-icon class=${classMap(controlIcon)}></omni-calendar-icon>
                </slot>            
         </div>
        `;
    }

    protected override renderPicker() {
        if (this._isMobile) {
            return html`
            <dialog id="picker-dialog" class="picker-dialog">
                <omni-calendar 
                    id="calendar" 
                    locale=${this.locale} 
                    .value=${this.value as string} 
                    .minDate=${this.minDate}
                    .maxDate=${this.maxDate} 
                    @change=${(e: Event) => this._dateSelected(e)}>
                </omni-calendar>
            </dialog>`;
        }
        if (!this._showCalendar) {
            return nothing;
        } else {
            return html` 
            <div id="picker-container" class="picker-container ${this._bottomOfViewport ? `bottom` : ``}">
                <omni-calendar 
                  id="calendar" 
                  locale=${this.locale} 
                  .value=${this.value as string}
                  .minDate=${this.minDate}
                  .maxDate=${this.maxDate} 
                  @change=${(e: Event) => this._dateSelected(e)}>
                </omni-calendar>
            </div>`;
        }
    }

    protected override renderLabel() {
        return super.renderLabel(true);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-date-picker': DatePicker;
    }
}
