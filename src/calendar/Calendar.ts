import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';
import { debounce } from 'lodash';
import { DateTime, Info } from 'luxon';
import OmniElement from '../core/OmniElement.js';
import '../icons/ChevronLeft.icon.js';
import '../icons/ChevronRight.icon.js';

/**
 * Calendar that allows you to select a specific date.
 *
 * @import
 * ```js
 * import '@capitec/omni-components/calendar';
 * ```
 *
 * @example
 * ```html
 * <omni-calendar
 * value="Hello World"
 * locale="en-US">
 * </omni-calendar>
 * ```
 * @element omni-calendar
 *
 * @cssprop --omni-calendar-mobile-picker-container-left - Calendar mobile picker container left.
 * @cssprop --omni-calendar-mobile-picker-container-right - Calendar mobile picker container right.
 * @cssprop --omni-calendar-mobile-picker-container-bottom - Calendar mobile picker container bottom.
 * @cssprop --omni-calendar-mobile-picker-container-box-shadow - Calendar mobile picker container box shadow.
 *
 * @cssprop --omni-calendar-container-min-width - Calendar container minimum width.
 * @cssprop --omni-calendar-container-min-height - Calendar container min height.
 * @cssprop --omni-calendar-container-width - Calendar container width.
 * @cssprop --omni-calendar-container-border-bottom - Calendar container border bottom.
 * 
 * @cssprop --omni-calendar-period-bar-padding - Calendar period container padding.
 * @cssprop --omni-calendar-period-bar-border-bottom - Calendar period container border bottom.
 * @cssprop --omni-calendar-period-bar-background-color - Calendar period container background color.
 * @cssprop --omni-calendar-period-container-min-height - Calendar period container minimum height.
 * 
 * @cssprop --omni-calendar-period-bar-control-color - Calendar period bar control color.
 * @cssprop --omni-calendar-period-bar-control-width- Calendar period bar control width.
 * 
 * @cssprop --omni-calendar-days-grid-template-columns - Calendar days grid template columns.
 * @cssprop --omni-calendar-days-grid-auto-rows - Calendar days grid auto rows.
 * @cssprop --omni-calendar-days-grid-font-size - Calendar days grid font size.
 * @cssprop --omni-calendar-days-grid-font-weight - Calendar days grid font weight.
 * @cssprop --omni-calendar-days-grid-width - Calendar days grid width.
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
 * @cssprop --omni-calendar-month-button-font-family - Calendar month button font family.
 * @cssprop --omni-calendar-month-button-font-size - Calendar month button font size.
 * @cssprop --omni-calendar-month-button-font-weight - Calendar month button font weight.
 * @cssprop --omni-calendar-month-button-line-height - Calendar month button line height.
 * @cssprop --omni-calendar-month-button-background-color - Calendar month button background color.
 * @cssprop --omni-calendar-month-button-border-color - Calendar month button border color.
 * @cssprop --omni-calendar-month-button-border-width - Calendar month button border width.
 * @cssprop --omni-calendar-month-button-color - Calendar month button color.
 * @cssprop --omni-calendar-month-button-margin-left - Calendar month button margin left.
 * @cssprop --omni-calendar-month-button-margin-right - Calendar month button margin right.
 * 
 * @cssprop --omni-calendar-month-button-selected-background-color - Calendar month button selected background color.
 * @cssprop --omni-calendar-month-button-selected-border-color - Calendar month button selected border color.
 * @cssprop --omni-calendar-month-button-selected-border-width - Calendar month selected border width.
 * @cssprop --omni-calendar-month-button-selected-color - Calendar month selected color.
 * @cssprop --omni-calendar-month-button-selected-border-radius - Calendar month selected border radius.
 * 
 * @cssprop --omni-calendar-year-button-width - Calendar year button width.
 * @cssprop --omni-calendar-year-button-height - Calendar year button height.
 * @cssprop --omni-calendar-year-button-font-family - Calendar year button font family.
 * @cssprop --omni-calendar-year-button-font-size - Calendar year button font size.
 * @cssprop --omni-calendar-year-button-line-height - Calendar year button line height.
 * @cssprop --omni-calendar-year-button-background-color - Calendar year button background color.
 * @cssprop --omni-calendar-year-button-border-color - Calendar year button border color.
 * @cssprop --omni-calendar-year-button-border-width - Calendar year button border width.
 * @cssprop --omni-calendar-year-button-color - Calendar year button color.
 * @cssprop --omni-calendar-year-button-margin-left - Calendar year button margin left.
 * @cssprop --omni-calendar-year-button-margin-right - Calendar year button margin right.
 * @cssprop --omni-calendar-year-button-margin-top - Calendar year button margin top.
 * @cssprop --omni-calendar-year-button-margin-bottom - Calendar year button margin bottom.
 * 
 * @cssprop --omni-calendar-year-button-selected-background-color - Calendar year button selected background color.
 * @cssprop --omni-calendar-year-button-selected-border-color - Calendar year button selected border color.
 * @cssprop --omni-calendar-year-button-selected-border-width - Calendar year button selected border width.
 * @cssprop --omni-calendar-year-button-selected-color - Calendar year button selected color.
 * @cssprop --omni-calendar-year-button-selected-border-radius - Calendar year button selected border radius.
 * 
 * @cssprop --omni-calendar-day-name-font-color - Calendar day name font color.
 * @cssprop --omni-calendar-day-name-font-weight - Calendar day name font weight.
 * @cssprop --omni-calendar-day-name-font-size - Calendar day name font size.
 * 
 * @cssprop --omni-calendar-day-button-width - Calendar day button width.
 * @cssprop --omni-calendar-day-button-height - Calendar day button height.
 * 
 * @cssprop --omni-calendar-day-button-excluded-font-color - Calendar day button excluded color.
 * 
 * @cssprop --omni-calendar-day-current-button-border - Calendar day button current border.
 * @cssprop --omni-calendar-day-current-button-width - Calendar day button current width.
 * @cssprop --omni-calendar-day-current-button-height - Calendar day button current height.
 * @cssprop --omni-calendar-day-current-button-border-radius - Calendar day button current border radius.
 * 
 * @cssprop --omni-calendar-day-selected-button-color - Calendar day button selected color.
 * @cssprop --omni-calendar-day-selected-button-width - Calendar day button selected width.
 * @cssprop --omni-calendar-day-selected-button-height - Calendar day button selected height.
 * @cssprop --omni-calendar-day-selected-button-border-radius - Calendar day button selected border radius.
 * @cssprop --omni-calendar-day-selected-button-background-color - Calendar day button selected background color.
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

    /**
     * The value of the Calendar component
     * @attr
     */
    @property({ type: String, reflect: true }) value?: string;

    // Internal state properties for date picker and
    @state() private date: DateTime = this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : DateTime.local();

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
        /*this._mobileCheck();*/
        this.date = (this.value && typeof this.value === 'string' ? DateTime.fromISO(this.value).setLocale(this.locale) : undefined)?.setLocale(
            this.locale
        ) as DateTime;

        // Check for how to render the picker container based on screen dimensions.
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
            /* Styles related to the picker container and its child elements */

            /* Is this still needed
            .picker-container {
                z-index: var(--omni-calendar-container-z-index, 420);
            }*/

            /* Picker container mobile
            @media screen and (max-width: 766px) {
                .calendar-container {
                    position: fixed;
                    top: none;
                    left: var(--omni-calendar-mobile-picker-container-left, 0px);
                    right: var(--omni-calendar-mobile-picker-container-right, 0px);
                    bottom: var(--omni-calendar-mobile-picker-container-bottom, 0px);
                    box-shadow: var(--omni-calendar-mobile-picker-container-box-shadow, 0px 0px 2px 2px rgba(0, 0, 0, 0.11));
                }
            }*/
        
            /* Desktop and landscape tablet device styling, if element is at the bottom of the screen make items render above the input 
            @media screen and (min-width: 767px) {
                .calendar-container {
                    cursor: default;
                    transition: 1s;
                    min-width: var(--omni-calendar-container-min-width, 320px); 
                    min-height: var(--omni-calendar-container-min-height,286px);
                    width: var(--omni-calendar-container-width, 100%);
                    border: var(--omni-calendar-container-border-bottom, 1px solid grey);
                }
            }*/

            .calendar-container {
                cursor: default;
                /*min-width: var(--omni-calendar-container-min-width, 320px); */
                min-width: var(--omni-calendar-container-min-height, 280px);
                min-height: var(--omni-calendar-container-min-height,286px);
                border: var(--omni-calendar-container-border, 1px solid grey);
                border-radius: var(--omni-calendar-container-border-radius, 2px);
            }

            /* Styles for period bar */
            .period {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding:var(--omni-calendar-period-bar-padding, 4px 8px);
                border-bottom: var(--omni-calendar-period-bar-border-bottom, 1px solid #e1e1e1);
                background-color: var(--omni-calendar-period-bar-background-color, var(--omni-background-color));
                min-height: var(--omni-calendar-period-container-min-height,56px);

            }

            .left-control,
            .right-control{
                cursor: pointer;
                fill: var(--omni-calendar-period-bar-control-color, black);
                width: var(--omni-calendar-period-bar-control-width, 23px);
            }

            /*
            .left-control {
                cursor: pointer;
                fill: var();
                padding-top: var(--omni-calendar-period-bar-previous-control-padding-top, 5px);
                width: var(--omni-calendar-period-bar-previous-control-width, 23px);
            }

            .right-control {
                cursor: pointer;
                padding-top: var(--omni-calendar-period-bar-next-control-padding-top, 5px);
                width: var(--omni-calendar-period-bar-next-control-width, 23px);
            }*/

            /*Consider renaming this*/
            .month-year {
                cursor: pointer;
                width: var(--omni-calendar-period-center-button , 112px);
                text-align: center;

            }

            .month-year:hover {
                background-color: var(--omni-calendar-period-center-button-hover-background-color, var(--omni-background-hover-color));
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
                font-size: var(--omni-calendar-days-grid-font-size, 14px); /* Check this*/
                font-weight: var(--omni-calendar-days-grid-font-weight, 500);  /* Check this*/
                /*width: var(--omni-calendar-days-grid-width, 100%);*/
                padding: var(--omni-calendar-days-grid-padding,10px 10px);
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
                /*
                padding-top: var(--omni-date-picker-month-grid-padding-top, 15.72px);
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 28px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 28px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 28px);
                                */
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
                padding-bottom: var(--omni-date-picker-month-grid-padding-bottom, 28px);
                padding-right:var(--omni-date-picker-month-grid-padding-right, 28px);
                padding-left: var(--omni-date-picker-month-grid-padding-left, 28px);
                */

                background-color: var(--omni-calendar-year-grid-background-color, var(--omni-theme-background-color));
            }

            /* Month Button styles */
            .month {
                display: flex;
                width: var(--omni-calendar-month-button-width, 73px);
                height: var(--omni-calendar-month-button-height, 48px);
                align-items: center;
                justify-content: center;

                font-family: var(--omni-calendar-month-button-font-family, var(--omni-font-family));
                font-size: var(--omni-calendar-month-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-calendar-month-button-font-weight, bolder);
                line-height: var(--omni-calendar-month-button-line-height);

                /*
                background-color: var(--omni-calendar-month-button-background-color, transparent);
                border-color: var(--omni-calendar-month-button-border-color, transparent);
                border-width: var(--omni-calendar-month-button-border-width, var(--omni-border-width));
                color: var(--omni-calendar-month-button-color, var(--omni-primary-color));*/

                background-color: var(--omni-calendar-month-button-background-color, var(--omni-background-color));
                /*
                border-color: var(--omni-calendar-month-button-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-month-button-border-width, var(--omni-border-width));
                border-style: solid;*/
                border-radius: var(--omni-calendar-month-button-border-radius, 5px);

                color: var(--omni-calendar-month-button-color, var(--omni-primary-color));

                margin-left: var(--omni-calendar-month-button-margin-left,2px);
                margin-right: var(--omni-calendar-month-button-margin-right,2px);
                /*
                margin-top: 15.56px;
                margin-bottom: 15.56px;*/
                cursor: pointer;
            }

            .month.selected {
                /*
                background-color: var(--omni-date-picker-primary-background-color, var(--omni-primary-color));
                border-color: var(--omni-button-primary-border-color, var(--omni-primary-color));
                border-width: var(--omni-button-primary-border-width, var(--omni-border-width));
                color: var(--omni-button-primary-color, var(--omni-background-color));*/

                background-color: var(--omni-calendar-month-button-selected-background-color, var(--omni-primary-color));
                border-color: var(--omni-calendar-month-button-selected-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-month-button-selected-border-width, var(--omni-border-width));
                color: var(--omni-calendar-month-button-selected-color, var(--omni-background-color));
                border-style: solid;
                border-radius: var(--omni-calendar-month-button-selected-border-radius, var(--omni-border-radius));
            }

            .month:hover {
                background-color: var(--omni-calendar-period-center-button-hover-background-color, var(--omni-accent-hover-color));
            }

            /* Year button styles */
            .year {
                align-items: center;
                justify-content: center;
                display: flex;                
                width: var(--omni-calendar-year-button-width, 73px);
                height: var(--omni-calendar-year-button-height, 48px);


                
                font-family: var(--omni-calendar-year-button-font-family, var(--omni-font-family));
                font-size: var(--omni-calendar-year-button-font-size, var(--omni-font-size));
                font-weight: var(--omni-calendar-year-button-font-weight, bolder);
                line-height: var(--omni-calendar-year-button-line-height);

                /*
                background-color: var(--omni-calendar-year-button-background-color, transparent);
                border-color: var(--omni-calendar-year-button-border-color, transparent);
                border-width: var(--omni-calendar-year-button-border-width, var(--omni-border-width));
                color: var(--omni-calendar-year-button-color, var(--omni-primary-color));*/

                background-color: var(--omni-calendar-year-button-background-color, var(--omni-background-color));
                border-color: var(--omni-calendar-year-button-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-year-button-border-width, var(--omni-border-width));
                /*border-style: solid;*/
                border-radius: var(--omni-calendar-year-button-border-radius, 5px);

                color: var(--omni-calendar-month-button-color, var(--omni-primary-color));

                margin-left: var(--omni-calendar-year-button-margin-left,2px);
                margin-right: var(--omni-calendar-year-button-margin-right,2px);
                /*
                margin-top: var(--omni-calendar-year-button-margin-top,15.56px);
                margin-bottom: var(--omni-calendar-year-button-margin-bottom,15.56px);*/
                cursor: pointer;
            }

            .year.selected {
                background-color: var(--omni-calendar-year-button-selected-background-color, var(--omni-primary-color));
                border-color: var(--omni-calendar-year-button-selected-border-color, var(--omni-primary-color));
                border-width: var(--omni-calendar-year-button-selected-border-width, var(--omni-border-width));
                color: var(--omni-calendar-year-button-selected-color, var(--omni-background-color));
                border-style: solid;
                border-radius: var(--omni-calendar-year-button-selected-border-radius, var(--omni-border-radius));
            }
           
            .year:hover {
                background-color: var(--omni-calendar-period-center-button-hover-background-color, var(--omni-accent-hover-color));
            }

            /* Day button styles*/
            .day-name {
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--omni-calendar-day-name-font-color, var(--omni-font-color));
                font-weight: var(--omni-calendar-day-name-font-weight, 500);
                font-size: var(--omni-calendar-day-name-font-size, );
                width: 33px;
                height: 40px;
            }
          
            .day {
                display: flex;
                cursor: pointer;
                justify-content: center;
                align-items: center;
                /*
                width: var(--omni-calendar-day-button-width, 100%);
                height: var(--omni-calendar-day-button-height, 100%);*/
                /*
                width: var(--omni-calendar-day-current-button-width, 24px);
                height: var(--omni-calendar-day-current-button-height, 24px);*/
                width: 33px;
                height: 40px;
            }

            .day:hover {
                background-color: var(--omni-calendar-period-center-button-hover-background-color, var(--omni-accent-hover-color));
            }

            .day.excluded {
                color: var(--omni-calendar-day-button-excluded-font-color, grey);
                pointer-events: none;
            }

            .day.current {
                text-align: center;
                border: var(--omni-calendar-day-current-button-border,2px solid var(--omni-accent-color));
                width: var(--omni-calendar-day-current-button-width, 24px);
                height: var(--omni-calendar-day-current-button-height, 24px);
                border-radius: var(--omni-calendar-day-current-button-border-radius, 50%);
            }

            .day.selected {
                color: var(--omni-calendar-day-selected-button-color, #FFFFFF);
                width: var(--omni-calendar-day-selected-button-width, 24px);
                height: var(--omni-calendar-day-selected-button-height, 24px);
                border-radius: var(--omni-calendar-day-selected-button-border-radius, 20%);
                background-color: var(--omni-calendar-day-selected-button-background-color, var(--omni-primary-color));
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
        /*
        if (this._showState === 'years') {
            return nothing;
            //            this._showState === 'years' ? this.selectedYear : `${this._selectedYear}`
        }*/

        const periodDate = DateTime.local(this._selectedYear, this._selectedMonth, 1).setLocale(this.locale);
        return html`<span class="period">
            <div class="left-control" @click="${() => this._previousClick()}"><omni-chevron-left-icon></omni-chevron-left-icon></div>
            <div class="month-year" @click="${() => this._periodClick()}">${
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
        /*
        return html`<omni-button class=${classMap(monthStyles)} label="${month}" type="${monthStyles.current ? `secondary` : monthStyles.selected ? `primary` : `clear`}" @click="${() =>
            this._monthSelect(index + 1)}"></omni-button>`;*/
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

        //Remove the omni-button implementation.
        /*
        return html`<omni-button class=${classMap(yearStyles)} type="${yearStyles.selected ? `primary` : yearStyles.current ? `secondary` : `clear`}" label="${
            year
        }" @click="${() => this._yearSelect(year)}"></omni-button>
        `;*/
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'omni-calendar': Calendar;
    }
}
