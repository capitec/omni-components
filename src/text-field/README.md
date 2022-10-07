# omni-text-field

A text input control.

```js

import '@capitec/omni-components/text-field';
```

## Example

```html
<omni-text-field
  label="Enter a value"
  value="Hello World"
  data="{'id': 12345, 'name': 'Test'}"
  hint="Required"
  error="Field level error message"
  disabled>
</omni-text-field>
```

## Properties

| Property   | Attribute  | Modifiers | Type               | Default | Description                                      |
|------------|------------|-----------|--------------------|---------|--------------------------------------------------|
| `data`     | `data`     |           | `object`           |         | Data associated with the component.              |
| `disabled` | `disabled` |           | `boolean`          | false   | Indicator if the component should be disabled.   |
| `error`    | `error`    |           | `string`           |         | A error message guiding a user to correct a mistake. |
| `hint`     | `hint`     |           | `string`           |         | A hint message to assist the user.               |
| `label`    | `label`    |           | `string`           |         | Text label.                                      |
| `override` |            |           |                    |         |                                                  |
| `styles`   |            | readonly  | `CSSResultGroup[]` |         |                                                  |
| `value`    | `value`    |           | `string \| number` | null    | The value entered into the form component.       |

## Methods

| Method          | Type                    |
|-----------------|-------------------------|
| `renderContent` | `(): TemplateResult<1>` |

## Slots

| Name     | Description                            |
|----------|----------------------------------------|
| `prefix` | Replaces the icon for the prefix slot. |
| `suffix` | Replaces the icon for the suffix slot. |

## CSS Custom Properties

| Property                                         | Description                                    |
|--------------------------------------------------|------------------------------------------------|
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
| `--omni-form-hint-label-border`                  | width -                                        |
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
| `--omni-text-field-font-family`                  | Text field font family.                        |
| `--omni-text-field-font-size`                    | Text field font size.                          |
| `--omni-text-field-font-weight`                  | Text field font weight.                        |
| `--omni-text-field-height`                       | Text field height.                             |
| `--omni-text-field-padding`                      | Text field width.                              |
| `--omni-text-field-text-align`                   | Text field text align.                         |
