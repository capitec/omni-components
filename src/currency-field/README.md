# omni-currency-field

Control to enter a formatted currency value.

## Example

```html
<omni-currency-field
 label="Enter currency value"
 value="100"
 hint="Required"
 error="Please enter the correct amount"
 currency-symbol="$"
 thousands-separator=","
 fractional-separator="."
 fractional-precision=2
 disabled>
</omni-currency-field>
```

## Properties

| Property              | Attribute              | Modifiers | Type                                          | Default                   | Description                                      |
|-----------------------|------------------------|-----------|-----------------------------------------------|---------------------------|--------------------------------------------------|
| `currencySymbol`      | `currency-symbol`      |           | `string`                                      | "$"                       | Currency symbol.                                 |
| `data`                | `data`                 |           | `object`                                      |                           | Data associated with the component.              |
| `dir`                 |                        |           | `string`                                      |                           |                                                  |
| `disabled`            | `disabled`             |           | `boolean`                                     | false                     | Indicator if the component should be disabled.   |
| `error`               | `error`                |           | `string`                                      |                           | Error message guiding a user to correct a mistake. |
| `formatter`           | `formatter`            |           | `string`                                      | "\\B(?=(\\d{3})+(?!\\d))" | Formatter provided to format the value.          |
| `fractionalPrecision` | `fractional-precision` |           | `number`                                      | 2                         | Fractional precision.                            |
| `fractionalSeparator` | `fractional-separator` |           | `string`                                      | "."                       | Fractional separator.                            |
| `hint`                | `hint`                 |           | `string`                                      |                           | Hint message to assist the user.                 |
| `label`               | `label`                |           | `string`                                      |                           | Text label.                                      |
| `lang`                |                        |           | `string`                                      |                           |                                                  |
| `override`            | `override`             |           |                                               |                           | Used to set the base direction of text for display |
| `styles`              |                        | readonly  | `CSSResultGroup[]`                            |                           |                                                  |
| `thousandsSeparator`  | `thousands-separator`  |           | `string`                                      | ""                        | Thousands separator.                             |
| `value`               | `value`                |           | `string \| number \| Record<string, unknown>` | null                      | Value entered into the form component.           |

## Methods

| Method          | Type                    |
|-----------------|-------------------------|
| `renderContent` | `(): TemplateResult<1>` |
| `renderPrefix`  | `(): TemplateResult<1>` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `prefix`            | Replaces the icon for the prefix slot.           |
| `suffix`            | Replaces the icon for the suffix slot.           |

## CSS Custom Properties

