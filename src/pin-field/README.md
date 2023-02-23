# omni-pin-field

Pin input control to enter masked numeric values.

## Example

```html
<omni-pin-field
  label="Enter a value"
  value=1234
  data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  disabled>
</omni-pin-field>
```

## Properties

| Property   | Attribute  | Modifiers | Type                                             | Default | Description                                      |
|------------|------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `data`     | `data`     |           | `object \| undefined`                            |         | Data associated with the component.              |
| `dir`      |            |           | `string`                                         |         |                                                  |
| `disabled` | `disabled` |           | `boolean`                                        | false   | Indicator if the component should be disabled.   |
| `error`    | `error`    |           | `string \| undefined`                            |         | Error message guiding a user to correct a mistake. |
| `hint`     | `hint`     |           | `string \| undefined`                            |         | Hint message to assist the user.                 |
| `label`    | `label`    |           | `string \| undefined`                            |         | Text label.                                      |
| `lang`     |            |           | `string`                                         |         |                                                  |
| `override` | `override` |           |                                                  |         | Used to set the base direction of text for display |
| `styles`   |            | readonly  | `CSSResultGroup[]`                               |         |                                                  |
| `value`    | `value`    |           | `string \| number \| Record<string, unknown> \| undefined` | null    | Value entered into the form component.           |

## Methods

| Method          | Type                    |
|-----------------|-------------------------|
| `renderContent` | `(): TemplateResult<1>` |
| `renderControl` | `(): TemplateResult<1>` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `hide`              | Replaces the icon for the pin value hidden state. |
| `loading_indicator` | Used to define content that is displayed while async rendering is awaiting, or when renderLoading() is implicitly called |
| `prefix`            | Replaces the icon for the prefix slot.           |
| `show`              | Replaces the icon for the checked value visible state. |
| `suffix`            | Replaces the icon for the suffix slot.           |

## CSS Custom Properties

| Property                                         | Description                                    |
|--------------------------------------------------|------------------------------------------------|
| `--omni-container-font-family`                   | Container font family.                         |
| `--omni-container-height`                        | Container height.                              |
| `--omni-container-width`                         | Container width.                               |
| `--omni-form-border-bottom`                      | Form border bottom.                            |
| `--omni-form-border-color`                       | Form border color.                             |
| `--omni-form-border-left`                        | Form border left.                              |
| `--omni-form-border-radius`                      | Form border radius.                            |
| `--omni-form-border-right`                       | Form border right.                             |
| `--omni-form-border-style`                       | Form border style.                             |
| `--omni-form-border-top`                         | Form border top.                               |
| `--omni-form-border-width`                       | Form border width.                             |
| `--omni-form-disabled-background-color`          | Form disabled background color.                |
| `--omni-form-disabled-border-color`              | Form disabled border color.                    |
| `--omni-form-disabled-focussed-label-background-color` | Form disabled label focussed background color. |
| `--omni-form-disabled-hover-color`               | Form disabled hover color.                     |
| `--omni-form-error-border-color`                 | Form error border color.                       |
| `--omni-form-error-hover-color`                  | Form error hover color.                        |
| `--omni-form-error-label-border-width`           | Form error label border width.                 |
| `--omni-form-error-label-color`                  | Form error label color.                        |
| `--omni-form-error-label-font-color`             | Form error label font color.                   |
| `--omni-form-error-label-font-family`            | Form error label font family.                  |
| `--omni-form-error-label-font-size`              | Form error label font size.                    |
| `--omni-form-error-label-font-weight`            | Form error label font weight.                  |
| `--omni-form-error-label-padding-left`           | Form error label left padding.                 |
| `--omni-form-error-label-padding-top`            | Form error label top padding.                  |
| `--omni-form-focussed-border-color`              | Form focussed border color.                    |
| `--omni-form-focussed-border-width`              | Form focussed border width.                    |
| `--omni-form-focussed-error-label-color`         | Form focussed error label color.               |
| `--omni-form-focussed-label-background-color`    | Form focussed label background color.          |
| `--omni-form-focussed-label-color`               | Form focussed label color.                     |
| `--omni-form-focussed-label-margin-left`         | Form focussed label left margin.               |
| `--omni-form-focussed-label-padding-left`        | Form focussed label left.                      |
| `--omni-form-focussed-label-padding-right`       | Form focussed label right.                     |
| `--omni-form-focussed-label-transform-scale`     | Form focussed label transform scale.           |
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
| `--omni-form-label-margin-left`                  | Form label margin left.                        |
| `--omni-form-label-text-align`                   | Form label text align.                         |
| `--omni-form-label-transform-origin`             | Form label text align.                         |
| `--omni-form-label-z-index`                      | Form label z-index.                            |
| `--omni-form-layout-background-color`            | Layout background color.                       |
| `--omni-form-layout-border-radius`               | Layout border radius.                          |
| `--omni-form-layout-height`                      | Layout height.                                 |
| `--omni-form-layout-width`                       | Layout width.                                  |
| `--omni-pin-field-control-padding-bottom`        | Pin field control padding bottom.              |
| `--omni-pin-field-control-padding-left`          | Pin field control padding left.                |
| `--omni-pin-field-control-padding-right`         | Pin field control padding right.               |
| `--omni-pin-field-control-padding-top`           | Pin field control padding top.                 |
| `--omni-pin-field-disabled-font-color`           | Pin field disabled font color.                 |
| `--omni-pin-field-error-font-color`              | Pin field error font color.                    |
| `--omni-pin-field-font-color`                    | Pin field font color.                          |
| `--omni-pin-field-font-family`                   | Pin field font family.                         |
| `--omni-pin-field-font-size`                     | Pin field font size.                           |
| `--omni-pin-field-font-weight`                   | Pin field font weight.                         |
| `--omni-pin-field-height`                        | Pin field height.                              |
| `--omni-pin-field-icon-color`                    | Pin field slot icon color.                     |
| `--omni-pin-field-icon-height`                   | Pin field slot height.                         |
| `--omni-pin-field-icon-width`                    | Pin field slot width.                          |
| `--omni-pin-field-padding`                       | Pin field padding.                             |
| `--omni-pin-field-text-align`                    | Pin field text align.                          |
| `--omni-pin-field-width`                         | Pin field width.                               |
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
