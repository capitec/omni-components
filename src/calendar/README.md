# omni-calendar

Calendar component to set specific date.

## Example

```html
<omni-calendar
  value="2023-02-23"
  min-date="2023-02-07"
  max-date="2023-02-25"
  locale="en-US">
</omni-calendar>
```

## Properties

| Property  | Attribute  | Modifiers | Type                  | Default         | Description                                      |
|-----------|------------|-----------|-----------------------|-----------------|--------------------------------------------------|
| `dir`     |            |           | `string`              |                 |                                                  |
| `lang`    |            |           | `string`              |                 |                                                  |
| `locale`  | `locale`   |           | `string`              | "defaultLocale" | The locale used for formatting the output of the Calendar. |
| `maxDate` | `max-date` |           | `string \| undefined` |                 | The maximum date inclusively allowed to be selected. |
| `minDate` | `min-date` |           | `string \| undefined` |                 | The minimum date inclusively allowed to be selected. |
| `styles`  |            | readonly  | `CSSResultGroup[]`    |                 |                                                  |
| `value`   | `value`    |           | `string \| undefined` |                 | The value of the Calendar component              |

## Events

| Event    | Type              | Description                         |
|----------|-------------------|-------------------------------------|
| `change` | `CustomEvent<{}>` | Dispatched when a date is selected. |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `left-control`      | Replaces the icon for the left control button.   |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `right-control`     | Replaces the icon for the right control button.  |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--omni-calendar-border-radius`                  | Calendar container border radius.                |
| `--omni-calendar-box-shadow`                     | Calendar container box shadow.                   |
| `--omni-calendar-control-color`                  | Calendar control bar control color.              |
| `--omni-calendar-control-label-color`            | Calendar month/year display color.               |
| `--omni-calendar-control-label-font-size`        | Calendar month/year display font size.           |
| `--omni-calendar-control-label-font-weight`      | Calendar month/year display font weight.         |
| `--omni-calendar-control-label-hover-background-color` | Calendar month/year display background color.    |
| `--omni-calendar-control-label-width`            | Calender month/year display width.               |
| `--omni-calendar-control-width`                  | Calendar control bar control width.              |
| `--omni-calendar-controls-background-color`      | Calendar control bar background color.           |
| `--omni-calendar-controls-border-bottom`         | Calendar control bar border bottom.              |
| `--omni-calendar-controls-min-height`            | Calendar control bar minimum height.             |
| `--omni-calendar-controls-padding`               | Calendar control bar padding.                    |
| `--omni-calendar-day-button-color`               | Calendar day button color.                       |
| `--omni-calendar-day-button-excluded-font-color` | Calendar day button excluded color.              |
| `--omni-calendar-day-button-font-size`           | Calendar day button font size.                   |
| `--omni-calendar-day-button-font-weight`         | Calendar day button font weight.                 |
| `--omni-calendar-day-button-height`              | Calendar day button height.                      |
| `--omni-calendar-day-button-hover-background-color` | Calendar day button hover background color.      |
| `--omni-calendar-day-button-line-height`         | Calendar day button line height.                 |
| `--omni-calendar-day-button-width`               | Calendar day button width.                       |
| `--omni-calendar-day-current-button-border`      | Calendar day button current border.              |
| `--omni-calendar-day-current-button-border-radius` | Calendar day button current border radius.       |
| `--omni-calendar-day-current-button-height`      | Calendar day button current height.              |
| `--omni-calendar-day-current-button-width`       | Calendar day button current width.               |
| `--omni-calendar-day-grid-auto-rows`             | Calendar day grid auto rows.                     |
| `--omni-calendar-day-grid-background-color`      | Calendar day grid background color.              |
| `--omni-calendar-day-grid-line-height`           | Calendar day grid line height.                   |
| `--omni-calendar-day-grid-padding`               | Calendar day grid padding.                       |
| `--omni-calendar-day-grid-template-columns`      | Calendar day grid template columns.              |
| `--omni-calendar-day-name-font-color`            | Calendar day name font color.                    |
| `--omni-calendar-day-name-font-size`             | Calendar day name font size.                     |
| `--omni-calendar-day-name-font-weight`           | Calendar day name font weight.                   |
| `--omni-calendar-day-name-height`                | Calendar day name height.                        |
| `--omni-calendar-day-name-width`                 | Calendar day name width.                         |
| `--omni-calendar-day-selected-button-background-color` | Calendar day button selected background color.   |
| `--omni-calendar-day-selected-button-border-radius` | Calendar day button selected border radius.      |
| `--omni-calendar-day-selected-button-color`      | Calendar day button selected color.              |
| `--omni-calendar-day-selected-button-height`     | Calendar day button selected height.             |
| `--omni-calendar-day-selected-button-width`      | Calendar day button selected width.              |
| `--omni-calendar-month-button-background-color`  | Calendar month button background color.          |
| `--omni-calendar-month-button-border-color`      | Calendar month button border color.              |
| `--omni-calendar-month-button-border-radius`     | Calendar month button border radius.             |
| `--omni-calendar-month-button-border-width`      | Calendar month button border width.              |
| `--omni-calendar-month-button-color`             | Calendar month button color                      |
| `--omni-calendar-month-button-font-family`       | Calendar month button font family.               |
| `--omni-calendar-month-button-font-size`         | Calendar month button font size.                 |
| `--omni-calendar-month-button-font-weight`       | Calendar month button font weight.               |
| `--omni-calendar-month-button-hover-background-color` | Calendar month button hover background color.    |
| `--omni-calendar-month-button-line-height`       | Calendar month button line height.               |
| `--omni-calendar-month-button-margin-left`       | Calendar month button margin left.               |
| `--omni-calendar-month-button-margin-right`      | Calendar month button margin right.              |
| `--omni-calendar-month-button-padding`           | Calendar month button padding.                   |
| `--omni-calendar-month-button-selected-background-color` | Calendar month button selected background color. |
| `--omni-calendar-month-button-selected-border-color` | Calendar month button selected border color.     |
| `--omni-calendar-month-button-selected-border-radius` | Calendar month selected border radius.           |
| `--omni-calendar-month-button-selected-border-width` | Calendar month selected border width.            |
| `--omni-calendar-month-button-selected-color`    | Calendar month selected color.                   |
| `--omni-calendar-month-grid-auto-rows`           | Calendar month grid auto rows.                   |
| `--omni-calendar-month-grid-template-columns`    | Calendar month grid template columns.            |
| `--omni-calendar-months-grid-background-color`   | Calendar month grid background color.            |
| `--omni-calendar-months-grid-padding`            | Calendar month grid padding.                     |
| `--omni-calendar-year-button-background-color`   | Calendar year button background color.           |
| `--omni-calendar-year-button-border-color`       | Calendar year button border color.               |
| `--omni-calendar-year-button-border-radius`      | Calendar year button border radius.              |
| `--omni-calendar-year-button-border-width`       | Calendar year button border width.               |
| `--omni-calendar-year-button-color`              | Calendar year button color.                      |
| `--omni-calendar-year-button-font-family`        | Calendar year button font family.                |
| `--omni-calendar-year-button-font-size`          | Calendar year button font size.                  |
| `--omni-calendar-year-button-font-weight`        | Calendar year button font weight.                |
| `--omni-calendar-year-button-hover-background-color` | Calendar year button hover background color.     |
| `--omni-calendar-year-button-line-height`        | Calendar year button line height.                |
| `--omni-calendar-year-button-margin-left`        | Calendar year button margin left.                |
| `--omni-calendar-year-button-margin-right`       | Calendar year button margin right.               |
| `--omni-calendar-year-button-padding`            | Calendar year button padding.                    |
| `--omni-calendar-year-button-selected-background-color` | Calendar selected year button background color.  |
| `--omni-calendar-year-button-selected-border-color` | Calendar selected year button border color.      |
| `--omni-calendar-year-button-selected-border-radius` | Calendar selected year button border radius.     |
| `--omni-calendar-year-button-selected-border-width` | Calendar selected year button border width.      |
| `--omni-calendar-year-button-selected-color`     | Calendar year button selected color.             |
| `--omni-calendar-year-grid-auto-rows`            | Calendar year grid auto rows.                    |
| `--omni-calendar-year-grid-background-color`     | Calendar year grid background color.             |
| `--omni-calendar-year-grid-padding`              | Calendar year grid padding.                      |
| `--omni-calendar-year-grid-template-columns`     | Calendar year grid template columns.             |
| `--omni-calendar-z-index`                        | Calendar container z-index.                      |
| `--omni-theme-accent-active-color`               | Theme accent active color.                       |
| `--omni-theme-accent-color`                      | Theme accent color.                              |
| `--omni-theme-accent-hover-color`                | Theme accent hover color.                        |
| `--omni-theme-background-active-color`           | Theme background active color.                   |
| `--omni-theme-background-color`                  | Theme background color.                          |
| `--omni-theme-background-hover-color`            | Theme background hover color.                    |
| `--omni-theme-border-radius`                     | Theme border radius.                             |
| `--omni-theme-border-width`                      | Theme border width.                              |
| `--omni-theme-box-shadow`                        | Theme box shadow.                                |
| `--omni-theme-box-shadow-color`                  | Theme inactive color.                            |
| `--omni-theme-disabled-background-color`         | Theme disabled background color.                 |
| `--omni-theme-disabled-border-color`             | Theme disabled border color.                     |
| `--omni-theme-error-border-color`                | Theme error border color.                        |
| `--omni-theme-error-font-color`                  | Theme disabled background color.                 |
| `--omni-theme-font-color`                        | Theme font color.                                |
| `--omni-theme-font-family`                       | Theme font family.                               |
| `--omni-theme-font-size`                         | Theme font size.                                 |
| `--omni-theme-font-weight`                       | Theme font weight.                               |
| `--omni-theme-hint-font-color`                   | Theme hint font color.                           |
| `--omni-theme-inactive-color`                    | Theme inactive color.                            |
| `--omni-theme-primary-active-color`              | Theme primary active color.                      |
| `--omni-theme-primary-color`                     | Theme primary color.                             |
| `--omni-theme-primary-hover-color`               | Theme primary hover color.                       |
