import { html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { Button } from '../button/Button.js';
import { OmniFormElement } from '../core/OmniFormElement.js';
import '../icons/Calendar.icon.js';
import '../icons/ChevronLeft.icon.js';
import '../icons/ChevronRight.icon.js';

/**
 * 
 */
@customElement('omni-date-picker')
export class DatePicker extends OmniFormElement {
    @query('#picker')
    private _pickerElement : HTMLInputElement;
    //See how to achieve the same with Luxon.
    private _days: string[] = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

    /**
    * The start date to be provided to the Date picker if not provided no constraints will be enforced.
    * @attr
    */
    @property({ type: String, reflect: true, attribute: 'min-date' }) minDate: string;

    /**
     * The end date to be provided to the Date picker if not provided no constraints will be enforced.
     * @attr
     */
    @property({type: String, reflect: true, attribute: 'max-date'}) maxDate: string;

    /**
     * The output type of the component the two options are string which will be a UTC ISO string format date, or a JS date object.
     * @attr
     */
    @property({type: String, reflect: true, attribute: 'output-type'}) outputType: 'string' | 'date' = 'string';

    /**
     * The locale used for formatting the output of the Date time picker.
     * @attr
     */
    @property({type: String, reflect: true}) locale: string = 'en-US';

    // Internal state properties
    @state() private _showCalendar: boolean = false;

    // When the inputs control is clicked this will toggle the Calendar to render
    _controlClick() {
        this._toggleCalendar();
    }

    /*When the period button is clicked it can either be one of the following examples*/
    _periodClick() {
        return;
    }

    _toggleCalendar() {
        if (this._showCalendar) {
            this._showCalendar = false;
        } else {
            this._showCalendar = true;
        }
    }

    // When the right button of the period bar is clicked
    _rightClick() {
        console.log('right button clicked');
        return;
    }

    // When the left button of the period bar is clicked
    _leftClick() {
        console.log('left button clicked');
        return;
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

                text-align: var(--omni-date-picker-text-align, left);

                color: var(--omni-date-picker-font-color, var(--omni-font-color));
                font-family: var(--omni-date-picker-font-family, var(--omni-font-family));
                font-size: var(--omni-date-picker-font-size, var(--omni-font-size));
                font-weight: var(--omni-date-picker-font-weight, var(--omni-font-weight));
                height: var(--omni-date-picker-height, 100%);
                padding: var(--omni-date-picker-padding, 10px);

                /* Added to stop the transforming of the label when the input is clicked */
                pointer-events: none;
            }

            .control {
                display: flex;
                cursor: pointer;
                margin-right: var(--omni-date-picker-control-margin-right, 10px);
                margin-left: var(--omni-date-picker-control-margin-left, 10px);
                width: var(--omni-date-picker-control-width, 20px);

                /* Added to resolve issue of click event firing twice*/
                pointer-events: none;
            }

            .control-icon {
                width: var(--omni-date-picker-control-icon-width, 20px);
                fill: var(--omni-date-picker-control-icon-color, var(--omni-primary-color));
            }

            .calendar-container {
                position: absolute;
                width: var(--omni-select-items-container-width, 100%);
                top: var(--omni-select-items-container-top, 100%);
                transition: 1s;
            }

            .period {
                display: flex;
                border-bottom: var(--omni-select-period-container-border-bottom, 1px solid black);
            }

            .left-control {
                width: var(--omni-select-period-bar-left-button);

            }

            .right-control {
                width: var(--omni-select-period-bar-right-button);
            }

            .month-year {
                width: var(--omni-select-period-center-button);
            }

            .days-grid {
                display: grid;
                justify-content: center;
                align-items: center;


            }

            .day-name {

            }
            
            .day {

            }

            .non-selectable {

            }

            /* Consider adding to style weekend days differently */
            .weekend-day {

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
                .value=${live(this.value as string)}
                tabindex="${this.disabled ? -1 : 0}" />
        `;
    }

    protected override renderControl() {
        return html` <div id="control" class="control" @click="${() => this._controlClick()}">
            <omni-calendar-icon></omni-calendar-icon>
        </div>`;
    }

    protected override renderPicker() {
        if (!this._showCalendar) {
            return nothing;
        }
        return html`
            <div id="calendar-container" class="calendar-container">
                <div id="period" class="period">${this._renderPeriod}</div>
                <div id="days" class="days"> ${this._renderDays}</div>
            </div>
        `;
    }

    // Render the period bar at the top of the container which will render the left and right chevron along with the month and year depending on state.
    _renderPeriod() {
        return html`<span class="period-bar">
            <div class="left-control" @click="${()=> this._leftClick()}"><omni-chevron-left-icon></omni-chevron-left-icon></div>
            <div class="month-year" @click="${()=> this._periodClick()}"></div>
            <div class="right-control" @click="${()=> this._rightClick()}"><omni-chevron-right-icon></omni-chevron-right-icon></div>
        </span>`;
    }
    // Render the days 
    _renderDays() {
        return html`

        <div class="days-grid">

        </div>
        `;
    }
    // Render the years to select.
    _renderYears() {
        return html`
        <div class="year-scroller">

        </div>
        `;
    }

    // Render the months for the user to select
    _renderMonths() {
        return html`
        <div class="month-grid">

        </div>
        `;
    }

    _renderButtonBar() {
        return html`
         <omni-button></omni-button>
         <omni-button></omni-button>
        `;
    }

    _renderDayNameBar() {
        return html `
        <div class="day-name"></div>`;
    }
}