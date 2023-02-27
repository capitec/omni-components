import { css, html, nothing, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { debounce } from 'lodash';
import { DateTime, Info } from 'luxon';
import OmniElement from '../core/OmniElement.js';
import '../icons/ChevronLeft.icon.js';
import '../icons/ChevronRight.icon.js';

/**
 * Calendar component to set specific date.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/calendar';
 * ```
 *
 * @example
 * ```html
 * <omni-calendar
 * value="2023-02-23"
 * locale="en-US">
 * </omni-calendar>
 * ```
 * @element omni-calendar
 *
 * @cssprop --omni-calendar-container-box-shadow - Calendar container box shadow.
 * @cssprop --omni-calendar-container-border-radius - Calendar container border radius.
 * @cssprop --omni-calendar-container-z-index - Calendar container z-index.
 * 
 * @cssprop --omni-calendar-period-bar-padding - Calendar period container padding.
 * @cssprop --omni-calendar-period-bar-border-bottom - Calendar period container border bottom.
 * @cssprop --omni-calendar-period-bar-background-color - Calendar period container background color.
 * @cssprop --omni-calendar-period-bar-min-height - Calendar period container minimum height.
 * 
 * @cssprop --omni-calendar-period-bar-control-color - Calendar period bar control color.
 * @cssprop --omni-calendar-period-bar-control-width - Calendar period bar control width.
 * 
 * @cssprop --omni-calendar-month-year-display-width - Calender month/year display width.
 * @cssprop --omni-calendar-month-year-display-color - Calendar month/year display color.
 * @cssprop --omni-calendar-month-year-display-font-size - Calendar month/year display font size.
 * @cssprop --omni-calendar-month-year-display-font-weight - Calendar month/year display font weight.
 * 
 * @cssprop --omni-calendar-month-year-display-hover-background-color - Calendar month/year display background color.
 * 
 * @cssprop --omni-calendar-days-grid-template-columns - Calendar days grid template columns.
 * @cssprop --omni-calendar-days-grid-auto-rows - Calendar days grid auto rows.
 * @cssprop --omni-calendar-days-grid-padding - Calendar days grid padding.
 * @cssprop --omni-calendar-days-grid-line-height - Calendar days grid line height.
 * @cssprop --omni-calendar-days-grid-background-color - Calendar days grid background color.
 * 
 * @cssprop --omni-calendar-month-grid-template-columns - Calendar month grid template columns.
 * @cssprop --omni-calendar-month-grid-auto-rows - Calendar month grid auto rows.
 * @cssprop --omni-calendar-months-grid-padding - Calendar month grid padding.
 * @cssprop --omni-calendar-months-grid-background-color - Calendar month grid background color.
 * 
 * @cssprop --omni-calendar-year-grid-template-columns - Calendar year grid template columns.
 * @cssprop --omni-calendar-year-grid-auto-rows - Calendar year grid auto rows.
 * @cssprop --omni-calendar-year-grid-padding - Calendar year grid padding.
 * @cssprop --omni-calendar-year-grid-background-color - Calendar year grid background color.
 * 
 * @cssprop --omni-calendar-month-button-width - Calendar month button width.
 * @cssprop --omni-calendar-month-button-height - Calendar month button height.
 * @cssprop --omni-calendar-month-button-background-color - Calendar month button background color.
 * @cssprop --omni-calendar-month-button-border-color - Calendar month button border color.
 * @cssprop --omni-calendar-month-button-border-width - Calendar month button border width.
 * @cssprop --omni-calendar-month-button-border-radius - Calendar month button border radius.
 * @cssprop --omni-calendar-month-button-margin-left - Calendar month button margin left.
 * @cssprop --omni-calendar-month-button-margin-right - Calendar month button margin right.
 * @cssprop --omni-calendar-month-button-color - Calendar month button color
 * @cssprop --omni-calendar-month-button-font-family - Calendar month button font family.
 * @cssprop --omni-calendar-month-button-font-size - Calendar month button font size.
 * @cssprop --omni-calendar-month-button-font-weight - Calendar month button font weight.
 * @cssprop --omni-calendar-month-button-line-height - Calendar month button line height.
 * 
 * @cssprop --omni-calendar-month-button-selected-border-radius - Calendar month selected border radius.
 * @cssprop --omni-calendar-month-button-selected-background-color - Calendar month button selected background color.
 * @cssprop --omni-calendar-month-button-selected-border-color - Calendar month button selected border color.
 * @cssprop --omni-calendar-month-button-selected-border-width - Calendar month selected border width.
 * @cssprop --omni-calendar-month-button-selected-color - Calendar month selected color.
 * 
 * @cssprop --omni-calendar-month-button-hover-background-color - Calendar month button hover background color.
 * 
 * @cssprop --omni-calendar-year-button-width - Calendar year button width.
 * @cssprop --omni-calendar-year-button-height - Calendar year button height.
 * @cssprop --omni-calendar-year-button-background-color - Calendar year button background color.
 * @cssprop --omni-calendar-year-button-border-color - Calendar year button border color.
 * @cssprop --omni-calendar-year-button-border-width - Calendar year button border width.
 * @cssprop --omni-calendar-year-button-border-radius -  Calendar year button border radius.
 * @cssprop --omni-calendar-year-button-margin-left - Calendar year button margin left.
 * @cssprop --omni-calendar-year-button-margin-right - Calendar year button margin right.
 * @cssprop --omni-calendar-year-button-color - Calendar year button color.
 * @cssprop --omni-calendar-year-button-font-family - Calendar year button font family.
 * @cssprop --omni-calendar-year-button-font-size - Calendar year button font size.
 * @cssprop --omni-calendar-year-button-font-weight - Calendar year button font weight.
 * @cssprop --omni-calendar-year-button-line-height - Calendar year button line height.
 * 
 * @cssprop --omni-calendar-year-button-selected-border-radius - Calendar selected year button border radius.
 * @cssprop --omni-calendar-year-button-selected-background-color - Calendar selected year button background color.
 * @cssprop --omni-calendar-year-button-selected-border-color - Calendar selected year button border color.
 * @cssprop --omni-calendar-year-button-selected-border-width - Calendar selected year button border width.
 * @cssprop --omni-calendar-year-button-selected-color - Calendar year button selected color.
 * 
 * @cssprop --omni-calendar-year-button-hover-background-color - Calendar year button hover background color.
 * 
 * @cssprop --omni-calendar-day-name-font-color - Calendar day name font color.
 * @cssprop --omni-calendar-day-name-font-weight - Calendar day name font weight.
 * @cssprop --omni-calendar-day-name-font-size - Calendar day name font size.
 * @cssprop --omni-calendar-day-name-width - Calendar day name width.
 * @cssprop --omni-calendar-day-name-height - Calendar day name height.
 * 
 * @cssprop --omni-calendar-day-button-width - Calendar day button width.
 * @cssprop --omni-calendar-day-button-height - Calendar day button height.
 * 
 * @cssprop --omni-calendar-day-button-hover-background-color - Calendar day button hover background color.
 * 
 * @cssprop --omni-calendar-day-button-excluded-font-color - Calendar day button excluded color.
 * 
 * @cssprop --omni-calendar-day-current-button-border - Calendar day button current border.
 * @cssprop --omni-calendar-day-current-button-border-radius - Calendar day button current border radius.
 * @cssprop --omni-calendar-day-current-button-width - Calendar day button current width.
 * @cssprop --omni-calendar-day-current-button-height - Calendar day button current height.
 * 
 * @cssprop --omni-calendar-day-selected-button-color - Calendar day button selected color.
 * @cssprop --omni-calendar-day-selected-button-border-radius - Calendar day button selected border radius.
 * @cssprop --omni-calendar-day-selected-button-background-color - Calendar day button selected background color.
 * @cssprop --omni-calendar-day-selected-button-width - Calendar day button selected width.
 * @cssprop --omni-calendar-day-selected-button-height - Calendar day button selected height.
 * 
 */
@customElement('omni-calendar')
export class Calendar extends OmniElement {
    private defaultLocale: string = 'en-US';

    /**
     * The locale used for formatting the output of the Calendar.
     * @attr
     */
    @property({ type: String, reflect: true }) locale: string = this.defaultLocale;
    /*@property({ type: String, reflect: true }) locale: string = this.defaultLocale;*/

    /**
     * The value of the Calendar component
     * @attr
     */
    @property({ type: String, reflect: true }) value?: string;

    // Internal state properties for date picker and
    @state() private date: DateTime = this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local().setLocale(this.locale);

    @state() private _selectedMonth: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).month;
    @state() private _selectedYear: number = (this.date && this.date.isValid ? this.date : DateTime.local().setLocale(this.locale)).year;
    @state() private _selectedDecade: number[] = this._getDecadeInterval(this._selectedYear);
    @state() private _showState: 'days' | 'months' | 'years' = 'days';

    // Internal arrays listing the days of the week and months of the year based on the locale. Note days of the week start from Monday.
    private _months: string[] = Info.months('short', { locale: this.locale });
    private _days: string[] = Info.weekdays('short', { locale: this.locale });

    private _updateDateVariablesUpdate = debounce(() => this._updateDateVariables(), 800);
    
    override connectedCallback() {
        super.connectedCallback();

        this.date = (this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined)?.setLocale(
            this.locale
        ) as DateTime;
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
        ) as DateTime;

        this.requestUpdate();
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

        return decadeArray;

        // Limitation might not be viable consider just building up an array as
        // const decadeInterval  = Interval.fromDateTimes({ year: decadeStart - 1}, { year: decadeStart + 10 });
        // return decadeInterval;
    }

    static override get styles() {
        return [
            super.styles,
            css`

            /* Container for the Calendar component*/
            .calendar-container {
                cursor: default;

                box-shadow: var(--omni-calendar-container-box-shadow, 0 0 0 1px #E1E1E1); /* added this */
                /*border: var(--omni-calendar-container-border, 1px solid grey);*/
                border-radius: var(--omni-calendar-container-border-radius, 4px);
                z-index: var(--omni-calendar-container-z-index, 420);
            }

            /* Styles for period bar */
            .period {
                border-radius: inherit;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                padding: var(--omni-calendar-period-bar-padding, 4px 8px);
                border-bottom: var(--omni-calendar-period-bar-border-bottom, 1px solid  #E1E1E1);
                background-color: var(--omni-calendar-period-bar-background-color, var(--omni-background-color));
                min-height: var(--omni-calendar-period-bar-min-height,56px);

            }

            .left-control,
            .right-control{
                cursor: pointer;

                fill: var(--omni-calendar-period-bar-control-color, var(--omni-primary-color));
                width: var(--omni-calendar-period-bar-control-width, 23px);
            }

            /*Consider renaming this*/
            .month-year-display {
                cursor: pointer;
                text-align: center;

                width: var(--omni-calendar-month-year-display-width , 112px);

                color: var(--omni-calendar-month-year-display-color, var(--omni-font-color));
                font-size: var(--omni-calendar-month-year-display-font-size,16px);
                font-weight: var(--omni-calendar-month-year-display-font-weight, 600);
            }

            .month-year-display:hover {
                background-color: var(--omni-calendar-month-year-display-hover-background-color, var(--omni-background-hover-color));
            }

            .days-grid,
            .month-grid,
            .year-grid {
                border-radius: inherit;
            }

            /* Grid styles for days, months and years */
            .days-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                justify-items: center;
                text-align: center;

                grid-template-columns: var(--omni-calendar-days-grid-template-columns, 1fr 1fr 1fr 1fr 1fr 1fr 1fr);
                grid-auto-rows: var(--omni-calendar-days-grid-auto-rows, 40px);

                padding: var(--omni-calendar-days-grid-padding, 10px 10px);
                line-height: var(--omni-calendar-days-grid-line-height, 18px);
                background-color: var(--omni-calendar-days-grid-background-color, var(--omni-theme-background-color));
            }

            .month-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                justify-items: center;
                text-align: center;

                grid-template-columns: var(--omni-calendar-month-grid-template-columns, 1fr 1fr 1fr);
                grid-auto-rows: var(--omni-calendar-month-grid-auto-rows, 60px);

                padding: var(--omni-calendar-months-grid-padding,10px 10px);
                background-color: var(--omni-calendar-months-grid-background-color, var(--omni-theme-background-color));
            }

            .year-grid {
                display: grid;
                justify-content: center;
                align-items: center;
                align-items: center;
                justify-items: center;
                text-align: center;

                grid-template-columns: var(--omni-calendar-year-grid-template-columns, 1fr 1fr 1fr);
                grid-auto-rows: var(--omni-calendar-year-grid-auto-rows, 60px);

                padding: var(--omni-calendar-year-grid-padding,10px 10px);
                background-color: var(--omni-calendar-year-grid-background-color, var(--omni-theme-background-color));
            }

            /* Month Button styles */
            .month {
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;

                width: var(--omni-calendar-month-button-width, 73px);
                height: var(--omni-calendar-month-button-height, 48px);

                background-color: var(--omni-calendar-month-button-background-color, var(--omni-background-color));
                border-color: var(--omni-calendar-month-button-border-color); 
                border-width: var(--omni-calendar-month-button-border-width);
                border-radius: var(--omni-calendar-month-button-border-radius, 5px);

                margin-left: var(--omni-calendar-month-button-margin-left,2px);
                margin-right: var(--omni-calendar-month-button-margin-right,2px);

                color: var(--omni-calendar-month-button-color, var(--omni-font-color));
                font-family: var(--omni-calendar-month-button-font-family, var(--omni-font-family));
                font-size: var(--omni-calendar-month-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-calendar-month-button-font-weight, 600);
                line-height: var(--omni-calendar-month-button-line-height);
            }

            .month.selected {
                border-style: solid;
                border-radius: var(--omni-calendar-month-button-selected-border-radius, var(--omni-border-radius));
                background-color: var(--omni-calendar-month-button-selected-background-color, var(--omni-primary-color));
                border-color: var(--omni-calendar-month-button-selected-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-month-button-selected-border-width, var(--omni-border-width));
                color: var(--omni-calendar-month-button-selected-color, var(--omni-background-color));


            }

            .month:hover {
                background-color: var(--omni-calendar-month-button-hover-background-color, var(--omni-accent-hover-color));
            }

            /* Year button styles */
            .year {
                display: flex;
                cursor: pointer; 
                align-items: center;
                justify-content: center;

                width: var(--omni-calendar-year-button-width, 73px);
                height: var(--omni-calendar-year-button-height, 48px);

                background-color: var(--omni-calendar-year-button-background-color, var(--omni-background-color));
                border-color: var(--omni-calendar-year-button-border-color, var(--omni-primary-color));               
                border-width: var(--omni-calendar-year-button-border-width, var(--omni-border-width));
                border-radius: var(--omni-calendar-year-button-border-radius, 5px);

                margin-left: var(--omni-calendar-year-button-margin-left,2px);
                margin-right: var(--omni-calendar-year-button-margin-right,2px);

                color: var(--omni-calendar-year-button-color, var(--omni-font-color));
                font-family: var(--omni-calendar-year-button-font-family, var(--omni-font-family));
                font-size: var(--omni-calendar-year-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-calendar-year-button-font-weight, 600);
                line-height: var(--omni-calendar-year-button-line-height);

            }

            .year.selected {
                border-style: solid;
                border-radius: var(--omni-calendar-year-button-selected-border-radius, var(--omni-border-radius));
                background-color: var(--omni-calendar-year-button-selected-background-color, var(--omni-primary-color));
                border-color: var(--omni-calendar-year-button-selected-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-year-button-selected-border-width, var(--omni-border-width));
                color: var(--omni-calendar-year-button-selected-color, var(--omni-background-color));
            }
           
            .year:hover {
                background-color: var(--omni-calendar-year-button-hover-background-color, var(--omni-accent-hover-color));
            }

            /* Day name grid item styles*/
            .day-name {
                display: flex;
                justify-content: center;
                align-items: center;

                color: var(--omni-calendar-day-name-font-color, var(--omni-font-color));
                font-weight: var(--omni-calendar-day-name-font-weight, 500);
                font-size: var(--omni-calendar-day-name-font-size, 16px);
                width: var(--omni-calendar-day-name-width, 33px);
                height: var(--omni-calendar-day-name-height,40px);
            }
          
            /* Day item button styles*/
            .day {
                display: flex;
                cursor: pointer;
                justify-content: center;
                align-items: center;

                width: var(--omni-calendar-day-button-width,33px);
                height: var(--omni-calendar-day-button-height,40px);
            }

            .day:hover {
                background-color: var(--omni-calendar-day-button-hover-background-color, var(--omni-accent-hover-color));
            }

            .day.excluded {
                pointer-events: none;
                color: var(--omni-calendar-day-button-excluded-font-color, grey);
            }

            .day.current {
                text-align: center;
                border: var(--omni-calendar-day-current-button-border,2px solid var(--omni-primary-color));
                border-radius: var(--omni-calendar-day-current-button-border-radius, 50%);
                width: var(--omni-calendar-day-current-button-width, 24px);
                height: var(--omni-calendar-day-current-button-height, 24px);
            }

            .day.selected {
                color: var(--omni-calendar-day-selected-button-color, #FFFFFF);
                border-radius: var(--omni-calendar-day-selected-button-border-radius, 20%);
                background-color: var(--omni-calendar-day-selected-button-background-color, var(--omni-primary-color));
                width: var(--omni-calendar-day-selected-button-width, 24px);
                height: var(--omni-calendar-day-selected-button-height, 24px);
            }


            `
        ];
    }

    override render(): TemplateResult {
        return html`
            <div id="calendar-container" class="calendar-container">
                ${this._renderSelector()}
            </div>
        `;
    }

    // Render which selector to display.
    _renderSelector() {
        switch (this._showState) {
            case 'months':
                return html`                
                ${this._renderPeriod()}
                ${this._renderMonthsGrid()}`;
            case 'years':
                return html`          
                ${this._renderPeriod()}
                ${this._renderYearsGrid()}`;
            default:
                return html`      
                ${this._renderPeriod()}
                ${this._renderDaysGrid()}`;
        }
    }

    // Render the period bar displaying month and year or year depending on state or locale.
    _renderPeriod() {

        const periodDate = DateTime.local(this._selectedYear, this._selectedMonth, 1).setLocale(this.locale);
        return html`<span class="period">
            <div class="left-control" @click="${() => this._previousClick()}"><omni-chevron-left-icon></omni-chevron-left-icon></div>
            <div class="month-year-display" @click="${() => this._periodClick()}">${
            this._showState === 'years'
                ? `${this._selectedDecade[0]} - ${this._selectedDecade[this._selectedDecade.length - 1]}`
                : this._showState === 'months'
                ? this._selectedYear
                : `${periodDate.monthLong} ${this._selectedYear}`
        }</div>
            <div class="right-control" @click="${() => this._nextClick()}"><omni-chevron-right-icon></omni-chevron-right-icon></div>
        </span>`;
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

    // Render the day names in short notation.
    _renderDayNameBar() {
        return html`${this._days.map((day) => html`<div class="day-name">${day}</div>`)}`;
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

    /* Months grid and button render functions*/
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
            selected: this.date && this.date.isValid && this.date.year === this._selectedYear && this.date.monthShort === month
        };

        return html`<div class=${classMap(monthStyles)} @click="${() => this._monthSelect(index + 1)}">${month}</div>`;
    }

    /* Year grid and button render functions */
    _renderYearsGrid() {
        return html`
        <div class="year-grid">
            ${this._renderYearButtons()}
        </div>
        `;
    }

    /* Render year buttons*/
    _renderYearButtons() {
        const yearButtons = this._selectedDecade.map((year) => {
            return this._renderYearButton(year);
        });

        return yearButtons;
    }

    _renderYearButton(year: number) {
        const yearStyles: ClassInfo = {
            year: true,
            selected: this.date && this.date.isValid && this.date.year === year,
            out: false
        };

        return html`<div class=${classMap(yearStyles)} @click="${() => this._yearSelect(year)}">${year}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-calendar': Calendar;
    }
}
