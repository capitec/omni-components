# omni-password-field

Password input control.

## Example

```html
<omni-password-field
  label="Enter a value"
  value="Hello World"
  hint="Required"
  error="Field level error message"
  disabled>
</omni-password-field>
```

## Properties

| Property           | Attribute            | Modifiers | Type                   | Default | Description                                      |
|--------------------|----------------------|-----------|------------------------|---------|--------------------------------------------------|
| `clearable`        | `clearable`          |           | `boolean`              | false   | Toggles the ability to clear the value of the component. |
| `data`             | `data`               |           | `object \| undefined`  |         | Data associated with the component.              |
| `dir`              |                      |           | `string`               |         |                                                  |
| `disabled`         | `disabled`           |           | `boolean`              | false   | Indicator if the component should be disabled.   |
| `error`            | `error`              |           | `string \| undefined`  |         | Error message guiding a user to correct a mistake. |
| `hint`             | `hint`               |           | `string \| undefined`  |         | Hint message to assist the user.                 |
| `label`            | `label`              |           | `string \| undefined`  |         | Text label.                                      |
| `lang`             |                      |           | `string`               |         |                                                  |
| `maxLength`        | `max-length`         |           | `number \| undefined`  |         | Maximum character input length.                  |
| `noNativeKeyboard` | `no-native-keyboard` |           | `boolean \| undefined` |         | Disables native on screen keyboards for the component. |
| `override`         | `override`           |           |                        |         | Override for the value property inherited from the OmniFormElement component with reflect set to false. |
| `styles`           |                      | readonly  | `CSSResultGroup[]`     |         |                                                  |
| `value`            | `value`              |           | `string \| undefined`  | null    | Value entered into the form component.           |

## Methods

| Method          | Type                                          |
|-----------------|-----------------------------------------------|
| `focus`         | `(options?: FocusOptions \| undefined): void` |
| `renderContent` | `(): UncompiledTemplateResult<1>`             |
| `renderControl` | `(): UncompiledTemplateResult<1>`             |

## Events

| Event    |
|----------|
| `change` |

## Slots

| Name                | Description                                      |
|---------------------|--------------------------------------------------|
| `clear`             | Replaces the icon for the clear slot.            |
| `hide`              | Replaces the icon for the password value hidden state. |
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
| `--omni-form-clear-control-margin-left`          | Form clear control left margin.                |
| `--omni-form-clear-control-margin-right`         | Form clear control right margin.               |
| `--omni-form-clear-control-width`                | Form clear control width.                      |
| `--omni-form-clear-slot-color`                   | Form clear icon color.                         |
| `--omni-form-clear-slot-height`                  | Form clear slot height.                        |
| `--omni-form-clear-slot-width`                   | Form clear slot width.                         |
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
| `--omni-form-focussed-label-disabled-background-color` | Form focussed label disabled background color. |
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
| `--omni-form-label-z-index`                      | Form label z-index.                            |
| `--omni-form-layout-background-color`            | Layout background color.                       |
| `--omni-form-layout-border-radius`               | Layout border radius.                          |
| `--omni-form-layout-height`                      | Layout height.                                 |
| `--omni-form-layout-width`                       | Layout width.                                  |
| `--omni-password-field-control-padding-bottom`   | Password field control padding bottom.         |
| `--omni-password-field-control-padding-left`     | Password field control padding left.           |
| `--omni-password-field-control-padding-right`    | Password field control padding right.          |
| `--omni-password-field-control-padding-top`      | Password field control padding top.            |
| `--omni-password-field-disabled-color`           | Password field disabled font color.            |
| `--omni-password-field-error-font-color`         | Password field error font color.               |
| `--omni-password-field-font-color`               | Password field font color.                     |
| `--omni-password-field-font-family`              | Password field font family.                    |
| `--omni-password-field-font-size`                | Password field font size.                      |
| `--omni-password-field-font-weight`              | Password field font weight.                    |
| `--omni-password-field-height`                   | Password field height.                         |
| `--omni-password-field-icon-color`               | Password field slot icon color.                |
| `--omni-password-field-icon-height`              | Password field slot height.                    |
| `--omni-password-field-icon-width`               | Password field slot width.                     |
| `--omni-password-field-padding`                  | Password field padding.                        |
| `--omni-password-field-text-align`               | Password field text align.                     |
| `--omni-password-field-width`                    | Password field width.                          |
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
