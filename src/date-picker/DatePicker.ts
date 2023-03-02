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
 * Control that allows you to select a specific date
 *
 * @import
 * ```js
 * import '@capitec/omni-components/date-picker';
 * ```
 *
 * @example
 * ```html
 * <omni-date-picker
 * label="Enter a value"
 * value="Hello World"
 * data="{'id': 12345, 'name': 'Test'}
 * hint="Required"
 * error="Select a valid date"
 * locale="en-US"
 * disabled>
 * </omni-date-picker>
 * ```
 * @element omni-date-picker
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
 * @cssprop --omni-date-picker-control-width - Date picker control width.
 * @cssprop --omni-date-picker-control-hover-color - Date picker control hover.
 *
 * @cssprop --omni-date-picker-control-icon-width - Date picker control icon width.
 * @cssprop --omni-date-picker-control-icon-color - Date picker control icon color.
 *
 * @cssprop --omni-date-picker-container-z-index - Date picker container z-index.
 *
 * @cssprop --omni-date-picker-mobile-picker-container-left - Date picker container mobile left.
 * @cssprop --omni-date-picker-mobile-picker-container-right - Date picker container mobile right.
 * @cssprop --omni-date-picker-mobile-picker-container-bottom - Date picker container mobile bottom.
 * @cssprop --omni-date-picker-mobile-picker-container-box-shadow - Date picker container mobile box shadow.
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
    private defaultLocale: string = 'en-US';

    /**
     * The locale used for formatting the output of the Date time picker.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = this.defaultLocale;

    // Internal state properties for date picker and
    @state() private date: DateTime =
        this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local();
    @state() private _showCalendar: boolean = false;

    //Internal state properties for dimensions
    @state() private _bottomOfViewport: boolean = false;
    @state() private _isMobile: boolean = false;

    //private _updateDateVariablesUpdate = debounce(() => this._updateDateVariables(), 800);

    override connectedCallback() {
        super.connectedCallback();
        this._mobileCheck();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClick.bind(this));
    }

    protected override async firstUpdated(): Promise<void> {
        await this._dimensionsCheck();
        window.addEventListener('resize', this._dimensionsCheck.bind(this));
        window.addEventListener('scroll', this._dimensionsCheck.bind(this));
    }

    // Update properties of the Date picker component if user provides a value to the value property or if the locale property is updated.
    protected override shouldUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): boolean {
        if (_changedProperties.has('value')) {
            this.date = DateTime.fromISO(<string>this.value).setLocale(this.locale);
        }
        return true;
    }

    /*Dimension checks */
    async _dimensionsCheck() {
        await this._bottomCheck();
        this._mobileCheck();
    }

    // Check to see if the component is at the bottom of the viewport if true set the internal boolean value.
    async _bottomCheck() {
        const distanceFromBottom = visualViewport!.height - this.getBoundingClientRect().bottom;
        if (distanceFromBottom < 270) {
            this._bottomOfViewport = true;
        } else {
            this._bottomOfViewport = false;
        }
    }

    // Check the width of the screen to set the internal mobile boolean to true of false.
    _mobileCheck() {
        if (!window.matchMedia ? window.innerWidth >= 767 : window.matchMedia('screen and (min-width: 767px)').matches) {
            // Desktop width is at least 767px
            this._isMobile = false;
        } else {
            // Mobile screen less than 767px
            this._isMobile = true;
        }
    }

    _inputClick(e: Event) {
        const pickerContainer = this.renderRoot.querySelector<HTMLDivElement>('#picker-container');
        if (!e.composedPath() || !pickerContainer || !e.composedPath().includes(pickerContainer)) {
            this._toggleCalendar();
        }
    }

    // https://stackoverflow.com/a/39245638
    // Close the item container when clicking outside the date picker component.
    _windowClick(e: Event) {
        if (e.composedPath() && !e.composedPath().includes(this) && this._showCalendar) {
            this._showCalendar = false;
        }
    }

    _toggleCalendar() {
        if (this._showCalendar) {
            this._showCalendar = false;
        } else {
            this._showCalendar = true;
        }
    }

    _dateSelected(e: Event) {
        this.date = DateTime.fromJSDate((<CustomEvent>e).detail.date);

        this.value = this.date.toISODate();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    date: (<CustomEvent>e).detail.date,
                    ISO: (<CustomEvent>e).detail.ISO
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
                /* Added to stop the transforming of the label when the input is clicked*/
                pointer-events: none;
                cursor: pointer;
            }

            .field.disabled {
                color: var(--omni-date-picker-disabled-font-color, #7C7C7C);
            }
    
            .field.error {
                color: var(--omni-date-picker-error-font-color);
            }

            /* Styles for the control and control icon */
            .control {
                display: flex;
                cursor: pointer;
                justify-content: center;

                width: var(--omni-date-picker-control-width, 40px);
            }

            .control:hover  {
                background-color: var(--omni-date-picker-control-hover-color, var(--omni-accent-hover-color));
            }

            .control-icon {
                width: var(--omni-date-picker-control-icon-width, 20px);
                fill: var(--omni-date-picker-control-icon-color, var(--omni-primary-color));
            }

            /* Styles related to the picker container*/
            .picker-container {
                z-index: var(--omni-date-picker-container-z-index, 420);
            }

            /* Picker container mobile*/
            @media screen and (max-width: 766px) {
                .picker-container {
                    position: fixed;
                    top: none;
                    left: var(--omni-date-picker-mobile-picker-container-left, 0px);
                    right: var(--omni-date-picker-mobile-picker-container-right, 0px);
                    bottom: var(--omni-date-picker-mobile-picker-container-bottom, 0px);
                    box-shadow: var(--omni-date-picker-mobile-picker-container-box-shadow, 0px 0px 2px 2px rgba(0, 0, 0, 0.11));
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
        return html`
            <input
                class="field"
                id="inputField"
                type="text"
                readonly
                ?disabled=${this.disabled}
                .value=${live(this.date && this.date.isValid ? this.date.toLocaleString(DateTime.DATE_FULL) : '')}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected override renderControl() {
        return html` 
        <div class="divider"></div>
        <div id="control" class="control">
            <omni-calendar-icon class="control-icon"></omni-calendar-icon>
        </div>`;
    }

    protected override renderPicker() {
        if (!this._showCalendar) {
            return nothing;
        }
        return html`
            <div id="picker-container" class="picker-container ${this._bottomOfViewport ? `bottom` : ``}">
                <omni-calendar id="calendar" locale=${this.locale} .value=${this.value as string} @change=${(e: Event) =>
            this._dateSelected(e)}></omni-calendar>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-date-picker': DatePicker;
    }
}