| Property                                         | Description                                    |
|--------------------------------------------------|------------------------------------------------|
| `--omni-currency-field-font-color`               | Currency field font color.                     |
| `--omni-currency-field-font-family`              | Currency field font family.                    |
| `--omni-currency-field-font-size`                | Currency field font size.                      |
| `--omni-currency-field-font-weight`              | Currency field font weight.                    |
| `--omni-currency-field-height`                   | Currency field height.                         |
| `--omni-currency-field-padding`                  | Currency field padding.                        |
| `--omni-currency-field-symbol-color`             | Currency field symbol font color.              |
| `--omni-currency-field-symbol-font-size`         | Currency field symbol font size.               |
| `--omni-currency-field-symbol-left-padding`      | Currency field symbol left padding.            |
| `--omni-currency-field-symbol-select`            | Currency field symbol selectable state.        |
| `--omni-currency-field-text-align`               | Currency field text align.                     |
| `--omni-currency-field-width`                    | Currency field width.                          |
| `--omni-form-border-bottom`                      | Form border bottom.                            |
| `--omni-form-border-color`                       | Form border color.                             |
| `--omni-form-border-left`                        | Form border left.                              |
| `--omni-form-border-radius`                      | Form border radius.                            |
| `--omni-form-border-right`                       | Form border right.                             |
| `--omni-form-border-style`                       | Form border style.                             |
| `--omni-form-border-top`                         | Form border top.                               |
| `--omni-form-border-width`                       | Form border width.                             |
| `--omni-form-container-font-family`              | Form container font family.                    |
| `--omni-form-container-width`                    | Form container width.                          |
| `--omni-form-disabled-background-color`          | Form disabled background color.                |
| `--omni-form-disabled-border-color`              | Form disabled border color.                    |
| `--omni-form-disabled-focussed-label-background-color` | Form disabled label focussed background color. |
| `--omni-form-disabled-hover-color`               | Form disabled hover color.                     |
| `--omni-form-error-border-color`                 | Form error border color.                       |
| `--omni-form-error-hover-color`                  | Form error hover color.                        |
| `--omni-form-error-label-border-width`           |                                                |
| `--omni-form-error-label-color`                  | Form error label color.                        |
| `--omni-form-error-label-font-color`             | Form error label font color.                   |
| `--omni-form-error-label-font-family`            | Form error label font family.                  |
| `--omni-form-error-label-font-size`              | Form error label font size.                    |
| `--omni-form-error-label-font-weight`            | Form error label font weight.                  |
| `--omni-form-error-label-padding-left`           | Form error label left padding.                 |
| `--omni-form-error-label-padding-top`            | Form error label top padding.                  |
| `--omni-form-field-background-color`             | Form layout background color.                  |
| `--omni-form-focussed-border-color`              | Form focussed border color.                    |
| `--omni-form-focussed-border-width`              | Form focussed border width.                    |
| `--omni-form-focussed-label-color`               | Form focussed label color.                     |
| `--omni-form-hint-label-border-width`            | Form hint label border width.                  |
| `--omni-form-hint-label-font-color`              | Form hint label font color.                    |
| `--omni-form-hint-label-font-family`             | Form hint label font family.                   |
| `--omni-form-hint-label-font-size`               | Form hint label font size.                     |
| `--omni-form-hint-label-font-weight`             | Form hint label font weight.                   |
| `--omni-form-hint-label-padding-left`            | Form hint label left padding.                  |
| `--omni-form-hint-label-padding-top`             | Form hint label top padding.                   |
| `--omni-form-hover-color`                        | Form hover color.                              |
| `--omni-form-label-color`                        | Form label color.                              |
| `--omni-form-label-disabled-color`               | Form label disabled color.                     |
| `--omni-form-label-font-size`                    | Form label font size.                          |
| `--omni-form-label-font-weight`                  | Form label font weight.                        |
| `--omni-form-label-left`                         | Form label left margin.                        |
| `--omni-form-label-text-align`                   | Form label text align.                         |
| `--omni-form-label-transform-origin`             | Form label text align                          |
| `--omni-form-label-z-index`                      | Form label z-index.                            |
| `--omni-theme-accent-active-color`               | Theme accent active color.                     |
| `--omni-theme-accent-color`                      | Theme accent color.                            |
| `--omni-theme-accent-hover-color`                | Theme accent hover color.                      |
| `--omni-theme-background-active-color`           | Theme background active color.                 |
| `--omni-theme-background-color`                  | Theme background color.                        |
| `--omni-theme-background-hover-color`            | Theme background hover color.                  |
| `--omni-theme-border-radius`                     | Theme border radius.                           |
| `--omni-theme-border-width`                      | Theme border width.                            |
| `--omni-theme-box-shadow`                        | Theme box shadow.                              |
| `--omni-theme-box-shadow-color`                  | Theme inactive color.                          |
| `--omni-theme-disabled-background-color`         | Theme disabled background color.               |
| `--omni-theme-disabled-border-color`             | Theme disabled border color.                   |
| `--omni-theme-error-border-color`                | Theme error border color.                      |
| `--omni-theme-error-font-color`                  | Theme disabled background color.               |
| `--omni-theme-font-color`                        | Theme font color.                              |
| `--omni-theme-font-family`                       | Theme font family.                             |
| `--omni-theme-font-size`                         | Theme font size.                               |
| `--omni-theme-font-weight`                       | Theme font weight.                             |
| `--omni-theme-hint-font-color`                   | Theme hint font color.                         |
| `--omni-theme-inactive-color`                    | Theme inactive color.                          |
| `--omni-theme-primary-active-color`              | Theme primary active color.                    |
| `--omni-theme-primary-color`                     | Theme primary color.                           |
| `--omni-theme-primary-hover-color`               | Theme primary hover color.                     |
