import { html, css, nothing, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { debounce } from 'lodash';
import { DateTime, Duration, Info, Interval } from 'luxon';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../button/Button.js';
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
 * @cssprop --omni-date-picker-control-width - Date picker control width.
 *
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
 * @cssprop --omni-date-picker-period-container-padding - Date picker period container padding.
 * @cssprop --omni-date-picker-period-container-border-bottom - Date picker period container bottom border.
 * @cssprop --omni-date-picker-period-background-color - Date picker period container background color.
 *
 * @cssprop --omni-date-picker-period-bar-previous-control-padding-top -  Date picker period bar previous control top padding.
 * @cssprop --omni-date-picker-period-bar-previous-control-width - Date picker period bar previous control width.
 *
 * @cssprop --omni-date-picker-period-bar-next-control-padding-top - Date picker period bar next control top padding.
 * @cssprop --omni-date-picker-period-bar-next-control-width - Date picker period bar next control width.
 *
 * @cssprop --omni-date-picker-period-center-button - Date picker period bar center button width.
 *
 * @cssprop --omni-date-picker-days-grid-template-columns - Date picker days grid template columns.
 * @cssprop --omni-date-picker-days-grid-auto-rows - Date picker days grid auto rows.
 * @cssprop --omni-date-picker-days-grid-font-size - Date picker days grid font size.
 * @cssprop --omni-date-picker-days-grid-font-weight - Date picker days grid font weight.
 * @cssprop --omni-date-picker-days-grid-width - Date picker days grid width.
 * @cssprop --omni-date-picker-days-grid-padding - Date picker days grid padding.
 * @cssprop --omni-date-picker-days-grid-line-height - Date picker days grid line height.
 * @cssprop --omni-date-picker-days-grid-background-color - Date picker days grid background color.
 *
 * @cssprop --omni-date-picker-month-grid-template-columns - Date picker month grid template columns.
 * @cssprop --omni-date-picker-month-grid-padding-top - Date picker month grid top padding.
 * @cssprop --omni-date-picker-month-grid-padding-bottom - Date picker month grid bottom padding.
 * @cssprop --omni-date-picker-month-grid-padding-right - Date picker month grid right padding.
 * @cssprop --omni-date-picker-month-grid-padding-left - Date picker month grid left padding.
 * @cssprop --omni-date-picker-months-grid-background-color - Date picker month grid background color.
 *
 * @cssprop --omni-date-picker-month-button-width - Date picker month button width.
 * @cssprop --omni-date-picker-month-button-height - Date picker month button height.
 *
 * @cssprop --omni-date-picker-year-scroller-height - Date picker year scroller height.
 * @cssprop --omni-date-picker-year-scroller-background-color - Date picker year scroller background color.
 *
 * @cssprop --omni-date-picker-year-button-width - Date picker year button width.
 * @cssprop --omni-date-picker-year-button-height - Date picker year button height.
 *
 * @cssprop --omni-date-picker-scrollbar-thumb-width - Date picker scrollbar thumb width
 * @cssprop --omni-date-picker-scrollbar-track-padding-left - Date picker scrollbar track left padding.
 * @cssprop --omni-date-picker-scrollbar-track-padding-right - Date picker scrollbar track right padding.
 * @cssprop --omni-date-picker-scrollbar-track-border-radius - Date picker scrollbar track border radius.
 * @cssprop --omni-date-picker-scrollbar-track-background-color - Date picker scrollbar track background color.
 * @cssprop --omni-date-picker-scrollbar-thumb-border-radius - Date picker scrollbar thumb border radius.
 * @cssprop --omni-date-picker-scrollbar-thumb-background-color - Date picker scrollbar thumb background color.
 * @cssprop --omni-date-picker-scrollbar-track-padding-top - Date picker scrollbar track top padding.
 * @cssprop --omni-date-picker-scrollbar-track-padding-bottom - Date picker scrollbar track bottom padding.
 * @cssprop --omni-date-picker-scrollbar-track-padding-left - Date picker scrollbar left padding.
 * @cssprop --omni-date-picker-scrollbar-track-padding-right - Date picker scrollbar right padding.
 *
 * @cssprop --omni-date-picker-day-name-font-color - Date picker day name font color.
 * @cssprop --omni-date-picker-day-name-font-weight - Date picker day name font weight.
 * @cssprop --omni-date-picker-day-name-font-size - Date picker day name font size.
 *
 * @cssprop --omni-date-picker-day-button-width - Date picker day button width.
 * @cssprop --omni-date-picker-day-button-height - Date picker day button height.
 *
 * @cssprop --omni-date-picker-day-selected-color - Date picker day selected button color.
 * @cssprop --omni-date-picker-day-selected-width - Date picker day selected width.
 * @cssprop --omni-date-picker-day-selected-height - Date picker day selected height.
 * @cssprop --omni-date-picker-day-selected-border-radius - Date picker day selected border radius.
 * @cssprop --omni-date-picker-day-selected-background-color - Date picker day selected background color.
 */
@customElement('omni-date-picker')
export class DatePicker extends OmniFormElement {
    private defaultLocale: string = 'en-US';
    @query('#picker')
    private _pickerElement: HTMLInputElement;

    /**
     * The locale used for formatting the output of the Date time picker.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = this.defaultLocale;

    // Internal state properties for date picker and
    @state() private date: DateTime = this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined;
    @state() private _showCalendar: boolean = false;
    @state() private _selectedMonth: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).month;
    @state() private _selectedYear: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).year;
    @state() private _selectedDecade: number[] = this._getDecadeInterval(this._selectedYear);
    @state() private _showState: 'days' | 'months' | 'years' = 'days';

    //Internal state properties for dimensions
    @state() private _bottomOfViewport: boolean = false;
    @state() private _isMobile: boolean = false;

    // Internal arrays listing the days of the week and months of the year based on the locale. Note days of the week start from Monday.
    private _months: string[] = Info.months('short', { locale: this.locale });
    private _days: string[] = Info.weekdays('short', { locale: this.locale });

    private _updateDateVariablesUpdate = debounce(() => this._updateDateVariables(), 800);

    override connectedCallback() {
        super.connectedCallback();
        this._mobileCheck();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClick.bind(this));
        this.date = (this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined)?.setLocale(
            this.locale
        );

        // Check for how to render the picker container based on screen dimensions.
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
        if (_changedProperties.has('locale')) {
            this._updateDateVariablesUpdate();
            return false;
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
        const distanceFromBottom = visualViewport.height - this.getBoundingClientRect().bottom;
        if (distanceFromBottom < 150) {
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

    // Updates the internal months, days and date with the updated locale if a valid locale is not provided it will use the default.
    _updateDateVariables() {
        this._months = Info.months('short', { locale: this.locale ? this.locale : this.defaultLocale });
        this._days = Info.weekdays('short', { locale: this.locale ? this.locale : this.defaultLocale });
        this.date = (this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined)?.setLocale(
            this.locale ? this.locale : this.defaultLocale
        );

        this.requestUpdate();
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

    // When the period button is clicked it can either be one of the following examples*/
    _periodClick() {
        switch (this._showState) {
            case 'months':
                this._showState = 'years';
                break;
            case 'years':
                break;
            default:
                this._showState = 'months';
                break;
        }
    }

    // When a day on the calendar is clicked.
    _dateSelect(e: Event, date: DateTime) {
        e.preventDefault();
        e.stopImmediatePropagation();

        this.date = date.setLocale(this.locale);
        this.value = this.date.toISODate();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    date: this.date.toJSDate(),
                    ISO: this.value
                }
            })
        );
        this._toggleCalendar();
    }

    // Toggle the Calender to be visible.
    _toggleCalendar() {
        if (this._showCalendar) {
            this._showCalendar = false;
        } else {
            this._showState = 'days';
            const selectedDate =
                this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local();
            this._selectedYear = (selectedDate.isValid ? selectedDate : DateTime.local()).year;
            this._selectedMonth = (selectedDate.isValid ? selectedDate : DateTime.local()).month;
            this._showCalendar = true;
        }
    }

    // Called when next button of the period bar is clicked.
    _nextClick() {
        switch (this._showState) {
            case 'years':
                this._selectedYear = this._selectedYear + 10;
                this._selectedDecade = this._getDecadeInterval(this._selectedYear);
                break;
            case 'months':
                this._selectedYear = this._selectedYear + 1;
                break;
            case 'days':
                // If month is December set the month to Jan and update the year + 1
                if (this._selectedMonth === 12) {
                    this._selectedMonth = 1;
                    this._selectedYear = this._selectedYear + 1;
                } else {
                    this._selectedMonth = this._selectedMonth + 1;
                }
                break;
            default:
                break;
        }
    }

    // Called when the previous button of the period bar is clicked.
    _previousClick() {
        switch (this._showState) {
            case 'years':
                this._selectedYear = this._selectedYear - 10;
                this._selectedDecade = this._getDecadeInterval(this._selectedYear);
                break; 
            case 'months':
                this._selectedYear = this._selectedYear - 1;
                break;
            case 'days':
                // If the month is Jan set the month to December and update the year - 1
                if (this._selectedMonth === 1) {
                    this._selectedMonth = 12;
                    this._selectedYear = this._selectedYear - 1;
                } else {
                    this._selectedMonth = this._selectedMonth - 1;
                }
                break;
            default:
                break;
        }
    }

    // When the year button is clicked on the year scroller.
    _yearSelect(year: number) {
        this._selectedYear = year;
        this._showState = 'months';
    }

    // When the month button is clicked on the month grid.
    _monthSelect(month: number) {
        this._selectedMonth = month;
        this._showState = 'days';
    }

    // Return an array of numbers from start till end number.
    _getRange(start: number, end: number, step = 1) {
        return Array.from({ length: Math.ceil((end - start) / step) }, (_, k) => k * step + start);
    }

    // Build up an array of years per decade also will include the last year from the previous decade and the first year from a new one.
    _getDecadeInterval(year: number) {
        const decadeArray = [];
        // Consider introducing array from for the following line of code.
        const yearString = year.toString();
        const currentYearPoint = yearString.charAt(yearString.length - 1);
        const decadeStart = year - parseInt(currentYearPoint) - 1;

        for (let index = 0; index < 12; index++) {
            decadeArray.push(decadeStart + index);
        }

        return decadeArray

        // Limitation might not be viable consider just building up an array as 
        // const decadeInterval  = Interval.fromDateTimes({ year: decadeStart - 1}, { year: decadeStart + 10 });
        // return decadeInterval;
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
                min-width: var(--omni-date-picker-min-width, 250px);
                /* Added to stop the transforming of the label when the input is clicked*/
                pointer-events: none;
                cursor: pointer;
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

            /* Styles related to the picker container and its child elements */

            .picker-container {
                z-index: var(--omni-date-picker-container-z-index, 420);;
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
                    top: var(--omni-date-picker-container-top, 100%);
                    border: var(--omni-date-picker-period-container-border-bottom, 1px solid #e1e1e1);
                }

               /* Styles if the element is at the bottom of the screen then render the picker on top of the element */
               .picker-container.bottom {
                   top: var(--omni-date-picker-container-render-bottom-top, 0px);
                   transform: translateY(-100%);
               }
            }

            /* Should only display for mobile rendering */
            .header {
                position: relative;
                left: var(--omni-select-item-header-left, 0px);
                right: var(--omni-select-item-header-right, 0px);
        
                color: var(--omni-select-item-header-font-color, #ffffff);
                font-family: var(--omni-select-item-header-font-family, var(--omni-font-family));
                font-size: var(--omni-select-item-header-font-size, var(--omni-font-size));
                font-weight: var(--omni-select-item-header-font-weight, var(--omni-font-weight));
                background-color: var(--omni-select-item-header-background-color, var(--omni-primary-color));
        
                padding-top: var(--omni-select-item-header-padding-top, 14px);
                padding-bottom: var(--omni-select-item-header-padding-bottom, 14px);
                padding-right: var(--omni-select-item-header-padding-right, 10px);
                padding-left: var(--omni-select-item-header-padding-left, 10px);
        
                border-top-left-radius: var(--omni-select-item-header-border-top-left-radius, 10px);
                border-top-right-radius: var(--omni-select-item-header-border-top-right-radius, 10px);
            }

            .period {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding:var(--omni-date-picker-period-container-padding, 4px 8px);
                border-bottom: var(--omni-date-picker-period-container-border-bottom, 1px solid #e1e1e1);
                background-color: var(--omni-date-picker-period-background-color, var(--omni-background-color));

            }

            .left-control {
                cursor: pointer;
                padding-top: var(--omni-date-picker-period-bar-previous-control-padding-top, 5px);
                width: var(--omni-date-picker-period-bar-previous-control-width, 15px);
            }

            .right-control {
                cursor: pointer;
                padding-top: var(--omni-date-picker-period-bar-next-control-padding-top, 5px);
                width: var(--omni-date-picker-period-bar-next-control-width, 15px);
            }

            /*Consider renaming this*/
            .month-year {
                cursor: pointer;
                width: var(--omni-date-picker-period-center-button);
            }

            .days-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                justify-items: center;
                text-align: center;
                grid-template-columns: var(--omni-date-picker-days-grid-template-columns, 1fr 1fr 1fr 1fr 1fr 1fr 1fr);
                grid-auto-rows: var(--omni-date-picker-days-grid-auto-rows, 30px);
                font-size: var(--omni-date-picker-days-grid-font-size, 14px);
                font-weight: var(--omni-date-picker-days-grid-font-weight, 500);
                width: var(--omni-date-picker-days-grid-width, 100%);
                padding: var(--omni-date-picker-days-grid-padding,8px 10px);
                line-height: var(--omni-date-picker-days-grid-line-height, 18px);
                background-color: var(--omni-date-picker-days-grid-background-color, var(--omni-theme-background-color));
            }

            .month-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                align-items: center;
                justify-items: center;
                text-align: center;
                grid-template-columns: var(--omni-date-picker-month-grid-template-columns, 1fr 1fr 1fr);
                /*
                padding-top: var(--omni-date-picker-month-grid-padding-top, 15.72px);
                                */
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 28px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 28px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 28px);
                background-color: var(--omni-date-picker-months-grid-background-color, var(--omni-theme-background-color));
            }

            .month {
                display: flex;
                width: var(--omni-date-picker-month-button-width, 80px);
                height: var(--omni-date-picker-month-button-height, 48px);
                align-items: center;
                justify-content: center;

                font-family: var(--omni-button-font-family, var(--omni-font-family));
                font-size: var(--omni-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-button-font-weight, bolder);
                line-height: var(--omni-button-line-height);


                background-color: var(--omni-button-clear-background-color, transparent);
                border-color: var(--omni-button-clear-border-color, transparent);
                border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
                color: var(--omni-button-clear-color, var(--omni-primary-color));

                margin-left: 4px;
                margin-right: 4px;
                margin-top: 15.56px;
                margin-bottom: 15.56px;
            }

            .month.current {
                /*
                background-color: var(--omni-button-secondary-background-color, var(--omni-background-color));
                border-color: var(--omni-button-secondary-border-color, var(--omni-primary-color));
                border-width: var(--omni-button-secondary-border-width, var(--omni-border-width));
                color: var(--omni-button-secondary-color, var(--omni-primary-color));*/

                background-color: var(--omni-button-secondary-background-color, var(--omni-background-color));
                border-color: var(--omni-button-secondary-border-color,var(--omni-accent-color));
                border-width: var(--omni-button-secondary-border-width, var(--omni-border-width));
                color: var(--omni-button-secondary-color, var(--omni-accent-color));
                border-style: solid;
                border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
            }

            .month.selected {
                /*
                background-color: var(--omni-date-picker-primary-background-color, var(--omni-primary-color));
                border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                color: var(--omni-button-primary-color, var(--omni-background-color));*/

                background-color: var(--omni-date-picker-primary-background-color, var(--omni-primary-color));
                border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                color: var(--omni-button-primary-color, var(--omni-background-color));
                border-style: solid;
                border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
            }

            .month:hover {

            }
            
            /* Styles for year selector scrollbar */
            .year-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                align-items: center;
                justify-items: center;
                text-align: center;
                grid-template-columns: var(--omni-date-picker-month-grid-template-columns, 1fr 1fr 1fr);
                /*
                padding-top: var(--omni-date-picker-month-grid-padding-top, 15.72px);
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 15.72px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 32px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 32px);
                background-color: var(--omni-date-picker-months-grid-background-color, var(--omni-theme-background-color));*/
                overflow-x: hidden;
                overflow-y: auto;


                                /*
                padding-top: var(--omni-date-picker-month-grid-padding-top, 15.72px);
                                */
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 28px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 28px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 28px);
                background-color: var(--omni-date-picker-months-grid-background-color, var(--omni-theme-background-color));
            }

            .year-scroller {
                justify-items: center;
                overflow-x: hidden;
                overflow-y: auto;
                height: var(--omni-date-picker-year-scroller-height,340px);
                background-color: var(--omni-date-picker-year-scroller-background-color, var(--omni-theme-background-color));
            }

            .year {
                align-items: center;
                justify-content: center;
                display: flex;                
                width: var(--omni-date-picker-year-button-width, 80px);
                height: var(--omni-date-picker-year-button-height, 48px);


                
                font-family: var(--omni-button-font-family, var(--omni-font-family));
                font-size: var(--omni-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-button-font-weight, bolder);
                line-height: var(--omni-button-line-height);


                background-color: var(--omni-button-clear-background-color, transparent);
                border-color: var(--omni-button-clear-border-color, transparent);
                border-width: var(--omni-button-clear-border-width, var(--omni-border-width));
                color: var(--omni-button-clear-color, var(--omni-primary-color));

                margin-left: 4px;
                margin-right: 4px;
                margin-top: 15.56px;
                margin-bottom: 15.56px;
            }

            .year.current {
                background-color: var(--omni-button-secondary-background-color, var(--omni-background-color));
                border-color: var(--omni-button-secondary-border-color, var(--omni-accent-color));
                border-width: var(--omni-button-secondary-border-width, var(--omni-border-width));
                color: var(--omni-button-secondary-color, var(--omni-primary-color));
                border-style: solid;
                border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
            }

            .year.selected {
                background-color: var(--omni-date-picker-primary-background-color, var(--omni-primary-color));
                border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                color: var(--omni-button-primary-color, var(--omni-background-color));
                border-style: solid;
                border-radius: var(--omni-button-border-radius, var(--omni-border-radius));
            }
           
            .year:hover {

            }

            /* Scroll bar styles come back and update css variable names */
            .year-scroller::-webkit-scrollbar {
                width: calc(
                    var(--omni-date-picker-scrollbar-thumb-width, 5px) + var(--omni-date-picker-scrollbar-track-padding-left, 2px) +
                        var(--omni-date-picker-scrollbar-track-padding-right, 2px)
                );
            }

            .year-scroller::-webkit-scrollbar-track {
                border-radius: var(--omni-date-picker-scrollbar-track-border-radius, 10px);
                background-color: var(--omni-date-picker-scrollbar-track-background-color, transparent);
            }

            .year-scroller::-webkit-scrollbar-thumb {
                border-radius: var(--omni-date-picker-scrollbar-thumb-border-radius, 10px);
                background-color: var(--omni-date-picker-scrollbar-thumb-background-color, #d9d9d9);

                border-top: var(--omni-date-picker-scrollbar-track-padding-top, 2px) solid transparent;
                border-bottom: var(--omni-date-picker-scrollbar-track-padding-bottom, 2px) solid transparent;
                border-left: var(--omni-date-picker-scrollbar-track-padding-left, 2px) solid transparent;
                border-right: var(--omni-date-picker-scrollbar-track-padding-right, 2px) solid transparent;

                background-clip: padding-box;
            }

            /**Scroller for year grid implementation */
            .year-grid::-webkit-scrollbar {
                width: calc(
                    var(--omni-date-picker-scrollbar-thumb-width, 5px) + var(--omni-date-picker-scrollbar-track-padding-left, 2px) +
                        var(--omni-date-picker-scrollbar-track-padding-right, 2px)
                );
            }

            .year-grid::-webkit-scrollbar-track {
                border-radius: var(--omni-date-picker-scrollbar-track-border-radius, 10px);
                background-color: var(--omni-date-picker-scrollbar-track-background-color, transparent);
            }

            .year-grid::-webkit-scrollbar-thumb {
                border-radius: var(--omni-date-picker-scrollbar-thumb-border-radius, 10px);
                background-color: var(--omni-date-picker-scrollbar-thumb-background-color, #d9d9d9);

                border-top: var(--omni-date-picker-scrollbar-track-padding-top, 2px) solid transparent;
                border-bottom: var(--omni-date-picker-scrollbar-track-padding-bottom, 2px) solid transparent;
                border-left: var(--omni-date-picker-scrollbar-track-padding-left, 2px) solid transparent;
                border-right: var(--omni-date-picker-scrollbar-track-padding-right, 2px) solid transparent;

                background-clip: padding-box;
            }


            .day-name {
                color: var(--omni-date-picker-day-name-font-color, var(--omni-font-color));
                font-weight: var(--omni-date-picker-day-name-font-weight, 500);
                font-size: var(--omni-date-picker-day-name-font-size, );
            }
          
            .day {
                display: flex;
                cursor: pointer;
                justify-content: center;
                align-items: center;
                width: var(--omni-date-picker-day-button-width, 100%);
                height: var(--omni-date-picker-day-button-height, 100%);
            }

            .day.excluded {
                color: var(--omni-date-picker-day-excluded-color, grey);
                pointer-events: none;
            }

            .day.current {
                text-align: center;
                border: 2px solid var(--omni-accent-color);
                width: var(--omni-date-picker-day-selected-width, 24px);
                height: var(--omni-date-picker-day-selected-height, 24px);
                border-radius: var(--omni-date-picker-day-selected-border-radius, 50%);
            }

            .day.selected {
                color: var(--omni-date-picker-day-selected-color, #FFFFFF);
                width: var(--omni-date-picker-day-selected-width, 24px);
                height: var(--omni-date-picker-day-selected-height, 24px);
                border-radius: var(--omni-date-picker-day-selected-border-radius, 20%);
                background-color: var(--omni-date-picker-day-selected-background-color, var(--omni-primary-color));
            }

            .divider {
                background-color: var(--omni-numeric-input-divider-color, var(--omni-primary-color));
                width: var(--omni-numeric-input-divider-width, 1px);
              }
        `
        ];
    }

    protected override renderContent() {
        return html`
            <input
                class="field"
                id="picker"
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
                ${this._renderSelector()}
            </div>
        `;
    }

    // Render which selector to display.
    _renderSelector() {
        switch (this._showState) {
            case 'months':
                return html`                
                ${this._isMobile && this.label ? html`<div class="header">${this.label}</div>` : nothing}
                ${this._renderPeriod()}
                ${this._renderMonthsGrid()}`;
            case 'years':
                return html`          
                ${this._isMobile && this.label ? html`<div class="header">${this.label}</div>` : nothing}
                ${this._renderPeriod()}
                ${this._renderYearGrid()}`;
            default:
                return html`      
                ${this._isMobile && this.label ? html`<div class="header">${this.label}</div>` : nothing}
                ${this._renderPeriod()}
                ${this._renderDaysGrid()}`;
        }
    }

    // Render the period bar displaying month and year or year depending on state or locale.
    _renderPeriod() {
        /*
        if (this._showState === 'years') {
            return nothing;
            //            this._showState === 'years' ? this.selectedYear : `${this._selectedYear}`
        }*/

        const periodDate = DateTime.local(this._selectedYear, this._selectedMonth, 1).setLocale(this.locale);
        return html`<span class="period">
            <div class="left-control" @click="${() => this._previousClick()}"><omni-chevron-left-icon></omni-chevron-left-icon></div>
            <div class="month-year" @click="${() => this._periodClick()}">${
            this._showState === 'years' ? `${this._selectedDecade[0]} - ${this._selectedDecade[this._selectedDecade.length - 1]}`: this._showState === 'months' ? this._selectedYear : `${periodDate.monthLong} ${this._selectedYear}`
        }</div>
            <div class="right-control" @click="${() => this._nextClick()}"><omni-chevron-right-icon></omni-chevron-right-icon></div>
        </span>`;
    }

    _renderMonthAndYear(period: DateTime) {
        return `${period.monthLong} ${this._selectedYear}`;
    }

    _renderDecade(decade:  number[]) {
        return `${decade[0]} - ${decade[decade.length - 1]}`;
    }

    // Render the day names in short notation.
    _renderDayNameBar() {
        return html`${this._days.map((day) => html`<div class="day-name">${day}</div>`)}`;
    }

    // Render the calendar and period bar.
    _renderDaysGrid() {
        return html`
        <div class="days-grid">
            ${this._renderDayNameBar()}
            ${this._renderCalendar()}
        </div>
        `;
    }

    // Render the calendar grid
    _renderCalendar() {
        const date = DateTime.local(this._selectedYear, this._selectedMonth, 1);

        /* Current Month */
        //Get the start date of the month.
        const monthStartDate = date.startOf('month');
        //Get the first weekday of the month 1 is Monday and 7 is Sunday.
        const monthFirstDay = monthStartDate.weekday;
        //Get the end weekday of the month.
        const monthLastDay = date.endOf('month').weekday;
        //Get the amount of days in the month
        const daysInMonth = date.daysInMonth;

        /* Previous month */
        // Get the first day of the previous month
        const previousMonth = monthStartDate.minus({ months: 1 });
        // Get the amount of days in the previous month.
        const daysInPreviousMonth = previousMonth.daysInMonth;
        // Get the amount days from the previous month to display in the calendar.
        const previousMonthDays = monthFirstDay - 1;

        const previousMonthStartDate = DateTime.local(previousMonth.year, previousMonth.month, daysInPreviousMonth - previousMonthDays + 1);

        /* Next month */
        const nextMonth = monthStartDate.plus({ month: 1 });
        const nextMonthDays = 7 - monthLastDay;

        return html`
        	${previousMonthDays > 0 ? this._renderDays(previousMonthStartDate, previousMonthDays) : nothing}
			${this._renderDays(monthStartDate, daysInMonth)}
			${nextMonthDays > 0 ? this._renderDays(nextMonth, nextMonthDays) : nothing}
        `;
    }

    // Render the days
    _renderDays(startDate: DateTime, numberOfDays: number) {
        const beginDate = startDate.day;
        const dates = this._getRange(beginDate, beginDate + numberOfDays);

        return dates.map((date) => {
            const currentDate = DateTime.local(startDate.year, startDate.month, date);

            return this._renderDay(currentDate);
        });
    }

    // Render the specific days to be displayed on the calendar.
    _renderDay(date: DateTime) {
        const dayStyles: ClassInfo = {
            day: true,
            current: DateTime.local().hasSame(date, 'day'),
            selected: this.date && this.date.isValid && this.date.hasSame(date, 'day'),
            excluded: date.month !== this._selectedMonth
        };

        return html`
            <div class=${classMap(dayStyles)} @click=${(e: MouseEvent) => this._dateSelect(e, date)}>
                <div class="day-label">${date.day}</div>    
            </div>
        `;
    }

    // Render the years scroller.
    _renderYearsScroller() {
        return html`
        <div class="year-scroller">
            ${this._renderYearButtons()}
        </div>
        `;
    }

    _renderYearGrid() {
        return html`
        <div class="year-grid">
            ${this._renderYearButtons()}
        </div>
        `;
    }

    // Render the year buttons in the scroller.
    _renderYearButtons() {

        const yearButtons = this._selectedDecade
        .map((year) => {
            return this._renderYearButton(year);
        });

        // const yearButtons = this._selectedDecade.splitBy(Duration.fromObject({ years: 1 }))

        /*
        const yearButtons = Interval.fromDateTimes({ year: this._selectedYear - 100 }, { year: this._selectedYear + 20 })
            .splitBy(Duration.fromObject({ years: 1 }))
            .map((year) => {
                return this._renderYearButton(year);
            });*/

        return yearButtons;
    }

    _renderYearGridButton (year: Interval) {
        const yearStyles: ClassInfo = {
            gridYear: true,
            current: DateTime.local().year === year.start.year,
            selected: this.date && this.date.isValid && this.date.year === year.start.year
        };

        return html`<omni-button class=${classMap(yearStyles)} type="${yearStyles.selected ? `primary` : yearStyles.current ? `secondary` : `clear`}" label="${
            year.start.year
        }" @click="${() => this._yearSelect(year.start.year)}"></omni-button>
        `;
    }
    
    _renderYearButton(year: number) {
        const yearStyles: ClassInfo = {
            year: true,
            current: DateTime.local().year === year,
            selected: this.date && this.date.isValid && this.date.year === year,
            out: false
        };

        return html`<div class=${classMap(yearStyles)} @click="${() => this._yearSelect(year)}">${year}</div>`

        //Remove the omni-button implementation.
        /*
        return html`<omni-button class=${classMap(yearStyles)} type="${yearStyles.selected ? `primary` : yearStyles.current ? `secondary` : `clear`}" label="${
            year
        }" @click="${() => this._yearSelect(year)}"></omni-button>
        `;*/
    }

    _renderYearsGrid() {
        return html`
        <div class="year-grid">
            ${this._renderYearButtons()}
        </div>
        `;
    }

    // Render the months grid
    _renderMonthsGrid() {
        return html`
        <div class="month-grid">
            ${this._renderMonthButtons()}
        </div>
        `;
    }

    // Render the month buttons
    _renderMonthButtons() {
        return this._months.map((month, i) => {
            return this._renderMonthButton(month, i);
        });
    }

    _renderMonthButton(month: string, index: number) {
        const monthStyles: ClassInfo = {
            month: true,
            current: DateTime.local().year === this._selectedYear && DateTime.local().monthShort === month,
            selected: this.date && this.date.isValid && this.date.year === this._selectedYear && this.date.monthShort === month
        };

        return html`<div class=${classMap(monthStyles)} @click="${() =>
            this._monthSelect(index + 1)}">${month}</div>`
        /*
        return html`<omni-button class=${classMap(monthStyles)} label="${month}" type="${monthStyles.current ? `secondary` : monthStyles.selected ? `primary` : `clear`}" @click="${() =>
            this._monthSelect(index + 1)}"></omni-button>`;*/
    }
}
