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
 * @cssprop --omni-date-picker-control-icon-width - Date picker control icon width.
 * @cssprop --omni-date-picker-control-icon-color - Date picker control icon color.
 * 
 * @cssprop --omni-date-picker-container-width - Date picker container width.
 * @cssprop --omni-date-picker-container-top - Date picker container top.
 * @cssprop --omni-date-picker-period-container-border-bottom - Date picker container bottom.
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
 * @cssprop --omni-date-picker-grid-auto-rows - Date picker days grid auto rows.
 * @cssprop --omni-date-picker-grid-font-size - Date picker days grid font size.
 * @cssprop --omni-date-picker-grid-font-weight - Date picker days grid font weight.
 * @cssprop --omni-date-picker-grid-width - Date picker days grid width.
 * @cssprop --omni-date-picker-grid-padding - Date picker days grid padding.
 * @cssprop --omni-date-picker-grid-line-height - Date picker days grid line height.
 * 
 * @cssprop --omni-date-picker-month-grid-template-columns - Date picker month grid template columns.
 * @cssprop --omni-date-picker-month-grid-padding-top - Date picker month grid top padding.
 * @cssprop --omni-date-picker-month-grid-padding-bottom - Date picker month grid bottom padding.
 * @cssprop --omni-date-picker-month-grid-padding-right - Date picker month grid right padding.
 * @cssprop --omni-date-picker-month-grid-padding-left - Date picker month grid left padding.
 * 
 * @cssprop --omni-date-picker-month-button-width - Date picker month button width.
 * @cssprop --omni-date-picker-month-button-height - Date picker month button height.
 * 
 * @cssprop --omni-date-picker-year-scroller-height - Date picker year scroller height.
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

    // Internal state properties
    @state() private date: DateTime = this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined;
    @state() private _showCalendar: boolean = false;
    @state() private _selectedMonth: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).month;
    @state() private _selectedYear: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).year;
    @state() private _showState: 'days' | 'months' | 'years' = 'days';

    // Internal arrays listing the days of the week and months of the year based on the locale. Note days of the week start from Monday.
    private _months: string[] = Info.months('short', { locale: this.locale });
    private _days: string[] = Info.weekdays('short', { locale: this.locale });

    private _updateDateVariablesUpdate = debounce(() => this._updateDateVariables(), 800);

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._inputClick.bind(this));
        window.addEventListener('click', this._windowClick.bind(this));
        this.date = (this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined)?.setLocale(
            this.locale
        );

        // Check for how to render the picker container based on screen dimensions.
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

    _toggleCalendar() {
        if (this._showCalendar) {
            this._showCalendar = false;
        } else {
            this._showState = 'days';
            const selectedDate = this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local();
            this._selectedYear = (selectedDate.isValid ? selectedDate : DateTime.local()).year;
            this._selectedMonth = (selectedDate.isValid ? selectedDate : DateTime.local()).month;
            this._showCalendar = true;
        }
    }

    // When the right button of the period bar is clicked
    _nextClick() {
        switch (this._showState) {
            case 'months':
                this._selectedYear = this._selectedYear + 1;
                break;
            case 'days':
                // If month is December set the month to Jan and update the year + 1
                if(this._selectedMonth === 12){
                    this._selectedMonth = 1;
                    this._selectedYear = this._selectedYear + 1;
                }else{
                    this._selectedMonth = this._selectedMonth + 1;
                }
                break;
            default:
                break;
        }
    }

    // When the left button of the period bar is clicked
    _previousClick() {
        switch (this._showState) {
            case 'months':
                this._selectedYear = this._selectedYear - 1;
                break;
            case 'days':
                // If the month is Jan set the month to December and update the year - 1 
                if(this._selectedMonth === 1){
                    this._selectedMonth = 12;
                    this._selectedYear = this._selectedYear - 1;
                }else{
                    this._selectedMonth = this._selectedMonth - 1;
                }
                break;
            default:
                break;
        }
        /*
        console.log('left button clicked');
        return;*/
    }

    _yearSelect(year: number) {
        this._selectedYear = year;
        this._showState = 'months';
    }

    _monthSelect(month: number) {
        this._selectedMonth = month;
        this._showState = 'days';
    }

    // Return an array of numbers from start till end number.
    _getRange(start: number, end: number, step = 1) {
        return Array.from({ length: Math.ceil((end - start) / step) }, (_, k) => k * step + start);
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
                /* Added to stop the transforming of the label when the input is clicked */
               /* pointer-events: none;*/
                cursor: pointer;
            }

            .control {
                display: flex;
                cursor: pointer;
                justify-content: center;

                width: var(--omni-date-picker-control-width, 40px);
            }

            .control:hover  {
                /* Look into method to cover the margins*/
                background-color: var(--omni-date-picker-control-hover, var(--omni-accent-hover-color));
            }

            .control-icon {
                width: var(--omni-date-picker-control-icon-width, 20px);
                fill: var(--omni-date-picker-control-icon-color, var(--omni-primary-color));
            }

            /** Styles related to the picker container and its child elements */
            .picker-container {
                z-index: var(--omni-select-items-container-z-index, 420);;
            }

            /* Picker container mobile*/
            @media screen and (max-width: 766px) {
                .picker-container {
                    position: fixed;

                    left: var(--omni-select-mobile-items-container-left, 0px);
                    right: var(--omni-select-mobile-items-container-right, 0px);
                    bottom: var(--omni-select-mobile-items-container-bottom, 0px);
                    top: none;

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
                padding-top: var(--omni-date-picker-month-grid-padding-top, 15.72px);
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 15.72px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 32px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 32px);
                background-color: var(--omni-date-picker-months-grid-background-color, var(--omni-theme-background-color));
            }

            .month {
                width: var(--omni-date-picker-month-button-width, 80px);
                height: var(--omni-date-picker-month-button-height, 48px);
            }

            /* Resolve the color
            .month.current {
                background-color: var(--omni-date-picker-month-button-current-background-color, var(--omni-primary-color));
                color: var(--omni-date-picker-month-button-current-color, #FFFFFF);
            }*/

            .year-scroller {
                justify-items: center;
                overflow-x: hidden;
                overflow-y: auto;
                /* Update */
                height: var(--omni-date-picker-year-scroller-height,340px);
                background-color: var(--omni-date-picker-year-scroller-background-color, var(--omni-theme-background-color));
            }

            .year {
                width: var(--omni-date-picker-year-button-width, 288px);
                height: var(--omni-date-picker-year-button-height, 56px);
            }

            .year:hover {

            }

            /* Resolve 
            .year.current {
                background-color: var(--omni-date-picker-year-button-current-background-color, var(--omni-primary-color));
                color: var(--omni-date-picker-year-button-current-color, #FFFFFF);
            }*/


            /* Styles for year selector scrollbar */

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

            .day-name {
                color: var(--omni-date-picker-day-name-font-color, var(--omni-font-color));
            }
          
            .day {
                display: flex;
                cursor: pointer;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
            }

            .day.excluded {
                color: var(--omni-date-picker-day-excluded-color, grey);
                pointer-events: none;
            }

            /* Review this can be implemented in the sub element instead of this*/
            .day.current {
                color: var(--omni-date-picker-day-current-color, var(--omni-primary-color));
                font-weight: 800;
                border-bottom: 2px dotted blue;
                text-align: center;
            }

            .day.current:after {
                /*border-bottom: 2px dotted blue;*/
            }

            .day.selected {
                color: var(--omni-date-picker-day-selected-color, #FFFFFF);
                width: var(--omni-date-picker-day-selected-width, 24px);
                height: var(--omni-date-picker-day-selected-height, 24px);
                border-radius: var(--omni-date-picker-day-selected-border-radius, 20%);
                background-color: var(--omni-date-picker-day-selected-background, var(--omni-primary-color));
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
        return html` <div id="control" class="control">
            <omni-calendar-icon class="control-icon"></omni-calendar-icon>
        </div>`;
    }

    protected override renderPicker() {
        if (!this._showCalendar) {
            return nothing;
        }
        return html`
            <div id="picker-container" class="picker-container">
                <!--Use this section for testing can be _renderDays() or switch to _renderMonthsGrid()-->
                ${this._renderSelector()}
            </div>
        `;
    }

    // Render which selector.
    _renderSelector() {
        switch (this._showState) {
            case 'months':
                return html`
            ${this._renderPeriod()}
            ${this._renderMonthsGrid()}`;
            case 'years':
                return html`
                ${this._renderYearsScroller()}`;
            default:
                return html`
                ${this._renderPeriod()}
                ${this._renderDaysGrid()}`;
        }
    }

    // Render the period bar at the top of the container which will render the left and right chevron along with the month and year depending on state.
    _renderPeriod() {
        if (this._showState === 'years') {
            return nothing;
        }

        const periodDate = DateTime.local(
            this._selectedYear,
            this._selectedMonth,
            1
        ).setLocale(this.locale);
        return html`<span class="period">
            <div class="left-control" @click="${() => this._previousClick()}"><omni-chevron-left-icon></omni-chevron-left-icon></div>
            <div class="month-year" @click="${() => this._periodClick()}">${
            this._showState === 'months'
                ? this._selectedYear
                : `${periodDate.monthLong} ${this._selectedYear}`
        }</div>
            <div class="right-control" @click="${() => this._nextClick()}"><omni-chevron-right-icon></omni-chevron-right-icon></div>
        </span>`;
    }

    // Render the day names in short notation.
    _renderDayNameBar() {
        return html`${this._days.map((day) => html`<div class="day-name">${day}</div>`)}`;
    }

    // Render the individual days along with the period bar
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
                <div class="">${date.day}</div>    
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

    // Render the year buttons in the scroller.
    _renderYearButtons() {

        const yearButtons = Interval.fromDateTimes(
            { year: this._selectedYear - 5},
            { year: this._selectedYear + 5 }
        ).splitBy(Duration.fromObject({ years: 1 })).map(
                (year) => {
                 return this._renderYearButton(year)
                }

        )

        return yearButtons;
    }

    //Adding to make class map testing
    _renderYearButton(year: Interval) {
        const yearStyles: ClassInfo = {
            year: true,
            current: this.date && this.date.isValid && this.date.year === DateTime.local(year.start.year).year
        };

        return  html`<omni-button class=${classMap(yearStyles)} type="${yearStyles.current ? `primary` : `clear`}" label="${year.start.year}" @click="${() =>
                    this._yearSelect(year.start.year)}"></omni-button>
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

        return this._months.map(
            (month, i) => {
                return this._renderMonthButton(month, i);
        });
    }

    // Render specific month button
    _renderMonthButton(month: string, index: number) {
        const monthStyles: ClassInfo = {
            month: true,
            current: this.date && this.date.isValid && this.date.monthShort === month 
        };
        return html`<omni-button class=${classMap(monthStyles)} label="${month}" type="${monthStyles.current ? `primary` : `clear`}" @click="${() => this._monthSelect(index + 1)}"></omni-button>`
    }
}
 